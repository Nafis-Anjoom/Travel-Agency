import react, {useEffect, useState} from "react";
import axios from "axios";

export default function ViewGames() {
    const [games, setGames] = useState([]);
    const [fanId, setFanId] = useState("");
    const [filter, setFilter] = useState("fanId");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3005/allGames");
            setGames(response.data.result);
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            if (filter === "fanId") {
                const response = await axios.get(`http://localhost:3005/games/${fanId}`);
                setGames(response.data.result);
            } else {
                const response = await axios.get(`http://localhost:3005/gamesByDate/`, {
                    params: {
                        startDate: startDate,
                        endDate: endDate
                    }
                });
                setGames(response.data.result);
            }
        }
        fetchData();
    }

    const refreshPage = () => {
        window.location.reload(false);
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>View Games</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-auto p-2 align-self-center">
                            Filter By
                        </div>
                        <div className="col-auto p-2 align-self-center">
                            <select className="form-select" onChange={(event) => setFilter(event.target.value)}>
                                <option value="fanId">Fan Id</option>
                                <option value="date">Date Range</option>
                            </select>
                        </div>
                        {filter === "fanId" ? <div className="col-auto p-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Fan Id"
                                onChange={(event) => setFanId(event.target.value)}
                            />
                        </div> : <>
                            <div className="col-auto p-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Start Date(YYYY-MM-DD)"
                                    onChange={(event) => setStartDate(event.target.value)}
                                />
                            </div>
                            <div className="col-auto p-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="End Date(YYYY-MM-DD)"
                                    onChange={(event) => setEndDate(event.target.value)}
                                />
                            </div>
                        </>}
                        <div className="col-auto p-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="col-auto p-2">
                            <button className="btn btn-secondary" onClick={refreshPage}>Reset</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Game Id</td>
                                    <td>Team 1</td>
                                    <td>team 2</td>
                                    <td>Stadium</td>
                                    <td>When</td>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map((game) => {
                                    return (
                                        <tr>
                                            <td>{game.GameID}</td>
                                            <td>{game.Team1}</td>
                                            <td>{game.Team2}</td>
                                            <td>{game.StadiumName}</td>
                                            <td>{game.StartDateTime}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}