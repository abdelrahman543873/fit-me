import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { FILTER_FORMS } from '../endpoints/form.endpoints';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { questionFactory } from '../question/question.factory';
import { formFactory } from './form.factory';
import { FilterFormsDto } from '../../src/form/inputs/filter-forms.dto';
import { subscriptionFactory } from '../subscription/subscription.factory';

describe('filter form suite case', () => {
  it('should filter forms successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    await questionFactory({ form: form._id });
    const res = await testRequest<FilterFormsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_FORMS,
      token: trainer.token,
    });
    expect(res.body[0].title).toBe(form.title);
  });

  it('should filter forms successfully as a client for my trainer', async () => {
    const client = await userFactory({ role: USER_ROLE.CLIENT });
    const subscription = await subscriptionFactory({ client: client._id });
    const form = await formFactory({ trainer: subscription.trainer });
    const res = await testRequest<FilterFormsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_FORMS,
      token: client.token,
    });
    expect(res.body[0].title).toBe(form.title);
  });

  it('should filter forms successfully with filters', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const form = await formFactory({ trainer: trainer._id });
    await questionFactory({ form: form._id });
    const res = await testRequest<FilterFormsDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: FILTER_FORMS,
      token: trainer.token,
      params: {
        title: form.title,
      },
    });
    expect(res.body[0].title).toBe(form.title);
  });
});
