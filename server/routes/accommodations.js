const db = require("../database");

const getAllAccommodations = async (req, res) => {
    const queryStatement = `SELECT * FROM wct.accommodations`;

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

const getAccommodationsByBudget = async (req, res) => {
    const budget = req.query.budget;
    const aggr = req.query.aggr;

    const queryStatement = `SELECT Accommodations.City, ${aggr}(Cost) as Cost FROM Accommodations
    GROUP BY City
    HAVING ${aggr}(Cost) <= ${budget}`;

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
    getAllAccommodations,
    getAccommodationsByBudget
}