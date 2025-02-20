require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "mybooks",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = 
    `DROP TABLE if exists mylibrary; 
     CREATE TABLE mylibrary (
     id int NOT NULL AUTO_INCREMENT,
     bookId varchar(40),
     rating int,
     review varchar(255),
     PRIMARY KEY (id),
     UNIQUE KEY unique_bookid (bookId)
     );

     DROP TABLE IF EXISTS users; 
     CREATE TABLE users(
     id INT NOT NULL AUTO_INCREMENT,
     email VARCHAR(255) NOT NULL, 
     username VARCHAR(255) NOT NULL, 
     password VARCHAR(255) NOT NULL, 
     PRIMARY KEY (id),
     UNIQUE KEY unique_username (username)
    );`

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `MyLibrary` and `users' was successful!");
    console.log("Closing...");
  });
  con.end();
});
