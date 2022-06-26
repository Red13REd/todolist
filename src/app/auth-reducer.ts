import {authApi, LoginParamsType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {ActionsAppType, setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

export type initialStateType = typeof initialState

export const authReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
};

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {
        type: "login/SET-IS-LOGGED-IN",
        isLoggedIn,
    } as const
}


export const loginTc = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    authApi.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    }).catch(rej => {
        handleServerNetworkError(rej, dispatch)
    })
}

export const logoutTc = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus("loading"))
    authApi.logout().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    }).catch(rej => {
        handleServerNetworkError(rej, dispatch)
    })
}


type ActionsType = ReturnType<typeof setIsLoggedIn> | ActionsAppType