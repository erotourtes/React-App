import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  MaxLength,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export class CreateTaskDto {
  @MaxLength(128)
  name: string;

  @MaxLength(65_535)
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsInt()
  listId: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsInt()
  id: number;
}

export type Task = {
  id: number;
  name: string;
  description: string;
  dueDate?: string;
  priority: Priority;
  list: { id: number };
};
