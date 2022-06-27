import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AddItemForm} from "../Components/AddItremForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: "Task",
    component: Task,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskFormExample = Template.bind({})

TaskFormExample.args = {
    task: {
        description: "",
        title: "New Task",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "TASK1",
        todoListId: "TODOID2",
        order: 1,
        addedDate: "",
        entityStatus: "idle",
    },
    todoId: "TODOID2",
    changeTaskTitle: action("The name has been changed"),
    removeTask:action("Task has been deleted"),
    changeTaskStatus:action("CheckBox has been changed")
}

