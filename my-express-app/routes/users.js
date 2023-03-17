var express = require('express');
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const ensureUserLoggedIn = require("../guards/ensureUserLoggedIn")
const ensureUserExists = require("../guards/ensureUserExists")
const bcrypt = require("bcrypt");
const ensureLibraryBelongToUser = require('../guards/ensureLibraryBelongToUser'); // testing for multi-user func. Not used atm!
const saltRounds = 7;
const supersecret = process.env.SUPER_SECRET;

/**
 * Helpers for multi-user func
 **/

async function sendAllUsers(res) {
  let results = await db('SELECT * FROM users ORDER BY id');
  res.send(results.data);
}

//Convert "/library/:id" DB results into a useful JSON format: user obj with nested array of book objs. 
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];
  // Create array of book objs
  let books = [];
  if (row0.libraryId) {
      books = results.data.map(b => ({
          bookId: b.bookId, //mylibrary table GoogleBookId
          libraryId: b.libraryId, //mylibrary table book id
          rating: b.rating, //mylibrary rating 
          review: b.review //mylibrary review
      }));
  }
    // Create user obj
    let user = {
      uId: row0.userId, //users table id
      books
  };
  return user;
}


/**
 * Routes
 **/

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
        //send token and user id to user
      console.log(token)

      res.send({ message: "Login successful, here is your token and id", token, user_id });
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });

//Private route for logged in users only
router.get("/private", ensureUserLoggedIn, (req, res) => {
  res.status(200).send({
    message: "here is your protected data " + req.user_id})
})

//
//Multi-user func related routes
//

/* GET all users. For testing */
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

// GET user-specific library info. Used in UserLibraryView Page.
router.get('/library/:id', ensureUserExists, async function(req, res) {
    // check user exists via ensureUserExists guard
    // & store user id in res.locals.user
    // get book data via LEFT JOIN to junction books_users and mylibrary table
    try {
       let user = res.locals.user;
       let sql = 
       `SELECT users.*, mylibrary.*, 
        users.id AS userId, 
        mylibrary.id AS libraryId
        FROM users
        LEFT JOIN books_users
        ON users.id = books_users.uId
        LEFT JOIN mylibrary
        ON books_users.bId = mylibrary.id
        WHERE users.id = ${user};`

        let results = await db(sql);
        userlib = joinToJson(results);
        res.status(200).send(userlib)
        //console.log(`results: ${JSON.stringify(results)}`)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

//Route to check if library belongs to user. Not sure this is needed. Probably too complex. 
//Didn't do much work on this.
/*
router.get("/library", ensureLibraryBelongToUser, (req, res) => {
  res.status(200).send({
    message: "This library belongs to user" + req.user_id})
})
*/

module.exports = router;

