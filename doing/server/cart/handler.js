const cart = require('./cart');
const statJson = require('../stats');
const fs = require('fs');

const CODING = 'utf-8';
const ERROR404 = '404';

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

let handler = (req, res, action, file) => {
    fs.readFile(file, CODING, (err, data) => {
        if (err) {
            res.sendStatus(ERROR404, JSON.stringify({result: 0, text: err}));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus(ERROR404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}));
                    statJson(req)
                }
            })
        }
    })
};

module.exports = handler;