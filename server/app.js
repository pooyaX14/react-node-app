const express = require('express');
const routes = require('./routes/index');
const newsRoute = require('./routes/news');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser = require('body-parser');


let app = express();
const PORT = process.env.PORT || 5000;

const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL, { useNewUrlParser: true },  function(err){
    if(err) {
        console.log('Error connecting to: ' + dbURL)
    }
    else {
        console.log('Connected to : '+ dbURL)
    }
})

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes);

app.use('/news', newsRoute);

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
})

