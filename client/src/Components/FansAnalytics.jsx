import react, {useEffect, useState} from "react";
import axios from "axios";

export default function FansAnalytics() {
    const [filter, setFilter] = useState("Nationality");
    const [fans, setFans] = useState([]);
    const [showDominant, setShowDominant] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!showDominant) {
                const response = await axios.get("http://localhost:3005/getAttendanceBy", {
                    params: {
                        filter: filter
                    }
                });
                setFans(response.data.result);
            } else {
                const response = await axios.get("http://localhost:3005/getDominantCountries");
                setFans(response.data.result);
            }
        }
        fetchData();
    }, [filter, showDominant]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Fans Analytics</h2>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col">
                        <form>
                            <div className="row">
                                {!showDominant ?
                                    <>
                                        <div className="col-auto align-self-center"><label>Show Attendance By</label></div>
                                        <div className="col-auto">
                                            <select
                                                className="form-select"
                                                onChange={(event) => setFilter(event.target.value)}
                                                disabled={showDominant}
                                            >
                                                <option value="Nationality" selected>Nationality</option>
                                                <option value="Gender">Gender</option>
                                            </select>
                                        </div>
                                    </>: <></>}
                                <div className="col-auto align-self-center">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input"
                                               type="checkbox"
                                               id="flexSwitchCheckDefault"
                                               onChange={() => {setShowDominant(!showDominant)}}/>
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                                Show dominant Countries
                                            </label>
                                    </div>
                                </div>
                                {/*<div className="col-auto">*/}
                                {/*    <button className="btn btn-primary">Submit</button>*/}
                                {/*</div>*/}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col">{showDominant ? "Showing countries that have attendance higher than the mean across all countries" : ""}</div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>{showDominant ? "Nationality" : filter}</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                            {fans.map((fan) => {
                                const values = Object.values(fan);
                                return (
                                    <tr>
                                        <td>{values[0]}</td>
                                        <td>{values[1]}</td>
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