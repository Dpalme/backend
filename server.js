const express = require('express'),
    app = express(),
    cors = require('cors'),
    session = require('./src/session.js'),
    auth = require('./routes/auth.js'),
    playlist = require('./routes/playlist.js'),
    media = require('./routes/media.js');


app.use(express.json());
app.use(cors());
app.use(session());
app.use(auth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
}));

app.use(playlist);
app.use(media);

const listener = app.listen(
    process.env.PORT,
    () => {
        console.log("Your app is listening on port " + listener.address().port);
    }
);