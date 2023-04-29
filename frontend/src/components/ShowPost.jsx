import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ShowPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currpost, setPost] = useState("");
  const [comment, setComment] = useState("");

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

      setPost({
        username: data.userpost.username,
        name: data.userpost.name,
        profilephoto: data.userpost.profilephoto,
        post: data.userpost.post,
        caption: data.userpost.caption,
        like: data.userpost.likes,
        comments: data.userpost.comments,
        likecount: data.userpost.likecount,
        commentcount: data.userpost.commentcount,
        date: data.userpost.date,
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

  const commentPost = async (id, comment) => {
    try {
      const res = await fetch(`http://localhost:8000/comment/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment: comment,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 201) {
        window.alert(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    callPost();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1>{currpost.username} Post</h1>
        <div className="row row-cols-1 row-cols-md-2 mt-md-2 mt-1">
          <div className="col">
            <div className="card">
              <img
                src={currpost.post}
                className=" card-img-top w-100"
                alt="post"
              />
            </div>
          </div>

          <div className="col">
            <div className="card w-100">
              <div className="card-body">
                <strong> {currpost.name} </strong>
                <p className="card-text">{currpost.caption}</p>
                <hr />
                <p className="card-text">Comments: {currpost.commentcount}</p>
                {currpost.comments &&
                  currpost.comments.map((comment) => {
                    return (
                      <div className=" w-100" key={comment._id}>
                        <p className="card-text">
                          <strong>{comment.user} : </strong> {comment.comment}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">Likes: {currpost.likecount}</p>
              <p className="card-text">Date: {currpost.date}</p>
            </div>

            {/* Add comment  */}
            <form method="GET">
              <div className="row row-cols-1 my-3">
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    id="comment"
                    name="comment"
                    placeholder="Add a comment..."
                    required={true}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary col-2"
                  onClick={() => {
                    commentPost(id, comment);
                  }}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowPost;
