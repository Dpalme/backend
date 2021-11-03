const router = require("express").Router();
const { requiresAuth } = require("./auth.js");
const { post, get, put, del } = require("../controllers/media.js");
const {
    nameValidator,
    privacyValidator,
    descriptionValidator,
    authorValidator,
    idValidator,
    mediaValidator } = require('../src/validators.js')

router.route('/media/:id')
    .all(idValidator(req.params.id))
    .post([async (req, res, next) => {
        if (mediaValidator(req.body)){
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    }, post])
    .get(get)
    .put([async (req, res, next) => {
        if (nameValidator(req.body.name) ||
            privacyValidator(req.body.privacy) ||
            descriptionValidator(req.body.description) ||
            authorValidator(req.body.author)) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    } ,put])
    .delete(del)

router.route('/media')
    .all()
    .post([async (req, res, next) => {
        if (mediaValidator(req.body)){
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    }, post])
    .get(get)
    .put([async (req, res, next) => {
        if (idValidator(req.body.id) &&
            (nameValidator(req.body.name) ||
            privacyValidator(req.body.privacy) ||
            descriptionValidator(req.body.description) ||
            authorValidator(req.body.author))) {
            return next();
        }
        return res.status(422).json({ status: 422, error: "Wrong body format, review documentation" });
    } ,put])
    .delete([async (req, res, next) => {
        if (idValidator(req.body.id)){
            return next();
        }
        return res.status(400).json({ status: 400, error: "Invalid id format" });
    }, del])

module.exports = router
