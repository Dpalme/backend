const mongoose = require('mongoose')

const MediaSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: [50, "Error 422: InvalidBodyException.\nName must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException.\nName must be between 5 and 50 characters"],
    },
    type: {
        type: String,
        enum: {
            values: ['Book', 'Song'],
            message: 'Error 422: InvalidBodyException. Must choose from one of these types: Book or Song'
        }
    },
    owner: {
        type: String
    },
    privacy: {
        type: String,
        enum: {
            values: ['Public', 'Private'],
            message: 'Error 422: InvalidBodyException.\nPrivacy must either be "Public" or "Private"'
        }
    },
    author: {
        type: String,
        maxLength: [50, "Error 422: InvalidBodyException.\nAuthor must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException.\nAuthor must be between 5 and 50 characters"],
    },
    description: {
        type: String,
        maxLength: [250, "Error 422: InvalidBodyException.\nDescription must be between 10 and 250 characters"],
        minLenght: [10, "Error 422: InvalidBodyException.\nDescription must be between 10 and 250 characters"],
    }
}, { collection: 'media' });

module.exports = mongoose.model('media', MediaSchema);