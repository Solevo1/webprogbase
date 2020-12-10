const express = require('express');
const router = express.Router();
const operatorController = require('../controllers/operators.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


/**
 * @route GET /api/operators
 * @group Operators - operator operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Array.<Tour_operator>} 200 - a page with operators
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
 * @route PUT /api/operators
 * @group Operators - operator operations
 * @param {Tour_operator.model} object.body.required - new Operator Object
 * @returns {Tour_operator.model} 200 - Updated game object
 * @returns {Error} 400 - Invalid field data
  * @returns {Error} 404 - Operator not found
 */

/**
 * @route DELETE /api/operators/{id}
 * @group Operators - operator operations
 * @param {integer} id.path.required - id of the Operator
 * @returns {Tour_operator.model} 200 - deleted Operator object
 * @returns {Error} 404 - Operator not found
 */

router
    .get("/:id", operatorController.getTour_operatorById)
    .get("", operatorController.getTour_operators)
    .post("/", jsonParser, operatorController.addTour_operator)
    .put("/", jsonParser, operatorController.updateTour_operator)
    .delete("/:id", operatorController.deleteTour_operator);

module.exports = router;