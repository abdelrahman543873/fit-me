import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { UserRegisterDto } from './inputs/user-register.dto';
import { hashPassSync } from '../shared/utils/bcryptHelper';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<UserDocument>,
  ) {
    super(userSchema);
  }

  login() {}

  register(
    userRegisterDto: UserRegisterDto,
    profilePicture?: Express.Multer.File,
  ) {
    return this.userSchema.create({
      ...userRegisterDto,
      password: hashPassSync(userRegisterDto.password),
      ...(profilePicture && {
        profilePicture: `${process.env.HOST}${profilePicture.filename}`,
      }),
    });
  }
}