import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // Search user function
  const findUser = () => {
    const res = fetch(`http://localhost:8000/getuser/${search}`, {
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
      });
  };

  // Show every post
  const showPosts = async () => {
    try {
      const res = await fetch("http://localhost:8000/home", {
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
        {/* Search Button */}
        <div className="row">
          <div className="col-md-6 col-12 mx-auto my-2">
            <div className="input-group mb-3">
              <input
                type="text"
                className="bg-light rounded-start form-control"
                placeholder="Search User"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="rounded-end bg-secondary text-light btn btn-outline-secondary"
                type="button"
                id="btnSearch"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-content="Bottom popover"
                onClick={findUser}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* show users  */}
        <div className="row row-cols-3 row-cols-md-4 g-1">
          <div className="col">
            <div className="card">
              <div className="card-body">
                {search.users &&
                  search.users.map((user) => {
                    return (
                      <div className="card">
                        <div className="card-body text-center">
                          <Link
                            to={`/profile/${user.username}`}
                            className="text-decoration-none text-dark"
                            style={{ cursor: "pointer" }}>
                            <img
                              src={user.profilephoto}
                              className="card-img-top rounded-circle mx-auto d-block img-fluid" 
                              // width for small devices 100 and large devices 50 px
                              alt="card"
                            />
                            <p className="card-title">{user.name}</p>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

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
