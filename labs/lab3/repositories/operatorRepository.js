const Tour_operator = require('../models/tour_operator');
const JsonStorage = require('../jsonStorage');

class Tour_operatorRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getTour_operators() {
        const items = this.storage.readItems();
        let operators=[];
        for (const item of items) {
            const operator =new Tour_operator(item.id, item.name, item.countries, item.amount_tours, item.amount_departments, item.foundation_date, item.url);
            operators.push(operator);
        }
        return operators;

    }

    getTour_operatorById(id) { 
        const items = this.storage.readItems();
        for (const item of items) {
            if (item.id === id) {
                return new Tour_operator(item.id, item.name, item.countries, item.amount_tours, item.amount_departments, item.foundation_date, item.url);
            }
        }
        throw new Error(`Operator with id ${id} doesnt exist.`);
    }

    addTour_operator(operatorModel) {
        let operators=this.getTour_operators();
        operatorModel.id=this.storage.getnextId();
        this.storage.incrementNextId();
        operators.push(operatorModel);
        this.storage.writeItems(operators);
        return operatorModel.id;
    }

    updateTour_operator(operatorModel) {
        let operators=this.getTour_operators();
        for(let i=0;i<operators.length;i++)
        {
            if(operators[i].id===operatorModel.id)
            {
               operators[i]=operatorModel;
               this.storage.writeItems(operators);
               return true;
            }
        }
        return false;
    }

    deleteTour_operator(operatorId) {
        let operators=this.getTour_operators();
        for(let i=0;i<operators.length;i++)
        {
            if(operators[i].id===operatorId)
            {
                operators.splice(i,1);
                this.storage.writeItems(operators);
                return true;
            }
        }
        return false;
    }
};

module.exports = Tour_operatorRepository;
