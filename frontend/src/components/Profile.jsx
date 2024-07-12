import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { URL } from "../services/helper";

const Profile = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState("");
  const [userpost, setUserPost] = useState("");
  const [loading, setLoading] = useState(false);

  const callProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/profile`, {
        method: "GET",
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
        setLoading(false);
        throw error;
      }

      if (data.userpost === null) {
        setUserPost([]);
      } else {
        setUserPost({
          posts: data.userpost,
        });
      }

      setUserData({
        username: data.userdetail.username,
        name: data.userdetail.name,
        bio: data.userdetail.bio,
        followers: data.userdetail.followercount,
        following: data.userdetail.followingcount,
        profilePhoto: data.userdetail.profilephoto,
        posts: data.userdetail.postcount,
      });

      setLoading(false);

     
    } catch (err) {
      console.log(err.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    callProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 mt-md-3 mt-1">
            <div className="col mt-3 ">
              <div className="text-center h-100">
                <img
                  src={userdata.profilePhoto}
                  alt="profilePhoto"
                  className="rounded-circle w-50"
                />
              </div>
            </div>
            <div className="col">
              <div>
                <div className="card-body mt-2">
                  <h4 className="card-title text-center">
                    {userdata.username}
                  </h4>
                  {/* edit profile button   */}
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/editprofile"
                      className="btn btn-primary"
                      style={{ cursor: "pointer" }}>
                      Edit Profile
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <p>
                      <span className="fw-bold"> {userdata.posts} </span> posts
                    </p>
                    <p>
                      <span className="fw-bold"> {userdata.followers} </span>
                      followers
                    </p>
                    <p>
                      <span className="fw-bold"> {userdata.following} </span>
                      following
                    </p>
                  </div>
                  <div className="mt-0 mt-md-3">
                    <p className="fw-bold"> {userdata.name} </p>
                    <p id="bio">
                      <strong> {userdata.bio} </strong>
                    </p>
                  </div>

                  {/* logout button  */}
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        localStorage.setItem("token", null);
                        navigate("/login");
                      }}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          ""
        ) : (
          <>
            <hr className="mt-md-4   mt-0" />
            <h3 className="mt-2 text-center"> {userdata.name} Posts </h3>
          </>
        )}

        {/* User posts  */}
        <div className="row row-cols-3 g-1">
          {userpost.posts &&
            userpost.posts.map((post) => {
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
    </>
  );
};

export default Profile;
