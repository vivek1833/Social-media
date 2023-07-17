import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { URL } from "../services/helper";

const User = () => {
  const { username } = useParams();
  const [User, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const user = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/profile/${username}`, {
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
        username: data.user.username,
        name: data.user.name,
        bio: data.user.bio,
        followercount: data.user.followercount,
        followingcount: data.user.followingcount,
        profilephoto: data.user.profilephoto,
        postcount: data.user.postcount,
        posts: data.userpost,
      });

      setLoading(false);

      if (res.status !== 201) {
        const error = new Error(res.error);
        setLoading(false);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    user();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 mt-md-3 mt-1">
            <div className="col mt-3 ">
              <div className="text-center h-100">
                <img
                  src={User.profilephoto}
                  alt="profilePhoto"
                  className="rounded-circle w-50"
                />
              </div>
            </div>
            <div className="col">
              <div>
                <div className="card-body mt-2">
                  <h4 className="card-title text-center">{User.username}</h4>
                  <div className="d-flex justify-content-between mt-3">
                    <p>
                      <span className="fw-bold"> {User.postcount} </span> posts
                    </p>
                    <p>
                      <span className="fw-bold"> {User.followercount} </span>
                      followers
                    </p>
                    <p>
                      <span className="fw-bold"> {User.followingcount} </span>
                      following
                    </p>
                  </div>
                  <div className="mt-0 mt-md-3">
                    <p className="fw-bold"> {User.name} </p>
                    <p id="bio">
                      <strong> {User.bio} </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-md-4   mt-0" />
          <h3 className="mt-2 text-center"> {User.name} Posts </h3>

          {/* User posts  */}
          <div className="row row-cols-3 g-1">
            {User.posts &&
              User.posts.map((post) => {
                return (
                  <div className="col profilePost" key={post._id}>
                    <div className="card">
                      <Link to={`/post/${post._id}`}>
                        <img
                          src={post.post}
                          className="card-img-top"
                          alt="post"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          <hr className="mb-5" />
        </div>
      )}
    </>
  );
};

export default User;
