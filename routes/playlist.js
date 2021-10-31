const router = require("express").Router()
const playlistController = require("../controllers/playlist")

router.post('/createPlaylist', playlistController.postCreatePlaylist)
router.post('/readPlaylist', playlistController.getReadPlaylist)
router.post('/updatePlaylist', playlistController.postUpdatePlaylist)
router.post('/deletePlaylist', playlistController.postDeletePlaylist)

module.exports = router
