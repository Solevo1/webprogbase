const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router
    .get('', userController.getUsers)
    .get('/:id', userController.getUserById);

module.exports = router;

