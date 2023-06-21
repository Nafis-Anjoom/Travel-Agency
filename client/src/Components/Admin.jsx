import react from "react";
import {Link} from "react-router-dom";
import React from "react";


export default function Admin() {
    return (
        <>
            <div className="row m-4">
                <div className="col">
                    <Link to="/manageAccommodations" className="btn btn-primary">Manage Accommodations</Link>
                </div>
            </div>
            <div className="row m-4">
                <div className="col">
                    <Link to="/fansAnalytics" className="btn btn-primary">Fans Analytics</Link>
                </div>
            </div>
            <div className="row m-4">
                <div className="col">
                    <Link to="/manageFans" className="btn btn-primary">Manage Fans</Link>
                </div>
            </div>
            <div className="row m-4">
                <div className="col">
                    <Link to="/viewGames" className="btn btn-primary">View Games</Link>
                </div>
            </div>
            <div className="row m-4">
                <div className="col">
                    <Link to="/addTrip" className="btn btn-primary">Add Trip</Link>
                </div>
            </div>


        </>
    );
}