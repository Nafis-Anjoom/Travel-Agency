const db = require("../database");

const getTripsByFanId = async (req, res) => {
    const fanId = req.params.fanId;

    const queryStatement = `SELECT Trips.TripID, Trips.Destination, Trips.DepartureDateTime, Trips.TripManagerID
    FROM Trips JOIN Takes ON Trips.TripID = Takes.FanId
    WHERE FanId = ${fanId}`;

    try {
        const response = await db.query(queryStatement);
        res.json({
            statusCode: 200,
            result: response
        });
    } catch (err) {
        res.json({
            statusCode: 500,
            result: err
        })
    }
}

const getAllTrips = async (req, res) => {
    const queryStatement = `SELECT * FROM wct.trips`;

    try {
        const response = await db.query(queryStatement);
        res.json({
            statusCode: 200,
            result: response
        });
    } catch (err) {
        res.json({
            statusCode: 500,
            result: err
        })
    }
}

const getTripsGroupedByDest = async (req, res) => {
    const queryStatement = `SELECT Trips.Destination, COUNT(*) as Count FROM Trips
    GROUP BY Destination`;

    try {
        const response = await db.query(queryStatement);
        res.json({
            statusCode: 200,
            result: response
        });
    } catch (err) {
        res.json({
            statusCode: 500,
            result: err
        })
    }
}

const addTrip = async (req, res) => {
    const trip = req.body;
    const queryStatement = `INSERT INTO wct.Trips(Destination, DepartureDateTime, TripManagerID) VALUES(?, ?, ?)`;
    try {
        const response = await db.query(queryStatement, [trip.destination, trip.departureDateTime, trip.tripManagerID]);
        res.json({
            statusCode: 200,
            result: response
        });
    } catch (err) {
        res.json({
            statusCode: 500,
            result: err
        })
    }
};

const addFansToTrips = async (req, res) => {
    const tripId = req.body.tripId;
    const fanIds = req.body.addedToTrip;
    console.log(fanIds);

    let queryStatement = `INSERT INTO wct.Takes(FanID, TripID) VALUES `;
    for (id of fanIds) {
        queryStatement += `(${id}, ${tripId}),`
    }
    queryStatement = queryStatement.substring(0, queryStatement.length - 1);
    try {
        const response = await db.query(queryStatement);
        res.json({
            statusCode: 200,
            result: response
        });
    } catch (err) {
        res.json({
            statusCode: 500,
            result: err
        })
    }
}


module.exports = {
    getTripsByFanId,
    getAllTrips,
    getTripsGroupedByDest,
    addTrip,
    addFansToTrips
}