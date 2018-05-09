const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const PromotionController = controllers.PromotionController;

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.post('/', function(req, res) {
    const name = req.body.name;
    var date = new Date(req.body.date);
    const price = req.body.price;
    if(name === undefined || date === undefined || price === undefined){
        res.status(400).end();
        return;
    }
    PromotionController.add(name, date, parseFloat(price))
        .then((promotion) => {
            res.status(201).json(promotion);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
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
    const promotionId = parseInt(req.params.id);
    PromotionController.delete(promotionId)
        .then((product) => {
            res.status(200).json(product.deletedAt);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

module.exports = promotionRouter;