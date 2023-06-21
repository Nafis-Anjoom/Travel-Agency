import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ManageAccommodations() {
    const [accommodations, setAccommodations] = useState([]);
    const [applyField, setApplyField] = useState("");
    const [budget, setBudget] = useState(0);
    const [isGrouped, setIsGrouped] = useState(false);

    const handleApply = (event) => {
        if (event.target.value !== "") {
            setApplyField(event.target.value);
        }
    }

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3005/accommodations");
            setAccommodations(response.data.result);
        }
        fetchData();
    }, [isGrouped]);

    const handleSubmit = () => {
        setIsGrouped(true);
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3005/accommodationsByBudget/", {
                params: {
                    budget: budget,
                    aggr: applyField
                }
            });
            setAccommodations(response.data.result);
        }
        fetchData();
    }

    const defaultTable = (accommodations) => {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>tier</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                {accommodations.map((accommodation) => {
                    return (
                        <tr>
                            <td>{accommodation.Name}</td>
                            <td>{accommodation.Address}</td>
                            <td>{accommodation.City}</td>
                            <td>{accommodation.Tier}</td>
                            <td>{accommodation.Cost}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    const cityCountTable = (accommodations) => {
        return (
            <table className="table">
                <thead>
                <tr>

                    <th>City</th>
                    <th>{`${applyField} Cost`}</th>
                </tr>
                </thead>
                <tbody>
                {accommodations.map((accommodation) => {
                    return (
                        <tr>
                            <td>{accommodation.City}</td>
                            <td>{accommodation.Cost}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Manage Accommodations</h1>
                    </div>
                </div>
                <div className="row optionsContainer">
                    <div className="col col-auto d-flex p-2">
                        <div className="d-flex m-2">
                            Group By
                        </div>
                        <div className="d-flex align-self-center fw-bold">
                            City
                        </div>
                    </div>
                    <div className="col col-auto d-flex p-2">
                        <div className="d-flex m-2">
                            Evaluate cost
                        </div>
                        <div className="d-flex">
                            <select className="form-select" name="groupBy" id="groupBy" onChange={handleApply}>
                                <option value="" selected>Default</option>
                                <option value="min">Minimum</option>
                                <option value="max">Maximum</option>
                                <option value="avg">Average</option>
                            </select>
                        </div>
                    </div>
                    <div className="col col-auto d-flex p-2">
                        <div className="m-2">
                            Budget
                        </div>
                        <div>
                            <input type="text" className="form-control" onChange={handleBudgetChange}/>
                        </div>
                    </div>
                    <div className="col col-auto align-self-center">
                        <button className="btn btn-primary" onClick={handleSubmit}>Apply</button>
                    </div>
                    <div className="col col-auto align-self-center">
                        <button className="btn btn-secondary" onClick={() => setIsGrouped(false)}>Reset</button>
                    </div>
                </div>

                <div>{!isGrouped ? defaultTable(accommodations) : cityCountTable(accommodations)}</div>
            </div>
        </>
    );
}