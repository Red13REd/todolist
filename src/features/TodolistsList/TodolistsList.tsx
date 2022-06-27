import React, {useCallback, useEffect} from "react";
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
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../Components/AddItremForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useCustomSelector} from "../../app/store";


type  PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todo = useCustomSelector< Array<TodolistDomainType>>(state => state.todo)
    const tasks = useCustomSelector< TaskStateType>(state => state.task)
    const isLoggedIn = useCustomSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodo())
    }, [])

    const removeTask = useCallback((todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }, [])

    const addTask = useCallback((todoId: string, title: string) => {
        dispatch(addTaskTC(todoId, title))
    }, [])

    const changeTaskTitle = useCallback((todoId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todoId, taskId, {title: newTitle}))
    }, [])

    const changeTaskStatus = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoId, taskId, {status}))
    }, [])

    const changeFilter = useCallback((todoId: string, value: FilterValuesType) => {
        dispatch(UpdateTodoFilter(todoId, value))
    }, [])

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoTC(title))
    }, [])

    const removeTodo = useCallback((todoId: string) => {
        dispatch(removeTodoTC(todoId))
    }, [])

    const changeTodoTitle = useCallback((todoId: string, title: string) => {
        dispatch(changeTodoTitleTC(todoId, title))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="login"/>
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
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
};
