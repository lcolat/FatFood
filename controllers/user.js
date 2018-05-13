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
    // let user = {};
    const where = {
        login: login
    };
    options.where = where;
    return User.findOne({where : {login: login}})
        .then( user => {
            if(User.comparePassword(password, user.get('password')) === true){
                User.
            }
        });
    //console.log(JSON.parse(JSON.stringify(user)));
    // console.log(user.get({login: true}));
    //User.comparePassword(password, user.get(password));
};

module.exports = UserController;