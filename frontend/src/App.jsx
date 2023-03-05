import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './components/Body';
import Explore from './components/Explore';
import Post from './components/Post';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/post" element={<Post />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;