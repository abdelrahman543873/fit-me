import { Injectable } from '@nestjs/common';
import { FormRepository } from './form.repository';
import { AddFormDto } from './inputs/add-form.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  addForm(trainer: ObjectId, addFormDto: AddFormDto) {
    return this.formRepository.addForm(trainer, addFormDto);
  }
}
