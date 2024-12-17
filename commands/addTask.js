import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/todoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function input() {
    return inquirer.prompt([
        {name: 'name', message: 'Enter name of the task', type: 'input'},
        {name: 'detail', message: 'Enter description of the task', type: 'input'}
    ]);
}

const askQuestions = async() => {
    const todoArray = [];
    let loop = false;

    do {
        const userRes = await input();
        todoArray.push(userRes);
        const confirmQuestion = await inquirer.prompt([{name: 'confirm', message: 'Do you want to add more tasks', type: 'confirm'}]);
        loop = confirmQuestion.confirm;
    }
    while(loop)
    return todoArray;
}

export default async function addTask() {
    try {
        const userResponse = await askQuestions();
        await connectDB(); // Invoke the function

        const spinner = ora('Creating the todos...').start();

        for(let todo of userResponse){
            await Todos.create(todo);
        }

        spinner.stop();
        console.log(chalk.greenBright('Created the todos!'));
        await disconnectDB();
    } catch(error) {
        console.error(chalk.redBright('Something went wrong!'), error);
        process.exit(1);
    }
}

// Optional: Module check
if (import.meta.url === `file://${process.argv[1]}`) {
    addTask().catch(console.error)
}