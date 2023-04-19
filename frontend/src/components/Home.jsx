import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  const callHome = async () => {
    try {
      const res = await fetch("http://localhost:8000/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status !== 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    callHome();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-3 mt-md-3 mt-1">
          <div className="col mt-4">
            <div className="card h-100">
              <div className="card-footer">
                <div className="w-25 d-flex flex-row align-items-center">
                  <img
                    src="https://source.unsplash.com/400x400?man"
                    className="img-fluid rounded-circle w-50"
                    alt=""
                  />
                  <small className="ms-2"> Name </small>
                  <small className="ms-1 text-muted"> • </small>
                  <small className="ms-1 text-muted"> 6h </small>
                </div>
              </div>
              <img
                src="https://source.unsplash.com/800x600?man"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <p className="card-text">
                  <span>
                    <strong> Name </strong>
                  </span>
                  Caption of user... Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Quo, nisi.
                </p>
              </div>
              <div className="card-footer">
                <button className="btn">
                  <i className="bi bi-heart"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-chat"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-share"></i>
                </button>
                <small className="text-muted text-end"> 2.8k likes </small>
              </div>
            </div>
          </div>
          <div className="col mt-4">
            <div className="card h-100">
              <div className="card-footer">
                <div className="w-25 d-flex flex-row align-items-center">
                  <img
                    src="https://source.unsplash.com/400x400?girl"
                    className="img-fluid rounded-circle w-50"
                    alt=""
                  />
                  <small className="ms-2"> Name </small>
                  <small className="ms-1 text-muted"> • </small>
                  <small className="ms-1 text-muted"> 6h </small>
                </div>
              </div>
              <img
                src="https://source.unsplash.com/800x600?girl"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <p className="card-text">
                  <span>
                    <strong> Name </strong>
                  </span>
                  Caption of user... Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Quo, nisi.
                </p>
              </div>
              <div className="card-footer">
                <button className="btn">
                  <i className="bi bi-heart"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-chat"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-share"></i>
                </button>
                <small className="text-muted text-end"> 7.9k likes </small>
              </div>
            </div>
          </div>
          <div className="col mt-4">
            <div className="card h-100">
              <div className="card-footer">
                <div className="w-25 d-flex flex-row align-items-center">
                  <img
                    src="https://source.unsplash.com/400x400?heroine"
                    className="img-fluid rounded-circle w-50"
                    alt=""
                  />
                  <small className="ms-2"> Name </small>
                  <small className="ms-1 text-muted"> • </small>
                  <small className="ms-1 text-muted"> 6h </small>
                </div>
              </div>
              <img
                src="https://source.unsplash.com/800x600?heroine"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <p className="card-text">
                  <span>
                    <strong> Name </strong>
                  </span>
                  Caption of user... Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Quo, nisi.
                </p>
              </div>
              <div className="card-footer">
                <button className="btn">
                  <i className="bi bi-heart"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-chat"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-share"></i>
                </button>
                <small className="text-muted text-end"> 11.2k likes </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
