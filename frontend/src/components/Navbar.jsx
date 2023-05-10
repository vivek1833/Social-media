import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isActive, setisActive] = useState({
    home: true,
    explore: false,
    post: false,
    profile: false,
  });

  // useEffect(() => {
  //   if (window.location.pathname === "/") {
  //     setisActive({
  //       home: true,
  //       explore: false,
  //       post: false,
  //       profile: false,
  //     });
  //   } else if (window.location.pathname === "/explore") {
  //     setisActive({
  //       home: false,
  //       explore: true,
  //       post: false,
  //       profile: false,
  //     });
  //   } else if (window.location.pathname === "/post") {
  //     setisActive({
  //       home: false,
  //       explore: false,
  //       post: true,
  //       profile: false,
  //     });
  //   } else if (window.location.pathname === "/profile") {
  //     setisActive({
  //       home: false,
  //       explore: false,
  //       post: false,
  //       profile: true,
  //     });
  //   }
  // });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/" id="logoname">
          <img
            src="https://img.favpng.com/9/17/23/logo-social-media-photography-instagram-clip-art-png-favpng-SmgKKKm5CeWENGALyFZW4zzPj_t.jpg"
            alt="logo"
            className="logo"
          />
          Photogram
        </Link>
        <div className="nav-bottom">
          <ul className="navbar-nav">
            <li className="nav-item">
              {isActive.home ? (
                <Link className="nav-link active" to="/">
                  <i className="bi bi-house-fill"></i> Home
                </Link>
              ) : (
                <Link className="nav-link" to="/">
                  <i className="bi bi-house"></i> Home
                </Link>
              )}
            </li>

            <li className="nav-item">
              {isActive.explore ? (
                <Link className="nav-link active" to="/explore">
                  <i className="bi bi-compass-fill"></i> Explore
                </Link>
              ) : (
                <Link className="nav-link" to="/explore">
                  <i className="bi bi-compass"></i> Explore
                </Link>
              )}
            </li>

            <li className="nav-item">
              {isActive.post ? (
                <Link className="nav-link active" to="/post">
                  <i className="bi bi-plus-square-fill"></i> Post
                </Link>
              ) : (
                <Link className="nav-link" to="/post">
                  <i className="bi bi-plus-square"></i> Post
                </Link>
              )}
            </li>

            <li className="nav-item">
              {isActive.profile ? (
                <Link className="nav-link active" to="/profile">
                  <i className="bi bi-person-fill"></i> Profile
                </Link>
              ) : (
                <Link className="nav-link" to="/profile">
                  <i className="bi bi-person"></i> Profile
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
