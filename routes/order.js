const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const OrderController = controllers.OrderController;
const UserController = controllers.UserController;

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.post('/', function(req, res) {
    const payment = req.body.payment;
    if(payment === undefined){
        res.status(400).end();
        return;
    }
    OrderController.add(payment)
        .then((p) => {
            res.status(201).json(p);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


orderRouter.get('/', function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        OrderController.getAll(req.query.name, limit, offset)
            .then((orders) => {
                res.json(orders);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }

});

orderRouter.put('/:id/addproduct/:productId', function (req, res) {
    const id = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    OrderController.addProduct(id, productId)
        .then(() => {
            res.status(204).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
});

orderRouter.put('/:id/addmenu/:menuId', function (req, res) {
    const id = parseInt(req.params.id);
    const menuId = parseInt(req.params.menuId);
    OrderController.addMenu(id, menuId)
        .then(() => {
            res.status(204).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
});

orderRouter.delete('/:id', function (req, res) {
    const orderId = parseInt(req.params.id);
    OrderController.delete(orderId)
        .then((order) => {
            res.status(200).json(order.deletedAt);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

module.exports = orderRouter;