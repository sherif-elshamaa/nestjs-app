import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Types } from 'mongoose';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    this.logger.log(`Creating todo for user: ${userId}`);
    const created = await this.todoModel.create({ ...createTodoDto, userId });
    this.logger.log(
      `Todo created with id: ${(created._id as Types.ObjectId).toHexString()}`,
    );
    return created;
  }

  async findAll(userId: string): Promise<Todo[]> {
    this.logger.log(`Fetching todos for user: ${userId}`);
    const todos = await this.todoModel.find({ userId });
    this.logger.log(`Found ${todos.length} todos for user: ${userId}`);
    return todos;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    userId: string,
  ): Promise<Todo> {
    this.logger.log(`Updating todo: ${id} for user: ${userId}`);
    const todo = await this.todoModel.findById(id);
    if (!todo || todo.userId !== userId) {
      this.logger.warn(`Unauthorized update attempt for todo: ${id}`);
      throw new UnauthorizedException();
    }
    Object.assign(todo, updateTodoDto);
    const updated = await todo.save();
    this.logger.log(`Todo updated: ${id}`);
    return updated;
  }

  async remove(id: string, userId: string): Promise<Todo | null> {
    this.logger.log(`Removing todo: ${id} for user: ${userId}`);
    const todo = await this.todoModel.findById(id);
    if (!todo || todo.userId !== userId) {
      this.logger.warn(`Unauthorized remove attempt for todo: ${id}`);
      throw new UnauthorizedException();
    }
    const deleted = await this.todoModel.findByIdAndDelete(id);
    this.logger.log(`Todo deleted: ${id}`);
    return deleted;
  }
}
