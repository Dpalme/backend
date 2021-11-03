const router = require("express").Router();
const { requiresAuth } = require("./auth.js");
const { post, get, put, del, addItem } = require("../controllers/playlist.js");
const {
    nameValidator,
    privacyValidator,
    descriptionValidator,
    idValidator,
    playlistValidator,
    mediaValidator } = require('../src/validators.js')

router.route('/playlist/:id')
    .all(async (req, res, next) => {
        if (idValidator(req.params.id)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    })
    .post([async (req, res, next) => {
        if (idValidator(req.params.itemId) || mediaValidator(req.body)) {
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid format" });
    }, addItem])
    .get(get)
    .put([async (req, res, next) => {
        if (nameValidator(req.body.name) ||
            privacyValidator(req.body.privacy) ||
            descriptionValidator(req.body.description)) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    } ,put])
    .delete(del)

router.route('/playlist')
    .all(requiresAuth)
    .post([playlistValidator, post])
    .get(get)
    .put([async (req, res, next) => {
        if (idValidator(req.body.id) &&
            (nameValidator(req.body.name) ||
            privacyValidator(req.body.privacy) ||
            descriptionValidator(req.body.description))) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    } ,put])
    .delete(del)

module.exports = router
