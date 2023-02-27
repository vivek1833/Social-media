import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/" id="logoname">
                    <img src="https://www.logodesignlove.com/wp-content/uploads/2022/01/logo-wave-symbol-01.jpg" alt="logo" className="logo" />
                    Photogram
                </Link>
                <div className="nav-bottom">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><i className="bi bi-house"></i> Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/explore" ><i className="bi bi-compass"></i> Explore </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/post"><i className="bi bi-plus-square"></i> Post </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile"><i className="bi bi-person"></i> Profile </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;