#!/usr/bin/env ts-node
import { ToDoManager } from "./todo-manager";

// CLI entry for Task 10 – placeholder only
const todoManager = new ToDoManager();
const args: string[] = process.argv;

const result = (async () => {
    switch (args[2]) {
        case 'add':
            return await todoManager.add(args[3], args[4]);
        case 'complete':
            return await todoManager.complete(Number(args[3]));
        case 'list':
            return JSON.stringify(await todoManager.list());
        case 'init':
            return await todoManager.init();
        default:
            return 'usage: add <title> [description], complete <id>, list, init';
    }
})();

result.then((value) => {
  console.log(`Result is ${value}`);
});