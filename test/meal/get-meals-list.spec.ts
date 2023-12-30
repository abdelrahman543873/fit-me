import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { MEALS_LIST } from '../endpoints/meal.endpoints';
import { mealFactory } from './meal.factory';
import { GetMealsListDto } from '../../src/meal/inputs/get-meals.list.dto';

describe('meals list suite case', () => {
  it('should get meals list successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const meal = await mealFactory({ trainer: trainer._id });
    const res = await testRequest<GetMealsListDto>({
      method: HTTP_METHODS_ENUM.GET,
      url: MEALS_LIST,
      token: trainer.token,
      params: { mealsIds: [meal._id.toString()] as any },
    });
    expect(res.body[0]._id).toBe(meal._id.toString());
  });
});
