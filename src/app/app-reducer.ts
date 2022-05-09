const initialState: initialStateType = {
    status: "idle",
    error: null,
    inInitialized: false,
}


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type initialStateType = {
    status: RequestStatusType
    error: string | null
    inInitialized: boolean
}