const mongoose = require('mongoose')

const MediaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: [String, "Error 422: InvalidBodyException.\nName must be string"],
        maxLength: [50, "Error 422: InvalidBodyException.\nName must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException.\nName must be between 5 and 50 characters"],
    },
    owner: {
        type: [String, "Error 503: I literally don't know how you got here without logging in, but you need to"]
    },
    type: {
        type: [String],
        enum: {
            values: ['Book', 'Song'],
            message: 'Error 422: InvalidBodyException. Must choose from one of these types: Book or Song'
        }
    },
    author: {
        type: [String, "Error 422: InvalidBodyException.\nAuthor must be string"],
        maxLength: [50, "Error 422: InvalidBodyException.\nAuthor must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException.\nAuthor must be between 5 and 50 characters"],
    },
    description: {
        type: [String, "Error 422: InvalidBodyException.\nDescription must be string"],
        maxLength: [250, "Error 422: InvalidBodyException.\nDescription must be between 10 and 250 characters"],
        minLenght: [10, "Error 422: InvalidBodyException.\nDescription must be between 10 and 250 characters"],
    },
    genre: {
        type: [String, "Error 422: InvalidBodyException.\nGenre must be string"],
    }
}, { collection: 'media' });

module.exports = mongoose.model('media', MediaSchema);