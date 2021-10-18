const express = require('express'),
    app = express();
    cors = require('cors'),
    mongoose = require('mongoose');


app.use(express.json());
app.use(cors());

const listener = app.listen(
    8080, _ => console.log("App listening in port " + listener.address().port)
);
