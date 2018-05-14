const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const ProductController = controllers.ProductController;

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post('/', function(req, res) {
    const name = req.body.name;
    const style = req.body.style;
    const description = req.body.description;
    const price = req.body.price;
    if(name === undefined || style === undefined || description === undefined || price === undefined){
        res.status(400).end();
        return;
    }
    ProductController.add(name, style, description, parseFloat(price))
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

productRouter.post('/update', function(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    if(name === undefined || price === undefined){
        res.status(400).end();
        return;
    }
    ProductController.update(name, parseFloat(price))
        .then((product) => {
            res.status(201).json({"New price" : price});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

productRouter.get('/', function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    ProductController.getAll(req.query.name, limit, offset)
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

productRouter.delete('/:id', function (req, res) {
    const productId = parseInt(req.params.id);
    ProductController.delete(productId)
        .then((product) => {
            res.status(200).json(product.deletedAt);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

module.exports = productRouter;