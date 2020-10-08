const UserRepository = require('./repositories/userRepository');
const userRepository = new UserRepository('./data/users.json');

const Tour_operatorRepository = require('./repositories/tour_operatorRepository');
const operatorRepository = new Tour_operatorRepository('./data/tour_operators.json');

const moment = require('moment');
const readlineSync = require('readline-sync');
const Tour_operator = require('./models/tour_operator');

while (true) {
    const inputs = readlineSync.question('Enter your command: ');
    if (inputs.length === 0) break;
    const text = inputs.trim();
    const parts = text.split("/");
    const action = parts[0];
    const command = parts[1];
    const input = parts[2];
    if (action === "get" && command === "users" && input === undefined) {
        const users = userRepository.getUsers();
        console.table(users, ["id", "login", "fullname"]);
    }
    else if (action === "get" && command === "users" && input !== undefined) {
        const userId = Number(input);
        if (Number.isInteger(userId) === false || userId <= 0) {
            console.log("User id must be an integer and >0");
            continue;
        }
        const user = userRepository.getUserById(userId);
        if (!user) {
            console.log(`Error: user with id ${userId} not found.`);
            continue;
        }
        console.log(user);
    }
    else if (action === "get" && command === "operators" && input === undefined) {
        const operators = operatorRepository.getTour_operators();
        console.table(operators, ["id", "name", "countries"]);
    }
    else if (action === "get" && command === "operators" && input !== undefined) {
        const operatorId = Number(input);
        if (Number.isInteger(operatorId) === false || operatorId <= 0) {
            console.log("Operator id must be an integer and >0");
            continue;
        }
        const operator = operatorRepository.getTour_operatorById(operatorId);
        if (!operator) {
            console.log(`Error: operator with id ${operatorId} not found.`);
            continue;
        }
        console.log(operator);
    }
    else if (action === "delete" && command === "operators" && input !== undefined) {
        const operatorId = Number(input);
        if (Number.isInteger(operatorId) === false || operatorId <= 0) {
            console.log("Operator id must be an integer and >0");
            continue;
        }
        const deleted = operatorRepository.deleteTour_operator(operatorId);
        if (deleted === true) {
            console.log(`Operator with id ${operatorId} deleted successfully.`);
        }
        else {
            console.log(`Error: operator with id ${operatorId} not found.`);
        }

    }
    else if (action === "update" && command === "operators" && input !== undefined) {
        const operatorId = Number(input);
        if (Number.isInteger(operatorId) === false || operatorId === 0) {
            console.log("Operator id must be an integer");
            continue;
        }
        let operator = operatorRepository.getTour_operatorById(operatorId);
        if (!operator) {
            console.log(`Error: operator with id ${operatorId} not found.`);
            continue;
        }
        let name = readlineSync.question('Enter new name: ');
        while (name.length === 0) {
            console.log("This field can`t be empty. Try again.");
            name = readlineSync.question('Enter new name: ');
        }
        operator.name = name;
        let countries = readlineSync.question('Enter new countries: ');
        while (countries.length === 0) {
            console.log("This field can`t be empty. Try again.");
            countries = readlineSync.question('Enter new countries: ');
        }
        operator.countries = countries;
        let amount_tours = readlineSync.question('Enter new amount of tours: ');
        amount_tours = Number(amount_tours);
        while (!Number.isInteger(amount_tours) || amount_tours <= 0) {
            console.log("This field must be an integer and >0. Try again.");
            amount_tours = readlineSync.question('Enter new amount of tours: ');
            amount_tours = Number(amount_tours);
        }
        operator.amount_tours = amount_tours;
        let amount_departments = readlineSync.question('Enter new amount of departments: ');
        amount_departments = Number(amount_departments);
        while (!Number.isInteger(amount_departments) || amount_departments <= 0) {
            console.log("This field must be an integer and>0. Try again.");
            amount_departments = readlineSync.question('Enter new amount of departments: ');
            amount_departments = Number(amount_departments);
        }
        operator.amount_departments = amount_departments;
        let date = readlineSync.question('Enter new foundation date: ');
        while (!moment(date, moment.ISO_8601).isValid()) {
            console.log("Date must be ISO 8601 format. Try again.");
            date = readlineSync.question('Enter new foundation date: ');
        }
        operator.foundation_date = date;
        const update = operatorRepository.updateTour_operator(operator);
        if (update === true) {
            console.log(`Operator with id ${operatorId} updated successfully!`);
        }
        else {
            console.log(`Error: operator with id ${operatorId} has NOT been updated!`);
        }
    }
    else if (action === "post" && command === "operators") {
        let name = readlineSync.question('Enter name: ');
        while (name.length === 0) {
            console.log("This field can`t be empty. Try again.");
            name = readlineSync.question('Enter name: ');
        }
        let countries = readlineSync.question('Enter countries: ');
        while (countries.length === 0) {
            console.log("This field can`t be empty. Try again.");
            countries = readlineSync.question('Enter countries: ');
        }
        let amount_tours = readlineSync.question('Enter amount of tours: ');
        amount_tours = Number(amount_tours);
        while (!Number.isInteger(amount_tours) || amount_tours <= 0) {
            console.log("This field must be an integer and >0. Try again.");
            amount_tours = readlineSync.question('Enter amount of tours: ');
            amount_tours = Number(amount_tours);
        }
        let amount_departments = readlineSync.question('Enter amount of departments: ');
        amount_departments = Number(amount_departments);
        while (!Number.isInteger(amount_departments) || amount_departments <= 0) {
            console.log("This field must be an integer and >0. Try again.");
            amount_departments = readlineSync.question('Enter amount of departments: ');
            amount_departments = Number(amount_departments);
        }
        let date = readlineSync.question('Enter foundation date: ');
        while (!moment(date, moment.ISO_8601).isValid()) {
            console.log("Date must be ISO 8601 format. Try again.");
            date = readlineSync.question('Enter foundation date: ');
        }
        let operator = new Tour_operator(0, name, countries, amount_tours, amount_departments, date);
        const id = operatorRepository.addTour_operator(operator);
        console.log(`Operator with id ${id} added successfully.`);
    }
    else {
        console.log(`Not supported command.
List of commands: get/users, get/users/{id}, get/operators, get/operators/{id}, delete/operators/{id}, update/operators/{id}, post/operators.
Enter - exit the programm.`);
    }
}

console.log('Bye.');


