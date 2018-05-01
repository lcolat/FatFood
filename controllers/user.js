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

module.exports = UserController;