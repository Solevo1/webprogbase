const op_rep = require('../repositories/tour_operatorRepository.js');
const operatorRepository = new op_rep("data/tour_operators.json");
const Tour_operator = require('../models/tour_operator.js');

const stringValidator = value => value.toLowerCase().match(/^[a-z]+$/);
const integerValidator = value => value.match(/^\d+$/);
const dateValidator = value => value.match(/\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/);

const validators = {
    id:integerValidator,
    name: stringValidator,
    countries: stringValidator,
    amount_tours: integerValidator,
    amount_departments: integerValidator,
    foundation_date: dateValidator
};

const errorMessages = {
    name: "Name field should only contain letters",
    countries: "Countries field should only contain letters",
    amount_tours: "Amount of yours should be inputed as integer",
    amount_departments: "Amount of departments should be integer",
    foundation_date: "Please enter date in yyyy-mm-dd format (0<m<12) (0<d<31)"
};

module.exports = {
    getTour_operators(req, res) {
        res.set("Content-type", "application/json");
        let page_size = Number.parseInt(req.query.per_page);
        if (req.query.per_page === undefined) {
            page_size = 2;
        }
        if (!Number.isInteger(page_size) || page_size < 1 || page_size > 10) {
            return res.status(400).json({ Error: "Page size should be natural number and <10" });
        }
        let page_number = Number.parseInt(req.query.page);
        if (req.query.page === undefined) {
            page_number = 1;
        }
        if (!Number.isInteger(page_number) || page_number < 1) {
            return res.status(400).json({ Error: "Page should be natural number" });
        }
        const operators = operatorRepository.getTour_operators();
        const items_total = operators.length;
        if (page_size * (page_number - 1) >= items_total) {
            res.status(404).json({ Error: "no such page exists" });
        }
        const page = operators.slice(page_size * (page_number - 1), page_size * (page_number));
        return res.status(200).json(page);    
    },

    getTour_operatorById(req, res) {
        res.set("Content-type", "application/json");
        const operatorID = Number(req.params.id);
        if (!Number.isInteger(operatorID) || operatorID < 1) {
            return res.status(400).json({ Error: "Operator id should be natural number" });
        }
        try {
            const user = operatorRepository.getTour_operatorById(operatorID);
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(404).json({ Error: error.message });
        }
    },

    addTour_operator(req, res) {
        res.set("Content-type", "application/json");
        const operator = req.body;
        const properties = ["id","name", "countries", "amount_tours", "amount_departments", "foundation_date"];
        if (!operator.name || !operator.countries) return res.status(400).json({ Error: "Operator must contain 'name' and 'countries' properties" });
        for (const [key, value] of Object.entries(operator)) {
            if (!properties.includes(key)) return res.status(400).json({ Error: `property "${key}" doesnt exist on operator entity` });
            if (!validators[key](String(value))) return res.status(400).json({ message: errorMessages[key] });
        }
        const id = operatorRepository.addTour_operator(operator);
        const new_op=operatorRepository.getTour_operatorById(id);
        return res.status(201).json(new_op);
    },

    updateTour_operator(req, res) {
        res.set("Content-type", "application/json");
        const body = req.body;
        let operator = new Tour_operator(body.id, body.name, body.countries, body.amount_tours, body.amount_departments, body.foundation_date);
        const upd = operatorRepository.updateTour_operator(operator);
        if (upd === true) {
            res.send(`${JSON.stringify(operatorRepository.getTour_operatorById(body.id))}`);
        }
        else {
            res.send(`Operator with id ${body.id} is not defined`);
        }
    },

    deleteTour_operator(req, res) {
        res.set("Content-type", "application/json");
        let id = parseInt(req.params.id);
        const op = operatorRepository.getTour_operatorById(id);
        if (op === null) {
            res.send(`Operator with id ${id} is not defined`);
        }
        else {
            operatorRepository.deleteTour_operator(parseInt(op.id));
            res.send(`${JSON.stringify(op)}`);
        }
    }
};
