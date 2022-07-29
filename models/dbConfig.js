const mysql = require('mysql2');

const db = mysql.createConnection({
    host:process.env.MYSQLHOST,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASS,
    port:process.env.MYSQLPORT,
    database:process.env.MYSQLDATABASE
});

db.connect((err)=>{
   if (err) {
    console.log(`erreur de connexion`);
   }})
module.exports = db;