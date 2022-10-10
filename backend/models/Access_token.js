// access token for login

const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
  	type: String,
  	required: true,
    // unique: true
  }
});
const Token = mongoose.model('access-token', tokenSchema);
// User.createIndexes();
module.exports = Token;