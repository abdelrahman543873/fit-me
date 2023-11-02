import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { WORKOUT } from '../endpoints/workout.endpoints';
import { userFactory } from '../user/user.factory';
import { USER_ROLE } from '../../src/user/user.constants';
import { buildWorkoutParams, workoutFactory } from './workout.factory';
import { UpdateWorkoutDto } from '../../src/workout/inputs/update-workout.dto';

describe('update workout suite case', () => {
  it('should update workout successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const workout = await workoutFactory({ trainer: trainer._id });
    const workoutParams = await buildWorkoutParams({ trainer: trainer._id });
    const res = await testRequest<UpdateWorkoutDto>({
      method: HTTP_METHODS_ENUM.PUT,
      url: `${WORKOUT}/${workout._id.toString()}`,
      variables: { title: workoutParams.title },
      token: trainer.token,
    });
    expect(res.body.trainer).toBe(trainer._id.toString());
    expect(res.body.title).toBe(workoutParams.title);
  });
});
