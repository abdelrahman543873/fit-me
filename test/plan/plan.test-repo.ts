import { PlanRepository } from '../../src/plan/plan.repository';

export const PlanRepo = (): PlanRepository => global.planRepository;
