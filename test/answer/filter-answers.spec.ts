import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { answerFactory } from './answer.factory';
import { FILTER_ANSWERS } from '../endpoints/answer.endpoints';
import { formFactory } from '../form/form.factory';
import { FilterAnswersDto } from '../../src/answer/inputs/filter-answers.dto';
import { questionFactory } from '../question/question.factory';
import { followUpFactory } from '../follow-up/follow-up.factory';

describe('filter answers suite case', () => {
  it('should filter answers', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const question = await questionFactory({ form: form._id });
    const followUp = await followUpFactory({
      client: client._id,
      trainer: trainer._id,
    });
    const answer = await answerFactory({
      client: client._id,
      question: question._id,
      followUp: followUp._id,
    });
    const differentTrainerFormAnswers = await answerFactory();
    const res = await testRequest<FilterAnswersDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_ANSWERS,
      token: trainer.token,
      params: {
        client: client._id as any,
        followUp: answer.followUp.toString() as any,
      },
    });
    expect(res.body[0]._id).toBe(answer._id.toString());
    expect(res.body[0].client).toBe(client._id.toString());
    expect(res.body[0].question.form.trainer).toBe(trainer._id.toString());
    expect(res.body.length).toBe(1);
    expect(res.body.map((answer) => answer._id)).not.toContain(
      differentTrainerFormAnswers._id.toString(),
    );
  });

  it('should filter answers based on form', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    const question = await questionFactory({ form: form._id });
    const answer = await answerFactory({
      client: client._id,
      question: question._id,
    });
    const differentTrainerFormAnswers = await answerFactory();
    const res = await testRequest<FilterAnswersDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_ANSWERS,
      token: trainer.token,
      params: { form: form._id as any },
    });
    expect(res.body[0]._id).toBe(answer._id.toString());
    expect(res.body[0].client).toBe(client._id.toString());
    expect(res.body[0].question.form.trainer).toBe(trainer._id.toString());
    expect(res.body.length).toBe(1);
    expect(res.body.map((answer) => answer._id)).not.toContain(
      differentTrainerFormAnswers._id.toString(),
    );
  });
});
