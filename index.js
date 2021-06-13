const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');

const User = require('./models/user');

// Replace the following with your Atlas connection string                                                                                                                                        
const dbName = "myFirstDatabase";
const uri = `mongodb+srv://dbUserTest:63-KWBJ9@QFGRf8@cluster0.fazwb.mongodb.net/${dbName}?retryWrites=true&w=majority`;


const connectToDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
        .then(async () => {
            console.log(`Connected to Database!`);
            const newUser = new User({
                name: "Tomooo",
                age: 28
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