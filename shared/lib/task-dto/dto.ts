import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  MaxLength,
} from "class-validator";
import { Priority } from "./priority";
import { PartialType } from "@nestjs/mapped-types";

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
  listId: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class Task {
  id: number;
  name: string;
  description: string;
  dueDate?: string;
  priority: Priority;
  order: number;
}
