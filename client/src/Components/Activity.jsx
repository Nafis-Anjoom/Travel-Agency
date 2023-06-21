import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Activity() {
    const [activity, setActivity] = useState({});

    useEffect(() => {
        setActivity({
            name: "Camel rides",
            dateTime: "12/12/022 9:00 pm UTC",
            description: "Praesent scelerisque eleifend eros sit amet volutpat. Donec magna nulla."
        });
    })
    
    const showBookingAgent = () => {
        alert("booking agent");
    }

    return (
        <>
            <div className="container">
                <Navbar />
                <h2>Activity</h2>
                
                <div className= "row">{`Name: ${activity.name}`}</div>
                <div className= "row">{`Date: ${activity.dateTime}`}</div>
                <div className= "row">Description</div>
                <div className= "row">{activity.description}</div>
                <div className="row">
                    <button onClick={showBookingAgent}>contact booking agent</button>
                </div>    
            </div>
        
        </>
    );
}