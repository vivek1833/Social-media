import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from './components/Body';
import Explore from './components/Explore';
import Post from './components/Post';
import Profile from './components/Profile';
import Login from './components/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Body />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/post" element={<Post />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;