import { TodoApi, TodoNotFoundError } from './todo-api';
import { Todo, TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description?: string): Promise<Todo> {
    if (!title?.trim()) {
      throw new Error('Title is incorrect')
    }

    const todo: Todo = await this.api.add({ title, description });

    return todo;
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todos: Todo[] = await this.api.getAll();

    const getCurrentTodo: Todo | undefined = todos.find((item) => item.id === id);

    if (!getCurrentTodo) {
      throw new TodoNotFoundError(id);
    }

    const calcStatus: number = (getCurrentTodo.status + 1) % 3;
    const updatedStatus: TodoStatus = (() => {
      switch (calcStatus) {
        case 0:
          return TodoStatus.PENDING
        case 1:
          return TodoStatus.IN_PROGRESS
        case 2:
          return TodoStatus.COMPLETED
        default:
          return TodoStatus.PENDING;
      }
    })();

    const updatedTodo: Todo = await this.api.update(id, { status: updatedStatus });

    return updatedTodo;
  }

  async setStatus(id: number, status: TodoStatus): Promise<Todo> {
    const todos: Todo[] = await this.api.getAll();

    const getCurrentTodo: Todo | undefined = todos.find((item) => item.id === id);
    if (!getCurrentTodo) {
      throw new TodoNotFoundError(id);
    }

    const updatedTodo: Todo = await this.api.update(id, { status });

    return updatedTodo;
  }

  async search(keyword: string): Promise<Todo[]> {
    const todos: Todo[] = await this.api.getAll();

    const findedTodos: Todo[] = todos.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()) || item.description?.toLowerCase().includes(keyword.toLowerCase()));

    return findedTodos;
  }
}
