const router = require("express").Router();
const { requiresAuth } = require("./auth.js");
const { post, get, put, del } = require("../controllers/media.js");

router.route('/media/:id')
    .all(requiresAuth)
    .post(post)
    .get(get)
    .put(put)
    .delete(del)

router.route('/media')
    .all(requiresAuth)
    .post(post)
    .get(get)
    .put(put)
    .delete(del)

module.exports = router
