let add = (cart, req) => {
    // console.log('post', req.body);
    // console.log('post', req.params);
    cart.contents.push(req.body);

    cart.amount ? cart.amount += +req.body.price : +req.body.price;
    cart.countGoods += 1;

    return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
    // console.log('put', req.body);
    // console.log('put', req.params);
    let item = cart.contents.find(el => el.id_product === +req.params.id);
    item.quantity += +req.body.quantity;

    cart.amount += +item.price * +req.body.quantity;
    cart.countGoods += +req.body.quantity;

    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    // console.log('delete', req.body);
    // console.log('delete', req.params);
    let item = cart.contents.find(el => el.id_product === +req.params.id);
    cart.amount -= item.price * item.quantity;

    cart.countGoods -= item.quantity;
    cart.contents.splice(cart.contents.indexOf(item), 1);

    return JSON.stringify(cart, null, 4);
};


module.exports = {
    add,
    change,
    remove
};