import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './inputs/user-register.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login() {
    return await this.userService.login();
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() profilePicture?: Express.Multer.File,
  ) {
    return await this.userService.register(userRegisterDto, profilePicture);
  }
}
