import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrainerModule } from './trainer/trainer.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigurationModule,
    TrainerModule,
    ClientModule,
    UserModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
