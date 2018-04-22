const ModelIndex = require('../models');
const Order = ModelIndex.Order;
const Op = ModelIndex.Sequelize.Op;

const OrderController = function() { };

OrderController.add = function(payment) {
    return Order.create({
        payment_method: payment
    });
};

OrderController.getAll = function (search, limit, offset) {
    const options = {
        // include: [{
        //     model: ModelIndex.Menu,
        //     as: 'menus',
        //     include: [{
        //         model: ModelIndex.Product,
        //         as: 'products'
        //     }]
        // }],
        include: [{
            model: ModelIndex.Product,
            as: 'products'
        }]
    };
    const where = {};
    if(search !== undefined){
        where.name = {
            [Op.like]: `${search}%`
        };
    }
    options.where = where;
    if(limit !== undefined){
        options.limit = limit;
    }
    if(offset !== undefined){
        options.offset = offset;
    }
    return Order.findAll(options);
};

module.exports = OrderController;