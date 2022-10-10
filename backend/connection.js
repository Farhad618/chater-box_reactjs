// connection.js

// "mongodb+srv://admin_farhad:9Xalc9Re9fBB2TPU@cluster0.guc3q.mongodb.net/?retryWrites=true&w=majority"

// const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');

const uri = "mongodb+srv://admin_farhad:9Xalc9Re9fBB2TPU@cluster0.guc3q.mongodb.net/chater-box_n?retryWrites=true&w=majority";
/*const client = new MongoClient(uri);
const db = await client.db("chater-box_n");
const users = await db.collection("users");
const tokens = await db.collection("access-tokens");
const chats = await db.collection("chats");



export { users, client, tokens, chats }*/

const connectToMongo = () => {
	mongoose.connect(uri, ()=>{
		console.log("db connection ok");
	});
}

module.exports = connectToMongo;