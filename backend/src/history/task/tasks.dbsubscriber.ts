import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/tasks.entity';
import { TaskHistoryService } from './tasks.service';
import { HistoryActionType } from '../history.entity';

@Injectable()
@EventSubscriber()
export class TaskHistoryDbSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly historyService: TaskHistoryService,
    @InjectDataSource() readonly dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  afterInsert(event: InsertEvent<Task>) {
    this.historyService.create({
      actionType: HistoryActionType.CREATE,
      recordId: event.entity.id,
    });
  }

  afterUpdate(event: UpdateEvent<Task>) {
    const newTask = event.entity as Task;
    if (newTask.isDeleted) return void this.handleRemove(newTask);

    const isListChanged = newTask.list.id !== event.databaseEntity.list.id;
    if (isListChanged) {
      this.historyService.create({
        actionType: HistoryActionType.UPDATE,
        fieldName: 'list',
        oldValue: event.databaseEntity.list.id.toString(),
        newValue: newTask.list.id.toString(),
        recordId: event.entity.id,
      });
    }

    const updated = event.updatedColumns.entries();
    for (const [, value] of updated) {
      this.historyService.create({
        actionType: HistoryActionType.UPDATE,
        fieldName: <keyof Task>value.databaseName,
        oldValue: event.databaseEntity[value.databaseName],
        newValue: newTask[value.databaseName],
        recordId: event.entity.id,
      });
    }
  }

  handleRemove(entity: Task) {
    this.historyService.create({
      actionType: HistoryActionType.DELETE,
      recordId: entity.id,
    });
  }
}
