import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { URL } from "../services/helper";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    profilephoto: "",
    password: "",
    cpassword: "",
  });

  const Profile = async () => {
    try {
      const res = await fetch(`${URL}/profile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await res.json();

      setUserData({
        name: data.userdetail.name,
        bio: data.userdetail.bio,
        profilephoto: data.userdetail.profilephoto,
        password: data.userdetail.password,
        cpassword: data.userdetail.cpassword,
      });

      if (res.status !== 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const UpdateProfile = async (e) => {
    e.preventDefault();
    const { name, bio, profilephoto, password, cpassword } = userData;

    try {
      const res = await fetch(`${URL}/updateprofile`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          bio,
          profilephoto,
          password,
          cpassword,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        window.alert("Invalid details");
      } else {
        window.alert("Profile updated successfully");
        navigate("/profile");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    Profile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <form method="POST">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name"> Name </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name here"
                autoComplete="off"
                value={userData.name}
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="profilephoto"> Profile Photo </label>
              <input
                type="text"
                className="form-control"
                id="profilephoto"
                name="profilephoto"
                placeholder="Enter your profile photo here"
                autoComplete="off"
                value={userData.profilephoto}
                onChange={(e) => {
                  setUserData({ ...userData, profilephoto: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="userbio"> Bio </label>
              <input
                type="text"
                className="form-control"
                id="userbio"
                name="userbio"
                placeholder="Enter your bio here"
                autoComplete="off"
                value={userData.bio}
                onChange={(e) => {
                  setUserData({ ...userData, bio: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password"> Password </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                required={true}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="cpassword"> Confirm Password </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm password"
                autoComplete="off"
                required={true}
                onChange={(e) => {
                  setUserData({ ...userData, cpassword: e.target.value });
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={UpdateProfile}>
            Save Changes
          </button>

          <Link to="/profile" className="btn btn-primary ms-2">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
