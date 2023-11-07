import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { buildAnswerParams } from './answer.factory';
import { AddAnswerDto } from '../../src/answer/inputs/add-answer.dto';
import { ANSWER } from '../endpoints/answer.endpoints';

describe('add answer suite case', () => {
  it('should add answer successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildAnswerParams();
    delete params.media;
    const res = await testRequest<AddAnswerDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: ANSWER,
      token: trainer.token,
      variables: { ...params, question: params.question.toString() as any },
      fileParam: 'media',
    });
    expect(res.body.text).toBe(params.text);
    expect(res.body.text).toBe(params.text);
  });
});
