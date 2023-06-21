const db = require("../database");

const getBookingAgents = async (req, res) => {
    const queryStatement = "SELECT * FROM wct.BookingAgent";
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

const addBookingAgent = async (req, res) => {
    const bookingAgent = req.body;
    console.log(bookingAgent);
    const queryStatement = `INSERT INTO wct.BookingAgent(EmployerID, FirstName, LastName, ReferenceID) VALUES(?, ?, ?, ?)`;
    try {
        const response = await db.query(queryStatement, [bookingAgent.employerId, bookingAgent.firstName, bookingAgent.lastName, bookingAgent.referenceId]);
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

const editBookingAgent = async (req, res) => {
    const bookingAgent = req.body;
    const id = req.params.employerId;
    const queryStatement = `UPDATE wct.BookingAgent SET EmployerID = "${bookingAgent.employerId}", 
        FirstName = "${bookingAgent.firstName}", LastName = "${bookingAgent.lastName}", ReferenceID = "${bookingAgent.referenceId}"
        WHERE wct.BookingAgent.EmployerID = "${id}"`;
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

const deleteBookingAgent = async (req, res) => {
    const id = req.params.employerId;
    const queryStatement = `DELETE FROM wct.BookingAgent WHERE EmployerID = "${id}"`;
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

module.exports = {
    getBookingAgents,
    editBookingAgent,
    deleteBookingAgent,
    addBookingAgent
}

