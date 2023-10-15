import * as Joi from 'joi';
import { USER_ROLE } from '../user.constants';

export const UserRegisterDependents = Joi.object({
  role: Joi.string().required(),
  trainerId: Joi.when('role', {
    is: USER_ROLE.TRAINER,
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),
});
