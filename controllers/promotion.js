const ModelIndex = require('../models');
const Promotion = ModelIndex.Promotion;
const Menu = ModelIndex.Menu;
const Product = ModelIndex.Product;
const Op = ModelIndex.Sequelize.Op;

const PromotionController = function() { };


PromotionController.add = function(name, price, date, id, menu) {
    let options = {};
    const where = {};
    where.id = id;
    //options = {id_promotion: promotion.id};
    return Promotion.create({
        name: name,
        price: price,
        date: date,
        menu: menu
    }).then( promotion => {
        if(menu === "true"){
            Menu.update({promotion_id: promotion.get('id')},{where: {id: id}});
        }else{
            Product.update({promotion_id: promotion.get('id')},{where: {id: id}});
        }
    });
};

PromotionController.getAll = function (search, limit, offset) {
    const options = {};
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
    return Promotion.findAll(options);
};

PromotionController.delete = function(promotionId) {
    const options = {};
    const where = {
        id: promotionId
    };
    options.where = where;
    return Promotion.destroy(options);
};

module.exports = PromotionController;