const ModelIndex = require('../models');
const Promotion = ModelIndex.Promotion;
const Op = ModelIndex.Sequelize.Op;

const PromotionController = function() { };


PromotionController.add = function(name, price, date) {
    return Promotion.create({
        name: name,
        date: date,
        price: price
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