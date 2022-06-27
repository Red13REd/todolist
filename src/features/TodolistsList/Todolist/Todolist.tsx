import React, {useCallback, useEffect} from "react";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolist-api";
import {AddItemForm} from "../../../Components/AddItremForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {fetchTask, TaskStateDomainType} from "../tasks-reducer";
import {FilterValuesType, TodolistDomainType} from "../todolist-reducer";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useAppDispatch} from "../../../app/store";

type TodolistType = {
    tasks: TaskStateDomainType[]
    todo: TodolistDomainType
    changeTodoTitle: (todoId: string, title: string) => void
    removeTodo: (todoId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    changeTaskStatus: (todoId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    addTask: (todoId: string, title: string) => void
    removeTask: (todoId: string, taskId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistType) => {

    const {
        tasks,
        todo,
        changeTodoTitle,
        removeTodo,
        changeFilter,
        changeTaskStatus,
        changeTaskTitle,
        addTask,
        removeTask,
    } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTask(todo.id))
    }, [])


    const addTaskTodo = useCallback((title: string) => {
        addTask(todo.id, title)
    }, [addTask, todo.id])

    const removeTodolist = useCallback(() => {
        removeTodo(todo.id)
    }, [removeTodo, todo.id])

    const changeTodolistTitle = useCallback((title: string) => {
        changeTodoTitle(todo.id, title)
    }, [changeTodoTitle, todo.id])

    const onAllClickHandler = useCallback(() => {
        changeFilter(todo.id, "all")
    }, [changeFilter, todo.id])

    const onActiveClickHandler = useCallback(() => {
        changeFilter(todo.id, "active")
    }, [changeFilter, todo.id])

    const onCompletedClickHandler = useCallback(() => {
        changeFilter(todo.id, "completed")
    }, [changeFilter, todo.id])


    let tasksForTodolist = tasks

    if (todo.filter === "active") {
        tasksForTodolist = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (todo.filter === "completed") {
        tasksForTodolist = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan callBack={(title: string) => changeTodolistTitle(title)} title={todo.title}/>
                <IconButton onClick={removeTodolist}
                            disabled={todo.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
                <AddItemForm callBack={(title: string) => addTaskTodo(title)}
                             disabled={todo.entityStatus === "loading"}/>
            </h3>
            <div>
                {tasksForTodolist.map(m => {
                    return <Task
                        key={m.id}
                        task={m}
                        todoId={todo.id}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                    />
                })}
            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    color={"inherit"}
                    variant={todo.filter === 'all' ? "outlined" : "text"}
                >All</Button>
                <Button
                    onClick={onActiveClickHandler}
                    color={"primary"}
                    variant={todo.filter === 'active' ? "outlined" : "text"}
                >Active</Button>
                <Button
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                    variant={todo.filter === 'completed' ? "outlined" : "text"}
                >Completed</Button>
            </div>
        </div>
    );
})
