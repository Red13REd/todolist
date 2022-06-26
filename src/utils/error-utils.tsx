import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setAppError, setAppErrorType, setAppStatus, setAppStatusType} from "../app/app-reducer";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch<setAppErrorType | setAppStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError("Some error occurred"))
    }
    dispatch(setAppStatus("failed"))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<setAppErrorType | setAppStatusType>) => {
    dispatch(setAppError(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatus("failed"))
}