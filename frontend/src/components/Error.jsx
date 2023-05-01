import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="text-center mt-3">
          <img src="https://source.unsplash.com/400x400?error" alt="errorimg" />
          <h1 className="display-4"> Error </h1>
          <p className="display-6"> Page not found </p>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
