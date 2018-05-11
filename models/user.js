const bcrypt = require('bcrypt');
const bcrypt_p  = require('bcrypt-promise');
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
    User.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });
    // User.beforeSave(async (user, options) => {
    //     user.changed('password')
    //         .then(bcrypt.genSalt(10))
    //         .then((salt) => {
    //             bcrypt.hash(user.password, salt);
    //         }).catch((err) => {
    //         console.log(err);
    //     });
    //     user.password = hash;
    // });
    // User.comparePassword = async function (pw) {
    //     let err, pass;
    //     if(!this.password){
    //         throw new Error('password not set');
    //     }
    //     [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    //     if(err){
    //         throw new Error(err.message);
    //     }
    //     if(!pass){
    //         throw new Error('invalid password');
    //     }
    //     return this;
    // };
    User.comparePassword = async function (pw, pwd) {
        let err, pass;
        if(!pw) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, pwd));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    };
    User.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };
    User.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return User;
};
