import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { MEAL } from '../endpoints/meal.endpoints';
import { buildMealParams, mealFactory } from './meal.factory';
import { AddMealDto } from '../../src/meal/inputs/add-meal.dto';

describe('meal suite case', () => {
  it('should update meal successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const meal = await mealFactory({ trainer: trainer._id });
    const params = await buildMealParams();
    delete params.trainer;
    const res = await testRequest<AddMealDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${MEAL}/${meal._id.toString()}`,
      token: trainer.token,
      variables: params,
    });
    expect(res.body.title).toBe(params.title);
  });
});
