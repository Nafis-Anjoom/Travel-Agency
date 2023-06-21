import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Trip() {
    const [trip, setTrip] = useState({});

    const showBookingAgent = () => {
        alert("booking agent");
    }

    useEffect(() => {
        setTrip({
            destination: "mall",
            dateTime: "12/12/2022 9:00 pm UTC",
            description: "Praesent scelerisque eleifend eros sit amet volutpat. Donec magna nulla."
        });
    });
    
    return (
        <>
            <Navbar />
            <div className="row fs-6">
                <div className="col-2">Destination</div>
                <div className="col-2 fw-bold">{trip.destination}</div>
            </div>
            <div className="row fs-6">
                <div className="col-2">When </div>
                <div className="col-5 fw-bold">{trip.dateTime}</div>
            </div>
            <div className="row">
                <span>Description</span>
                <div>{trip.description}</div>
            </div>
            <div className="row my-3">
                <div className="col-7">
                    <button className="btn btn-primary" onClick={showBookingAgent}>contact booking agent</button>
                </div>
            </div>
        </>
    );
}