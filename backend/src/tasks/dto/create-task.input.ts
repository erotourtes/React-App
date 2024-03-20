import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Priority } from '../tasks.entity';

export class CreateTaskDto {
  @MaxLength(128)
  name: string;

  @MaxLength(65_535)
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsEnum(Priority)
  priority: Priority;

  @IsNumber()
  order: number;

  @IsInt()
  taskListId: number;
}
