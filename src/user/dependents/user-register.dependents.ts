import * as Joi from 'joi';
import { USER_ROLE } from '../user.constants';

export const UserRegisterDependents = Joi.object({
  role: Joi.string(),
  trainerId: Joi.when('role', {
    is: USER_ROLE.CLIENT,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
});
