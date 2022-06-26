import {authApi} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedIn} from "./auth-reducer";
import {AppThunk} from "./store";

const initialState: initialStateType = {
    status: "idle",
    error: null,
    inInitialized: false,
}

export const appReducer = (state: initialStateType = initialState, action: ActionsAppType) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-inInitialized":
            return {...state, inInitialized: action.inInitialized}
        default:
            return state
    }
}


export const setAppError = (error: string | null) => {
    return {
        type: "APP/SET-ERROR",
        error,
    } as const
}

export const setAppStatus = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status,
    } as const
}

export const setAppInInitialized = (inInitialized: boolean) => {
    return {
        type: "APP/SET-inInitialized",
        inInitialized,
    } as const
}


export const inInitializedApp = ():AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    authApi.me().then(res => {
        dispatch(setAppInInitialized(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    }).catch(rej => {
        handleServerNetworkError(rej, dispatch)
        dispatch(setAppStatus("failed"))
    })
}


export type setAppErrorType = ReturnType<typeof setAppError>
export type setAppStatusType = ReturnType<typeof setAppStatus>
export type setAppInInitializedType = ReturnType<typeof setAppInInitialized>

export type ActionsAppType = setAppErrorType | setAppStatusType | setAppInInitializedType


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type initialStateType = {
    status: RequestStatusType
    error: string | null
    inInitialized: boolean
}

