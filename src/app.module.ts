import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrainerModule } from './trainer/trainer.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PlanModule } from './plan/plan.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    TrainerModule,
    ClientModule,
    UserModule,
    SubscriptionModule,
    PlanModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
