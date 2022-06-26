import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoActionsType, todolistReducer} from "../features/TodolistsList/todolist-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {ActionsAppType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todo: todolistReducer,
    task: tasksReducer,
    app: appReducer,
    auth: authReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useCustomSelector: TypedUseSelectorHook<AppStateRootType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateRootType, unknown, RootActionTypes>>()

export type RootActionTypes =
    | TodoActionsType
    | ActionsAppType
    | AuthActionsType
    | TasksActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateRootType, unknown, RootActionTypes>


export type AppStateRootType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;