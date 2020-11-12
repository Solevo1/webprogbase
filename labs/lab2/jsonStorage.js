const fs = require('fs');

class JsonStorage {

    constructor(filePath) {
        this.filePath = filePath;
    }

    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        const items = jsonArray.items;
        return items;
    }

    getnextId() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        const nextId = jsonArray.nextId;
        return nextId;
    }

    incrementNextId() {
        let jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        jsonArray.nextId++;
        jsonText = JSON.stringify(jsonArray, null, 4);
        fs.writeFileSync(this.filePath, jsonText);
        return null;
    }

    writeItems(items) {
        let jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        jsonArray.items = items;
        jsonText = JSON.stringify(jsonArray, null, 4);
        fs.writeFileSync(this.filePath, jsonText);
        return null;
    }

};

module.exports = JsonStorage;
