const user_rep = require('../repositories/userRepository.js');
const { use } = require('../routes/users.js');
const userRepository = new user_rep("data/users.json");

module.exports = {
    getUsers(req, res) {

        const users = userRepository.getUsers();
        
        res.render('users', {users});
    },

    getUserById(req, res) {
        const userID = Number(req.params.id);

        const user = userRepository.getUserById(userID);
                
        res.render('user',user);

    }
};
