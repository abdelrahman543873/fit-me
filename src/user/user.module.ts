import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../shared/constants/env-varaible-names';
import { ExistingTrainerValidator } from './validators/existing-trainer.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client/pictures',
        filename,
      }),
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(
            ENV_VARIABLE_NAMES.JWT_EXPIRY_TIME,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ExistingTrainerValidator],
})
export class UserModule {}
