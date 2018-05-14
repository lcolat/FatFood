const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const PromotionController = controllers.PromotionController;
const UserController = controllers.UserController;
const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.post('/', function(req, res) {
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        const name = req.body.name;
        const date = new Date(req.body.date);
        const price = req.body.price;
        const id = req.body.id;
        const menu = req.body.menu;
        if (name === undefined || date === undefined || price === undefined || id === undefined || menu === undefined ) {
            res.status(400).end();
            return;
        }
        PromotionController.add(name, parseFloat(price), date, parseInt(id), menu)
            .then((promotion) => {
                res.status(201).json(promotion);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }
});


promotionRouter.get('/', function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    PromotionController.getAll(req.query.name, limit, offset)
        .then((promotions) => {
            res.json(promotions);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

promotionRouter.delete('/:id', function (req, res) {
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        const promotionId = parseInt(req.params.id);
        PromotionController.delete(promotionId)
            .then((product) => {
                res.status(200).json(product.deletedAt);
            })
            .catch((err) => {
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }
});

module.exports = promotionRouter;