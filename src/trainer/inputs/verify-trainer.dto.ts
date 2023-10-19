import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { IsExistingTrainer } from '../../user/validators/existing-trainer.validator';

export class VerifyTrainerDto {
  @IsOptional()
  @IsExistingTrainer()
  @Transform(objectIdTransformer)
  id?: ObjectId;
}
