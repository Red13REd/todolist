import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from "../../api/todolist-api";
import {createTodoType,  RemoveTodoType, SetTodoType} from "./todolist-reducer";
import {Dispatch} from 'redux'
import {AppRootStateType} from "../../app/store";

const initalState: TaskStateType = {}

export const TaskReducer = (state: TaskStateType = initalState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(m => m.id === action.taskId
                        ? {...m, ...action.model} : m)
            }
        case "CREATE-TODO":
            return {...state, [action.todo.id]: []}
        case "DELETE-TODO":
            const copyState = {...state}
            delete copyState[action.todoId]
            return copyState
        case "SET-TODO": {
            const copyState = {...state}
            action.todo.forEach(s => {
                copyState[s.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todoId]: action.tasks}
        default:
            return state
    }
};


export const deletedTask = (todoId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        todoId,
        taskId,
    } as const
}
export const addTask = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task,
    } as const
}
export const updateTask = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        todoId,
        taskId,
        model,
    } as const
}

export const setTasks = (todoId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        todoId,
        tasks
    } as const
}

//thunks
export const fetchTask = (todoId: string) => (dispatch: DispatchThunks) => {
    todolistApi.getTask(todoId)
        .then(res => {
            dispatch(setTasks(todoId, res.data.items))
        })
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: DispatchThunks) => {
    todolistApi.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(deletedTask(todoId, taskId))
        })
}

export const addTaskTC = (todoId: string, title: string) => (dispatch: DispatchThunks) => {
    todolistApi.createTask(todoId, title)
        .then(res => {
            dispatch(addTask(res.data.data.item))
        })
}

export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    (dispatch: DispatchThunks, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.task[todoId].find(f => f.id === taskId)

        if (!task) {
            console.warn("task not found")
            return
        }


        const modelToUpdate: UpdateDomainTaskModelType = {
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }

        todolistApi.updateTask(todoId, taskId, modelToUpdate).then(res => {
            dispatch(updateTask(todoId, taskId, modelToUpdate))
        })
    }



//type
type ActionsType =
    | ReturnType<typeof deletedTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>
    | createTodoType
    | RemoveTodoType
    | SetTodoType

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type DispatchThunks = Dispatch<ActionsType | any>