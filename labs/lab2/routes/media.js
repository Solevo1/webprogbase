const express = require('express');
const mediaController = require('../controllers/medias.js');
const router = express.Router();
/**
 * Posting media
 * @route POST /api/media
 * @group Media - upload and get images
 * @consumes multipart/form-data
 * @param {file} image.formData.required - uploaded image
 * @returns {integer} 201 - added image id
 */

/**
 * Description of getting media by id
 * @route GET /api/media/{id}
 * @group Media - media operations
 * @param {integer} id.path.required - id of the image
 * @returns {file} 200 - image object
 * @returns {Error} 404 - image not found
 */
router
    .post('/', mediaController.addMedia)
    .get('/:id', mediaController.getMediaById);
module.exports = router;