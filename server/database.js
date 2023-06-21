const mysql = require("mysql2/promise");
const config = require("./config");

async function query(queryStatement, params) {
    const connection = await mysql.createConnection(config.databaseInfo);
    const [rows, fields] = await connection.execute(queryStatement, params);
    return rows;
}

module.exports = {
    query
};