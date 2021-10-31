const Media = require("../models/media")
const mongoose = require("mongoose")

module.exports = {
    post: async (req, res) => {
        req.body.owner = req.session.userid;
        new Media(req.body)
            .save()
            .then(
                media => {
                    res.status(200).json({ status: 200, items: media });
                },
                err => {
                    res.status(422).send({ status: 422, error: err });
                }
            )
    },

    get: async (req, res) => {
        req.params.owener = req.session.userid
        Media.find(req.params)
            .exec()
            .then(
                media => {
                    res.status(200).json({ status: 200, items: media })
                },
                err => {
                    res.status(422).json({ status: 422, error: err })
                }
            );
    },

    put: async (req, res) => {
        Playlist.findOneAndUpdate(req.body.filter, req.body.update)
            .then(
                media => {
                    res.status(200).json({ status: 200, items: media });
                },
                err => {
                    res.status(422).send({ status: 422, error: err });
                }
            )
    },

    del: async (req, res) => {
        Playlist.findOneAndRemove(req.body)
            .then(
                media => {
                    res.status(200).json({ status: 200, items: media });
                },
                err => {
                    res.status(422).send({ status: 422, error: err });
                }
            )
    }
}