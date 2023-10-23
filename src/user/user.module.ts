import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';
import { UserRepository } from './user.repository';
import { ExistingTrainerValidator } from './validators/existing-trainer.validator';
import { ExistingPhoneNumberValidator } from './validators/existing-phone-number.validator';
import { ExistingEmailValidator } from './validators/existing-email.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client',
        filename,
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ExistingTrainerValidator,
    ExistingPhoneNumberValidator,
    ExistingEmailValidator,
  ],
  exports: [UserRepository],
})
export class UserModule {}
