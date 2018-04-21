const RouteManager = function() { };

RouteManager.attach = function(app) {
    app.use('/order', require('./order'));
    app.use('/menu', require('./menu'));
    app.use('/product', require('./product'));
};

module.exports = RouteManager;