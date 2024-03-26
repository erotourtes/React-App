import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { TaskListHistoryService } from './task-list.service';
import { ActionType } from '../history.entity';

@Injectable()
@EventSubscriber()
export class TaskListHistoryDbSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly historyService: TaskListHistoryService,
    @InjectDataSource() readonly dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return TaskList;
  }

  afterInsert(event: InsertEvent<TaskList>) {
    this.historyService.create({
      actionType: ActionType.CREATE,
      recordId: event.entity.id,
    });
  }

  afterUpdate(event: UpdateEvent<TaskList>) {
    const newTask = event.entity as TaskList;
    if (newTask.isDeleted) return void this.handleRemove(newTask);

    const updated = event.updatedColumns.entries();
    for (const [, value] of updated) {
      this.historyService.create({
        actionType: ActionType.UPDATE,
        fieldName: <keyof TaskList>value.databaseName,
        oldValue: event.databaseEntity[value.databaseName],
        newValue: newTask[value.databaseName],
        recordId: event.entity.id,
      });
    }
  }

  handleRemove(entity: TaskList) {
    this.historyService.create({
      actionType: ActionType.DELETE,
      recordId: entity.id,
    });
  }
}
