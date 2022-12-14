// chat.js
// this chat.js is for chat insert route

const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const Chats = require('../models/Chats');
const axios = require('axios');

const baseurl = process.env.BASEURL + process.env.PORT

// create chat/ insert chat
router.post('/insertchat', [
		body('usr_id', 'User name must not be empty').isLength({ min: 1 }),
		body('pass', 'Password must not be empty').isLength({ min: 1 }),
		body('koken', 'Koken must be atlist length >3').trim().isLength({ min: 3 }),
		body('chat', 'Chat must not be empty').trim().isLength({ min: 1 })
	],(req, res) => {

	// if inputes are not valid then run this
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    axios.post(baseurl+'/api/auth/login', {
        usr_id: req.body.usr_id,
        pass: req.body.pass,
        koken: req.body.koken
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Beared',
          },      
      })
      .then(function (loginResponse) {
        // console.log(loginResponse.data);
        // return res.json(loginResponse.data);

        let chatInsertQuery = {
    			usr_id: loginResponse.data.usr_id,
    			koken: req.body.koken,
    			chat: req.body.chat
		    }

		const chat = Chats(chatInsertQuery);
		chat.save();
		return res.status(200).json(chatInsertQuery); 

      }).catch(function(error) {
          return res.status(401).json(error.response.data);
      });
});
/*
{
  "usr_id": "far",
  "pass": "123",
  "koken": "123456789",
  "chat": "hi 1"
}
*/


// view all chat
router.post('/viewchat', [
    body('usr_id', 'User name must not be empty').isLength({ min: 1 }),
    body('pass', 'Password must not be empty').isLength({ min: 1 }),
    body('koken', 'Koken must be atlist length >3').trim().isLength({ min: 3 })
  ],(req, res) => {

  // if inputes are not valid then run this
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    axios.post(baseurl+'/api/auth/login', {
        usr_id: req.body.usr_id,
        pass: req.body.pass,
        koken: req.body.koken
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Beared',
          },      
      })
      .then(function () {
        let chatFindQuery = { koken: req.body.koken }
        const chatFindProjection = { _id: 1, usr_id: 1, chat: 1 };

        Chats.find(chatFindQuery, chatFindProjection).then(function(result) {
            return res.status(200).json(result);
        });
      }).catch(function(error) {
          return res.status(401).json(error.response.data);
      });
});
/*
{
  "usr_id": "far",
  "pass": "123",
  "koken": "123456789"
}
*/



module.exports = router;