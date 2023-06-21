import React, { useState, useEffect } from "react";


export default function EditTrip() {
    const [fans, setFans] = useState([]);
    const [addedToTrip, EditList] = useState([]);

    const addFan = (fanId) => {
        if (!addedToTrip.includes(fanId)) {
            EditList([fanId, ...addedToTrip]);
        }
    }

    const removeFan = (fanId) => {
        if (addedToTrip.includes(fanId)) {
            if (addedToTrip.includes(fanId)) {
                const newList = addedToTrip.filter((id) => fanId !== id);
                EditList(newList);
            }
        }
    }

    const handleFan = (event) => {
        if (event.target.value !== "") {
            addFan(event.target.value);
        }
    }

    useEffect(() => {
        const fans = [
            {
                fanId: "adsfad",
                name: "jose",
                email: "adfadsf@adfadsf.com",
                phoneNum: "12345567"
            },
            {
                fanId: "adsf",
                name: "jose",
                email: "adfadsf@adfadsf.com",
                phoneNum: "12345567"
            },
            {
                fanId: "jghjd",
                name: "jose",
                email: "adfadsf@adfadsf.com",
                phoneNum: "12345567"
            }
        ];
        setFans(fans);
    }, []);

    
    return (
        <>
            <div className="container">
                <form>
                    <div class="mb-3">
                        <label for="destination" class="form-label">Destination</label>
                        <input class="form-control" id="destination"/>
                    </div>
                    <div class="mb-3">
                        <span for="description" class="form-label">description</span>
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFan} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option value = "" selected>Add Fans</option>
                            {fans.map((fan) => {
                                return (
                                    <option value={fan.fanId}><span>{`${fan.fanId} ${fan.name}`}</span></option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="departureDateTime">Departure</label>
                        <input type="date" id="departureDateTime" name="departureDateTime" />
                    </div>
                    <div className="mb-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addedToTrip.map((fanId) => {
                                    const fan = fans.filter((temp) => temp.fanId === fanId)[0];
                                    return (
                                        <tr>
                                            <td>{fan.fanId}</td>
                                            <td>{fan.name}</td>
                                            <td>{fan.email}</td>
                                            <td>{fan.phoneNum}</td>
                                            <td><button onClick={() => removeFan(fanId)}>remove</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-danger">Delete Trip</button>
                    </div>
                </form>
                
            </div>
        </>
    );
}