import react, {useEffect, useState} from "react";
import axios from "axios";


export default function ManageFans() {
    const [fans, setFans] = useState([]);
    const [isVipFans, setIsVipFans] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!isVipFans) {
                const response = await axios.get("http://localhost:3005/fans");
                setFans(response.data.result);
            } else {
                const response = await axios.get("http://localhost:3005/getVipFans");
                setFans(response.data.result);
            }

        }
        fetchData();
    }, [isVipFans]);

    const deleteFan = (fanId) => {
        const fetchData = async () => {
            const response = await axios.delete(`http://localhost:3005/fan/${fanId}`);
        }
        fetchData();
        window.location.reload(false);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Manage Fans</h1>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => setIsVipFans(!isVipFans)}>
                            {!isVipFans ? "Show VIP Fans" : "Show all fans"}
                        </button>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col">{isVipFans ? "showing Fans who attends all the games" : ""}</div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Fan Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fans.map((fan) => {
                                    return (
                                        <tr>
                                            <td>{fan.FanID}</td>
                                            <td>{fan.FirstName}</td>
                                            <td>{fan.LastName}</td>
                                            <td>{fan.Email}</td>
                                            <td><button className="btn btn-danger" onClick={() => deleteFan(fan.FanID)}>Delete</button></td>
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