#!/usr/bin/env node

import addTask from './commands/addTask.js';
import deleteTask from './commands/deleteTask.js';
import updateTask from './commands/updateTask.js';
import readTask from './commands/readTask.js';

import { Command } from 'commander';

const program = new Command();

program
    .name('todo')
    .description('your terminal task manager')
    .version('1.0.0')

program
    .command('add')
    .description('add a new task')
    .action(async () => {
        try {
            await addTask();
        } catch (error) {
            console.error('Add task failed:', error);
            process.exit(1);
        }
    });

program
    .command('read')
    .description('read all tasks')
    .action(async () => {
        try {
            await readTask();
        } catch (error) {
            console.error('Read tasks failed:', error);
            process.exit(1);
        }
    });

program
    .command('update')
    .description('update a task')
    .action(async () => {
        try {
            await updateTask();
        } catch (error) {
            console.error('Update task failed:', error);
            process.exit(1);
        }
    });

program
    .command('delete')
    .description('delete a task')
    .action(async () => {
        try {
            await deleteTask();
        } catch (error) {
            console.error('Delete task failed:', error);
            process.exit(1);
        }
    });

program.parse();