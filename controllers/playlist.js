const Playlist = require("../models/playlist")
const Media = require("../models/media")
const { createController } = require("./utils");

module.exports = {
    ...createController(Playlist),
    addItem: async (req, res) => {
        if (req.body.itemId) {
            Playlist.findById(req.params.id, (err, playlist) => {
                if (err) {
                    return res.status(422).json({ status: 422, message: data, error1: err });
                }
                Media.findById(req.body.itemId, (errm, media) => {
                    if (err) {
                        return res.status(422).json({ status: 422, message: media, error2: errm });
                    }
                    playlist.items.push(media._id)
                    playlist.save().then(
                        (data, err) => {
                            if (err) {
                                return res.status(422).json({ status: 422, message: data, error3: err });
                            }
                            return res.status(200).json({ status: 200, items: data });
                        }
                    )
                })
            })
        } else {
            req.body.owner = req.sessionID;
            new Media(req.body)
                .save()
                .then(
                    (media, err) => {
                        if (err) {
                            return res.status(422).json({ status: 422, message: media, error: err });
                        }
                        Playlist.findById(req.params.id, (err, playlist) => {
                            if (err) {
                                return res.status(422).json({ status: 422, message: playlist, error: err });
                            }
                            playlist.items.push(media._id)
                            playlist.save().then(
                                (err, data) => {
                                    if (err) {
                                        return res.status(422).json({ status: 422, message: data, error: err });
                                    }
                                    return res.status(200).json({ status: 200, items: data });
                                }
                            )
                        })
                    }
                )
        }
    }
}