import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const callProfile = async () => {
    try {
      const res = await fetch("http://localhost:8000/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      setUserData({
        username: data.user.username,
        email: data.user.email,
        name: data.user.name,
      });

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
    callProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 mt-md-3 mt-1">
          <div className="col mt-3 ">
            <div className="text-center h-100">
              <img
                src="https://source.unsplash.com/400x400?bollywood"
                alt="profilePhoto"
                className="rounded-circle w-50"
              />
            </div>
          </div>
          <div className="col">
            <div>
              <div className="card-body mt-2">
                <h4 className="card-title text-center">
                  {userdata.username}
                </h4>
                <div className="d-flex justify-content-between mt-3">
                  <p>
                    <span className="fw-bold"> 22 </span> posts
                  </p>
                  <p>
                    <span className="fw-bold"> 168 </span> followers
                  </p>
                  <p>
                    <span className="fw-bold"> 132 </span> following
                  </p>
                </div>
                <div className="mt-0 mt-md-3">
                  <p className="fw-bold"> {userdata.name} </p>
                  <p id="bio"> lorem20 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-md-4   mt-0" />
        <h3 className="mt-2 text-center"> {userdata.name} Posts </h3>
        <div className="row row-cols-3 row-cols-md-4 g-1 mt-md-3 mt-1">
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?model">
                <img
                  src="https://source.unsplash.com/400x400?model"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?heroine">
                <img
                  src="https://source.unsplash.com/400x400?heroine"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?hollywood">
                <img
                  src="https://source.unsplash.com/400x400?hollywood"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?marvel">
                <img
                  src="https://source.unsplash.com/400x400?marvel"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?dcu">
                <img
                  src="https://source.unsplash.com/400x400?dcu"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
