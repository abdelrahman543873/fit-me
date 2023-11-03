import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { WORKOUT } from '../endpoints/workout.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { workoutFactory } from './workout.factory';

describe('get workout suite case', () => {
  it('should get workout successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await workoutFactory({ trainer: trainer._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${WORKOUT}/${workout._id.toString()}`,
      token: trainer.token,
    });
    expect(res.body._id).toBe(workout._id.toString());
  });
});
