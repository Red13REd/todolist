import React, {useState} from "react";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useCustomSelector} from "../../app/store";
import {setAppError} from "../../app/app-reducer";
import {Button} from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ErrorSnackbarTypeForStories = {
    demo?: boolean
}

export const ErrorSnackbar: React.FC<ErrorSnackbarTypeForStories> = ({demo}) => {

    const [storybook, setStorybook] = useState<string | null>() // For storyBook

    const error = useCustomSelector<string | null>(state => state.app.error)
    const dispatch = useAppDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
        setStorybook(null) // For storyBook
    };

    return (
        <>
            {demo
                ? <Button
                    color="primary"
                    onClick={() => setStorybook("The button has been pressed")}>Click me</Button>
                : null}
            <Snackbar open={error !== null || storybook !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {demo ? storybook : error}
                </Alert>
            </Snackbar>
        </>
    );
}


