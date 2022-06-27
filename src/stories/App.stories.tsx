import {ComponentMeta, ComponentStory} from "@storybook/react";
import {App} from "../app/App";
import {BrowserRouterDecorator, storybookProviderDecorator} from "./decorators/storybookProviderDecorator";

export default {
    title: "App",
    component: App,
    decorators: [storybookProviderDecorator, BrowserRouterDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args}/>

export const AppExample = Template.bind({})

AppExample.args = {
    demo: true
}

