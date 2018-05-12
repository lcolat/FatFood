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
    let user = User.findOne(options);
    //console.log(JSON.parse(JSON.stringify(user)));
    // console.log(user.get({login: true}));
    //User.comparePassword(password, user.get(password));
    return user;
};

module.exports = UserController;