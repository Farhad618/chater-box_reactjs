// auth.js

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const Token = require('../models/Access_token');


// create user
router.post('/signup', [
		body('usr_id', 'User name must be atlist length >3').trim().isLength({ min: 3 }),
		body('pass', 'Password must be atlist length >3').trim().isLength({ min: 3 }),
		body('token', 'Token must be atlist length =9').trim().isLength({ min: 9, max: 9 })
	],(req, res) => {

	// if inputes are not valid then run this
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if the user already exists
    let findOneUserQuery = {usr_id: req.body.usr_id};
    User.findOne(findOneUserQuery).then(function(result) {
	    // if (err) throw err;
	    // console.log(result);
	    if (result) {
    		return res.status(400).json({ erro: "user already exists." });
	    } else {
	    	// token validation check
	    	let tokneFindQuery = { token: req.body.token }
	    	Token.deleteOne(tokneFindQuery).then((tokenResult) => {
	    		if (tokenResult.deletedCount) {
					  // if the user does not exists then create one
						const user = User(req.body);
						user.save()
						return res.status(200).json(req.body); 	    			
	    		} else {
	    			return res.status(400).json({ erro: "Not a valid token." });
	    		}
	    	});
	    }
  	});
});
/*
{
	"usr_id": "test4",
  "pass": "123",
  "token": "123456789"
}
*/


// login user
router.post('/login', [
		body('usr_id', 'User name must not be empty').isLength({ min: 1 }),
		body('pass', 'Password must not be empty').isLength({ min: 1 })
	],(req, res) => {

	// if inputes are not valid then run this
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if the user exists
    // let findOneUserQuery = {usr_id: req.body.usr_id};
    User.findOne(req.body).then(function(result) {
	    if (result) {
	    	return res.status(200).json({ usr_id: result.usr_id });    		
	    } else {
	    	return res.status(400).json({ erro: "user does not exists." });
	    }
  	});
});
/*
{
	"usr_id": "test4",
  "pass": "123"
}
*/



module.exports = router;

