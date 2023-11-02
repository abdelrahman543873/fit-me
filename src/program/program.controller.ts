import { Body, Controller, Post, Request } from '@nestjs/common';
import { ProgramService } from './program.service';
import { AddProgramDto } from './inputs/add-program.dto';
import { RequestContext } from '../../dist/shared/interfaces/request-context.interface';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async addProgram(
    @Request() request: RequestContext,
    @Body() addWProgramDto: AddProgramDto,
  ) {
    return await this.programService.addProgram(
      request.user._id,
      addWProgramDto,
    );
  }
}
