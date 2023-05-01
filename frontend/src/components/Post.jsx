import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const res = await fetch("https://social-media-backend-iu1c.onrender.com/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      credentials: "include",
      body: JSON.stringify({
        post,
        caption,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Post");
    } else {
      window.alert(data.message);
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <p className="text-center my-2 display-3">Post</p>
      <div className="container postForm">
        <form method="POST">
          <div className="form-row my-2">
            <div className="form-group col-md-6 d-block mx-auto">
              <input
                type="text"
                className="form-control"
                id="post"
                name="post"
                placeholder="Enter your post link here"
                autoComplete="off"
                required={true}
                value={user.post}
                onChange={userInput}
              />
            </div>
          </div>

          <div className="form-row my-2">
            <div className="form-group col-md-6 d-block mx-auto">
              <input
                type="text"
                className="form-control"
                id="caption"
                name="caption"
                placeholder="Enter your caption here"
                autoComplete="off"
                required={true}
                value={user.caption}
                onChange={userInput}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary my-2 px-4 py-2 mx-auto d-block text-uppercase"
            onClick={submitData}>
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
