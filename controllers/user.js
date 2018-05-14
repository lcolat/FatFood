const ModelIndex = require('../models');
const User = ModelIndex.User;
const Op = ModelIndex.Sequelize.Op;

const UserController = function() { };

UserController.add = function(login, password) {
    return User.create({
        login: login,
        password: password
    });
};

UserController.auth = function(login, password) {
    const options = {raw: true};
    let token;
    let response = {};
    const where = {
        login: login
    };
    options.where = where;
    return User.findOne({where : {login: login}})
        .then( user => {
            return User.comparePassword(password, user.get('password')).then( (connexion) => {
                if(connexion === true){
                    token = User.getToken();
                    response = {
                        "status": "Logged in",
                        "token": token
                    };
                }else{
                    response = {
                        "status": "Not logged"
                    };
                }
                return response;
            });
        });
};

module.exports = UserController;