const ModelIndex = require('../models');
const Order = ModelIndex.Order;
const Product = ModelIndex.Product;
const Menu = ModelIndex.Menu;
const Promotion = ModelIndex.Promotion;
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
            // Promotion.find({
            //     where: {
            //         id: product.get('promotion_id')
            //     }
            // }).then( promotion => {
            //    if(promotion.get('deleted_at') > Date.now()){
            //        product.set('price',promotion.get('price'));
            //    }
            // });
            return order.addProduct(product);
        });
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
                return order.addMenu(menu, {  through: {price: 1.2}});
            });
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

OrderController.delete = function(orderId) {
    const options = {};
    const where = {
        id: orderId
    };
    options.where = where;
    return Order.destroy(options);
};

module.exports = OrderController;