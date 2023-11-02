import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Program, ProgramSchema } from './program.schema';
import { ProgramRepository } from './program.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService, ProgramRepository],
})
export class ProgramModule {}
