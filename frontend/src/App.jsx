import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Body from './components/Body';
import Explore from './components/Explore';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/explore" element={<Explore />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;