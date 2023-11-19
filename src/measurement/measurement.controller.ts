import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { AddMeasurementDto } from './inputs/add-measurement.dto';
import { Client } from '../shared/decorators/client.decorator';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientGuard } from '../shared/guards/client.guard';
import { MediaInBodyInterceptor } from '../shared/interceptors/media-in-body.interceptor';

@ApiTags('measurement')
@ApiBearerAuth()
@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @Client()
  @UseGuards(ClientGuard)
  @UseInterceptors(MediaInBodyInterceptor)
  @UseInterceptors(FileInterceptor('media'))
  async addMeasurement(
    @Request() request: RequestContext,
    @Body() addMeasurementDto: AddMeasurementDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.measurementService.addMeasurement(
      request.user._id,
      addMeasurementDto,
      media,
    );
  }
}
