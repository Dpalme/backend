const mongoose = require('mongoose')

const PlaylistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.OnjectId,
    title: {
        type: [String, "Error 422: InvalidBodyException.	Field must be string"],
        maxLength: [50, "Error 422: InvalidBodyException. Title must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException. Title must be between 5 and 50 characters"],
    },
    type: {
        type: [String],
        enum: {
            values: ['Book', 'Song'],
            message: 'Error 422: InvalidBodyException. Must choose from one of these types: Book or Song'
        }
    },
    author: {
        type: [String, "Error 422: InvalidBodyException.	Field must be string"],
        maxLength: [50, "Error 422: InvalidBodyException. Author must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException. Author must be between 5 and 50 characters"],
    },
    description: {
        type: [String, "Error 422: InvalidBodyException.	Field must be string"],
        maxLength: [250, "Error 422: InvalidBodyException. Description must be between 10 and 250 characters"],
        minLenght: [10, "Error 422: InvalidBodyException. Description must be between 10 and 250 characters"],
    },
    length: Number,
    genre: {
        type: [String],
    }
}, { collection: 'playlist' });

module.exports = mongoose.model('playlist', PlaylistSchema);