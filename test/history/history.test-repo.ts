import { HistoryRepository } from '../../src/history/history.repository';

export const HistoryRepo = (): HistoryRepository => global.historyRepository;
