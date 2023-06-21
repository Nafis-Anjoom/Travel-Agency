import React from "react";

export default function EmpHome() {
    return (
        <>
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <button className="btn btn-primary">Manage Activities</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <button className="btn btn-primary">Manage Trips</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <button className="btn btn-primary">Manage Accomodations</button>
                    </div>
                </div>
            </div>
        </>
    );
}