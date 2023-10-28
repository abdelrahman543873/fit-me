import { formFactory } from './../form/form.factory';
import { faker } from '@faker-js/faker';
import { Question } from '../../src/question/question.schema';
import { QUESTION_TYPES } from '../../src/question/question.constants';
import { QuestionRepo } from './question.test-repo';

export const buildQuestionParams = async (obj: Partial<Question> = {}) => {
  return {
    title: obj.title || faker.word.noun(),
    form: obj.form || (await formFactory())._id,
    type:
      obj.type ||
      faker.helpers.arrayElement<QUESTION_TYPES>(Object.values(QUESTION_TYPES)),
    choices: obj.choices || [faker.word.noun()],
  };
};

export const questionFactory = async (
  obj: Partial<Question> = {},
): Promise<Question> => {
  const params: Partial<Question> = await buildQuestionParams(obj);
  return await QuestionRepo().add(params);
};
