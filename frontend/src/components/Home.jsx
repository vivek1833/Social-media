import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { URL } from "../services/helper";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [userFollowers, setUserFollowers] = useState([]);

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

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

      callHome();
    } catch (err) {
      console.log(err.message);
    }
  };

  const callHome = async () => {
    try {
      setLoading(true);
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

      setLoggedInUser(data.user);
      setUser({
        userdata: data.posts,
      });
      setUserFollowers(data.followers);

      setLoading(false);

      if (res.status !== 201) {
        const error = new Error(res.error);
        setLoading(false);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
      navigate("/login");
    }
  };

  const getAllUsers = async () => {
    const users = await fetch(`${URL}/allusers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      credentials: "include",
    });

    const data = await users.json();

    if (users.status !== 201) {
      const error = new Error(users.error);
      throw error;
    }

    setAllUser(data);
  };

  const followUser = async (username) => {
    try {
      const res = await fetch(`${URL}/follow/${username}`, {
        method: "PUT",
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

      alert(data.message);

      callHome();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    callHome();
    getAllUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-1 g-3 mt-1">
                {/* user detail starts  */}
                {user.userdata &&
                  user.userdata.map((post) => {
                    return (
                      <div className="mt-4" key={post._id}>
                        <div className="card homePage h-100">
                          <div className="card-footer d-flex justify-content-between">
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
                                  {Math.floor(
                                    (new Date() - new Date(post.date)) /
                                      (1000 * 60 * 60 * 24)
                                  )}{" "}
                                  days ago
                                </small>
                              </div>
                            </Link>

                            {userFollowers.includes(post.username) ? (
                              <button
                                className="btn btn-secondary"
                                id="follow"
                                onClick={() => {
                                  followUser(post.username);
                                }}>
                                Unfollow
                              </button>
                            ) : (
                              <button
                                className="btn btn-secondary"
                                id="follow"
                                onClick={() => {
                                  followUser(post.username);
                                }}>
                                Follow
                              </button>
                            )}
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
                              {post.likes.filter(
                                (like) => like.user === loggedInUser.username
                              ).length > 0 ? (
                                <>
                                  <button
                                    className="btn"
                                    id="like"
                                    onClick={() => {
                                      likePost(post._id);
                                    }}>
                                    <i className="bi bi-heart-fill text-danger"></i>
                                  </button>

                                  <small className="text-muted text-end">
                                    {post.likes.length} likes
                                  </small>
                                </>
                              ) : (
                                <>
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
                                </>
                              )}
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
            )}
          </div>

          {/* Suggestion people */}
          <div className="col-lg-4 mt-4">
            <div className="card border-none">
              <div className="card-body">
                <h5 className="card-title">Suggestions For You</h5>
                <hr />
                <div className="card-text">
                  <div className="row row-cols-1 g-3">
                    {allUser.length == 0 ? (
                      <div className="text-center mt-5">
                        <p className="text-muted">AllUser.msg</p>
                      </div>
                    ) : (
                      allUser.users.map((user) => {
                        return (
                          <div className="col" key={user._id}>
                            <div className="card">
                              <div className="card-body">
                                <Link
                                  to={`/profile/${user.username}`}
                                  className="text-decoration-none text-dark"
                                  style={{ cursor: "pointer" }}>
                                  <div className="w-100 d-flex align-items-center">
                                    <img
                                      src={user.profilephoto}
                                      className="profilephoto img-fluid rounded-circle"
                                      alt="pic"
                                    />
                                    <div className="d-flex flex-column">
                                      <div>
                                        <small className="ms-2 text-muted">
                                          {user.name}
                                        </small>
                                        <small className="text-muted ms-auto">
                                          {" "}
                                          • {user.postcount} posts
                                        </small>
                                      </div>
                                      <div>
                                        <small className="ms-2 text-muted">
                                          {user.bio}
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-5" />
      </div>
    </>
  );
};

export default Home;
