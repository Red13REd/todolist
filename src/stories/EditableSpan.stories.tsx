import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "../Components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: "callback"
        },
        title: {
            description: "value to editable span"
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})

EditableSpanExample.args = {
    title: "Double click",
    callBack: action("Title changed")
}

