const ModelIndex = require('../models');
const Menu = ModelIndex.Menu;
const Product = ModelIndex.Product;
const Op = ModelIndex.Sequelize.Op;

const MenuController = function() { };


MenuController.add = function(name, price) {
    return Menu.create({
        name: name,
        price: price
    });
};
MenuController.addProduct = function(id, productId) {
    return Menu.find({
        where: {
            id:id
        }
    }).then((menu) => {
        return Product.find({
            where: {
                id: productId
            }
        })
        .then((menu) => {
            Promotion.find({
                where: {
                    id: menu.get('promotion_id')
                }
            }).then( promotion => {
                if(promotion.get('deleted_at') > Date.now()){
                    var data = menu.set('price',promotion.get('price'));
                }else
                    var data = menu.get('price');
            });
            return order.addProduct(menu, { through: {price: data}});
        });
    });
};

MenuController.getAll = function (search, limit, offset) {
    const options = {
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
    return Menu.findAll(options);
};
MenuController.delete = function(menuId) {
    const options = {};
    const where = {
        id: menuId
    };
    options.where = where;
    return Menu.destroy(options);
};

module.exports = MenuController;