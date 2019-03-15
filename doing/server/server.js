const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cart/router');

const PORT = process.env.PORT || 3000; // set PORT=3000 (export PORT=3000 <for linux>)
const PRODUCTS = 'server/db/products.json';
const CODING = 'utf-8';
const ERROR404 = '404';

app.use(express.json());// middleware for JSON requests
app.use('/', express.static('public')); // static files for default rout
app.use('/api/cart', cart); // set routes from cart/router

app.get('/api/products', (req, res) => {
    fs.readFile(PRODUCTS, CODING, (err, data) => {
        if (err) {
            res.sendStatus(ERROR404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

app.listen(port = PORT, () => {
    console.log('Serving on port 3000')
});