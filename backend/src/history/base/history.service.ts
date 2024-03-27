import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { HistoryActionType, History } from '../history.entity';
import { HistoryT } from '@shared/dtos';

export class BaseHistoryService<T> {
  logger: Logger;
  constructor(
    private readonly historyRepository: Repository<History>,
    private readonly tableName: string,
  ) {
    this.logger = new Logger(`${BaseHistoryService.name}(${tableName})`);
  }

  async create(record: {
    actionType: HistoryActionType;
    fieldName?: keyof T;
    oldValue?: string;
    newValue?: string;
    recordId: number;
  }) {
    const newRecord = this.historyRepository.create({
      ...record,
      oldValue: record.oldValue?.substring(0, 128),
      newValue: record.newValue?.substring(0, 128),
      fieldName: record.fieldName as string,
      tableName: this.tableName,
    });

    await this.historyRepository.save(newRecord);

    this.logger.log({
      status: 'History record created',
      record,
    });
  }

  async findAll(): Promise<History[]> {
    return await this.historyRepository.query(`
SELECT h.*, t.name as name,
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."oldValue"::INTEGER)
          ELSE h."oldValue"
        END as "oldValue",
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."newValue"::INTEGER)
          ELSE h."newValue"
        END as "newValue"
FROM history h
LEFT JOIN task t 
  ON h."recordId" = t.id AND h."tableName" = 'task'
ORDER BY h."timestamp" ASC
`);
  }
  async findEntityHistory(id: number): Promise<HistoryT[]> {
    // TODO: raw sql in service
    return await this.historyRepository.query(
      `
      SELECT h.*, t.name,
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."oldValue"::INTEGER)
          ELSE h."oldValue"
        END as "oldValue",
        CASE
          WHEN h."fieldName" = 'list' THEN (SELECT name FROM task_list WHERE id = h."newValue"::INTEGER)
          ELSE h."newValue"
        END as "newValue"
      FROM history h
      LEFT JOIN ${this.tableName} t 
        ON h."recordId" = t.id
      WHERE h."recordId" = $1
      ORDER BY h."timestamp" ASC
    `,
      [id],
    );
  }
}

export abstract class BaseHistoryServiceTemplate<T> {
  abstract historyService: BaseHistoryService<T>;
  async create(record: {
    actionType: HistoryActionType;
    fieldName?: keyof T;
    oldValue?: string;
    newValue?: string;
    recordId: number;
  }) {
    await this.historyService.create(record);
  }

  async findAll(): Promise<History[]> {
    return this.historyService.findAll();
  }

  async findEntityHistory(id: number): Promise<HistoryT[]> {
    return this.historyService.findEntityHistory(id);
  }
}
