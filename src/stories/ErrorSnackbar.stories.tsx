import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {storybookProviderDecorator} from "./decorators/storybookProviderDecorator";

export default {
    title: "ErrorSnackbar",
    component: ErrorSnackbar,
    decorators: [storybookProviderDecorator],
} as ComponentMeta<typeof ErrorSnackbar>;

const Template: ComponentStory<typeof ErrorSnackbar> = (args) => <ErrorSnackbar {...args}/>

export const ErrorSnackbarExample = Template.bind({})

ErrorSnackbarExample.args = {
    demo: true
}



