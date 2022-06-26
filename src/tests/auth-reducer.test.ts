import {authReducer, initialStateType, setIsLoggedIn} from "../app/auth-reducer";

let startState: initialStateType = {
    isLoggedIn: false
}

beforeEach(() => {
    startState = {isLoggedIn: false}
})


test("status of specified task should be changed", () => {
    const endState = authReducer(startState, setIsLoggedIn(true))

    expect(startState.isLoggedIn).toBe(false)
    expect(endState.isLoggedIn).toBe(true)

});