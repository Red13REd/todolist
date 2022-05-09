import {TextField} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, callBack}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        callBack(newTitle)
    }


    const changeTitle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={changeTitle}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};
