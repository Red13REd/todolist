import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../features/TodolistsList/todolist-reducer";
import thunkMiddleware from "redux-thunk"
import {TaskReducer} from "../features/TodolistsList/task-reducer";

const rootReducer = combineReducers({
    todo: todolistReducer,
    task: TaskReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;