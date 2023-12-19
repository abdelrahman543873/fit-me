import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Post,
  Request,
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

@ApiBearerAuth()
@ApiTags('observation')
@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  @UseInterceptors(RequestInBodyInterceptor)
  async addObservation(
    @Request() request: RequestContext,
    @Body() addObservationDto: AddObservationDto,
  ) {
    return this.observationService.addObservation(
      request.user._id,
      addObservationDto,
    );
  }
}
