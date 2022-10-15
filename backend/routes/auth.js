// auth.js

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const Token = require('../models/Access_token');
var bcrypt = require('bcryptjs');

// create user
router.post('/signup', [
		body('usr_id', 'User name must be atlist length >3').trim().isLength({ min: 3 }),
		body('pass', 'Password must be atlist length >3').trim().isLength({ min: 3 }),
		body('token', 'Token must be length =9').trim().isLength({ min: 9, max: 9 }),
		body('koken', 'Koken must be atlist length >3').trim().isLength({ min: 3 })
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
					  
					  // hashing password
					  bcrypt.genSalt(10, function(err, salt) {
					      bcrypt.hash(req.body.pass, salt, function(err, hash) {
					          let insOneUserQuery = { usr_id: req.body.usr_id, pass: hash }
					          const user = User(insOneUserQuery);
										user.save()
										// return res.status(200).json(req.body); 	    			
										return res.status(200).json(insOneUserQuery); 	    			
					      });
					  });


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
		body('pass', 'Password must not be empty').isLength({ min: 1 }),
		body('koken', 'Koken must be atlist length >3').trim().isLength({ min: 3 })
	],(req, res) => {

	// if inputes are not valid then run this
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if the user exists
    let findOneUserQuery = {usr_id: req.body.usr_id};
    User.findOne(findOneUserQuery).then(function(result) {
	    if (result) {
	    	// if found one user then check hash password
	    	bcrypt.compare(req.body.pass, result.pass, function (err, isMatch) {
	    		if (isMatch) {
	    			return res.status(200).json({ usr_id: result.usr_id });
	    			// return res.status(200).json(req.body); 		
	    		} else{
	    			return res.status(401).json({ erro: "user does not exists." });
	    		}
	    	})
	    } else {
	    	return res.status(401).json({ erro: "user does not exists." });
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

