import {
    CreateTodo, FilterValuesType,
    RemoveTodo, RequestStatusType, SetTodo,
    TodolistDomainType,
    todolistReducer, UpdateTodoEntityStatusAC, UpdateTodoFilter,
    UpdateTodoTitle
} from "../features/TodolistsList/todolist-reducer";
import {TodolistType} from "../api/todolist-api";


let startState: TodolistDomainType[] = []

beforeEach(() => {
    startState = [
        {
            id: "TODO1",
            addedDate: "5.12.22",
            order: 1,
            title: "First todo",
            filter: "all",
            entityStatus: "idle",
        },
        {
            id: "TODO2",
            addedDate: "6.12.22",
            order: 2,
            title: "Second todo",
            filter: "active",
            entityStatus: "loading",
        }
    ]
})


test("correct todo should be removed", () => {

    const endState = todolistReducer(startState, RemoveTodo("TODO1"))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe("TODO2")
});

test("correct todo should be added", () => {

    const newTodo = {
        id: "TODO3",
        addedDate: "7.12.22",
        order: 3,
        title: "Third todo",
        filter: "all",
        entityStatus: "idle",
    }

    const endState = todolistReducer(startState, CreateTodo(newTodo))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe("TODO3")
});

test("correct todolist should change its name", () => {

    let newTodoTitle = "New todo"

    const endState = todolistReducer(startState, UpdateTodoTitle("TODO1", newTodoTitle))

    expect(endState[0].title).toBe("New todo")
    expect(endState[0].id).toBe("TODO1")
});

test("correct filter of todolist should be changed", () => {

    let newTodoFilter: FilterValuesType = "active"

    const endState = todolistReducer(startState, UpdateTodoFilter("TODO2", newTodoFilter))

    expect(endState[1].filter).toBe("active")
    expect(endState[1].id).toBe("TODO2")
});

test("correct status of todolist should be changed", () => {

    let newTodoStatus: RequestStatusType = "succeeded"

    const endState = todolistReducer(startState, UpdateTodoEntityStatusAC("TODO1", newTodoStatus))

    expect(endState[0].entityStatus).toBe("succeeded")
    expect(endState[0].id).toBe("TODO1")
});

test("correct todo should be set", () => {

    const newTodos: TodolistType[] = [{
        id: "TODO4",
        addedDate: "8.12.22",
        order: 5,
        title: "First todo",
    }, {
        id: "TODO5",
        addedDate: "9.12.22",
        order: 6,
        title: "Second todo",
    }]

    const startState: TodolistDomainType[] = []

    const endState = todolistReducer(startState, SetTodo(newTodos))

    expect(startState.length).toBe(0)
    expect(endState.length).toBe(2)
    expect(endState[0].entityStatus).toBe("idle")
    expect(endState[0].filter).toBe("all")
});