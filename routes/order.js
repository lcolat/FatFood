const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const OrderController = controllers.OrderController;

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
    OrderController.getAll(req.query.name, limit, offset)
        .then((orders) => {
            res.json(orders);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = orderRouter;