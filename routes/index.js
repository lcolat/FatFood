const RouteManager = function() { };

RouteManager.attach = function(app) {
    app.use('/order', require('./order'));
    app.use('/product', require('./product'));
    app.use('/ingredient', require('./ingredient'));
    app.use('/menu', require('./menu'));
    app.use('/promotion', require('./promotion'));
    app.use('/user', require('./user'));
};

module.exports = RouteManager;