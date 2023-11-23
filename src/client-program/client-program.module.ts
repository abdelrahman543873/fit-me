import { Module } from '@nestjs/common';
import { ClientProgramService } from './client-program.service';
import { ClientProgramController } from './client-program.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProgram, ClientProgramSchema } from './client-program.schema';
import { ClientProgramRepository } from './client-program.repository';
import { ClientProgramListener } from './client-program.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientProgram.name, schema: ClientProgramSchema },
    ]),
  ],
  providers: [
    ClientProgramService,
    ClientProgramRepository,
    ClientProgramListener,
  ],
  controllers: [ClientProgramController],
})
export class ClientProgramModule {}
