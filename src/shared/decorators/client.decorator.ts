import { SetMetadata } from '@nestjs/common';
import { USER_ROLE } from '../../user/user.constants';

export const Role = (role: USER_ROLE) => SetMetadata('ROLE', role);
