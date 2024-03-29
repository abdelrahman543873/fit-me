import { AnswerRepo } from './answer.test-repo';
import { Answer } from '../../src/answer/answer.scheme';
import { questionFactory } from '../question/question.factory';
import { faker } from '@faker-js/faker';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { followUpFactory } from '../follow-up/follow-up.factory';

export const buildAnswerParams = async (
  obj: Partial<Answer> = {},
): Promise<Answer> => {
  return {
    question: obj.question || (await questionFactory())._id,
    text: obj.text || faker.word.verb(),
    choices: obj.choices || [faker.word.verb()],
    media: obj.media || faker.word.verb(),
    client: obj.client || (await userFactory({ role: USER_ROLE.CLIENT }))._id,
    followUp: obj.followUp || (await followUpFactory())._id,
  };
};

export const answerFactory = async (
  obj: Partial<Answer> = {},
): Promise<Answer> => {
  const params: Partial<Answer> = await buildAnswerParams(obj);
  return await AnswerRepo().add(params);
};

export const answersFactory = async (
  count = 10,
  obj: Partial<Answer> = {},
): Promise<Answer[]> => {
  const answers: Answer[] = [];
  for (let i = 0; i < count; i++) {
    answers.push(await buildAnswerParams(obj));
  }
  return await AnswerRepo().addMany(answers);
};
