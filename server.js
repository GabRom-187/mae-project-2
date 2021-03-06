// Dependencies for project
const express = require('express'); // Invoking the requiring of express
const app = express(); // Declaring the usage of express
const mongoose = require('mongoose'); // Setup for mongoose
const methodOverride = require('method-override'); // Var for method override

// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dndcs';

// Middleware required for the use of several methods and features
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(methodOverride('_method')); // to inform that _method is to use alternate method mentioned

// Mongoose connection for access to mongoDB
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('Connected to mongo');
});

// Controller Routes for RESTful routes
const characterSheetController = require('./controllers/characterSheet.js');
app.use('/DNDCS', characterSheetController); // any instance of /DNDCS will cause it to looking within that folder location for routes

// Listener
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});
