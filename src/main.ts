import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { MongooseExceptionFilter } from './shared/exception-filters/mongo-exception-filter';
import { BaseHttpExceptionFilter } from './shared/exception-filters/base-http.exception-filter';
import { ClientTrainerInterceptor } from './shared/interceptors/client-trainer.interceptor';
import { SubscriptionRepository } from './subscription/subscription.repository';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import morganBody from 'morgan-body';
import correlationId from 'express-correlation-id';
import { logTransform } from './shared/utils/transformer.print';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          handleExceptions: true,
          format: format.combine(
            format.errors({ stack: true }),
            format.timestamp(),
            format.uncolorize(),
            format.splat(),
            format.printf(logTransform),
          ),
        }),
      ],
      exitOnError: false,
    }),
  });
  const options = new DocumentBuilder()
    .setTitle('🚀fit me')
    .setDescription('fit me API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new BaseHttpExceptionFilter(),
    new MongooseExceptionFilter(),
  );
  const subscriptionRepository = app.get<SubscriptionRepository>(
    SubscriptionRepository,
  );
  app.useGlobalInterceptors(
    new ClientTrainerInterceptor(subscriptionRepository),
  );
  app.use(compression());
  app.use(correlationId({ header: 'id' }));
  const logger = new Logger();
  morganBody(app.getHttpAdapter().getInstance(), {
    skip: (req) =>
      req.method === 'OPTIONS' ||
      req.originalUrl.startsWith('/api') ||
      req.originalUrl.startsWith('/health'),
    logIP: true,
    logRequestId: true,
    logReqDateTime: true,
    logReqUserAgent: false,
    includeNewLine: false,
    prettify: false,
    stream: {
      write: (message) => {
        logger.warn(message);
        return true;
      },
    },
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
