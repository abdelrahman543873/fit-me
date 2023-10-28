import * as Joi from 'joi';
import { USER_ROLE } from '../user.constants';

export const UserRegisterDependents = Joi.object({
  role: Joi.string(),
  trainer: Joi.when('role', {
    is: USER_ROLE.CLIENT,
    then: Joi.object().required(),
    otherwise: Joi.forbidden(),
  }),
});
