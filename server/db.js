const {Pool} =require("pg");

const pool = new Pool({
    user: "postgres",
    password:"oyindamola",
    host: "localhost",
    port:5432,
    database:"newtodo"

});
module.exports = pool;