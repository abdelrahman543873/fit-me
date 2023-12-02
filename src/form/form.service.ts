import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Injectable } from '@nestjs/common';
import { FormRepository } from './form.repository';
import { AddFormDto } from './inputs/add-form.dto';
import { ObjectId } from 'mongoose';
import { DeleteFormDto } from './inputs/delete-form.dto';
import { FilterFormsDto } from './inputs/filter-forms.dto';
import { GetAnsweredFormsDto } from './inputs/get-answered-forms.dto';

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  addForm(trainer: ObjectId, addFormDto: AddFormDto) {
    return this.formRepository.addForm(trainer, addFormDto);
  }

  deleteForm(trainer: ObjectId, deleteFormDto: DeleteFormDto) {
    return this.formRepository.deleteForm(trainer, deleteFormDto);
  }

  getAnsweredForms(
    requestContext: RequestContext,
    getAnsweredFormsDto: GetAnsweredFormsDto,
  ) {
    return this.formRepository.getAnsweredForms(
      requestContext,
      getAnsweredFormsDto,
    );
  }

  filterForms(trainer: ObjectId, filterFormsDto: FilterFormsDto) {
    return this.formRepository.filterForms(trainer, filterFormsDto);
  }
}
