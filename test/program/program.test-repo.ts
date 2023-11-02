import { ProgramRepository } from '../../src/program/program.repository';

export const ProgramRepo = (): ProgramRepository => global.programRepository;
