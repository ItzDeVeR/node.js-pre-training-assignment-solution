import { createTodo } from './todo-factory';
import { Todo, NewTodo } from './types';
import { InMemoryRepository } from './repository';

export class TodoNotFoundError extends Error {
  public name = 'TodoNotFoundError';
  public id: number;

  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.id = id;
  }
}

export class TodoApi {
  // Task 6 stores todos in a plain array; Task 7 replaces it with InMemoryRepository
  // private todos: Todo[] = [];
  constructor(private readonly repo = new InMemoryRepository<Todo>()) {}

  delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 333)
    });
  }

  async getAll(): Promise<Todo[]> {
    await this.delay();

    return [...this.repo.findAll()];
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await this.delay();

    const todo: Todo = createTodo(newTodo);

    this.repo.add(todo);

    return todo;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await this.delay();

    const candidateTodo: Todo | undefined = this.repo.findById(id);

    if (!candidateTodo) {
      throw new TodoNotFoundError(id);
    }

    const updatedTodo = this.repo.update(id, update);

    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    await this.delay();

    const candidateTodo: Todo | undefined = this.repo.findById(id);

    if (!candidateTodo) {
      throw new TodoNotFoundError(id);
    }

    this.repo.remove(id);
  }
}
