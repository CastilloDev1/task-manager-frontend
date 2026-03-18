import type { TaskProps } from "../types/task";

export default function TaskItem({ task }: TaskProps) {
    return (
        <li>
            <span>{task.title}</span>
            <span>{task.completed ? "✅" : "❌"}</span>
        </li>
    )
}