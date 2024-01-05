import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { UserRegisterDto } from './inputs/user-register.dto';
import { hashPassSync } from '../shared/utils/bcryptHelper';
import { UserLoginDto } from './inputs/user-login.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<UserDocument>,
  ) {
    super(userSchema);
  }

  login(userLoginDto: UserLoginDto) {
    return this.userSchema
      .findOne({ phoneNumber: userLoginDto.phoneNumber })
      .select('+password');
  }

  updateUserFcmTokenByPhoneNumber(phoneNumber: string, fcmToken: string) {
    return this.userSchema.findOneAndUpdate(
      { phoneNumber },
      { fcmToken },
      { new: true },
    );
  }

  register(
    userRegisterDto: UserRegisterDto,
    profilePicture?: Express.Multer.File,
  ) {
    return this.userSchema.create({
      ...userRegisterDto,
      password: hashPassSync(userRegisterDto.password),
      ...(profilePicture && {
        profilePicture:
          profilePicture['location'] ||
          `${process.env.HOST}${profilePicture.filename}`,
      }),
    });
  }

  deactivateUser(user: User) {
    return this.userSchema.findOneAndUpdate(
      { _id: user._id },
      {
        email: `${randomUUID()}-${user.email}`,
        phoneNumber: `${randomUUID()}-${user.phoneNumber}`,
      },
    );
  }
}
