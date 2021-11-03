const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    nameValidator: async (name) => {
        return name && typeof name == 'string' && name.length >= 1 && name.length < 50
    },
    privacyValidator: async (privacy) => {
        return privacy && typeof privacy == 'string' && (privacy == 'Public' || privacy == 'Private')
    },
    typeValidator: async (type) => {
        return type && typeof type == 'string' && (type == 'Book' || type == 'Song')
    },
    descriptionValidator: async (description) => {
        return description && typeof description == 'string' && description.length >= 5 && description.length < 100
    },
    authorValidator: async (author) => {
        return author && typeof author == 'string' && author.length >= 1 && author.length < 50
    },
    idValidator: async (id) => {
        if(ObjectId.isValid(id)){
            if((String)(new ObjectId(id)) === id)
                return true;
        }
        return false;
    },
    playlistValidator: async (playlist) => {
        return this.nameValidator(playlist.name) && this.privacyValidator(playlist.privacy) && 
        this.descriptionValidator(playlist.description);
    },
    mediaValidator: async (media) => {
        return this.nameValidator(media.name) && this.privacyValidator(media.privacy) && 
        this.descriptionValidator(media.description) && this.authorValidator(media.author);
    }
}