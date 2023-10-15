import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../constants/env-varaible-names';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      renderPath: join(__dirname, '..', '..', 'client'),
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // done this way to be able to connect in case of testing
        // docker and real runtime without docker
        uri:
          (configService.get<string>(ENV_VARIABLE_NAMES.NODE_ENV) === 'test' &&
            JSON.parse(readFileSync('globalConfig.json', 'utf-8')).mongoUri) ||
          configService.get<string>(ENV_VARIABLE_NAMES.MONGO_DB) ||
          configService.get<string>(ENV_VARIABLE_NAMES.LOCAL_MONGO_DB),
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-aggregate-paginate-v2'));
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
  ],
})
export class ConfigurationModule {}
