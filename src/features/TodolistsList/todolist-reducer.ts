import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux"
import {ActionsAppType, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODO":
            return action.todo.map(m => ({...m, filter: "all", entityStatus: "idle"}))
        case "DELETE-TODO":
            return state?.filter(f => action.todoId !== f.id)
        case "CREATE-TODO":
            return [{...action.todo, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.todoId ? {...m, title: action.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.todoId ? {...m, filter: action.filter} : m)
        case "CHANGE-TODOLIST-STATUS":
            return state.map(m => m.id === action.todoId ? {...m, entityStatus: action.status} : m)
        default:
            return state
    }
};


export const SetTodo = (todo: TodolistType[]) => {
    return {
        type: "SET-TODO",
        todo,
    } as const
}
export const RemoveTodo = (todoId: string) => {
    return {
        type: "DELETE-TODO",
        todoId,
    } as const
}
export const CreateTodo = (todo: TodolistType) => {
    return {
        type: "CREATE-TODO",
        todo,
    } as const
}
export const UpdateTodoTitle = (todoId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoId,
        title,
    } as const
}
export const UpdateTodoFilter = (todoId: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoId,
        filter,
    } as const
}
export const UpdateTodoEntityStatusAC = (todoId: string, status: RequestStatusType) => {
    return {
        type: "CHANGE-TODOLIST-STATUS",
        todoId,
        status,
    } as const
}


//thunks
export const fetchTodo = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus("loading"))
    todolistApi.getTodo()
        .then(res => {
                dispatch(SetTodo(res.data))
                dispatch(setAppStatus("succeeded"))
            }
        )
}

export const removeTodoTC = (todoId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(UpdateTodoEntityStatusAC(todoId, "loading"))
    todolistApi.deleteTodo(todoId)
        .then(res => {
            dispatch(RemoveTodo(todoId))
            dispatch(setAppStatus("succeeded"))
        })
}

export const addTodoTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus("loading"))
    todolistApi.createTodo(title)
        .then(res => {
            dispatch(CreateTodo(res.data.data.item))
            dispatch(setAppStatus("succeeded"))
        })
}

export const changeTodoTitleTC = (todoId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus("loading"))
    todolistApi.updateTodo(todoId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(UpdateTodoTitle(todoId, title))
                dispatch(setAppStatus("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(rej => {
            handleServerNetworkError(rej, dispatch);
        })
}

//type
export type createTodoType = ReturnType<typeof CreateTodo>
export type RemoveTodoType = ReturnType<typeof RemoveTodo>
export type SetTodoType = ReturnType<typeof SetTodo>

type ActionsType =
    | SetTodoType
    | RemoveTodoType
    | createTodoType
    | ReturnType<typeof UpdateTodoTitle>
    | ReturnType<typeof UpdateTodoFilter>
    | ReturnType<typeof UpdateTodoEntityStatusAC>
    |ActionsAppType


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = "all" | "active" | "completed";
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ThunkDispatch = Dispatch<ActionsType>