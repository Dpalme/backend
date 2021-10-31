const Playlist = require("../models/playlist")
const mongoose = require("mongoose")

exports.postCreatePlaylist = async (req, res) => {
    const element = new Playlist(req.body)
    element.id = new mongoose.Types.ObjectsId()
    try {
        await element.save()
        console.log("Status 200: Added successfully")
        res.status(200).json({ status: 200, message: "Added successfully" })
    } catch (err) {
        console.log(err)
        res.status(422).json({ status: 422, message: "An error occurred" })
    }
}

exports.getReadPlaylist = async (req, res) => {
    const playlist = await Playlist.find()
    res.json(playlist)
}

exports.postUpdatePlaylist = async (req, res) => {
    try {
        await Playlist.findOneAndUpdate(req.body.filter, req.body.update)
        console.log("Status 200: Updated successfully")
        res.status(200).send({ status: 200, message: "Updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(422).send({ status: 422, message: "An error occurred" })
    }
}

exports.postDeletePlaylist = async (req, res) => {
    try {
        await Playlist.findOneAndRemove(req.body)
        console.log("Status 200: Deleted successfully")
        res.status(200).send({ status: 200, message: "Deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(422).send({ status: 422, message: "An error occurred" })
    }
}