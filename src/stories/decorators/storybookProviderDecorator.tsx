import {appReducer} from "../../app/app-reducer";
import {combineReducers} from "redux";
import {AppStateRootType} from "../../app/store";
import {todolistReducer} from "../../features/TodolistsList/todolist-reducer";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {authReducer} from "../../app/auth-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {Provider} from "react-redux";
import React from "react";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import {HashRouter} from "react-router-dom";

const rootReducer = combineReducers({
    todo: todolistReducer,
    task: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState = {
    app: {
        status: "idle",
        error: "Some error",
        inInitialized: false,
    },
    todo: [
        {
            id: "TODO1",
            addedDate: "5.12.22",
            order: 1,
            title: "First todo",
            filter: "all",
            entityStatus: "idle",
        },
        {
            id: "TODO2",
            addedDate: "6.12.22",
            order: 2,
            title: "Second todo",
            filter: "active",
            entityStatus: "loading",
        }
    ],
    task: {
        "TODO1": [{
            description: "some description",
            title: "Task 1",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "2.21.23",
            deadline: "string",
            id: "TASK1",
            todoListId: "TODO1",
            order: 1,
            addedDate: "2.11.23",
            entityStatus: "idle"
        }, {
            description: "some description",
            title: "Task 2",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: "2.22.23",
            deadline: "string",
            id: "TASK2",
            todoListId: "TODO1",
            order: 2,
            addedDate: "2.12.23",
            entityStatus: "idle"
        }],
        "TODO2": [{
            description: "some description",
            title: "Task 1/2",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "2.4.23",
            deadline: "string",
            id: "TASK1/2",
            todoListId: "TODO2",
            order: 1,
            addedDate: "3.15.23",
            entityStatus: "idle"
        }, {
            description: "some description",
            title: "Task 2/2",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "2.5.23",
            deadline: "string",
            id: "TASK2/2",
            todoListId: "TODO2",
            order: 2,
            addedDate: "3.14.23",
            entityStatus: "idle"
        }]
    },
    auth: {
        isLoggedIn: false
    },
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState as AppStateRootType,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger)
});
export const storybookProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (<>
        <Provider store={storyBookStore}>{storyFn()}</Provider>
    </>)
};

export const BrowserRouterDecorator = (storyFn:  () => React.ReactNode) => {
    return <HashRouter>{storyFn()}</HashRouter>
}