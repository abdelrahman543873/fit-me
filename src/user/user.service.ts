import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './inputs/user-register.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  login() {
    return this.userRepository.login();
  }

  register(
    userRegisterDto: UserRegisterDto,
    profilePicture?: Express.Multer.File,
  ) {
    return this.userRepository.register(userRegisterDto, profilePicture);
  }
}
