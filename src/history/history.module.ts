import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './history.schema';
import { HistoryRepository } from './history.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
  ],
  providers: [HistoryService, HistoryRepository],
  controllers: [HistoryController],
})
export class HistoryModule {}
