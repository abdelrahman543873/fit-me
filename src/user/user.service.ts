import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './inputs/user-register.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_ROLE, UserEvents } from './user.constants';
import { ClientRegisteredEvent } from './events/client-registered.event';
import { UserLoginDto } from './inputs/user-login.dto';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { bcryptCheckPass } from '../shared/utils/bcryptHelper';
import { TrainerRegisteredEvent } from './events/trainer-registered.event';
import { ObjectId } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from './inputs/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.login(userLoginDto);
    if (!user) throw new BaseHttpException(601);
    const passwordValidation = await bcryptCheckPass(
      userLoginDto.password,
      user.password,
    );
    if (!passwordValidation) throw new BaseHttpException(601);
    const authenticatedUser = user.toJSON();
    await this.userRepository.updateUserFcmTokenByPhoneNumber(
      userLoginDto.phoneNumber,
      userLoginDto.fcmToken,
    );
    authenticatedUser.token = this.jwtService.sign({
      _id: user._id,
    });
    delete authenticatedUser.password;
    return authenticatedUser;
  }

  async logout(phoneNumber: string) {
    return await this.userRepository.updateUserFcmTokenByPhoneNumber(
      phoneNumber,
      null,
    );
  }

  async deactivateUser(user: User) {
    return await this.userRepository.deactivateUser(user);
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
      clientRegisteredEvent.client = user._id;
      clientRegisteredEvent.trainer = userRegisterDto.trainer;
      this.eventEmitter.emit(
        UserEvents.CLIENT_REGISTRATION,
        clientRegisteredEvent,
      );
    } else if (user.role === USER_ROLE.TRAINER) {
      const trainerRegisteredEvent = new TrainerRegisteredEvent();
      trainerRegisteredEvent.trainer = user._id;
      this.eventEmitter.emit(
        UserEvents.TRAINER_REGISTRATION,
        trainerRegisteredEvent,
      );
    }
    const authenticatedUser = user.toJSON();
    authenticatedUser.token = this.jwtService.sign({
      _id: user._id,
    });
    delete authenticatedUser.password;
    return authenticatedUser;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id: ObjectId,
    profilePicture?: Express.Multer.File,
  ) {
    return await this.userRepository.updateUser(
      updateUserDto,
      id,
      profilePicture,
    );
  }
}
