import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // done this way to be able to connect in case of testing
        // docker and real runtime without docker
        uri:
          (configService.get<string>(process.env.NODE_ENV) === 'test' &&
            JSON.parse(readFileSync('globalConfig.json', 'utf-8')).mongoUri) ||
          configService.get<string>(process.env.MONGO_DB) ||
          configService.get<string>(process.env.LOCAL_MONGO_DB),
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-aggregate-paginate-v2'));
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ConfigurationModule {}
