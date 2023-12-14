import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diet, DietSchema } from './diet.schema';
import { DietRepository } from './diet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
  ],
  providers: [DietService, DietRepository],
  controllers: [DietController],
})
export class DietModule {}
