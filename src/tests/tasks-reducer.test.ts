import {
    CreateTodo,
    RemoveTodo, SetTodo, TodolistDomainType,
} from "../features/TodolistsList/todolist-reducer";
import {
    addTask,
    deletedTask, setTasks,
    tasksReducer,
    TaskStateType,
    UpdateDomainTaskModelType, updateTask, UpdateTaskEntityStatusAC
} from "../features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

let startState: TaskStateType = {}
let startStateTodo: TodolistDomainType[] = []

beforeEach(() => {
    startState = {
        "TODO1": [{
            description: "some description",
            title: "Task 1",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "2.21.23",
            deadline: "string",
            id: "TASK1",
            todoListId: "TODO1",
            order: 1,
            addedDate: "2.11.23",
            entityStatus: "idle"
        }, {
            description: "some description",
            title: "Task 2",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: "2.22.23",
            deadline: "string",
            id: "TASK2",
            todoListId: "TODO1",
            order: 2,
            addedDate: "2.12.23",
            entityStatus: "idle"
        }],
        "TODO2": [{
            description: "some description",
            title: "Task 1/2",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "2.4.23",
            deadline: "string",
            id: "TASK1/2",
            todoListId: "TODO2",
            order: 1,
            addedDate: "3.15.23",
            entityStatus: "idle"
        }, {
            description: "some description",
            title: "Task 2/2",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "2.5.23",
            deadline: "string",
            id: "TASK2/2",
            todoListId: "TODO2",
            order: 2,
            addedDate: "3.14.23",
            entityStatus: "idle"
        }],
    }
    startStateTodo = [
        {
            id: "TODO1",
            addedDate: "5.12.22",
            order: 1,
            title: "First todo",
            filter: "all",
            entityStatus: "idle",
        },
        {
            id: "TODO5",
            addedDate: "6.12.22",
            order: 2,
            title: "Second todo",
            filter: "active",
            entityStatus: "loading",
        }
    ]
})


test("correct task should be deleted from correct array", () => {

    const endState = tasksReducer(startState, deletedTask("TODO1", "TASK1"))

    expect(startState["TODO1"].length).toBe(2)
    expect(endState["TODO1"].length).toBe(1)
    expect(endState["TODO2"].length).toBe(2)
});

test("correct task should be added to correct array", () => {

    let newTask = {
        description: "some description",
        title: "Task 3",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "2.15.23",
        deadline: "string",
        id: "TASK3",
        todoListId: "TODO1",
        order: 3,
        addedDate: "2.17.24",
        entityStatus: "idle"
    }

    const endState = tasksReducer(startState, addTask(newTask))

    expect(startState["TODO1"].length).toBe(2)
    expect(endState["TODO1"].length).toBe(3)
    expect(endState["TODO2"].length).toBe(2)
});

test("status of specified task should be changed", () => {

    let newTask: UpdateDomainTaskModelType = {
        description: "some description",
        title: "Task 1",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "2.21.23",
        deadline: "string",
    }

    const endState = tasksReducer(startState, updateTask("TODO1", "TASK1", newTask))

    expect(startState["TODO1"].length).toBe(2)
    expect(endState["TODO1"].length).toBe(2)
    expect(endState["TODO1"][0].status).toBe(TaskStatuses.Completed)
});

test("title of specified task should be changed", () => {

    let newTask: UpdateDomainTaskModelType = {
        description: "some description",
        title: "NEW TASK",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "2.21.23",
        deadline: "string",
    }

    const endState = tasksReducer(startState, updateTask("TODO1", "TASK1", newTask))

    expect(startState["TODO1"].length).toBe(2)
    expect(endState["TODO1"].length).toBe(2)
    expect(endState["TODO1"][0].title).toBe("NEW TASK")
});

test("correct task should be set", () => {

    let newTodo: TaskStateType = {"TODO1": [], "TODO2": []}

    let task: TaskType[] = [{
        description: "some description",
        title: "Task 1/2",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "2.4.23",
        deadline: "string",
        id: "TASK1/2",
        todoListId: "TODO2",
        order: 1,
        addedDate: "3.15.23",
    }, {
        description: "some description",
        title: "Task 2/2",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: "2.5.23",
        deadline: "string",
        id: "TASK2/2",
        todoListId: "TODO2",
        order: 2,
        addedDate: "3.14.23",
    }]

    const endState = tasksReducer(newTodo, setTasks("TODO1", task))

    expect(newTodo["TODO1"].length).toBe(0)
    expect(endState["TODO1"].length).toBe(2)
    expect(endState["TODO2"].length).toBe(0)
});

test("status of specified task should be changed", () => {

    const endState = tasksReducer(startState, UpdateTaskEntityStatusAC("TODO2", "TASK2/2", "succeeded"))

    expect(startState["TODO2"][1].entityStatus).toBe("idle");
    expect(endState["TODO2"][1].entityStatus).toBe("succeeded");
});

test("correct array tasks should be added to correct todo", () => {

    const endState = tasksReducer(startState, CreateTodo(startStateTodo[1]))

    expect(Array.isArray(endState["TODO5"])).toBe(true);
});

test("correct array tasks should be deleted to correct todo", () => {

    const endState = tasksReducer(startState, RemoveTodo("TODO1"))

    expect(startState["TODO1"].length).toBe(2);
    expect(Array.isArray(endState["TODO1"])).toBe(false);
});

test("correct array tasks should be set to correct todo", () => {

    const endState = tasksReducer(startState, SetTodo(startStateTodo))

    expect(startState["TODO1"].length).toBe(2);
    expect(endState["TODO1"].length).toBe(0);
});