const fs = require('fs');
const JsonStorage = require('./jsonStorage.js');


class MediaStorage {
    constructor(mediaPath, mediaInfoPath) {
        this.mediaPath = mediaPath;
        this.jsonstorage = new JsonStorage(mediaInfoPath);
    }
    readMedia(id) {
        let mediaInfo = this.jsonstorage.readItems();
        let path;
        for (let i = 0; i < mediaInfo.length; i++) {
            console.log(mediaInfo[i].id);
            if (mediaInfo[i].id === Number(id)) {
                path = mediaInfo[i].path;
                break;
            }
        }
        let mediaFile = fs.readFileSync(`${path}`, function(err, data) {
            if (err) {
                throw new Error(data);
            }
        });
        return mediaFile;
    }
    writeMedia(media) {
        let mediaInfo = this.jsonstorage.readItems();
        mediaInfo.push({
            id: this.jsonstorage.getnextId(),
            path: `${this.mediaPath}${media.name}`
        });
        this.jsonstorage.incrementNextId();
        this.jsonstorage.writeItems(mediaInfo);
        fs.writeFileSync(`${this.mediaPath}${media.name}`, media.data);
        return this.jsonstorage.getnextId()-1;
    }
};

module.exports = MediaStorage;