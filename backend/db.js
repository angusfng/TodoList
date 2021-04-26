const credentials = require("./credentials.json");
const Pool = require("pg").Pool;

const pool = new Pool(credentials);

module.exports = pool;
