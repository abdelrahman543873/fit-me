import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diet, DietSchema } from './diet.schema';
import { DietRepository } from './diet.repository';
import { ExistingDietValidator } from './validators/existing-diet.validator';
import { DietOwnerValidator } from './validators/diet-owner.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
  ],
  providers: [
    DietService,
    DietRepository,
    ExistingDietValidator,
    DietOwnerValidator,
  ],
  controllers: [DietController],
})
export class DietModule {}
