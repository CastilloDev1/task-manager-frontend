import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import type { Task } from "../types/task";
import { getTasks, createTask, toggleTaskById, deleteTaskById } from "../services/taskService";

export default function TasksPage() {
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [ newTaskTitle, setNewTaskTitle ] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        async function loadTasks() {
            try {

                setIsLoading(true);
                setErrorMessage("");

                const data = await getTasks();
                setTasks(data);

            } catch (error) {
                setErrorMessage("Error al cargar las tareas");
            } finally {
                setIsLoading(false);
            }
        }

        void loadTasks();
    }, []);

    async function handleToggleCompleted( id: number): Promise<void> {
        try {
            setErrorMessage("");
            const updatedTask = await toggleTaskById(id);
            setTasks( prevTasks =>
                prevTasks.map( task => 
                    task.id === id ? updatedTask : task
                )
            );
        } catch (error) {
            setErrorMessage("Error al actualizar la tarea");
        }
    }

    async function handleSubmitNewTask(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            setErrorMessage("");
            const createdTask = await createTask(newTaskTitle);
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setNewTaskTitle("");
        } catch (error) {
            setErrorMessage("Error al crear la tarea");
        }
    }

    async function handleDeleteTask(id: number): Promise<void> {
        try {
            setErrorMessage("");
            await deleteTaskById(id);
            setTasks( prevTasks => prevTasks.filter( task => task.id !== id ) );
        } catch (error) {
            setErrorMessage("Error al eliminar la tarea");
        }
    }

    const filteredTasks = tasks.filter( (task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    const completedTasks = tasks.filter( (task) => task.completed).length;
    const totalTasks = tasks.length;

    return (
        <section>

            <h2>Mis tareas</h2>

            <p className="tasks-summary">
                Total tareas: <strong>{totalTasks}</strong> | 
                Completadas: {" "} <strong>{completedTasks}</strong>
            </p>
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

            <div className="filters">
                <button type="button" onClick={() => setFilter("all")}>Todas</button>
                <button type="button" onClick={()=> setFilter("completed")}>Completadas</button>
                <button type="button" onClick={()=> setFilter("incomplete")}>Incompletas</button>
            </div>

            { isLoading ? (
                <p className="empty-state">Cargando tareas...</p>
            ) : errorMessage ? (
                <p className="empty-state">{errorMessage}</p>
            ): filteredTasks.length === 0 ? (
                <p className="empty-state">No hay tareas para este filtro</p>
            ) : (
                <TaskList 
                    tasks={filteredTasks} 
                    onToggleCompleted={handleToggleCompleted} 
                    onDeleteTask={handleDeleteTask}
                />
            )}
        </section>
    )
}