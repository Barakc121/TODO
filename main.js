
import { nanoid } from 'nanoid'
import input from 'analiza-sync';

let tasks = [];

function addTask() {
    const name = input("Task name: ");
    const description = input("Task description: ");
    const status = input("Status (new/active/done): ");

    const task = {
        id: nanoid(),
        name,
        description,
        status,
        createdAt: new Date().toLocaleString() 
    };

    tasks.push(task);
    console.log("Task added!");
}

function showTasks() {
    if (tasks.length === 0) {
        console.log("No tasks yet.");
        return;
    }

    console.log("\n==== All tasks ====");
    tasks.forEach(t => {
        console.log(`ID: ${t.id}  Name: ${t.name}  Status: ${t.status}  Created: ${t.createdAt}`);
    });
    console.log("==================\n");
}

function filterByStatus() {
    const status = input("Enter status to search (new/active/done): ");
    const filtered = tasks.filter(t => t.status === status);

    if (filtered.length === 0) console.log("No tasks with this status.");
    else {
        console.log("\n==== filter tasks ====");
        filtered.forEach(t => {
            console.log(`ID: ${t.id}  Name: ${t.name}  Status: ${t.status}  Created: ${t.createdAt}`);
        });
        console.log("======================\n");
    }
}

function updateTask() {
    const id = input("Enter task ID to update: ");
    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log("Task not found.");
        return;
    }

    const newName = input(`New name (leave empty to keep "${task.name}"): `);
    const newDesc = input(`New description (leave empty to keep): `);
    const newStatus = input(`New status (new/active/done, leave empty to keep "${task.status}"): `);

    if (newName) task.name = newName;
    if (newDesc) task.description = newDesc;
    if (newStatus) task.status = newStatus;

    console.log("Task updated!");
}

function deleteTask() {
    const id = input("Enter task ID to delete: ");
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        console.log("Task not found.");
        return;
    }

    tasks.splice(index, 1);
    console.log("Task deleted!");
}

function menu() {
    while (true) {
        console.log(`
What do you want to do?
1. Add task
2. Show all tasks
3. Show tasks by status
4. Update task
5. Delete task
6. Exit
`);
        const choice = input("Choose: ");

        if (choice === "1") addTask();
        else if (choice === "2") showTasks();
        else if (choice === "3") filterByStatus();
        else if (choice === "4") updateTask();
        else if (choice === "5") deleteTask();
        else if (choice === "6") break;
        else console.log("Invalid choice, try again.");
    }
}

menu()