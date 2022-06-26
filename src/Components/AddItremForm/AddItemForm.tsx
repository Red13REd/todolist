import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import React, {ChangeEvent, useState} from "react";

type addItemFormType = {
    callBack: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({disabled = false, callBack}: addItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            callBack(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPresHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       label="Title"
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPresHandler}
                       disabled={disabled}
                       value={title}
                       helperText={error}
                       error={!!error}
            />
            <IconButton onClick={addItemHandler} disabled={disabled} color="primary">
                <AddBox/>
            </IconButton>
        </div>
    );
})
