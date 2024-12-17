import inquirer from 'inquirer'
import {connectDB, disconnectDB} from "../db/connectDB.js";
import {getTaskCode} from "./deleteTask.js";
import Todos from '../schema/todoSchema.js';
import ora from 'ora';
import chalk from 'chalk';

async function askUpdateQ(todo){
    try {
        return await inquirer.prompt([
            {
                name: 'name',
                message: 'Update the name?',
                type: 'input',
                default: todo.name
            },
            {
                name: 'detail',
                message: 'Update the Description?',
                type: 'input',
                default: todo.detail
            },
            {
                name: 'status',
                message: 'Update the status',
                type: 'list',
                choices: ['pending', 'completed'],
                default: todo.status
            }
        ]);
    } catch (error) {
        console.error(chalk.redBright('Error in update questions:', error));
        throw error;
    }
}

export default async function updateTask(){
    try {
        const userCode = await getTaskCode();
        await connectDB();

        const spinner = ora('Finding the task...').start();
        const todo = await Todos.findOne({code: userCode})

        spinner.stop();
        if(!todo){
            console.log(chalk.redBright('No task found.'));
            return;
        }

        console.log(chalk.blueBright('Type the updated properties, press Enter if you don\'t want to update the data'));

        const update = await askUpdateQ(todo);

        const spinner2 = ora();
        if(update.status === 'completed') {
            spinner2.text = 'Deleting the task...';
            spinner2.start();

            await Todos.deleteOne({_id: todo._id})

            spinner2.stop();
            console.log(chalk.greenBright('Deleted the task...!'));
        } else {
            spinner2.text = 'Updating the task...';
            spinner2.start();
            await Todos.updateOne({_id: todo._id}, update, {runValidators: true});
            spinner2.stop();
            console.log(chalk.greenBright('Updated the task...!'));
        }

        await disconnectDB();
    } catch(error) {
        console.error(chalk.redBright("Something went wrong:", error));
        process.exit(1);
    }
}

// Module check
if (import.meta.url === `file://${process.argv[1]}`) {
    updateTask().catch(console.error);
}