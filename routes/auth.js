const { Router } = require("express");
const {
    loginFunction,
    callbackFunction,
    logoutFunction
} = require("../src/auth.js");

module.exports.auth = (config) => {
    const router = Router();
    router.all('/login', loginFunction(config));
    router.all('/callback', callbackFunction(config));
    router.all('/logout', logoutFunction(config));
    return router;
}

module.exports.requiresAuth = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.origin = req.headers.referer;
    return res.redirect('/login');
}