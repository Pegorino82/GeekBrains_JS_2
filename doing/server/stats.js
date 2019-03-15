const moment = require('moment');
const fs = require('fs');

const CODING = 'utf-8';

const statsFile = 'server/stats.json';

/**
 * подготавливает данные для записи в файл
 * @param req запрос клиента
 * @return {{action: string, product: number, time: string}}
 */
const prepareData = (req) => {
    let _action = 'add product'; // устанавливаем значение по умолчанию
    let quantity = +req.body.quantity;
    let prodId = +req.params.id || +req.body.id_product;
    if (quantity && quantity < 0 || !quantity) {
        _action = 'remove product'
    }
    return {
        action: _action,
        product: prodId,
        time: moment().format()
    }
};

/**
 * записывает данные в файл, если файла не существует, то создает его
 * @param req
 */
const statJson = (req) => {
    fs.exists(statsFile, (exists) => {
        if (exists) {
            fs.readFile(statsFile, {encoding: CODING}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let arr = JSON.parse(data);
                    arr.push(prepareData(req));
                    fs.writeFile(statsFile, JSON.stringify(arr, null, 4), {encoding: CODING, spaces: 4}, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('ok!')
                        }
                    })
                }
            });
        } else {
            let arr = [];
            arr.push(prepareData(req));
            console.log(arr);
            fs.writeFile(statsFile, JSON.stringify(arr, null, 4), {encoding: CODING, spaces: 4}, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('ok!')
                }
            })
        }
    })

};

module.exports = statJson;