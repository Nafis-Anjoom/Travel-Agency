import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {useParams, useNavigate } from "react-router-dom";


export default function Game() {
    const [gameInfo, setGameInfo] = useState({});
    const [isEditMode, setEditMode] = useState(false);
    const [newSeatNum, setNewSeatNum] = useState("");
    const [newZone, setNewZone] = useState("");
    const navigate = useNavigate();

    const { fanId, gameId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const gameInfoResponse = await axios.get(`http://localhost:3005/fan/${fanId}/game/${gameId}`);
            console.log(gameInfoResponse);
            const gameInfo = gameInfoResponse.data.result[0];
            console.log(gameInfo);
            setGameInfo({
                gameId: gameInfo.gameID,
                team1: gameInfo.Team1,
                team2: gameInfo.Team2,
                stadium: gameInfo.StadiumName,
                dateTime: gameInfo.StartDateTime,
                seatNum: gameInfo.SeatNum,
                zone: gameInfo.Zone
            });
        }
        fetchData();
    }, []);

    const handleCancel = () => {
        setNewSeatNum("");
        setNewZone("");
        setEditMode(false);
    }

    const handleSubmit = (event) => {
        const fetchData = async () => {
            const response = await axios.put(`http://localhost:3005/fan/${fanId}/game/${gameId}/seatNum/${gameInfo.seatNum}/zone/${gameInfo.zone}`, {
                newSeatNum: newSeatNum,
                newZone: newZone
            });
            if (response.data.statusCode !== 200) {
                alert("error occurred");
            }
        }
        fetchData();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        const fetchData = async() => {
            const response = await axios.delete(`http://localhost:3005/fan/${fanId}/game/${gameId}/seatNum/${gameInfo.seatNum}/zone/${gameInfo.zone}`);
            if (response.data.statusCode !== 200) {
                alert("error occurred");
            } else {
                navigate(`/fan/${fanId}`);
            }
        }
        return fetchData();
    }

    return (
        <>
            <Navbar />
            <div className="container h-100">
                <div className="row mb-5 mt-4">
                    <div className="col text-end">
                        <h2>{gameInfo.team1}</h2>
                    </div>
                    <div className="col text-center">
                        <h6>VS</h6>
                    </div>
                    <div className="col text-start">
                    <h2>{gameInfo.team2}</h2>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-center fs-4">
                        {gameInfo.dateTime}
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-center fs-4">{gameInfo.stadium}</div>
                </div>
                <div className="row">
                    <div className="col text-center fs-5">
                        <span className="px-1">Seat</span>
                        <span className="fw-bold">{gameInfo.seatNum}</span>
                        <span className="px-1">Zone</span>
                        <span className="fw-bold">{gameInfo.zone}</span>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <button className="btn btn-primary" onClick={() => {setEditMode(true)}}>Edit</button>
                    </div>
                </div>
                {isEditMode && <div className="row edit-ticket mt-5">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row my-3">
                                <label className="col-sm-1 col-form-label">Seat</label>
                                <div className="col-sm-2">
                                    <input type="text" className="form-control col-3" onChange={(event) => {setNewSeatNum(event.target.value)}}/>
                                </div>
                            </div>
                            <div className="form-group row my-3">
                                <label className="col-sm-1 col-form-label">Zone</label>
                                <div className="col-sm-2">
                                    <input type="text" className="form-control col-3" onChange={(event) => {setNewZone(event.target.value)}}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                <div className="col-sm-1">
                                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                </div>
                                <div className="col-sm-1">
                                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>}
            </div>
        </>
    );
}