import type { Task } from "../types/task"
import TaskItem from "./TaskItem"

type TaskListProps = {
    tasks: Task[];
}

export default function TaskList( props: TaskListProps ) {
    return (
        <ul>
            {props.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    )
}