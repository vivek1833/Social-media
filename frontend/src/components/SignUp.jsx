import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const userInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const { name, username, email, password, cpassword } = user;

    const res = await fetch("https://social-media-backend-iu1c.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      navigate("/login");
    }
  };

  return (
    <div className="container login-container">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img
                  src="https://source.unsplash.com/1000x1200?computer"
                  className="d-block w-100"
                  alt="cardImage"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/1000x1200?media"
                  className="d-block w-100"
                  alt="cardImage"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/1000x1200?nature"
                  className="d-block w-100"
                  alt="cardImage"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-10 mx-auto">
                  <h3 className="display-4 mb-5 text-center"> Photogram </h3>

                  <form method="POST">
                    <div className="form-group mb-3">
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={user.name}
                        onChange={userInput}
                        required={true}
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={user.username}
                        onChange={userInput}
                        required={true}
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email email"
                        value={user.email}
                        name="email"
                        onChange={userInput}
                        required={true}
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={userInput}
                        required={true}
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <input
                        id="cpassword"
                        name="cpassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={user.cpassword}
                        onChange={userInput}
                        required={true}
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      />
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        id="customCheck1"
                        type="checkbox"
                        onClick={showPass}
                        className="custom-control-input"
                      />
                      <label
                        htmlFor="customCheck1"
                        className="custom-control-label ms-2"
                        onClick={showPass}>
                        Show password
                      </label>
                    </div>

                    <button
                      type="submit"
                      onClick={submitData}
                      className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100">
                      Sign up
                    </button>

                    <div className="text-center d-flex justify-content-between mt-4">
                      <p>
                        Already have an account?
                        <Link to="/login" className="font-italic text-muted">
                          Login
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
