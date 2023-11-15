import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { ProgramRepository } from '../program.repository';
import { Program } from '../program.schema';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingProgramValidator extends ExistingEntityRecordValidator {
  constructor(formRepository: ProgramRepository) {
    super(formRepository, Program.name);
  }
}
export const IsExistingProgram = isExistingEntityRecordValidator(
  ExistingProgramValidator,
);
