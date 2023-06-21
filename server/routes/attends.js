const db = require("../database");

// edit seats for a specific fan for a specific game
const editSeats = async (req, res) => {
    const fanId = req.params.fanId;
    const seatNum = req.params.seatNum;
    const zone = req.params.zone;
    const gameId = req.params.gameId;

    const newSeatNum = req.body.newSeatNum;
    const newZone = req.body.newZone;

    const queryStatement = `UPDATE wct.Attends SET SeatNum = ${newSeatNum}, Zone = "${newZone}"
        WHERE FanID = ${fanId} AND SeatNum = ${seatNum} AND Zone = "${zone}" AND GameID = ${gameId}`;

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
};

// delete a ticket for a specific fan for a specific game
const deleteTicket = async (req, res) => {
    const fanId = req.params.fanId;
    const seatNum = req.params.seatNum;
    const zone = req.params.zone;
    const gameId = req.params.gameId;

    console.log(fanId);
    console.log(seatNum);
    console.log(zone);
    console.log(gameId);

    const queryStatement = `DELETE FROM wct.Attends WHERE FanID = ${fanId} AND SeatNum = ${seatNum} AND Zone = "${zone}" AND GameID = ${gameId}`;

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
};

const getTicket = async (req, res) => {
    const fanId = req.params.fanId;
    const gameId = req.params.gameId;

    const queryStatement = `SELECT Games.GameID, Games.Team1, Games.Team2, Games.StadiumName, Games.StartDateTime, Attends.SeatNum, Attends.Zone
    FROM Games
    JOIN Attends ON Games.GameID = Attends.GameID
    WHERE FanId = ${fanId} and Attends.GameID = ${gameId}`;

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

const getGamesByFanId = async (req, res) => {
    const fanId = req.params.fanId;

    const queryStatement = `SELECT Games.GameID, Games.Team1, Games.Team2, Games.StadiumName, Games.StartDateTime
    FROM Games JOIN Attends ON Attends.GameID = Games.GameID
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

const getGamesByDate = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const queryStatement = `SELECT * FROM wct.games WHERE StartDateTime >= "${startDate}" AND StartDateTime <= "${endDate}"`;

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

const getAllGames = async (req, res) => {
    const queryStatement = `SELECT * FROM wct.games`;

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

const getAttendanceBy = async (req, res) => {
    const filter = req.query.filter;

    const queryStatement = `SELECT Fans.${filter}, Count(*) AS Count
    FROM Fans 
    GROUP BY ${filter}`;

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

const getDominantCountry = async (req, res) => {
    const queryStatement = `Select Fans.Nationality, COUNT(*) AS Count
    FROM Fans
    GROUP BY Nationality
    HAVING Count >= ((SELECT COUNT(*) / (SELECT COUNT(DISTINCT(Nationality)) FROM Fans) FROM Fans))`;

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
    editSeats,
    deleteTicket,
    getGamesByFanId,
    getTicket,
    getAllGames,
    getGamesByDate,
    getAttendanceBy,
    getDominantCountry
}
