const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user');

const dotenv = require('dotenv');
dotenv.config();

// Replace the following with your Atlas connection string                                                                                                                                        
const dbName = "myFirstDatabase";
const uri = `mongodb+srv://${process.env.DB_AUTH_DETAILS}@cluster0.fazwb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const PORT_NUMBER = process.env.PORT || 9000;
const app = express();

app.listen(PORT_NUMBER, () => {
    console.log(`Backend running on port ${PORT}!`);
});

const connectToDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
        .then(async () => {
            console.log(`Connected to Database! Environment variable: ${process.env.TEST}`);
            const newUser = new User({
                name: "Tomooghujiuhygto",
                age: 28,
                test: process.env.TEST
            });
            await newUser.save();
            const myDoc = await User.findOne({ name: "Tomooo" });
            console.log("Found: ", myDoc);
        })
        .catch(e => {
            console.log("Connection FAILED to Database: ", e);
        }); 
};

connectToDatabase();