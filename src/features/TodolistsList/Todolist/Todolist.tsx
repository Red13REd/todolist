import React, {useEffect} from "react";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {AddItemForm} from "../../../Components/AddItremForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {fetchTask} from "../task-reducer";
import {FilterValuesType, TodolistDomainType} from "../todolist-reducer";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistType = {
    tasks: TaskType[]
    todo: TodolistDomainType
    changeTodoTitle: (todoId: string, title: string) => void
    removeTodo: (todoId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    changeTaskStatus: (todoId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
    addTask: (todoId: string, title: string) => void
    removeTask: (todoId: string, taskId: string) => void
}

export const Todolist: React.FC<TodolistType> = (props) => {

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

    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTask(todo.id))
    }, [])


    const addTaskTodo = (title: string) => {
        addTask(todo.id, title)
    }

    const removeTodolist = () => {
        removeTodo(todo.id)
    }

    const changeTodolistTitle = (title: string) => {
        changeTodoTitle(todo.id, title)
    }

    const onAllClickHandler = () => {
        changeFilter(todo.id, "all")
    }
    const onActiveClickHandler = () => {
        changeFilter(todo.id, "active")
    }
    const onCompletedClickHandler = () => {
        changeFilter(todo.id, "completed")
    }


    let tasksForTodolist = tasks

    if (todo.filter === "active") {
        debugger
        tasksForTodolist = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (todo.filter === "completed") {
        debugger
        tasksForTodolist = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan callBack={(title: string) => changeTodolistTitle(title)} title={todo.title}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
                <AddItemForm callBack={(title: string) => addTaskTodo(title)}/>
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
};
