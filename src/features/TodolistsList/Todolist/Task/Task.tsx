import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses} from "../../../../api/todolist-api";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";
import {TaskStateDomainType} from "../../tasks-reducer";

type TaskPropsType = {
    task: TaskStateDomainType
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, status: TaskStatuses) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const {
        task,
        todoId,
        changeTaskStatus,
        removeTask,
        changeTaskTitle,
    } = props

    const onRemoveTaskHandler = useCallback(() => {
        removeTask(todoId, task.id)
    }, [removeTask, todoId, task.id])

    const onTitleChangeHandler = useCallback((title: string) => {
        changeTaskTitle(todoId, task.id, title)
    }, [changeTaskTitle, todoId, task.id])

    const onCheckedChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [changeTaskStatus, todoId, task.id])

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color='primary'
                onChange={onCheckedChangeHandler}
            />
            <EditableSpan callBack={onTitleChangeHandler} title={task.title}/>
            <IconButton onClick={onRemoveTaskHandler} disabled={task.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </div>
    );
})
