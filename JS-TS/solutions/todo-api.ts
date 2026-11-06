import { createTodo } from './todo-factory';
import { Todo, NewTodo } from './types';

export class TodoNotFoundError extends Error {
  public name = 'TodoNotFoundError';
  public id;

  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = this.name;
    this.id = id;
  }
}

export class TodoApi {
  // Task 6 stores todos in a plain array; Task 7 replaces it with InMemoryRepository
  private todos: Todo[] = [];

  delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 555)
    });
  }

  async getAll(): Promise<Todo[]> {
    await this.delay();

    return [...this.todos];
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await this.delay();

    const todo: Todo = createTodo(newTodo);

    this.todos.push(todo);

    return todo;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await this.delay();

    const candidateTodo: Todo | undefined = this.todos.find((item) => item.id === id);

    if (!candidateTodo) {
      throw new TodoNotFoundError(id);
    }

    const updatedTodo: Todo = { ...candidateTodo, ...update };

    this.todos = this.todos.map((item) => {
      if (item.id === id) {
        return updatedTodo;
      }
      else {
        return item;
      }
    })

    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    await this.delay();

    const candidateTodo: Todo | undefined = this.todos.find((item) => item.id === id);

    if (!candidateTodo) {
      throw new TodoNotFoundError(id);
    }

    this.todos = this.todos.filter((item) => item.id !== id);

    return;
  }
}
