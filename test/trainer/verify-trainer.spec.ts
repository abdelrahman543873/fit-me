import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { trainerFactory } from './trainer.facotry';
import { VERIFY_TRAINER } from '../endpoints/trainer.endpoints';

describe('verify trainer suite case', () => {
  it('should verify trainer successfully', async () => {
    const trainer = await trainerFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${VERIFY_TRAINER}/${trainer._id}`,
    });
    expect(res.body._id).toBe(trainer._id.toString());
  });
});
