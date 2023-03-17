const db = require("../model/helper");
require("dotenv").config();

//not done

var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

async function ensureLibraryBelongToUser(req, res, next) {

  // Get user_id from the "authorization" header with format "Bearer <user_id>"
  let authHeader = req.headers["authorization"];
  // Separate 'Bearer' and token to keep only the token
  let [str, id] = authHeader.split(" ");
  try {
    // Throws error on invalid/missing user_id
    // remember, payload includes the user_id we added to it when we created the token
    let payload = jwt.verify(id, supersecret);

    //everything is awesome!
    //get from the payload the user_id and store in the req so we can use later
    req.user_id = payload.user_id;
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}
 
module.exports = ensureLibraryBelongToUser;
