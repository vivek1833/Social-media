import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Explore = () => {
    return (
        <>
            <Navbar />
            <div className="container my-4">
                {/* Search Button to search profile of a user */}
                <div className="row">
                    <div className="col-md-6 col-12 mx-auto my-2">
                        <div className="input-group mb-3">
                            <input type="text" className="bg-light rounded-start form-control" placeholder="Search user" aria-label="Search" aria-describedby="button-search" />
                            <button className="rounded-end bg-secondary text-light btn btn-outline-secondary" type="button" id="button-search"> Search </button>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-3 row-cols-md-4 g-1">
                    <div className="col">
                        <div className="card h-100">
                            <Link to="https://source.unsplash.com/400x400?man">
                                <img src="https://source.unsplash.com/400x400?man" className="card-img-top" alt="card" />
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <Link to="https://source.unsplash.com/400x400?boy">
                                <img src="https://source.unsplash.com/400x400?boy" className="card-img-top" alt="card" />
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <Link to="https://source.unsplash.com/400x400?nature">
                                <img src="https://source.unsplash.com/400x400?nature" className="card-img-top" alt="card" />
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <Link to="https://source.unsplash.com/400x400?animal">
                                <img src="https://source.unsplash.com/400x400?animal" className="card-img-top" alt="card" />
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <Link to="https://source.unsplash.com/400x400?water">
                                <img src="https://source.unsplash.com/400x400?water" className="card-img-top" alt="card" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Explore;