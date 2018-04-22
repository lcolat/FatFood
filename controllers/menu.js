const ModelIndex = require('../models');
const Menu = ModelIndex.Menu;
const Op = ModelIndex.Sequelize.Op;

const MenuController = function() { };


MenuController.add = function(name, price) {
    return Menu.create({
        name: name,
        price: price
    });
};

MenuController.getAll = function (search, limit, offset) {
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
    return Menu.findAll(options);
};

module.exports = MenuController;