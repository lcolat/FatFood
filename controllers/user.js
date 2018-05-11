const ModelIndex = require('../models');
const User = ModelIndex.User;
const Op = ModelIndex.Sequelize.Op;
const bcrypt = require('bcrypt');
const bcrypt_p  = require('bcrypt-promise');

const UserController = function() { };

UserController.add = function(login, password) {
    return User.create({
        login: login,
        password: password
    });
};

UserController.findOne = function(login, password) {
    const options = {};
    let user = {};
    const where = {
        login: login
    };
    options.where = where;
    user = User.findOne(options);
    User.comparePassword(password, user.password);
    // bcrypt.compare(password, user.password, function (err, res){
    //     if (res) {
    //         console.log('wololo');
    //     }
    // });
    return user;
};

module.exports = UserController;