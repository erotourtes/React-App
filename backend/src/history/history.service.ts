import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { History } from './history.entity';
import { Injectable } from '@nestjs/common';
import { HistoryT } from '@shared/dtos';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async findAll(): Promise<HistoryT[]> {
    return await this.historyRepository.query(`
SELECT h.*, coalesce(t.name, tl.name) as name 
FROM history h
LEFT JOIN task t 
  ON h."recordId" = t.id AND h."tableName" = 'task'
LEFT JOIN task_list tl
  ON h."recordId" = tl.id AND h."tableName" = 'task_list'
`);
  }
}
