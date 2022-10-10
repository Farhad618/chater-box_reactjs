// Chats.js


const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatsSchema = new Schema({
  usr_id: {
  	type: String,
  	required: true
  },
  koken: {
  	type: String,
  	required: true
  },
  chat: {
  	type: String,
  	required: true
  }
});
const Chats = mongoose.model('chats', chatsSchema);
module.exports = Chats;