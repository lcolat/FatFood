const ModelIndex = require('../models');
const passwordHash = require('password-hash');
const User = ModelIndex.User;
const Op = ModelIndex.Sequelize.Op;

const UserController = function() { };

UserController.add = function(login, password) {
    return User.create({
        login: login,
        password: password
    });
};

UserController.findOne = function(login, password) {
    console.log(password);
    const options = {};
    const where = {
        login: login,
        password: passwordHash.generate(password)
    };
    options.where = where;
    return User.findOne(options);
};

module.exports = UserController;