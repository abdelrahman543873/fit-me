import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ObservationService } from './observation.service';
import { AddObservationDto } from './inputs/add-observation.input';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../shared/guards/role.guard';
import { USER_ROLE } from '../user/user.constants';
import { Role } from '../shared/decorators/client.decorator';
import { FilterObservationsDto } from './inputs/filter-observations.input';
import { UpdateObservationDto } from './inputs/update-observation.input';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('observation')
@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  @UseInterceptors(RequestInBodyInterceptor)
  @UseInterceptors(FilesInterceptor('media'))
  async addObservation(
    @Request() request: RequestContext,
    @Body() addObservationDto: AddObservationDto,
    @UploadedFiles() media?: Array<Express.Multer.File>,
  ) {
    return this.observationService.addObservation(
      request.user._id,
      addObservationDto,
      media,
    );
  }

  @Get('filter')
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  @UseInterceptors(RequestInBodyInterceptor)
  async filterObservations(
    @Request() request: RequestContext,
    @Query() filterObservationsDto: FilterObservationsDto,
  ) {
    return await this.observationService.filterObservations(
      request.user._id,
      filterObservationsDto,
    );
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  @UseInterceptors(RequestInBodyInterceptor)
  async updateObservation(
    @Request() request: RequestContext,
    @Body() updateObservationDto: UpdateObservationDto,
    @Param() observation: MongoIdDto,
  ) {
    return await this.observationService.updateObservation(
      observation.id,
      request.user._id,
      updateObservationDto,
    );
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  @UseInterceptors(RequestInBodyInterceptor)
  async deleteObservation(
    @Request() request: RequestContext,
    @Param() observation: MongoIdDto,
  ) {
    return await this.observationService.deleteObservation(
      observation.id,
      request.user._id,
    );
  }
}
