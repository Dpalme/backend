var mongoose = require('mongoose');

module.exports = mongoose.model('user', mongoose.Schema({
    sub: String,
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }]
}));