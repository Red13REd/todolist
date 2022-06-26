import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AddItemForm} from "../Components/AddItremForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm",
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: "Button inside form clicked"
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({})

AddItemFormExample.args = {
    callBack: action("Button inside form clicked")
}

