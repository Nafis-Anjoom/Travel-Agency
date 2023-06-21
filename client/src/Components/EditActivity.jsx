import React, { useState, useEffect } from "react";


export default function EditActivity() {
    const [fans, setFans] = useState([]);
    const [addedtoActivity, EditList] = useState([]);

    const addFan = (fanId) => {
        if (!addedtoActivity.includes(fanId)) {
            EditList([fanId, ...addedtoActivity]);
        }
    }

    const removeFan = (fanId) => {
        if (addedtoActivity.includes(fanId)) {
            if (addedtoActivity.includes(fanId)) {
                const newList = addedtoActivity.filter((id) => fanId !== id);
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
                    <div className="mb-3">
                        <label>Location</label>
                        <input className="form-control" id="location"/>
                    </div>
                    <div class="mb-3">
                        <span class="form-label">description</span>
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="mb-3">
                        <span className="form-label">Entry cost</span>
                        <input className="form-control" id="entryCost"/>
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
                        <label for="date">Date</label>  
                        <input type="date" id="date" name="date" />
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
                                {addedtoActivity.map((fanId) => {
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
                        <button className="btn btn-danger">Delete Activity</button>
                    </div>
                </form>
                
            </div>
        </>
    );
}