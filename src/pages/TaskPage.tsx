import TaskList from "../components/TaskList";
import type { Task } from "../types/task";

export default function TasksPage() {
    const tasks: Task[] = [
        { id: 1, title: "Aprender React", completed: false },
        { id: 2, title: "Construir portafolio", completed: false },
        { id: 3, title: "Aplicar a trabajos", completed: false },
    ];

    return (
        <section>
            <h2>Mis tareas</h2>
            <TaskList tasks={tasks} />
        </section>
    )
}