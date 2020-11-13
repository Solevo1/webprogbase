const media_rep = require('../repositories/mediaRepository.js');
const mediaRepository = new media_rep('data/media/', 'data/media.json');
module.exports = {
    getMediaById(req, res) {
        res.set("Content-Type", "application/json");
        try {
            let media = mediaRepository.getMediaById(req.params.id);
            let responce = {
                image: {data:media}
            };
            res.send(JSON.stringify(responce));
        } catch (err) {
            res.statusCode = 404;
            res.send(JSON.stringify({ error: 'Media with this id wasnt found' }));
        }
    },
    addMedia(req, res) {
        res.set("Content-Type", "application/json");
        console.log(req.files);
        res.statusCode = 201;
        const id = mediaRepository.addMedia(req.files.image);
        res.send(JSON.stringify ({id:id}));
    }
};