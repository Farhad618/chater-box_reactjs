// connection.js

const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})

const mongoose = require('mongoose');

const uri = process.env.MONGOURI;
/*const client = new MongoClient(uri);
const db = await client.db("chater-box_n");
const users = await db.collection("users");
const tokens = await db.collection("access-tokens");
const chats = await db.collection("chats");



export { users, client, tokens, chats }*/

const connectToMongo = () => {
	mongoose.connect(uri, ()=>{
		console.log("db connection ok ");
	});
}

module.exports = connectToMongo;