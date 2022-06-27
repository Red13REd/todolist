import axios, {AxiosResponse} from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials:true,
    headers: {
        "API-KEY": "c41dfb07-1a75-4e09-a63a-c913ed8979ad",
    },
})

export const todolistApi = {
    getTodo() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodo(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>("todo-lists", {title});
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`);
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>(`todo-lists/${todoId}`, {title})
    },
    getTask(todoId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todoId}/tasks`);
    },
    createTask(todoId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoId}/tasks`, {title});
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`);
    },
}


export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", data)
    },
    logout() {
        return instance.delete<ResponseType>("auth/login")
    },
    me() {
        return instance.get<ResponseType<GetMeResponseType>>("auth/me")
    },
}

//type
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}


type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

type GetMeResponseType = {
    id: number
    email: string
    login: string
}

