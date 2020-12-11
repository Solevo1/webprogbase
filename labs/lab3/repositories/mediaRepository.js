const MediaStorage = require('../mediaStorage');

class MediaRepository {

    constructor(mediaPath, mediaInfoPath) {
        this.storage = new MediaStorage(mediaPath, mediaInfoPath);
    }

    addMedia(media) {
        console.log(media);
        const id = this.storage.writeMedia(media);
        return id;
    }

    getMediaById(id) {
        return this.storage.readMedia(id);
    }
};


module.exports = MediaRepository;