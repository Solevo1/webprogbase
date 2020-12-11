/**
 * @typedef Tour_operator
 * @property {integer} id
 * @property {string} name.required - name of operator
 * @property {string} countries - list of proposed countries
 * @property {integer} amount_tours - amount of tours
 * @property {integer} amount_departments - amount of departments
 * @property {string} foundation_date.required - date of founfation
 */


class Tour_operator {

    constructor(id, name, countries, amount_tours, amount_departments, foundation_date, url) {
        this.id = id; 
        this.name = name;  
        this.countries = countries ; 
        this.amount_tours=amount_tours || 0;
        this.amount_departments=amount_departments || 0;
        this.foundation_date=foundation_date || "1970-01-01";
        this.url=url;
    }
 };
 
 module.exports = Tour_operator;