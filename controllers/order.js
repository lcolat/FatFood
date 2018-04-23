const ModelIndex = require('../models');
const Order = ModelIndex.Order;
const Product = ModelIndex.Product;
const Menu = ModelIndex.Menu;
const Op = ModelIndex.Sequelize.Op;

const OrderController = function() { };

OrderController.add = function(payment) {
    return Order.create({
        payment_method: payment
    });
};

OrderController.addProduct = function(id, productId) {
    return Order.find({
        where: {
            id:id
        }
    }).then((order) => {
        return Product.find({
            where: {
                id: productId
            }
        })
        .then((product) => {
            return order.addProduct(product);
        })
    });
};

OrderController.addMenu = function(id, menuId) {
    return Order.find({
        where: {
            id:id
        }
    }).then((order) => {
        return Menu.find({
            where: {
                id: menuId
            }
        })
            .then((menu) => {
                return order.addMenu(menu);
            })
    });
};

OrderController.getAll = function (search, limit, offset) {
    const options = {
        include: [{
            model: ModelIndex.Menu,
            as: 'menus',
            include: [{
                model: ModelIndex.Product,
                as: 'products'
            }]
        },{
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