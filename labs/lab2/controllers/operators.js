const op_rep = require('../repositories/operatorRepository.js');
const operatorRepository = new op_rep("data/tour_operators.json");
const moment = require('moment');

const stringValidator = value => typeof (value) === "string";
const integerValidator = value => {
    if (Number.isInteger(Number(value)) && Number(value) >= 0) {
        return true;
    }
    return false;
};
const dateValidator = value => moment(value, moment.ISO_8601).isValid();

const validators = {
    id: integerValidator,
    name: stringValidator,
    countries: stringValidator,
    amount_tours: integerValidator,
    amount_departments: integerValidator,
    foundation_date: dateValidator
};

const errorMessages = {
    id: "id should be inputed as integer",
    name: "Name field should be string",
    countries: "Countries field should be string",
    amount_tours: "Amount of yours should be inputed as integer",
    amount_departments: "Amount of departments should be integer",
    foundation_date: "Please enter date in  ISO 8601 format "
};

module.exports = {
    getTour_operators(req, res) {
        res.set("Content-type", "application/json");
        let page_size = Number.parseInt(req.query.per_page);
        if (req.query.per_page === undefined) {
            page_size = 2;
        }
        if (!Number.isInteger(page_size) || page_size < 1 || page_size > 10) {
            return res.status(404).json({ Error: "Page size should be natural number and <10" });
        }
        let page_number = Number.parseInt(req.query.page);
        if (req.query.page === undefined) {
            page_number = 1;
        }
        if (!Number.isInteger(page_number) || page_number < 1) {
            return res.status(404).json({ Error: "Page should be natural number" });
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
        const properties = ["id", "name", "countries", "amount_tours", "amount_departments", "foundation_date"];
        if (!operator.name || !operator.countries) return res.status(400).json({ Error: "Operator must contain 'name' and 'countries' properties" });
        for (const [key, value] of Object.entries(operator)) {
            if (!properties.includes(key)) return res.status(400).json({ Error: `property "${key}" doesnt exist on operator entity` });
            if (!validators[key](String(value))) return res.status(400).json({ message: errorMessages[key] });
        }
        const id = operatorRepository.addTour_operator(operator);
        const new_op = operatorRepository.getTour_operatorById(id);
        return res.status(201).json(new_op);
    },

    updateTour_operator(req, res) {
        res.set("Content-type", "application/json");
        const operator = req.body;
        const properties = ["id", "name", "countries", "amount_tours", "amount_departments", "foundation_date"];
        if (!operator.name || !operator.countries) return res.status(400).json({ Error: "Operator must contain 'name' and 'countries' properties" });
        for (const [key, value] of Object.entries(operator)) {
            if (!properties.includes(key)) return res.status(400).json({ Error: `property "${key}" doesnt exist on operator entity` });
            if (!validators[key](String(value))) return res.status(400).json({ message: errorMessages[key] });
        }
        operatorRepository.updateTour_operator(operator);
        try {
            const new_op = operatorRepository.getTour_operatorById(operator.id);
            return res.status(200).json(new_op);
        }
        catch (error) {
            return res.status(404).json({ Error: error.message });
        }
    },

    deleteTour_operator(req, res) {
        res.set("Content-type", "application/json");
        let id = parseInt(req.params.id);
        try {
            const op = operatorRepository.getTour_operatorById(id);
            operatorRepository.deleteTour_operator(op.id);
            return res.status(200).json(op);
        }
        catch (error) {
            return res.status(404).json({ Error: error.message });
        }
    }
};
