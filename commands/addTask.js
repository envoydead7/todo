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
        if (confirmQuestion.confirm) {
            loop = true;
        } else {
            loop = false;
        }
    }
    while(loop)
    return todoArray;
}

export default async function addTask() {
    try{
        const userResponse = await askQuestions();
        await connectDB;

        let spinner = ora('Creating the todos...').start();

        for(let i = 0;i<userResponse.length; i++){
            const response = userResponse[i];
            await Todos.create(response);
        }
        
        spinner.stop();
        console.log(chalk.greenBright('created the todos!'));
        await disconnectDB();
    }catch(error){
        console.log('Something went wrong!, Error.', error);
        process.exit(1);
    }
}