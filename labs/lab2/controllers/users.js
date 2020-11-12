const user_rep = require('../repositories/userRepository.js');
const userRepository = new user_rep("data/users.json");

module.exports = {
    getUsers(req, res) {
        res.set("Content-type", "application/json");
        let page_size = Number.parseInt(req.query.per_page);
        if(req.query.per_page===undefined){
            page_size=2;
        }
        if(!Number.isInteger(page_size) || page_size<1 || page_size>10 ){
            return res.status(400).json({Error:"Page size should be natural number and <10"});
        }
        let page_number = Number.parseInt(req.query.page);
        if(req.query.page===undefined){
            page_number=1;
        }
        if(!Number.isInteger(page_number) || page_number<1){
            return res.status(400).json({Error:"Page should be natural number"});
        }
        const users = userRepository.getUsers();
        const items_total = users.length;
        if(page_size * (page_number - 1)>=items_total){
            res.status(404).json({Error:"no such page exists"});
        }
        const page = users.slice(page_size * (page_number - 1), page_size * (page_number));
        return res.status(200).json(page);
    },

    getUserById(req, res) {
        res.set("Content-type", "application/json");
        const userID=Number(req.params.id);
        if(!Number.isInteger(userID) || userID<1){
            return res.status(400).json({Error:"User id should be natural number"});
        }
        try{
            const user=userRepository.getUserById(userID);
            return res.status(200).json(user);
        }
        catch(error){
            return res.status(404).json({Error:error.message});
        }
    }
};
