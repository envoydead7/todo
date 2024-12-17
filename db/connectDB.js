import mongoose from 'mongoose';
import ora from 'ora';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
    try{
        const spinner = ora('Connecting to the database...').start()
        await mongoose.connect(process.env.MONGO_URI)
        spinner.stop();
        console.log(chalk.greenBright('Successfully Connected to the database...'));
    }   catch(err){
        console.log(chalk.redBright(err.message));
        process.exit(1);
    }
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log(chalk.greenBright('Successfully disConnected to the database...'));
    }
    catch(err){
        console.log(chalk.redBright(err.message));
        process.exit(1);
    }
}
