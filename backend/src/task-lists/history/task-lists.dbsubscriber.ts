import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TaskListHistoryService } from './history.service';
import { TaskList } from '../task-lists.entity';
import { ActionType } from './history.entity';

// TODO: Very similar to tasks.history.ts

@Injectable()
@EventSubscriber()
export class TaskListHistoryManager implements EntitySubscriberInterface {
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
    this.historyService.create(
      { actionType: ActionType.CREATE },
      event.entity.id,
    );
  }

  afterUpdate(event: UpdateEvent<TaskList>) {
    const newTask = event.entity as TaskList;
    if (newTask.isDeleted) return void this.handleRemove(newTask);

    const updated = event.updatedColumns.entries();
    for (const [, value] of updated) {
      this.historyService.create(
        {
          actionType: ActionType.UPDATE,
          fieldName: <keyof TaskList>value.databaseName,
          oldValue: event.databaseEntity[value.databaseName],
          newValue: newTask[value.databaseName],
        },
        event.entity.id,
      );
    }
  }

  handleRemove(entity: TaskList) {
    this.historyService.create({ actionType: ActionType.DELETE }, entity.id);
  }
}
