import inquirer from "inquirer";
import Todos from '../schema/todoSchema.js'
import {connectDB, disconnectDB} from '../db/connectDB.js'
import ora from "ora";
import chalk from "chalk";

export async function getTaskCode(){
    try {
        const answers = await inquirer.prompt({
            name: 'code',
            message: 'Enter the code of the task',
            type: 'input',
            validate: (input) => {
                if (!input.trim()) {
                    return 'Task code cannot be empty';
                }
                return true;
            }
        });
        return answers.code.trim();
    } catch(err) {
        console.error(chalk.redBright("Error getting task code:", err));
        throw err;
    }
}

export default async function deleteTask() {
    try {
        await connectDB();

        const userCode = await getTaskCode();

        const spinner = ora('Finding and deleting tasks...').start();
        const response = await Todos.deleteOne({code: userCode});
        spinner.stop();

        if (response.deletedCount === 0) {
            console.log(chalk.redBright("Could not find any task matching that code, deletion failed."));
        } else {
            console.log(chalk.greenBright('Task deleted successfully.'));
        }

        await disconnectDB();
    } catch(err) {
        console.error(chalk.redBright("Something went wrong:", err));
        process.exit(1);
    }
}

// Module check
if (import.meta.url === `file://${process.argv[1]}`) {
    deleteTask().catch(console.error);
}