const User = require('../models/user');
const JsonStorage = require('../jsonStorage');
 
class UserRepository {
 
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
 
    getUsers() { 
        const items = this.storage.readItems();
        const users=[];
        for (const item of items) {
            const user =new User(item.id, item.login, item.fullname, item.role, item.registeredAt,item.avaUrl,item.isEnabled);
            users.push(user);
        }
        return users;
    }
 
    getUserById(id) {
        const items = this.storage.readItems();
        for (const item of items) {
            if (item.id === id) {
                return new User(item.id, item.login, item.fullname, item.role, item.registeredAt,item.avaUrl,item.isEnabled);
            }
        }
        throw new Error(`User with id ${id} doesnt exist.`);
    }
};
 
module.exports = UserRepository;
