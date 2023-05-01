import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  // Search user function
  const findUser = () => {
    const res = fetch(`https://social-media-backend-iu1c.onrender.com/getuser/${input}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSearch({
          users: data.users,
        });
        setInput("");
      });
  };

  // Show every post
  const showPosts = async () => {
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
      setUsers({
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
    showPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          {/* Search Button */}
          <div className="row col-md-6 col-12 mx-auto my-2">
            <div className="input-group mb-3">
              <input
                type="text"
                className="bg-light rounded-start form-control"
                placeholder="Search User"
                name="search"
                id="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={findUser}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* show users  */}
        {search.users &&
          search.users.map((user) => {
            return (
              <div className="row row-cols-3 row-cols-md-4 g-1">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <div className="card" key={user._id}>
                        <div className="card-body text-center">
                          <Link
                            to={`/profile/${user.username}`}
                            className="text-decoration-none text-dark"
                            style={{ cursor: "pointer" }}>
                            <img
                              src={user.profilephoto}
                              className="card-img-top rounded-circle mx-auto d-block img-fluid"
                              alt="card"
                            />
                            <p className="card-title">{user.name}</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Content  */}
        <div className="row row-cols-3 row-cols-md-4 g-1">
          {users.userdata &&
            users.userdata.map((post) => {
              return (
                <div className="col profilePost" key={post._id}>
                  <div className="card h-100">
                    <Link to={`/post/${post._id}`}>
                      <img
                        src={post.post}
                        className="card-img-top"
                        alt="card"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Explore;
