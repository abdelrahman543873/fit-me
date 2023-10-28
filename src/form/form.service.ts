import { Injectable } from '@nestjs/common';
import { FormRepository } from './form.repository';
import { AddFormDto } from './inputs/add-form.dto';
import { ObjectId } from 'mongoose';
import { DeleteFormDto } from './inputs/delete-form.dto';

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  addForm(trainer: ObjectId, addFormDto: AddFormDto) {
    return this.formRepository.addForm(trainer, addFormDto);
  }

  deleteForm(trainer: ObjectId, deleteFormDto: DeleteFormDto) {
    return this.formRepository.deleteForm(trainer, deleteFormDto);
  }
}
