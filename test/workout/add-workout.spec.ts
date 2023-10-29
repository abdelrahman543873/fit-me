import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { WORKOUT } from '../endpoints/workout.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildWorkoutParams } from './workout.factory';
import { AddWorkoutDto } from '../../src/workout/inputs/add-workout.dto';

describe('add workout suite case', () => {
  it('should add workout successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await buildWorkoutParams({ trainer: trainer._id });
    const res = await testRequest<AddWorkoutDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: WORKOUT,
      variables: { title: workout.title },
      token: trainer.token,
    });
    expect(res.body.trainer).toBe(trainer._id.toString());
    expect(res.body.title).toBe(workout.title);
  });
});
