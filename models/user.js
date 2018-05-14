const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    const hashPasswordHook = function(user, options) {
        let saltRounds = 10;
        return bcrypt.hash(user.password, saltRounds)
                .then(function (hash) {
                    user.set('password', hash);
                }).catch( (err) => {
                    console.log(err);
            });
    };
    User.beforeCreate(hashPasswordHook);

    User.comparePassword = function (authPassword, dbPassword) {
        return bcrypt.compare(authPassword, dbPassword)
            .then(function (res) {
                if(res === true){
                    return true;
                }else {
                    return false;
                }
            })
            .catch((err) => {
                console.error(err);
        });
    };
    User.getToken = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    User.verifyToken = (req,res) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
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

    return User;
};
