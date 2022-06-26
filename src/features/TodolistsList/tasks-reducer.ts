import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {
    createTodoType,
    RemoveTodoType,
    RequestStatusType,
    SetTodoType,
} from "./todolist-reducer";
import {AppStateRootType, AppThunk} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TaskStateType = {}
//,
export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: "idle"}, ...state[action.task.todoListId]]
            }
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
            return {...state, [action.todoId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(m => m.id === action.taskId ? {
                    ...m,
                    entityStatus: action.status
                } : m)
            }
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


export const UpdateTaskEntityStatusAC = (todoId: string, taskId: string, status: RequestStatusType) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todoId,
        taskId,
        status,
    } as const
}


//thunks
export const fetchTask = (todoId: string):AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistApi.getTask(todoId)
        .then(res => {
            dispatch(setTasks(todoId, res.data.items))
            dispatch(setAppStatus("succeeded"))
        })
}

export const removeTaskTC = (todoId: string, taskId: string):AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(UpdateTaskEntityStatusAC(todoId, taskId, "loading"))
    todolistApi.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(deletedTask(todoId, taskId))
            dispatch(setAppStatus("succeeded"))
        })
}

export const addTaskTC = (todoId: string, title: string):AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistApi.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTask(res.data.data.item))
                dispatch(setAppStatus("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(rej => {
            handleServerNetworkError(rej, dispatch)
        })
}

export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType):AppThunk =>
    (dispatch, getState: () => AppStateRootType) => {
        const state = getState()
        const task = state.task[todoId].find(f => f.id === taskId)

        if (!task) {
            console.warn("task not found")
            return
        }


        const modelToUpdate: UpdateTaskModelType = {
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model,
        }

        todolistApi.updateTask(todoId, taskId, modelToUpdate).then(res => {
            if (res.data.resultCode === 0) {
                const action = updateTask(todoId, taskId, modelToUpdate)
                dispatch(action)
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
            .catch((rej) => {
                handleServerNetworkError(rej, dispatch);
            })
    }


//type
export type TasksActionsType =
    | ReturnType<typeof deletedTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof UpdateTaskEntityStatusAC>
    | ReturnType<typeof setAppStatus>
    | createTodoType
    | RemoveTodoType
    | SetTodoType

export type TaskStateType = {
    [key: string]: Array<TaskStateDomainType>
}

export type TaskStateDomainType = TaskType & { entityStatus: RequestStatusType }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
