import { Controller, Post } from '@nestjs/common';

@Controller('program')
export class ProgramController {
  @Post()
  addProgram() {}
}
