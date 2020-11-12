const fs = require('fs');
const JsonStorage = require('./jsonStorage.js');


class MediaStorage {
    constructor(mediaPath, mediaInfoPath) {
        this.mediaPath = mediaPath;
        this.jsonstorage = new JsonStorage(mediaInfoPath);
    }
    readMedia(id) {
        console.log(id);
        let mediaInfo = this.jsonstorage.readItems();
        console.log(mediaInfo);
        let path;
        console.log(mediaInfo.length);
        for (let i = 0; i < mediaInfo.length; i++) {
            console.log(mediaInfo[i].id);
            if (mediaInfo[i].id === Number(id)) {
                console.log("hui");
                path = mediaInfo[i].path;
                break;
            }
        }
        console.log(path);
        console.log(fs.readFileSync("data/media/1.jpj"));
        let mediaFile = fs.readFileSync(`${path}`, function(err, data) {
            if (err) {
                throw new Error(data);
            }
        });
        console.log(mediaFile);
        return mediaFile;
    }
    writeMedia(media) {
        let mediaInfo = this.jsonstorage.readItems();
        console.log(mediaInfo);
        mediaInfo.push({
            id: this.jsonstorage.getnextId(),
            path: `${this.mediaPath}${media.name}`
        });
        this.jsonstorage.incrementNextId();
        this.jsonstorage.writeItems(mediaInfo);
        fs.writeFileSync(`${this.mediaPath}${media.name}`, media.data);
        console.log(media.data);
        return this.jsonstorage.getnextId()-1;
    }
};

module.exports = MediaStorage;