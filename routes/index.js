const RouteManager = function() { };

RouteManager.attach = function(app) {
    app.use('/order', require('./order'));
    app.use('/product', require('./product'));
    app.use('/menu', require('./menu'));
    app.use('/user', require('./user'));
};

module.exports = RouteManager;