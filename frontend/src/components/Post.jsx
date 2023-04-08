import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Post = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    post: "",
    caption: "",
  });

  const userInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const { post, caption } = user;

    const res = await fetch("http://localhost:8000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        post,
        caption,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Post");
    } else {
      window.alert("Post Successful");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form method="POST">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="post">Post</label>
              <input
                type="email"
                className="form-control"
                id="post"
                name="post"
                placeholder="Enter your post here"
                required={true}
                value={user.post}
                onChange={userInput}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="caption">Caption</label>
              <input
                type="email"
                className="form-control"
                id="caption"
                name="caption"
                required={true}
                value={user.caption}
                placeholder="Enter your caption here"
                onChange={userInput}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitData}>
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
