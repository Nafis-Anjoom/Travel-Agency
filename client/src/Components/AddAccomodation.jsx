import React from "react";

export default function AddAccomodation() {
    const createTiers = (tiers) => {
        var elements = [];
        for (let i = 1; i <= tiers; i++) {
            elements.push(
                <option value={i}>{i}</option>
            );
        }
        return elements;
    }

    return (
        <>
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label for="name">Name</label>
                        <input className="form-control" id="name"/>
                    </div>
                    <div className="mb-3">
                        <label for="address">Address</label>
                        <input className="form-control" id="address"/>
                    </div>
                    <div class="mb-3">
                        <span class="form-label">Type</span>
                        <select class="form-select form-select-lg mb-3">
                            <option value="" selected>select type</option>
                            {createTiers(5)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <span className="form-label">cost per night</span>
                        <input className="form-control" id="entryCost"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}
