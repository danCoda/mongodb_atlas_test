const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

// Replace the following with your Atlas connection string                                                                                                                                        
const dbName = "myFirstDatabase";
const uri = `mongodb+srv://${process.env.DB_AUTH_DETAILS}@cluster0.fazwb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const PORT_NUMBER = process.env.PORT || 9000;
const app = express();

app.use(express.urlencoded({ extended: true })); // Be able to parse req.body.
app.use(express.json()); // Allow us to process incoming request bodies.

app.listen(PORT_NUMBER, () => {
    console.log(`Backend running on port ${process.env.PORT}!`);
});

app.get('/', (req, res) => {
    console.log("Home page...");
    res.send("Hello, from home...");
});

app.post('/users', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        age: Number(req.body.age)
    });
    await newUser.save();
    const myDoc = await User.findOne({ name: req.body.name });
    res.send(myDoc);
});

app.get('/users', async(req, res) => {
    const users = await User.find({});
    res.send(users);
});

const connectToDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
        .then(async () => {
            console.log(`Connected to Database! Environment variable: ${process.env.TEST}`);
        })
        .catch(e => {
            console.log("Connection FAILED to Database: ", e);
        }); 
};

connectToDatabase();