import type { Task } from "../types/task"
import TaskItem from "./TaskItem"

type TaskListProps = {
    tasks: Task[];
    onToggleCompleted: (id: number) => void;
    onDeleteTask: (id: number) => void;
}

export default function TaskList( props: TaskListProps ) {
    return (
        <ul>
            {props.tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggleCompleted={props.onToggleCompleted}
                    onDeleteTask={props.onDeleteTask}
                />
            ))}
        </ul>
    )
}