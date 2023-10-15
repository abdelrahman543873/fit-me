import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './inputs/user-register.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_ROLE, UserEvents } from './user.constants';
import { ClientRegisteredEvent } from './events/client-registered.event';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
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
    if (user.role === USER_ROLE.CLIENT) {
      const clientRegisteredEvent = new ClientRegisteredEvent();
      clientRegisteredEvent.clientId = user._id;
      clientRegisteredEvent.trainerId = new Types.ObjectId(
        userRegisterDto.trainerId,
      );
      this.eventEmitter.emit(
        UserEvents.CLIENT_REGISTRATION,
        clientRegisteredEvent,
      );
    }
    const authenticatedUser = user.toJSON();
    authenticatedUser.token = this.jwtService.sign({
      _id: user._id,
    });
    return authenticatedUser;
  }
}
