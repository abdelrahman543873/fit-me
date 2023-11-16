import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { ClientProgramService } from './client-program.service';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { ClientProgram } from './client-program.schema';

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
  ): Promise<ClientProgram[]> {
    return await this.clientProgramService.filterClientPrograms(
      request.user._id,
    );
  }
}
