import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { URL } from "../services/helper";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const callHome = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    
    try {
      const res = await fetch(`${URL}/home`, {
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
        user: data.user,
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
      const res = await fetch(`${URL}/like/${_id}`, {
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
                        <div className="w-100 d-flex align-items-center">
                          <img
                            src={post.profilephoto}
                            className="profilephoto img-fluid rounded-circle"
                            alt="pic"
                          />
                          <small className="ms-2 "> {post.name} </small>
                          <small className="ms-1 text-muted"> • </small>
                          <small className="ms-1 text-muted">
                            {post.date.substring(0, 10)}
                          </small>
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
                        <div className="card-text">
                          <span>
                            <strong> {post.name} </strong>
                          </span>
                          {post.caption.substring(0, 22)}
                          {post.caption.length > 22 && (
                            <span>
                              <Link to={`/post/${post._id}`}>
                                <strong>
                                  <button
                                    type="button"
                                    className="btn btn-link btn-sm text-decoration-none text-dark p-0 cursor-pointer ms-1"
                                    title="Show more">
                                    ...
                                  </button>
                                </strong>
                              </Link>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-footer">
                        <button
                          className="btn"
                          id="like"
                          onClick={() => {
                            likePost(post._id);
                          }}>
                          <i className="bi bi-heart"></i>
                        </button>

                        <small className="text-muted text-end">
                          {post.likes.length} likes
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
