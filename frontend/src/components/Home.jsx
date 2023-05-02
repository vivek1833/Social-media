import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { format } from "date-fns";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const callHome = async () => {
    // console.log(format(new Date(), "yyyy/MM/dd kk:mm:ss"));
    try {
      const res = await fetch("https://social-media-backend-iu1c.onrender.com/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await res.json();

      setUser({
        userdata: data.posts,
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

  const likePost = async (_id) => {
    try {
      const res = await fetch(`https://social-media-backend-iu1c.onrender.com/like/${_id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await res.json();

      setUser({
        userdata: data.posts,
      });

      if (res.status !== 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    callHome();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-3 mt-md-3 mt-1">
          {/* user detail starts  */}
          {user.userdata &&
            user.userdata.map((post) => {
              return (
                <div className="col mt-4" key={post._id}>
                  <div className="card homePage h-100">
                    <div className="card-footer">
                      <Link
                        to={`/profile/${post.username}`}
                        className="text-decoration-none text-dark"
                        style={{ cursor: "pointer" }}>
                        <div className="w-25 d-flex align-items-center">
                          <img
                            src={post.profilephoto}
                            className="img-fluid rounded-circle w-50"
                            alt="pic"
                          />
                          <small className="ms-2 "> {post.name} </small>
                          <small className="ms-1 text-muted"> • </small>
                          <small className="ms-1 text-muted">{post.date}</small>
                        </div>
                      </Link>
                    </div>
                    <div className="homePage">
                      <Link to={`/post/${post._id}`}>
                        <img
                          src={post.post}
                          className="homePost card-img-top"
                          alt="postpic"
                        />
                      </Link>
                      <div className="card-body">
                        <p className="card-text">
                          <span>
                            <strong> {post.name} </strong>
                          </span>
                          {post.caption}
                        </p>
                      </div>

                      <div className="card-footer">
                        <button
                          id="like"
                          name="like"
                          className="btn"
                          onClick={() => {
                            likePost(post._id);
                          }}>
                          <i className="bi bi-heart"></i>
                        </button>
                        <small className="text-muted text-end">
                          {post.likecount} likes
                        </small>

                        <Link
                          to={`/post/${post._id}`}
                          className="text-decoration-none text-dark">
                          <button className="btn" id="comment">
                            <i className="bi bi-chat"></i>
                          </button>
                          <small className="text-muted text-end">
                            {post.commentcount} comments
                          </small>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* user detail ends  */}
        </div>
        <hr className="mb-5" />
      </div>
    </>
  );
};

export default Home;
