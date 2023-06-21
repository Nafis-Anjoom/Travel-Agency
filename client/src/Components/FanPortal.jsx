import React from "react";
import { Link } from "react-router-dom";

export default function FanPortal(){
    return (
        <>
            <div className="container">
                <div className="row mb-4">
                    <div className="col">
                        <Link to="/fanSignIn" className="btn btn-primary">Sign in</Link>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <Link to="/fanSignUp" className="btn btn-primary">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}