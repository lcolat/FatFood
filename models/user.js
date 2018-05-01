const bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_digest: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false
        }
    },{
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        instanceMethods: {
            authenticate: function(value) {
                if (bcrypt.compareSync(value, this.password_digest))
                    return this;
                else
                    return false;
            }
        }
    });
    let hasSecurePassword = function(user, options, callback) {
        bcrypt.hash(user.get('password'), 10, function(err, hash) {
            if (err) return callback(err);
            user.set('password_digest', hash);
            return callback(null, options);
        });
    };
    User.beforeCreate(function(user, options, callback) {
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });
    User.beforeUpdate(function(user, options, callback) {
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });
    return User;
};
