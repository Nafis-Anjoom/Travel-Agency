const db = require("../database");

const addFan = async (req, res) => {
    const fan = req.body;
    // const queryStatement = `INSERT INTO wct.BookingAgent(EmployerID, FirstName, LastName, ReferenceID)
    //     VALUES("${fan.employerId}", "${fan.firstName}", "${fan.lastName}", "${fan.referenceId}")`;
    const queryStatement = `INSERT INTO wct.Fans(FanID, BookingID, FirstName, LastName, Email, Password) VALUES(?, ?, ?, ?, ?, ?)`;

    try {
        // const response = await db.query(queryStatement);
        const response = await db.query(queryStatement, [fan.fanId, fan.bookingId, fan.firstName, fan.lastName, fan.email, fan.password]);
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

const editFan = async (req, res) => {
    const fan = req.body;
    const id = req.params.fanId;
    const queryStatement = `UPDATE wct.BookingAgent SET FanID = "${fan.fanId}", 
        BookingID = "${fan.bookingId}", FirstName = "${fan.firstName}", LastName = "${fan.lastName}", Email = "${fan.email}", Password = "${fan.password}"
        WHERE wct.Fan.FanID = "${id}"`;
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

const getVipFans = async (req, res) => {
    const queryStatement = `SELECT F.*
    FROM    Fans F
    WHERE NOT EXISTS (SELECT  G.GameID
    FROM  Games G 
    WHERE  NOT EXISTS (SELECT  A.FanID
    FROM  Attends A
    WHERE  G.GameID=A.GameID
    AND A.FanID = F.FanID))`;

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

const getFans = async (req, res) => {
    const queryStatement = `SELECT * FROM wct.fans`;

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

const deleteFan = async (req, res) => {
    const fanId = req.params.fanId;
    const queryStatement = `DELETE FROM wct.Fans WHERE FanID = ${fanId}`;

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
    addFan,
    editFan,
    getFans,
    deleteFan,
    getVipFans
}
