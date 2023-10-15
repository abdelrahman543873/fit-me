import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './inputs/user-register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  login() {
    return this.userRepository.login();
  }

  async register(
    userRegisterDto: UserRegisterDto,
    profilePicture?: Express.Multer.File,
  ) {
    const user = await this.userRepository.register(
      userRegisterDto,
      profilePicture,
    );
    const authenticatedUser = user.toJSON();
    authenticatedUser.token = this.jwtService.sign({
      _id: user._id,
    });
    return authenticatedUser;
  }
}
