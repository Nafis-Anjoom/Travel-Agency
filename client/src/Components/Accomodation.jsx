import React, { useState, useEffect } from "react";


// TODO: get booking agent details and alert
export default function Accomodation() {
    const [accomodation, setAccomodation] = useState({});
    const [bookingAgent, setBookingAgent] = useState({});

    useEffect(() => {
      setAccomodation({
        name: "Qatar hotel",
        address: "1234 Qatar road",
        roomNumber: "304",
        checkInDate: "12/12/2022",
        checkOutDate: "12/12/2022",
        BookingId: "asdfadsf"
    });
    }, []);

    useEffect(() => {
        setBookingAgent({
            name: "David Blaine",
            phoneNum: "123456789",
            email: "ggez@ggez.com"
        });
    }, []);

    const showBookingAgentDetails = (event) => {
        alert(`name: ${bookingAgent.name}, phone#: ${bookingAgent.phoneNum}, email: ${bookingAgent.email}`);
    } 
    
   
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <span>{accomodation.name}</span>
                    <span>{accomodation.address}</span>
                    <span>{accomodation.roomNumber}</span>
                    <span>{accomodation.checkInDate}</span>
                    <span>{accomodation.checkOutDate}</span>
                    <span>{accomodation.bookingId}</span>
                    <button onClick={showBookingAgentDetails}>contact your booking agent</button>
                </div>
            </div>
        </>
    );
}