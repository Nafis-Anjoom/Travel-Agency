const db = require("../database");

const getActivities = async (req, res) => {
    const fanId = req.params.fanId;

    const queryStatement = `SELECT Activities.ActivityID, Activities.Name, Activities.Location, Activities.TripManagerID, Activities.Description
    FROM Activities
    JOIN Participates ON Activities.ActivityId = Participates.ActivityId
    WHERE fanId = ${fanId}`;

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
    getActivities
}