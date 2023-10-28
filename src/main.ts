import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { MongooseExceptionFilter } from './shared/exception-filters/mongo-exception-filter';
import { BaseHttpExceptionFilter } from './shared/exception-filters/base-http.exception-filter';
import { ClientTrainerInterceptor } from './shared/interceptors/client-trainer.interceptor';
import { SubscriptionRepository } from './subscription/subscription.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('🚀personal trainer🚀')
    .setDescription('personal trainer API description')
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
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
