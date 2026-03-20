import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import type { Task } from "../types/task";

const initialTasks: Task[] = [
    { id: 1, title: "Aprender React", completed: false },
    { id: 2, title: "Construir portafolio", completed: false },
    { id: 3, title: "Aplicar a trabajos", completed: false },
];

const TASKS_STORAGE_KEY = "tasks-manager:tasks:v1";

export default function TasksPage() {
    const [ tasks, setTasks ] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        if(!savedTasks) return initialTasks;
        
        try {
            return JSON.parse(savedTasks);
        } catch {
            return initialTasks;
        }
    });

    const [ newTaskTitle, setNewTaskTitle ] = useState("");

    useEffect(()=>{
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    function handleToggleCompleted( id: number): void {
        setTasks(
            tasks.map( task => (
                task.id === id 
                    ? { ...task, completed: !task.completed } 
                    : task
                )
            )
        )
    }

    function handleSubmitNewTask(event: React.SubmitEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!newTaskTitle.trim()) return;
        
        const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            completed: false,
        };
        
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle("");
    }

    function handleDeleteTask(id: number): void {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    return (
        <section>
            <h2>Mis tareas</h2>
            <form className="task-form" onSubmit={handleSubmitNewTask}>
                <input
                    className="task-input"
                    type="text"
                    placeholder="Escribe una nueva tarea"
                    value={newTaskTitle}
                    onChange={(event) => setNewTaskTitle(event.target.value)}
                />
                <button className="task-button" type="submit">Agregar</button>
            </form>
            <TaskList 
                tasks={tasks} 
                onToggleCompleted={handleToggleCompleted} 
                onDeleteTask={handleDeleteTask}
            />
        </section>
    )
}