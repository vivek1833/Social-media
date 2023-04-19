import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ShowPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currpost, setPost] = useState("");

  const callPost = async () => {
    try {
      const res = await fetch(`http://localhost:8000/getpost/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data.userpost);

      setPost({
        post: data.userpost[0].post,
        caption: data.userpost[0].caption,
        like: data.userpost[0].like,
        comments: data.userpost[0].comments,
        date: data.userpost[0].date,
      });

      if (res.status !== 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    callPost();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1>Your Post</h1>
        <div className="row">
          <div className="col-6">
            <div className="card w-50">
              <img src={currpost.post} className="card-img-top" alt="post" />
              <div className="card-body">
                <p className="card-text">{currpost.caption}</p>
                <p className="card-text">Likes: {currpost.like}</p>
                <p className="card-text">Date: {currpost.date}</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card w-100">
              <div className="card-body">
                <p className="card-text">Comments:</p>
                {currpost.comments &&
                  currpost.comments.map((comment) => {
                    return (
                      <p className="card-text">
                        {comment.username}: {comment.comment}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowPost;
