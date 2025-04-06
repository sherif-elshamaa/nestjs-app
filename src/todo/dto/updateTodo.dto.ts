/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ required: false })
  @IsString()
  task?: string;

  @ApiProperty({ required: false, enum: ['pending', 'in-progress', 'done'] })
  @IsIn(['pending', 'in-progress', 'done'])
  status?: string;
}
