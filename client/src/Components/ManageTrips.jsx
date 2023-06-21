import react, {useEffect, useState} from "react";
import axios from "axios";

export default function ManageTrips() {
    const [trips, setTrips] = useState([]);
    const [countTrips, setCountTrips] = useState([]);
    const [isGroupApplied, setGroupApplied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!isGroupApplied) {
                const response = await axios.get("http://localhost:3005/trips");
                setTrips(response.data.result);
            } else {
                const response = await axios.get("http://localhost:3005/groupedTrips");
                setCountTrips(response.data.result);
            }

        }
        fetchData();
    }, [isGroupApplied]);


    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Manage Trips</h1>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <button
                            className="btn btn-primary"
                            onClick={() => {setGroupApplied(!isGroupApplied)}}
                            >
                            {isGroupApplied ? "Show default" : "Show count by Destination"}
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {!isGroupApplied ? defaultTable(trips) : countTable(countTrips)}
                    </div>
                </div>
            </div>
        </>
    );
}

function defaultTable(trips) {
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>Trip Id</th>
                    <th>Destination</th>
                    <th>When</th>
                </tr>
                </thead>
                <tbody>
                    {trips.map((trip) => {
                        return (
                            <tr>
                                <td>{trip.TripID}</td>
                                <td>{trip.Destination}</td>
                                <td>{trip.DepartureDateTime}</td>
                                <td>{trip.TripManagerID}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </>
    );
}


function countTable(countTrips) {
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>Destination</th>
                    <th>Count</th>
                </tr>
                </thead>
                <tbody>
                {countTrips.map((trip) => {
                    return (
                        <tr>
                            <td>{trip.Destination}</td>
                            <td>{trip.Count}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}