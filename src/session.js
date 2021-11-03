const session = require("express-session"),
    MemoryStore = require("memorystore")(session);

module.exports = session({
    store: new MemoryStore({
        checkPeriod: 1000 * 60 * 60 * 2,
        ttl: 1000 * 60 * 30
    }),
    secret: require("crypto").randomBytes(48).toString('hex'),
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 90 // Time is in miliseconds
    }
})