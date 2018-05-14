const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const MenuController = controllers.MenuController;
const UserController = controllers.UserController;

const menuRouter = express.Router();
menuRouter.use(bodyParser.json());

menuRouter.post('/', function(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    if(name === undefined || price === undefined){
        res.status(400).end();
        return;
    }
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        MenuController.add(name, parseFloat(price))
            .then((menu) => {
                res.status(201).json(menu);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }

});

menuRouter.post('/update', function(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    if(name === undefined || price === undefined){
        res.status(400).end();
        return;
    }
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        MenuController.update(name, parseFloat(price))
            .then((menu) => {
                res.status(201).json({"New price" : price});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }
});

menuRouter.put('/:id/addproduct/:productId', function (req, res) {
    const id = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        MenuController.addProduct(id, productId)
            .then(() => {
                res.status(204).end();
            })
            .catch((err) => {
                console.log(err);
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }
});

menuRouter.get('/', function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    MenuController.getAll(req.query.name, limit, offset)
        .then((menus) => {
            res.json(menus);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = menuRouter;