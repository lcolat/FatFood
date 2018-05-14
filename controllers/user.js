const ModelIndex = require('../models');
const User = ModelIndex.User;
const jwt = require('jsonwebtoken');
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

UserController.verifyToken = (req,res) => {
    const token = req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, CONFIG.jwt_encryption, function(err, decoded) {
            if (err) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            console.log("aaaa");
            return true;
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};

module.exports = UserController;