import {appReducer, initialStateType, setAppError, setAppInInitialized, setAppStatus} from "../app/app-reducer";

let startState: initialStateType = {
    status: "idle",
    error: null,
    inInitialized: false,
}

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        inInitialized: false,
    }
})


test("correct status of todolist should be changed", () => {

    const endState = appReducer(startState, setAppStatus("succeeded"))

    expect(startState.status).toBe("idle")
    expect(endState.status).toBe("succeeded")
})

test("correct error of todolist should be changed", () => {

    const endState = appReducer(startState, setAppError("Some error"))

    expect(startState.error).toBe(null)
    expect(endState.error).toBe("Some error")
})

test("correct inInitialized of todolist should be changed", () => {

    const endState = appReducer(startState, setAppInInitialized(true))

    expect(startState.inInitialized).toBe(false)
    expect(endState.inInitialized).toBe(true)
})