import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";

type TaskPropsType = {
    task: TaskType
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, status: TaskStatuses) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {

    const {
        task,
        todoId,
        changeTaskStatus,
        removeTask,
        changeTaskTitle,
    } = props

    const onRemoveTaskHandler = () => {
        removeTask(todoId, task.id)
    }

    const onTitleChangeHandler = (title: string) => {
        changeTaskTitle(todoId, task.id, title)
    }

    const onCheckedChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color='primary'
                onChange={onCheckedChangeHandler}
            />
            <EditableSpan callBack={onTitleChangeHandler} title={task.title}/>
            <IconButton onClick={onRemoveTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};
