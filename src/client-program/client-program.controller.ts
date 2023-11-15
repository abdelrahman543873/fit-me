import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { ClientProgramService } from './client-program.service';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
