import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { FormRepository } from '../form.repository';
import { Form } from '../form.schema';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingFormValidator extends ExistingEntityRecordValidator {
  constructor(formRepository: FormRepository) {
    super(formRepository, Form.name);
  }
}
export const IsExistingForm = isExistingEntityRecordValidator(
  ExistingFormValidator,
);
