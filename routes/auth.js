const { Router } = require("express");
const {
    loginFunction,
    callbackFunction,
    logoutFunction
} = require("../src/auth.js");

const requiresAuth = (req, res, next) => {
    return next();
    if (req.session.userid) {
    }
    req.session.origin = req.headers.referer;
    return res.redirect('/login');
}

module.exports.auth = (config) => {
    const router = Router();
    router.all('/', requiresAuth, (req, res) => res.json({user: req.session.userid}));
    router.all('/login', loginFunction(config));
    router.all('/callback', callbackFunction(config));
    router.all('/logout', logoutFunction(config));
    return router;
}

module.exports.requiresAuth = requiresAuth