import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import Body from './components/body';
import Explore from './components/explore';

ReactDOM.render(
    <React.StrictMode>
        <Navbar />
        <Body />
    </React.StrictMode>,
    document.getElementById('root')
);