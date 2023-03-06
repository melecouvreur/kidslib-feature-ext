var express = require('express');
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const ensureUserLoggedIn = require("../guards/ensureUserLoggedIn")

const bcrypt = require("bcrypt");
const saltRounds = 7;
const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 
router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPWD = await bcrypt.hash(password, saltRounds)
    try {
      await db(
      `INSERT into users (username, email, password) VALUES ("${username}", "${email}", "${hashedPWD}")`);
      res.status(200).send({message: "Registration successful"})
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }); 
 

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
        const correctPassword = await bcrypt.compare(password, user.password); // compare pw req body to db pw. returns boolean. bcrypt method
  
        if (!correctPassword) throw new Error("Incorrect password");
        //if pw patches create token

        const token = jwt.sign({ user_id: user.id }, supersecret); //jwt method, takes param user_id as payload and supersecret key .env
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

//middleware
router.get("/private", ensureUserLoggedIn, (req, res) => {
    res.status(200).send({
      message: "here is your protected data" + req.user_id})
})

module.exports = router;

