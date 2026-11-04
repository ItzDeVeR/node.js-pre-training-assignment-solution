import { Todo, TodoStatus } from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  return state.map((item) => {
    return { ...item, status: completed ? TodoStatus.COMPLETED : TodoStatus.PENDING }
  });
}

export function clearCompleted(state: Todo[]): Todo[] {
  return state.filter((item) => item.status !== TodoStatus.COMPLETED)
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  return state.reduce((counter, item) => { 
    if (item.status === status) {
      counter++;
    }
    return counter;
  }, 0)
}
