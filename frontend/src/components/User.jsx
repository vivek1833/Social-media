import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

const User = () => {
  const { username } = useParams();
  const [User, setUser] = useState("");

  const user = async () => {
    try {
      const res = await fetch(`https://social-media-backend-iu1c.onrender.com/profile/${username}`, {
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

      if (res.status !== 201) {
        const error = new Error(res.error);
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
      <div className="container my-4">
        <div className="row">
          <div className="col-12 mx-auto my-2">
            <img
              src={User.profilephoto}
              className="card-img-top rounded-circle w-25"
              alt="post"
            />
            <p>Username: {User.username}</p>
            <p>Name: {User.name}</p>
            <p>Bio: {User.bio}</p>
            <p>Followers: {User.followercount}</p>
            <p>Following: {User.followingcount}</p>
            <p>Posts: {User.postcount}</p>
          </div>
          <div className="col-12 mx-auto my-2">
            <h1>Posts</h1>
            <div className="row row-cols-3 row-cols-md-4 g-1 mt-md-3 mt-1">
              {User.posts &&
                User.posts.map((post) => {
                  return (
                    <div className="col" key={post._id}>
                      <div className="card">
                        <Link to={`/post/${post._id}`}>
                          <img
                            src={post.post}
                            className="card-img-top"
                            alt="post"
                          />
                        </Link>
                        <div className="card-body">
                          <p className="card-text">{post.caption}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
