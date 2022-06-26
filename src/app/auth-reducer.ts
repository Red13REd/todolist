import {authApi, LoginParamsType} from "../api/todolist-api";
import {ActionsAppType, setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AppThunk} from "./store";

const initialState = {
    isLoggedIn: false
}

export type initialStateType = typeof initialState

export const authReducer = (state: initialStateType = initialState, action: AuthActionsType) => {
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


export const loginTc = (data: LoginParamsType):AppThunk => (dispatch) => {
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

export const logoutTc = ():AppThunk => (dispatch) => {
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


export type AuthActionsType = ReturnType<typeof setIsLoggedIn> | ActionsAppType