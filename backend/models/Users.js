// Users.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  usr_id: {
  	type: String,
  	required: true,
    unique: true
  },
  pass: {
  	type: String,
  	required: true
  }
});
const User = mongoose.model('users', usersSchema);
// User.createIndexes();
module.exports = User;