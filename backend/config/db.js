const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
// const uri = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("MongoDB database connection established successfully!");
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB
