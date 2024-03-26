import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { HistoryActionType, History } from '../history.entity';

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
      fieldName: record.fieldName as string,
      tableName: this.tableName,
    });

    await this.historyRepository.save(newRecord);

    this.logger.log({
      status: 'History record created',
      record,
    });
  }

  async findAll() {
    return this.historyRepository.find({
      where: {
        tableName: this.tableName,
      },
      order: { timestamp: 'DESC' },
    });
  }

  async findEntityHistory(id: number) {
    return this.historyRepository.find({
      where: {
        recordId: id,
        tableName: this.tableName,
      },
      order: { timestamp: 'DESC' },
    });
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

  async findAll() {
    return this.historyService.findAll();
  }

  async findEntityHistory(id: number) {
    return this.historyService.findEntityHistory(id);
  }
}
