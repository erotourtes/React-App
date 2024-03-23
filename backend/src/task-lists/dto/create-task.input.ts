import { IsArray, IsInt, MaxLength } from 'class-validator';

export class CreateTaskListDto {
  @MaxLength(128)
  name: string;

  @IsArray()
  @IsInt({ each: true })
  tasksIds: number[];
}
