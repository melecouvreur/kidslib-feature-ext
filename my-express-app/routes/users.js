var express = require('express');
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const ensureUserLoggedIn = require("../guards/ensureUserLoggedIn")
const ensureUserExists = require("../guards/ensureUserExists")

const bcrypt = require("bcrypt");
const saltRounds = 7;
const supersecret = process.env.SUPER_SECRET;

/**
 * Helpers
 **/

async function sendAllUsers(res) {
  let results = await db('SELECT * FROM users ORDER BY id');
  res.send(results.data);
}

//Convert DB results into a useful JSON format: user obj with nested array of book objs. 
//Didn't manage to test this out
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];
  // Create array of book objs
  let books = [];
  if (row0.libraryId) {
      books = results.data.map(b => ({
          bId: b.bookId,
          uId: b.userId,
          libraryId: b.libraryId
      }));
  }
    // Create user obj
    let user = {
      id: row0.uId,
      books
  };
  return user;
}
/**
 * Routes
 **/

/* GET all users */
router.get("/all", function(req, res, next) {
  try {
    sendAllUsers(res)
  }
  catch (err) {
  res.status(500).send({err: err.message})
  }
});

/*GET all info from junction table books_users. For testing*/
router.get("/books",  async (req, res) => {
  try {
    const results = await db('SELECT * FROM books_users;')
    res.status(200).send(results.data)
  }
  catch (err) {
  res.status(500).send({err: err.message})
  }
});
 
/* POST username, password, email to register new user */
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPWD = await bcrypt.hash(password, saltRounds)
    try {
      await db(
      `INSERT into users (username, email, password) VALUES ("${username}", "${email}", "${hashedPWD}")`);
      res.status(200).send({message: "Registration successful"})
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }); 

/* POST username and password to login user */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const results = await db(
      `SELECT * FROM users WHERE username = "${username}";`
      );
      const user = results.data[0];
      //if user found, compare pw
      if (user) {
      const user_id = user.id;
      const correctPassword = await bcrypt.compare(password, user.password); 
        // compare pw req body to db pw. returns boolean. bcrypt method
  
      if (!correctPassword) throw new Error("Incorrect password");
        //if pw patches create token
      const token = jwt.sign({ user_id: user.id }, supersecret); 
        //jwt method, takes param user_id as payload and supersecret key .env
        //send token to user
      console.log(token)

      res.send({ message: "Login successful, here is your token", token });
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });

// GET user by ID - not working on postman
router.get('/private/:id', ensureUserExists, async function(req, res) {
    // check user exists
    try {
       let user = res.locals.user;
        // Get user; use LEFT JOIN to also return books. 
        let sql = 
       `UNLOCK TABLES; 
        SELECT users.*, mylibrary.*, 
        users.id AS userId, 
        mylibrary.id AS libraryId
        FROM users
        LEFT JOIN books_users
        ON users.id = books_users.uId
        LEFT JOIN mylibrary
        ON books_users.bId = mylibrary.id
        WHERE users.id = ${user};`

        let results = await db(sql);
        //user = joinToJson(results);
        //res.send(user);
        res.status(200).send(results.data)
        console.log(`results: ${JSON.stringify(results)}`)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

//Private route for logged in users only
router.get("/private", ensureUserLoggedIn, (req, res) => {
    res.status(200).send({
      message: "here is your protected data " + req.user_id})
})

module.exports = router;

