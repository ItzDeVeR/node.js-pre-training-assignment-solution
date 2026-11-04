import { Todo } from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  const resultTodos: Todo[] = [...state, todo];

  return resultTodos;
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  const candidateTodo: Todo | undefined = state.find((item) => item.id === id);

  if (!candidateTodo) {
    throw new Error('Cannot find Todo with this id');
  }

  const newTodo: Todo = {...candidateTodo, ...update};

  return state.map((item) => {
    if (item.id === id) {
      return newTodo
    }
    else {
      return item;
    }
  })
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const candidateTodo: Todo | undefined = state.find((item) => item.id === id);

  if (!candidateTodo) {
    throw new Error('Cannot find Todo with this id');
  }

  return state.filter((item) => item.id !== candidateTodo.id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find((item) => item.id === id);
}
