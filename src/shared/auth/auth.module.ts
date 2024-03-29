import { Module } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserModule } from '../../user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
