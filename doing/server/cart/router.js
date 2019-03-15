const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');

const CODING = 'utf-8';
const ERROR404 = '404';
const CART = 'server/db/userCart.json';

router.get('/', (req, res) => {
    fs.readFile(CART, CODING, (err, data) => {
        if (err) {
            res.sendStatus(ERROR404, JSON.stringify({result: 0, text: err}));
        } else {
            // console.log(data);
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', CART);
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', CART);
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', CART)
});

module.exports = router;