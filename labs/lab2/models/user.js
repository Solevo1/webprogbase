/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required - unique username
 * @property {string} fullname - display name (defaults to login)
 * @property {integer} role - user role: 0-regular 1-admin (defaults to 0)
 * @property {string} registeredAt.required -date of registration
 * @property {string} avaUrl - URL adress of profile picture
 * @property {boolean} isEnabled - indicates if user is active(defaults to true)
 */

class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
        this.id = id; 
        this.login = login;  
        this.fullname = fullname || login;  
        this.role=role || 0; 
        this.registeredAt=registeredAt; 
        this.avaUrl=avaUrl || null;
        this.isEnabled=isEnabled || true;
    }
 };
 
 module.exports = User;
 