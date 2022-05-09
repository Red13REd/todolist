import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoTC,
    fetchTodo,
    FilterValuesType,
    TodolistDomainType,
    UpdateTodoFilter,
    removeTodoTC,
    changeTodoTitleTC,
} from "./todolist-reducer";
import {Todolist} from "./Todolist/Todolist";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./task-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../Components/AddItremForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";

export const TodolistsList = () => {
    const todo = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todo)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.task)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodo())
    }, [])

    const removeTask = (todoId: string, taskId: string) => {
        // @ts-ignore
        dispatch(removeTaskTC(todoId, taskId))
    }

    const addTask = (todoId: string, title: string) => {
        // @ts-ignore
        dispatch(addTaskTC(todoId, title))
    }

    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        // @ts-ignore
        dispatch(updateTaskTC(todoId, taskId, {title}))
    }

    const changeTaskStatus = (todoId: string, taskId: string, status: TaskStatuses) => {
        // @ts-ignore
        dispatch(updateTaskTC(todoId, taskId, {status}))
    }

    const changeFilter = (todoId: string, value: FilterValuesType) => {
        dispatch(UpdateTodoFilter(todoId, value))
    }

    const addTodo = (title: string) => {
        // @ts-ignore
        dispatch(addTodoTC(title))
    }
    const removeTodo = (todoId: string) => {
        // @ts-ignore
        dispatch(removeTodoTC(todoId))
    }

    const changeTodoTitle = (todoId: string, title: string) => {
        // @ts-ignore
        dispatch(changeTodoTitleTC(todoId, title))
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callBack={(title: string) => addTodo(title)}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todo.map(m => {
                        let tasksForTodo = tasks[m.id]
                        return <Grid item key={m.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todo={m}
                                    tasks={tasksForTodo}
                                    changeTodoTitle={changeTodoTitle}
                                    removeTodo={removeTodo}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
};
