const express = require('express');

// const bodyParser = require('body-parser');

const connectDB = require('./config/db');

const PORT = process.env.PORT|| 5000;

const app = express();

//Connect Database
connectDB();


// parse application/x-www-form-urlencoded
app.use(express.json({ extended: false}));
// parse application/json
// app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('API connect');
});

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, function() {
    console.log(`server is running on ${PORT}`)
});