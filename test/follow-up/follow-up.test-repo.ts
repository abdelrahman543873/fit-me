import { FollowUpRepository } from '../../src/follow-up/follow-up.repository';

export const FollowUpRepo = (): FollowUpRepository => global.followUpRepository;
