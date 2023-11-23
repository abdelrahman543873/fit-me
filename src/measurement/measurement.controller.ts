import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { AddMeasurementDto } from './inputs/add-measurement.dto';
import { Role } from '../shared/decorators/client.decorator';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from '../shared/guards/role.guard';
import { MediaInBodyInterceptor } from '../shared/interceptors/media-in-body.interceptor';
import { FilterMeasurementsDto } from './inputs/filter-measurements.dto';
import { AddMeasurementsDto } from './inputs/add-measurements.dto';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { USER_ROLE } from '../user/user.constants';

@ApiTags('measurement')
@ApiBearerAuth()
@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @Role(USER_ROLE.CLIENT)
  @UseGuards(RoleGuard)
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

  @Post('bulk')
  @Role(USER_ROLE.CLIENT)
  @UseGuards(RoleGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  async addMeasurements(@Body() addMeasurementsDto: AddMeasurementsDto) {
    return await this.measurementService.addMeasurements(addMeasurementsDto);
  }

  @Get('filter')
  async filterMeasurements(
    @Request() request: RequestContext,
    @Query() filterMeasurementsDto: FilterMeasurementsDto,
  ) {
    return await this.measurementService.filterMeasurements(
      request.user._id,
      filterMeasurementsDto,
    );
  }
}
