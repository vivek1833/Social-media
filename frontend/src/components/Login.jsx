import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "", password: ""
    });

    const userInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const submitData = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid Login");
        } else {
            window.alert("Login Successful");
            navigate("/");
        }
    }

    return (
        <div className="container login-container" >
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex">
                    <div id="carouselExampleSlidesOnly" className="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="3000">
                                <img src="https://source.unsplash.com/1000x1200?hero" className="d-block w-100" alt="cardImage" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/1000x1200?heroine" className="d-block w-100" alt="cardImage" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/1000x1200?nature" className="d-block w-100" alt="cardImage" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-10 mx-auto">
                                    <h3 className="display-4 mb-5 text-center" > Photogram </h3>

                                    <form method="POST">
                                        <div className="form-group mb-3">
                                            <input id="email" type="email" placeholder="Email address" required={true} name="email" autoComplete="true" value={user.email} onChange={userInput} className="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="password" type="password" placeholder="Password" required={true} name="password" autoComplete="true" value={user.password} onChange={userInput} className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" onClick={showPass1} className="custom-control-input" />
                                            <label htmlFor="customCheck1" className="custom-control-label ms-2"> Show Password </label>
                                        </div>
                                        <button type="submit" onClick={submitData} className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100"> Sign in </button>

                                        <div className="text-center d-flex justify-content-between mt-4">
                                            <p> Don't have an account?
                                                <Link to="/signUp" className="font-italic text-muted">
                                                    <u> Sign up here </u>
                                                </Link>
                                            </p>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <hr className="w-25" /> OR <hr className="w-25" />
                                        </div>

                                        <div className="text-center d-flex justify-content-between mt-4">
                                            <p> Sign up using: </p>
                                            <div className="d-flex">
                                                <button type="submit" className="mx-1 btn btn-primary text-uppercase rounded-pill shadow-sm w-50 p"> <i className="bi bi-google"></i> Google </button>
                                                <button type="submit" className="mx-1 btn btn-primary text-uppercase rounded-pill shadow-sm w-50"> <i className="bi bi-facebook"></i> Facebook </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
};

export default Login;