import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/tasks.module';
import { TaskListModule } from './task-lists/task-lists.module';
import { Task } from './tasks/tasks.entity';
import { TaskList } from './task-lists/task-lists.entity';
import { AppLoggerMiddleware } from './middlewares/AppLoggerMiddleware';
import { TaskHistory } from './tasks/history/history.entity';
import { TaskListHistory } from './task-lists/history/history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    TypeOrmModule.forRoot({
      ...databaseConfig(),
      entities: [Task, TaskList, TaskHistory, TaskListHistory],
      // subscribers: [TaskSubscriber], // Manually connecting in tasks.eventsubscriber.ts
    }),
    TaskModule,
    TaskListModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
