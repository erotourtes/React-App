import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Task } from './tasks.entity';
import { ActionType } from 'src/history/history.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { HistoryService } from 'src/history/history.service';

/*
TODO: InjectConnection is deprecated https://github.com/nestjs/typeorm/pull/27#issuecomment-431296683
*/

@Injectable()
@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly historyService: HistoryService,
    @InjectConnection() connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  afterUpdate(event: UpdateEvent<Task>) {
    const updated = event.updatedColumns.entries();
    for (const [, value] of updated) {
      this.historyService.create(
        {
          actionType: ActionType.UPDATE,
          fieldName: <keyof Task>value.databaseName,
          oldValue: event.databaseEntity[value.databaseName],
          newValue: event.entity[value.databaseName],
        },
        event.entity.id,
      );
    }
  }

  afterInsert(event: InsertEvent<Task>) {
    this.historyService.create(
      { actionType: ActionType.CREATE },
      event.entity.id,
    );
  }

  afterRemove(event: RemoveEvent<Task>) {
    this.historyService.create(
      { actionType: ActionType.DELETE },
      event.entity.id,
    );
  }
}
