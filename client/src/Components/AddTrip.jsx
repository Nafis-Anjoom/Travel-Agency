import React, { useState, useEffect } from "react";
import axios from "axios";


export default function AddTrip() {
    const [fans, setFans] = useState([]);
    const [addedToTrip, EditList] = useState([]);
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState("");

    const addFan = (fanId) => {
        if (!addedToTrip.includes(fanId)) {
            EditList([fanId, ...addedToTrip]);
        }
    }

    const removeFan = (fanId) => {
        if (addedToTrip.includes(fanId)) {
            const newList = addedToTrip.filter((id) => parseInt(fanId) !== parseInt(id));
            EditList(newList);
        }
    }

    const handleFan = (event) => {
        if (event.target.value !== "") {
            addFan(parseInt(event.target.value));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3005/fans");
            setFans(response.data.result);
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        const fetchData = async () => {
            const addTripResponse = await axios.post("http://localhost:3005/addTrip", {
                destination: destination,
                departureDateTime: departure,
                tripManagerID: 1
            });
            const tripId = addTripResponse.data.result.insertId;
            console.log(tripId);
            const addFansToTripsResponse = await axios.post(`http://localhost:3005/addFansToTrip`, {
                tripId: tripId,
                addedToTrip: addedToTrip
            });
        }
        fetchData();
    }

    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Add Trip</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Destination</label>
                        <input className="form-control" id="destination" onChange={(event) => setDestination(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFan} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option value = "" selected>Add Fans</option>
                            {fans.map((fan) => {
                                return (
                                    <option value={fan.FanID}><span>{`${fan.FanID} ${fan.FirstName}`}</span></option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Departure</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => {setDeparture(event.target.value)}}
                            placeholder="YYYY-MM-DD HH:MM:SS"
                        />
                    </div>
                    <div className="mb-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addedToTrip.map((fanId) => {
                                    const fan = fans.filter((temp) => {
                                        return parseInt(temp.FanID) === parseInt(fanId)
                                    })[0];
                                    return (
                                        <tr>
                                            <td>{fan.FanID}</td>
                                            <td>{fan.FirstName}</td>
                                            <td>{fan.LastName}</td>
                                            <td>{fan.Gender}</td>
                                            <td>{fan.Email}</td>
                                            <td><button type="button" className="btn btn-secondary" onClick={(event) => removeFan(fan.FanID)}>remove</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
        </>
    );
}