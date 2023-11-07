import { AnswerRepository } from '../../src/answer/answer.repository';

export const AnswerRepo = (): AnswerRepository => global.answerRepository;
