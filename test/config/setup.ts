import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test } from '@nestjs/testing';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../../src/app.module';
import { MongooseExceptionFilter } from '../../src/shared/exception-filters/mongo-exception-filter';
import { BaseHttpExceptionFilter } from '../../src/shared/exception-filters/base-http.exception-filter';
import { SubscriptionRepository } from '../../src/subscription/subscription.repository';
import { ClientTrainerInterceptor } from '../../src/shared/interceptors/client-trainer.interceptor';

const mongod = new MongoMemoryServer({
  binary: { version: '7.0.2', arch: 'x64' },
});
module.exports = async (): Promise<void> => {
  await mongod.start();
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getUri(),
  };
  fs.writeFileSync('globalConfig.json', JSON.stringify(mongoConfig));
  global.__MONGOD__ = mongod;
  global.mongoUri = mongoConfig.mongoUri;
  global.mongoDBName = mongoConfig.mongoDBName;
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(compression());
  app.useGlobalFilters(
    new BaseHttpExceptionFilter(),
    new MongooseExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );
  const subscriptionRepository = app.get<SubscriptionRepository>(
    SubscriptionRepository,
  );
  app.useGlobalInterceptors(
    new ClientTrainerInterceptor(subscriptionRepository),
  );
  await app.init();
  global.app = app;
};
