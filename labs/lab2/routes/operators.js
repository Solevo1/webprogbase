const express = require('express');
const router = express.Router();
const operatorController = require('../controllers/operators.js');
const bodyParser = require('body-parser');
//const Tour_operator = require('../models/tour_operator.js');
const jsonParser = bodyParser.json();


/**
 * @route GET /api/operators
 * @group Operators - operator operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Array<Tour_operator>} 200 - a page with operators
 */


/**
 * @route GET /api/operators/{id}
 * @group Operators - operator operations
 * @param {integer} id.path.required - id of operator
 * @returns {Tour_operator.model} 200 - Operator object
 * @returns {Error} 404 - Operator not found
 */

/**
 * @route POST /api/operators
 * @group Operators - operator operations
 * @param {Tour_operator.model} id.body.required - new Operator Object
 * @returns {Tour_operator.model} 201 - Created operator object
 * @returns {Error} 400 - Invalid field data
 */


/**
 * @route PUT /api/games
 * @group Operators - operator operations
 * @param {Tour_operator.model} id.body.required - new Operator Object
 * @returns {Game.model} 200 - Updated game object
 * @returns {Error} 400 - Invalid field data
 */


/**
 * @route DELETE /api/games
 * @group Operators - operator operations
 * @param {integer} id.path.required - id of operator
 * @returns {Game.model} 200 - Deleted game object
 * @returns {Error} 404 - Game not found
 */
router
    .get("/:id", operatorController.getTour_operatorById)
    .get("", operatorController.getTour_operators)
    .post("/", jsonParser, operatorController.addTour_operator)
    .put("/", jsonParser, operatorController.updateTour_operator)
    .delete("/:id", operatorController.deleteTour_operator);

module.exports = router;