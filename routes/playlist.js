const router = require("express").Router();
const { requiresAuth } = require("./auth.js");
const { post, get, put, del } = require("../controllers/playlist.js");

router.route('/playlist/:id')
    .all(requiresAuth)
    .post(post)
    .get(get)
    .put(put)
    .delete(del)

router.route('/playlist')
    .all(requiresAuth)
    .post(post)
    .get(get)
    .put(put)
    .delete(del)

module.exports = router
