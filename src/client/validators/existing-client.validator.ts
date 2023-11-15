import { Injectable } from '@nestjs/common';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { ValidatorConstraint } from 'class-validator';
import { ClientRepository } from '../client.repository';
import { Client } from '../client.schema';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExistingClientValidator extends ExistingEntityRecordValidator {
  constructor(clientRepository: ClientRepository) {
    super(clientRepository, Client.name);
  }
}
export const IsExistingClient = isExistingEntityRecordValidator(
  ExistingClientValidator,
);
