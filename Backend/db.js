const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/recipebook"

const connectToMongo = async() =>{
    try {
        mongoose.connect(mongoURL);
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log("Connection error:", err);        
    }
}

module.exports = connectToMongo;