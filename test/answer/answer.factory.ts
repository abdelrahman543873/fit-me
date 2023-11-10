import { AnswerRepo } from './answer.test-repo';
import { Answer } from '../../src/answer/answer.scheme';
import { questionFactory } from '../question/question.factory';
import { faker } from '@faker-js/faker';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';

export const buildAnswerParams = async (
  obj: Partial<Answer> = {},
): Promise<Partial<Answer>> => {
  return {
    question: obj.question || (await questionFactory())._id,
    text: obj.text || faker.word.verb(),
    choices: obj.choices || [faker.word.verb()],
    media: obj.media || faker.word.verb(),
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
  };
};

export const answerFactory = async (
  obj: Partial<Answer> = {},
): Promise<Answer> => {
  const params: Partial<Answer> = await buildAnswerParams(obj);
  return await AnswerRepo().add(params);
};
