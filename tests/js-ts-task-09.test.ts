import { InMemoryRepository } from "../JS-TS/solutions/repository";
import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoService } from "../JS-TS/solutions/todo-service";
import { Todo, TodoStatus } from "../JS-TS/solutions/types";

describe('Task 09: TodoTest', () => {
    let service: TodoService;
    let repo: InMemoryRepository<Todo>;

    beforeEach(() => {
        service = new TodoService(new TodoApi());
        repo = new InMemoryRepository<Todo>();
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

    it('Create not empty title', async () => {
        const promise = service.create('Test Title');
        await jest.runAllTimersAsync();
        const created = await promise;
        expect(created.title).toBe('Test Title');
    })

    it('Create empty todo title', async () => {
        await expect(service.create('')).rejects.toThrow()
    })

    it('Create todo title with only space', async () => {
        await expect(service.create(' ')).rejects.toThrow()
    })

    it('Toggle status with wrong id', async () => {
        const assertion = expect(service.toggleStatus(999)).rejects.toThrow();
        await jest.runAllTimersAsync();
        await assertion;
    })

    it('True changing status', async () => {
        const testTodoPromise = service.create('Test Title');
        await jest.runAllTimersAsync();
        const testTodo = await testTodoPromise;

        const promise = service.setStatus(testTodo.id, TodoStatus.COMPLETED);
        await jest.runAllTimersAsync();
        const updated = await promise
        expect(updated.status).toBe(TodoStatus.COMPLETED);
    })

    it('False changing status', async () => {
        const assertion = expect(service.setStatus(999, TodoStatus.COMPLETED)).rejects.toThrow();
        await jest.runAllTimersAsync();
        await assertion;
    })

    it('Search true title', async () => {
        const testTodoPromise = service.create('test');
        await jest.runAllTimersAsync();
        const testTodo = await testTodoPromise;

        const promise = service.search('test');
        await jest.runAllTimersAsync();
        const findedTodo = await promise;
        expect([testTodo]).toEqual(findedTodo);
    })

    it('Empty search', async () => {
        const promise = service.search('test');
        await jest.runAllTimersAsync();
        const findedTodo = await promise;
        expect(findedTodo).toEqual([]);
    })

    it('Toggle status full cycle', async () => {
        const testTodoPromise = service.create('test');
        await jest.runAllTimersAsync();
        const testTodo = await testTodoPromise;

        const searchPromise = service.search('test');
        await jest.runAllTimersAsync();
        const findedTodo = await searchPromise;

        let toggledTodo;
        let promise = service.toggleStatus(findedTodo[0].id);
        await jest.runAllTimersAsync();
        toggledTodo = (await promise).status;

        promise = service.toggleStatus(findedTodo[0].id);
        await jest.runAllTimersAsync();
        toggledTodo = (await promise).status;

        promise = service.toggleStatus(findedTodo[0].id);
        await jest.runAllTimersAsync();
        toggledTodo = (await promise).status;

        expect(toggledTodo).toBe(TodoStatus.PENDING);
    })

    it('Remove fake id', () => {
        expect(() => repo.remove(999)).toThrow();
    })

    it('Update fake id', () => {
        expect(() => repo.update(999, { title: 'test' })).toThrow();
    })

    it('Update real ToDo', () => {
        const tempTodo: Todo = repo.add({
            title: 'test', status: TodoStatus.COMPLETED,
            id: 0,
            createdAt: new Date()
        })

        const updatedTodo: Todo = repo.update(tempTodo.id, { title: 'test1' })

        expect(updatedTodo).toEqual({ ...tempTodo, title: 'test1' })
    })
})