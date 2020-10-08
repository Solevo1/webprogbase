class Tour_operator {

    constructor(id, name, countries, amount_tours, amount_departments, foundation_date) {
        this.id = id; 
        this.name = name;  
        this.countries = countries;  
        this.amount_tours=amount_tours;
        this.amount_departments=amount_departments;
        this.foundation_date=foundation_date;
    }
 };
 
 module.exports = Tour_operator;