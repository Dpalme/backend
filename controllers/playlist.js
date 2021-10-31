const Playlist = require("../models/playlist")
const mongoose = require("mongoose")

module.exports = {
    post: async (req, res) => {
        req.body.owner = req.session.userid
        const newPlaylist = new Playlist(req.body)
        try {
            await newPlaylist.save()
            res.status(200).json({ status: 200, items: newPlaylist })
        } catch (err) {
            console.log(err)
            res.status(422).json({ status: 422, error: err })
        }
    },

    get: async (req, res) => {
        req.params.owener = req.session.userid
        Playlist.find(req.params)
            .exec()
            .then(
                playlist => {
                    res.status(200).json({ status: 200, items: playlist })
                },
                err => {
                    res.status(422).json({ status: 422, error: err })
                }
            );
    },

    put: async (req, res) => {
        try {
            await Playlist.findOneAndUpdate( { _id: req.body.id }, req.body)
            res.sendStatus(200);
        } catch (err) {
            console.log(err)
            res.status(422).json({ status: 422, error: err })
        }
    },

    del: async (req, res) => {
        try {
            await Playlist.findOneAndRemove(req.body)
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.status(422).json({ status: 422, error: err })
        }
    }
}