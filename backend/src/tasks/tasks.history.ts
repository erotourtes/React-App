import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Task } from './tasks.entity';
import { ActionType } from 'src/history/history.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { HistoryService } from 'src/history/history.service';

@Injectable()
@EventSubscriber()
export class TaskHistoryManager implements EntitySubscriberInterface {
  constructor(
    private readonly historyService: HistoryService,
    @InjectDataSource() readonly dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  afterInsert(event: InsertEvent<Task>) {
    this.historyService.create(
      { actionType: ActionType.CREATE },
      event.entity.id,
    );
  }

  afterUpdate(event: UpdateEvent<Task>) {
    const newTask = event.entity as Task;
    if (newTask.isDeleted) return void this.handleRemove(newTask);

    const isListChanged = newTask.list.id !== event.databaseEntity.list.id;
    if (isListChanged) {
      this.historyService.create(
        {
          actionType: ActionType.UPDATE,
          fieldName: 'list',
          oldValue: event.databaseEntity.list.id.toString(),
          newValue: newTask.list.id.toString(),
        },
        event.entity.id,
      );
    }

    const updated = event.updatedColumns.entries();
    for (const [, value] of updated) {
      this.historyService.create(
        {
          actionType: ActionType.UPDATE,
          fieldName: <keyof Task>value.databaseName,
          oldValue: event.databaseEntity[value.databaseName],
          newValue: newTask[value.databaseName],
        },
        event.entity.id,
      );
    }
  }

  handleRemove(entity: Task) {
    this.historyService.create({ actionType: ActionType.DELETE }, entity.id);
  }
}
