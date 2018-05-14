const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.UserController;
const Utils = require('../utils/utils');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post('/', function(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    if (login === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    Utils.verifyToken(req, res)
        .then( (good) => {
            UserController.add(login, password)
                .then((user) => {
                    res.status(201).json(user);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).end();
                });

    });

});

userRouter.post('/authenticate', function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    if (login === undefined || password === undefined) {
        res.status(400).end();
        return;
    }

    UserController.auth(login, password)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = userRouter;