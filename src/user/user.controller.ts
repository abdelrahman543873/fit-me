import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './inputs/user-register.dto';
import { UserRegisterDependents } from './dependents/user-register.dependents';
import { JoiValidationPipe } from '../shared/pipes/joi.pipe';
import { UserLoginDto } from './inputs/user-login.dto';
import { User } from './user.schema';
import { Public } from '../shared/decorators/public.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<User> {
    return await this.userService.login(userLoginDto);
  }

  @Put('logout')
  async logout(@Request() request: RequestContext) {
    return await this.userService.logout(request.user.phoneNumber);
  }

  @Delete('delete')
  async deactivateUser(@Request() request: RequestContext) {
    return await this.userService.deactivateUser(request.user);
  }

  @ApiConsumes('multipart/form-data')
  @UsePipes(new JoiValidationPipe(UserRegisterDependents, true))
  @UseInterceptors(FileInterceptor('profilePicture'))
  @Public()
  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() profilePicture?: Express.Multer.File,
  ): Promise<User> {
    return await this.userService.register(userRegisterDto, profilePicture);
  }
}
