import React from 'react';

const Body = () => {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-5 mt-md-3 mt-1">
                <div className="col mt-4">
                    <div className="card h-100">
                        <div className="card-footer">
                            <div className="w-25 d-flex flex-row align-items-center">
                                <img src="https://source.unsplash.com/400x400?man" className="img-fluid rounded-circle w-50" alt="" />
                                <small className="ms-2"> Name </small>
                                <small className="ms-1 text-muted"> • </small>
                                <small className="ms-1 text-muted"> 6h </small>
                            </div>
                        </div>
                        <img src="https://source.unsplash.com/800x600?man" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">
                                <span><strong> Name </strong></span>
                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn"><i className="bi bi-heart"></i></button>
                            <button className="btn"><i className="bi bi-chat"></i></button>
                            <button className="btn"><i className="bi bi-share"></i></button>
                            <small className="text-muted text-end"> 2.8k likes </small>
                        </div>
                    </div>
                </div>
                <div className="col mt-4">
                    <div className="card h-100">
                        <div className="card-footer">
                            <div className="w-25 d-flex flex-row align-items-center">
                                <img src="https://source.unsplash.com/400x400?girl" className="img-fluid rounded-circle w-50" alt="" />
                                <small className="ms-2"> Name </small>
                                <small className="ms-1 text-muted"> • </small>
                                <small className="ms-1 text-muted"> 6h </small>
                            </div>
                        </div>
                        <img src="https://source.unsplash.com/800x600?girl" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">
                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn"><i className="bi bi-heart"></i></button>
                            <button className="btn"><i className="bi bi-chat"></i></button>
                            <button className="btn"><i className="bi bi-share"></i></button>
                            <small className="text-muted text-end"> 7.9k likes </small>
                        </div>
                    </div>
                </div>
                <div className="col mt-4">
                    <div className="card h-100">
                        <div className="card-footer">
                            <div className="w-25 d-flex flex-row align-items-center">
                                <img src="https://source.unsplash.com/400x400?heroine" className="img-fluid rounded-circle w-50" alt="" />
                                <small className="ms-2"> Name </small>
                                <small className="ms-1 text-muted"> • </small>
                                <small className="ms-1 text-muted"> 6h </small>
                            </div>
                        </div>
                        <img src="https://source.unsplash.com/800x600?heroine" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">
                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn"><i className="bi bi-heart"></i></button>
                            <button className="btn"><i className="bi bi-chat"></i></button>
                            <button className="btn"><i className="bi bi-share"></i></button>
                            <small className="text-muted text-end"> 11.2k likes </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;