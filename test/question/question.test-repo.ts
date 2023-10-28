import { QuestionRepository } from '../../src/question/question.repository';

export const QuestionRepo = (): QuestionRepository => global.questionRepository;
