import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="container">
                <div className="row my-4">
                    <div className="col">
                        <Link to="/admin" className="btn btn-primary">Sign in as admin</Link>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <Link to="/fan/1" className="btn btn-primary">Sign in as fan 1</Link>
                    </div>
                </div>
            </div>
        </>
    )
}