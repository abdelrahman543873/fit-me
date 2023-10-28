import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './form.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddFormDto } from './inputs/add-form.dto';
import { DeleteFormDto } from './inputs/delete-form.dto';

@Injectable()
export class FormRepository extends BaseRepository<Form> {
  constructor(
    @InjectModel(Form.name)
    private formSchema: Model<FormDocument>,
  ) {
    super(formSchema);
  }

  addForm(trainer: ObjectId, addFormDto: AddFormDto) {
    return this.formSchema.create({ trainer, ...addFormDto });
  }

  deleteForm(trainer: ObjectId, deleteFormDto: DeleteFormDto) {
    return this.formSchema.deleteOne({ trainer, _id: deleteFormDto.id });
  }
}
