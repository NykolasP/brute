export const mysql = require('mysql2')

export let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livecampus_brute",
})