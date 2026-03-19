import type { Task } from "../types/task";

type TaskIdHandler = (id: number) => void;

type TaskItemProps = {
    task: Task;
    onToggleCompleted: TaskIdHandler;
    onDeleteTask: TaskIdHandler;
}

export default function TaskItem({ task, onToggleCompleted, onDeleteTask }: TaskItemProps) {
    return (
        <li>
            <span onClick={() => onToggleCompleted(task.id)}>{task.title} {task.completed ? "✅" : "❌"}</span>
            <button onClick={() => onDeleteTask(task.id) } type="button">Eliminar</button>
        </li>
    )
}