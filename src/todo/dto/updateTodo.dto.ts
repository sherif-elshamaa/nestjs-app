/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  task?: string;

  @ApiProperty({ required: true, enum: ['pending', 'in-progress', 'done'] })
  @IsNotEmpty()
  @IsIn(['pending', 'in-progress', 'done'])
  status?: string;
}
