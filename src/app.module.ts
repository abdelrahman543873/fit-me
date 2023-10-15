import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrainerModule } from './trainer/trainer.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, TrainerModule, ClientModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
