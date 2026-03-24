import type { Task } from "../types/task";

const TASKS_API = "http://localhost:3000";

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(`${TASKS_API}/tasks`);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    const data: Task[] = await response.json();
    return data;
}

export async function createTask(title: string): Promise<Task> {
    const response = await fetch(`${TASKS_API}/tasks`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if(!response.ok) {
        throw new Error("Failed to create task");
    }

    const data: Task = await response.json();
    return data;
}