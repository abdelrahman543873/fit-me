import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { ClientProgramService } from './client-program.service';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { FilterClientProgramDto } from './inputs/filter-client-program.dto';
import { USER_ROLE } from '../user/user.constants';

@ApiBearerAuth()
@ApiTags('client-program')
@Controller('client-program')
export class ClientProgramController {
  constructor(private readonly clientProgramService: ClientProgramService) {}

  @Post()
  @UseInterceptors(RequestInBodyInterceptor)
  async addClientProgram(@Body() addClientProgramDto: AddClientProgramDto) {
    return this.clientProgramService.addClientProgram(addClientProgramDto);
  }

  @Get('filter')
  async filterClientPrograms(
    @Request() request: RequestContext,
    @Query() filterClientProgramDto: FilterClientProgramDto,
  ) {
    return await this.clientProgramService.filterClientPrograms(
      request.user.role === USER_ROLE.CLIENT
        ? request.trainerId
        : request.user._id,
      filterClientProgramDto,
    );
  }
}
