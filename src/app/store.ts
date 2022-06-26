import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../features/TodolistsList/todolist-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    todo: todolistReducer,
    task: tasksReducer,
    app: appReducer,
    auth: authReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

/*export const store = configureStore({
    reducer: {
        todo: todolistReducer,
        task: tasksReducer,
        app: appReducer,
        auth: authReducer,
    },
    middleware: [thunkMiddleware],
});*/

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;