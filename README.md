# Todo CLI Application
Solution for the https://roadmap.sh/projects/task-tracker challenge from roadmap.sh

A simple command-line interface (CLI) application for managing your to-do tasks. This application allows you to add, view, update, and delete tasks directly from your terminal. Built with Node.js, Inquirer.js, and MongoDB.

## Features

*   **Add Tasks:** Easily add new tasks with a name and detailed description.
*   **View Tasks:** List all your current tasks in a clear and concise format.
*   **Update Tasks:** Modify existing tasks to reflect changes or mark them as complete.
*   **Delete Tasks:** Remove tasks that are no longer needed.
*   **Interactive Prompts:** User-friendly command-line prompts for easy interaction.
*   **Data Persistence:** Tasks are stored in a MongoDB database, ensuring your data is saved between sessions.
*   **Graceful Exit:** Handles interruptions (Ctrl+C) gracefully, preventing errors.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Inquirer.js:** For creating interactive command-line prompts.
*   **MongoDB:** NoSQL database for data storage.
*   **Mongoose:** MongoDB object modeling tool.
*   **Ora:** Elegant terminal spinner for providing feedback during operations.
*   **Chalk:** Terminal string styling for enhanced readability.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/envoydead7/todo.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd YOUR_REPOSITORY
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Set up MongoDB:**
    *   Ensure you have MongoDB installed and running. You can download it from the official MongoDB website: [https://www.mongodb.com/](https://www.mongodb.com/)
    *   Create a `.env` file in the project root and add your MongoDB connection string:

    ```.env
    MONGODB_URI=mongodb://YOUR_MONGODB_CONNECTION_STRING
    ```

    Replace `YOUR_MONGODB_CONNECTION_STRING` with your actual connection string. For example: `mongodb://localhost:27017/todoapp`

## Usage

To run the application, use the following command:

```bash
todo add, read, update, delete
