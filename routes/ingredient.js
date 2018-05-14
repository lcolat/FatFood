const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const IngredientController = controllers.IngredientController;
const UserController = controllers.UserController;

const ingredientRouter = express.Router();
ingredientRouter.use(bodyParser.json());

ingredientRouter.post('/', function(req, res) {
    const name = req.body.name;
    const quantity = req.body.quantity;
    if(name === undefined || quantity === undefined){
        res.status(400).end();
        return;
    }
    if(UserController.verifyToken(req.headers['x-access-token']) === true){
        IngredientController.add(name, parseInt(quantity))
            .then((ingredient) => {
                res.status(201).json(ingredient);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
    }else{
        res.status(403).end();
    }

});


ingredientRouter.get('/', function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    IngredientController.getAll(req.query.name, limit, offset)
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = ingredientRouter;