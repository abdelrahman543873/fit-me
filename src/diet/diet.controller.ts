import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DietService } from './diet.service';
import { AddDietDto } from './inputs/add-diet.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { USER_ROLE } from '../user/user.constants';
import { RoleGuard } from '../shared/guards/role.guard';
import { Role } from '../shared/decorators/client.decorator';
import { UpdateDietDto } from './inputs/update-diet.dto';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';
import { Get } from '@nestjs/common';
import { MediaInBodyInterceptor } from '../shared/interceptors/media-in-body.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('diet')
@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(MediaInBodyInterceptor)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('media'))
  @Role(USER_ROLE.TRAINER)
  async addDiet(
    @Request() request: RequestContext,
    @Body() addDietDto: AddDietDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.dietService.addDiet(request.user._id, addDietDto, media);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(MediaInBodyInterceptor)
  @UseInterceptors(FileInterceptor('media'))
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  async updateDiet(
    @Request() request: RequestContext,
    @Body() updateDietDto: UpdateDietDto,
    @Param() id: MongoIdDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.dietService.updateDiet(
      id.id,
      request.user._id,
      updateDietDto,
      media,
    );
  }

  @Get(':id')
  async getDiet(@Request() request: RequestContext, @Param() diet: MongoIdDto) {
    return await this.dietService.getDiet(
      diet.id,
      request.trainerId || request.user._id,
    );
  }
}
