import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { USER_ROLE } from '../../src/user/user.constants';
import { userFactory } from '../user/user.factory';
import { ITEM_BULK } from '../endpoints/item.endpoints';
import { buildItemParams } from './item.factory';
import { AddItemsDto } from '../../src/item/inputs/add-items.dto';

describe('form suite case', () => {
  it('should add form successfully', async () => {
    const trainer = await userFactory({ role: USER_ROLE.TRAINER });
    const params = await buildItemParams();
    delete params.trainer;
    const res = await testRequest<AddItemsDto>({
      method: HTTP_METHODS_ENUM.POST,
      url: ITEM_BULK,
      token: trainer.token,
      variables: { items: [params] },
    });
    expect(res.body[0].title).toBe(params.title);
  });
});
