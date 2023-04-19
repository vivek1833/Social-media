import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

const Explore = () => {
  const [search, setSearch] = useState("");

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
        console.log(data);
      });
  };

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
            <div className="card h-100 w-50">
              <div className="card-body">
                {search.users &&
                  search.users.map((user) => {
                    return (
                      <div className="card">
                        <div className="card-body">
                          <img
                            src={user.profilephoto}
                            className="card-img-top rounded-circle"
                            alt="card"
                          />
                          <p className="card-title">{user.username}</p>
                          <Link
                            to={`/${user.username}`}
                            className="btn btn-primary">
                            View Profile
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
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?man">
                <img
                  src="https://source.unsplash.com/400x400?man"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?boy">
                <img
                  src="https://source.unsplash.com/400x400?boy"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?nature">
                <img
                  src="https://source.unsplash.com/400x400?nature"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?animal">
                <img
                  src="https://source.unsplash.com/400x400?animal"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <Link to="https://source.unsplash.com/400x400?water">
                <img
                  src="https://source.unsplash.com/400x400?water"
                  className="card-img-top"
                  alt="card"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
