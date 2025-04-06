import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';

@ApiTags('todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new todo' })
  create(@Body() dto: CreateTodoDto, @CurrentUser() user: { userId: string }) {
    return this.todoService.create(dto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  findAll(@CurrentUser() user: { userId: string }) {
    return this.todoService.findAll(user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
    @CurrentUser() user: { userId: string },
  ) {
    return this.todoService.update(id, dto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.todoService.remove(id, user.userId);
  }
}
