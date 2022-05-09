import React from "react";
import "./App.css";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Routes, Route, Navigate} from "react-router-dom";
import {Login} from "../features/Login/Login";

function App() {


    return (
        <div className="App">
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="/404" element={<div>
                        <h1>404: PAGE NOT FOUND</h1>
                        <button onClick={() => {
                        }}>Back home
                        </button>
                    </div>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
