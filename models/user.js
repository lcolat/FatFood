const passwordHash  = require('password-hash');
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
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        instanceMethods: {
            authenticate: function(value) {
                if (passwordHash.verify(value, this.password))
                    return this;
                else
                    return false;
            }
        }
    });
    User.beforeCreate(function(user, options, callback) {
        user.set('password', passwordHash.generate(user.get('password')));
    });
    User.beforeUpdate(function(user, options, callback) {
        user.set('password', passwordHash.generate(user.get('password')));
    });
    return User;
};
