import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { URL } from "../services/helper";

const Post = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    post: "",
    caption: "",
  });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({ ...user, post: base64 });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { post, caption } = user;

    const res = await fetch(`${URL}/post`, {
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
      window.alert(data.message);
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
                type="file"
                className="form-control form-control-lg"
                id="file"
                name="file"
                placeholder="Upload your post here"
                autoComplete="off"
                required={true}
                onChange={(e) => {
                  handleFile(e);
                }}
              />
            </div>
          </div>

          <div className="form-row my-2">
            <div className="form-group col-md-6 d-block mx-auto">
              <input
                type="text"
                className="form-control form-control-lg"
                id="caption"
                name="caption"
                placeholder="Enter your caption here"
                autoComplete="off"
                required={true}
                value={user.caption}
                onChange={(e) => {
                  setUser({ ...user, caption: e.target.value });
                }}
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
