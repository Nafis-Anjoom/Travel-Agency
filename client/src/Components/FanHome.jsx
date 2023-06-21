import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function FanHome() {
    const { fanId } = useParams();

    const [games, setGames] = useState([]) ;
    const [trips, setTrips] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const gamesResponse = await axios.get(`http://localhost:3005/games/${fanId}`);
            const tripsResponse = await axios.get(`http://localhost:3005/trips/${fanId}`);
            const activitiesResponse = await axios.get(`http://localhost:3005/activities/${fanId}`);

            setGames(gamesResponse.data.result);
            setTrips(tripsResponse.data.result);
            setActivities(activitiesResponse.data.result);

            console.log(games);
            console.log(trips);
            console.log(activities);
        }
        fetchData();

    }, []);

    // const accommodation = {
    //     name: "random hotel",
    //     address: "1234 Qatar road",
    //     roomNum: "304B"
    // }
    
    return (
        <>
            <Navbar />
            <div className="container">
                <h4>Upcoming Games</h4>
                <div className="row">
                    <div className="col">
                        <div id="upcomingGames">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Game</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((game) => {
                                        return (
                                            <tr>
                                                <td>{`${game.Team1} vs. ${game.Team2}`}</td>
                                                <td>{game.StartDateTime}</td>
                                                <td>
                                                    <Link to={`/fan/${fanId}/game/${game.GameID}`}>
                                                        <button className="btn btn-secondary">Details</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h4>Upcoming Activities</h4>
                <div className="row">   
                    <div className="col">
                        <div id="upcomingActivities">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Activity</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.map((activity) => {
                                        return (
                                            <tr>
                                                <td>{activity.Name}</td>
                                                <td>{activity.Location}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h4>Upcoming trips</h4>
                <div className="row">
                    <div className="col">
                        <div id="upcomingTrips">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>location</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trips.map((trip) => {
                                        return (
                                        <tr>
                                            <td>{trip.Destination}</td>
                                            <td>{trip.DepartureDateTime}</td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/*<h4>Accommodation Details</h4>*/}
                {/*<div className="row">*/}
                {/*    <div className="d-flex col flex-column">*/}
                {/*        <div>*/}
                {/*            <span>Name: </span><span>{accommodation.name}</span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <span>Address: </span><span>{accommodation.address}</span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <span>Room#: </span><span>{accommodation.roomNum}</span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <button className="btn btn-primary mb-4 mt-4">details</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
}