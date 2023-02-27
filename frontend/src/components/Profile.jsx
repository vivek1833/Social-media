import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 mt-md-3 mt-1">
                <div className="col mt-3 ">
                    <div className="text-center h-100">
                        <img src="https://source.unsplash.com/400x400?girl" alt="profilePhoto" className="rounded-circle w-50" />
                    </div>
                </div>
                <div className="col">
                    <div>
                        <div className="card-body mt-2">
                            <h4 className="card-title text-center"> UserName </h4>
                            <div className="d-flex justify-content-between mt-3">
                                <p> <span className="fw-bold"> 22 </span> posts </p>
                                <p> <span className="fw-bold"> 168 </span> followers </p>
                                <p> <span className="fw-bold"> 132 </span> following </p>
                            </div>
                            <div className="mt-0 mt-md-3">
                                <p className="fw-bold"> Name </p>
                                <p id="bio"> lorem20 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-md-4   mt-0" />
            <h3 className="mt-2 text-center"> Name Posts </h3>
            <div className="row row-cols-3 row-cols-md-4 g-1 mt-md-3 mt-1">
                <div className="col">
                    <div className="card h-100">
                        <Link to="https://source.unsplash.com/400x400?women">
                            <img src="https://source.unsplash.com/400x400?women" className="card-img-top" alt="card" />
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <Link to="https://source.unsplash.com/400x400?teen">
                            <img src="https://source.unsplash.com/400x400?teen" className="card-img-top" alt="card" />
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <Link to="https://source.unsplash.com/400x400?femine">
                            <img src="https://source.unsplash.com/400x400?femine" className="card-img-top" alt="card" />
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <Link to="https://source.unsplash.com/400x400?heroine">
                            <img src="https://source.unsplash.com/400x400?heroine" className="card-img-top" alt="card" />
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <Link to="https://source.unsplash.com/400x400?actress">
                            <img src="https://source.unsplash.com/400x400?actress" className="card-img-top" alt="card" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;