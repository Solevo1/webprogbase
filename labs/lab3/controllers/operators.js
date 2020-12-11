const op_rep = require('../repositories/operatorRepository.js');
const operatorRepository = new op_rep("data/tour_operators.json");
const moment = require('moment');
const media_rep = require('../repositories/mediaRepository.js');
const mediaRepository = new media_rep('data/media/', 'data/media.json');

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
    foundation_date: dateValidator,
    url: stringValidator
};

const errorMessages = {
    id: "id should be inputed as integer",
    name: "Name field should be string",
    countries: "Countries field should be string",
    amount_tours: "Amount of yours should be inputed as integer",
    amount_departments: "Amount of departments should be integer",
    foundation_date: "Please enter date in  ISO 8601 format ",
    url: "Should be a string"
};

module.exports = {
    getTour_operators(req, res) {
        let operators = operatorRepository.getTour_operators();
        let input = req.query.name;
        if (input != undefined && input != "") {
            for (let i = 0; i < operators.length; i++) {
                if (!operators[i].name.includes(input)) {
                    operators.splice(i, 1);
                    i--
                }
            }
            input = `Результат пошуку операторів за назвою "${input}"`;
        }
        else {
            input = "Результат пошуку усіх операторів";
        }
        const page_size = 2;
        let page_number = Number.parseInt(req.query.page);
        if (req.query.page === undefined) {
            page_number = 1;
        }
        const items_total = operators.length;
        if (!Number.isInteger(page_number) || page_number < 1 || page_size * (page_number - 1) >= items_total) {
            res.render('operators', { error:"page not found",page: `${page_number}/${Math.ceil(items_total / page_size)}`, prev: page_number - 1, next: page_number + 1, input,name:req.query.name });
        }
        else {
            operators = operators.slice(page_size * (page_number - 1), page_size * (page_number));
            res.render('operators', { operators, page:`${page_number}/${Math.ceil(items_total / page_size)}`, prev: page_number - 1, next: page_number + 1, input ,name:req.query.name});
        }
    },


    getTour_operatorById(req, res) {
        const operatorID = Number(req.params.id);
        if (!Number.isInteger(operatorID) || operatorID < 1) {
            return res.status(400).json({ Error: "Operator id should be natural number" });
        }
        try {
            const op = operatorRepository.getTour_operatorById(operatorID);
            res.render('operator', op);
        }
        catch (error) {
            return res.status(404).json({ Error: error.message });
        }
    },

    addTour_operator(req, res) {
        res.set("Content-type", "application/json");
        const operator = req.body;
        const properties = ["id", "name", "countries", "amount_tours", "amount_departments", "foundation_date", "url"];
        if (!operator.name || !operator.countries) return res.status(400).json({ Error: "Operator must contain 'name' and 'countries' properties" });
        for (const [key, value] of Object.entries(operator)) {
            if (!properties.includes(key)) return res.status(400).json({ Error: `property "${key}" doesnt exist on operator entity` });
            if (!validators[key](String(value))) return res.status(400).json({ message: errorMessages[key] });
        }
        mediaRepository.addMedia(req.files.photoFile[0]);
        operator.url=`/data/media/${req.files.photoFile[0].name}`;
        const id = operatorRepository.addTour_operator(operator);
        res.redirect(`/operators/${id}`)
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
            res.redirect('/operators');
        }
        catch (error) {
            return res.status(404).json({ Error: error.message });
        }
    }
};
