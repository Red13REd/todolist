import React, {useEffect} from "react";
import "./App.css";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch, useCustomSelector} from "./store";
import {inInitializedApp, RequestStatusType} from "./app-reducer";
import {logoutTc} from "./auth-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";

type AppType = {
    demo?: boolean
}

export const App: React.FC<AppType> = ({demo = false}) => {

    const status = useCustomSelector<RequestStatusType>(state => state.app.status)
    const isInInitialized = useCustomSelector<boolean>(state => state.app.inInitialized)
    const isLoggedIn = useCustomSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(inInitializedApp())
    }, [])

    const onClickHandlerLogout = () => {
        dispatch(logoutTc())
    }
    if (!isInInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn ?
                        <Button onClick={onClickHandlerLogout} color="inherit">Log out</Button>
                        : <Button color="inherit">Login</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="/404" element={<div>
                        <h1>404: PAGE NOT FOUND</h1>
                        <button onClick={() => <Navigate to="/"/>
                        }>Back home
                        </button>
                    </div>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

