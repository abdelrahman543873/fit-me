import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './form.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddFormDto } from './inputs/add-form.dto';
import { DeleteFormDto } from './inputs/delete-form.dto';
import { FilterFormsDto } from './inputs/filter-forms.dto';
import { GetAnsweredFormsDto } from './inputs/get-answered-forms.dto';
import { USER_ROLE } from '../user/user.constants';

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

  getAnsweredForms(
    requestContext: RequestContext,
    getAnsweredFormsDto: GetAnsweredFormsDto,
  ) {
    return this.formSchema.aggregate([
      {
        $match: {
          ...(requestContext.user.role === USER_ROLE.TRAINER
            ? {
                trainer: requestContext.user._id,
              }
            : { trainer: requestContext.trainerId }),
        },
      },
      {
        $lookup: {
          from: 'followups',
          let: { formId: '$_id' },
          as: 'followup',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$$formId', '$form'] },
                    {
                      $eq: [
                        '$client',
                        getAnsweredFormsDto.client || requestContext.user._id,
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      { $unwind: { path: '$followup', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'questions',
          as: 'questions',
          let: { formId: '$_id', followUpId: '$followup._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$formId', '$form'],
                },
              },
            },
            {
              $lookup: {
                from: 'answers',
                as: 'answer',
                let: { questionId: '$_id', followUpId: '$$followUpId' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ['$$questionId', '$question'],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $match: {
                      $expr: {
                        $cond: {
                          if: {
                            $eq: [{ $ifNull: ['$$followUpId', null] }, null],
                          },
                          then: {
                            $eq: ['$$questionId', '$question'],
                          },
                          else: {
                            $eq: ['$$followUpId', '$followUp'],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            { $unwind: '$answer' },
          ],
        },
      },
    ]);
  }

  filterForms(trainer: ObjectId, filterFormsDto: FilterFormsDto) {
    return this.formSchema.aggregate([
      { $match: { trainer, ...filterFormsDto } },
      {
        $lookup: {
          from: 'questions',
          foreignField: 'form',
          localField: '_id',
          as: 'questions',
        },
      },
    ]);
  }
}
