require('dotenv').config()
const express = require('express'),
    app = express(),
    cors = require('cors'),
    session = require('./src/session.js'),
    auth = require('./routes/auth.js'),
    playlist = require('./routes/playlist.js'),
    media = require('./routes/media.js'),
    mongoose = require("mongoose");

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}?authSource=admin`,
    { 
        useUnifiedTopology: true
    }
).catch((e) => {
    console.log("error connecting to mongoose!", e);
});
mongoose.connection.on("error", (err) => {
    const inspect = require('util').inspect
    console.log(inspect(err, { depth: Infinity, showHidden: true }));
});
mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session);
app.use(auth.auth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    baseUrl: process.env.BASE_URL,
}));

app.use(playlist);
app.use(media);

const listener = app.listen(
    process.env.PORT,
    () => {
        console.log("Your app is listening on port " + listener.address().port);
    }
);