// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий).
// ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой
// (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
//     Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

class Filling {
    constructor(title, energy, price) {
        this.title = title;
        this.energy = energy;
        this.price = price;
    }
}

class Topping {
    constructor(title, energy, price) {
        this.title = title;
        this.energy = energy;
        this.price = price;
    }
}

class Burger {
    constructor(filling, price = 0, energy=0) {
        this.price = price;
        this.energy = energy;
        this.filling = filling;
        this.topping = [];
    }


    /**
     * возвращает начинку
     * @return {*}
     */
    getFilling() {
        return this.filling.title
    }

    /**
     * добавляет топпинг
     * @param topping
     */
    addTopping(topping) {
        this.topping.push(topping);
    }

    /**
     * возвращает все топпинги
     * @return {any[]}
     */
    getToppings() {
        return this.topping.map(topping => topping.title)
    }

    /**
     * возвращает общую калорийность
     * @return {*}
     */
    getEnergy() {
        return this.energy + this.filling.energy + this.topping.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue.energy;
            },
            0
        );
    }

    /**
     * возвращает общую цену
     * @return {*}
     */
    getPrice() {
        return this.price + this.filling.price + this.topping.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue.price;
            },
            0
        );
    }
}

class smallBurger extends Burger {
    constructor(filling, price = 50, energy=20) {
        super(filling, price, energy);
        this.type = 'small';
        this.filling = filling;
        this.topping = [];
    }
}

class bigBurger extends Burger {
    constructor(filling, price = 100, energy=40) {
        super(filling, price, energy);
        this.type = 'big';
        this.filling = filling;
        this.topping = [];
    }
}


//TODO сделать валидацию данных
class OrderBurger {
    constructor(
        btnSelector = '.order-button',
        burgerSelector = '.burger-select',
        fillingSelector = '.filling-select',
        toppingSelector = '.topping-select',
        orderBlockSelector = '.order'
    ) {
        this.btnSelector = btnSelector;
        this.burgerSelector = burgerSelector;
        this.fillingSelector = fillingSelector;
        this.toppingSelector = toppingSelector;
        this.orderBlockSelector = orderBlockSelector;

        /**
         * готовый гамбургер
         * @type {null}
         */
        this.burger = null;

        /**
         * полученные данные из html
         * @type {number}
         */
        this.burgerId = 0;
        this.fillingId = 0;
        this.toppingIdsList = [];

        /**
         * существующие гамбургеры, начинки, топпинги
         * @type {Array}
         */
        this.burgers = [];
        this.fillings = [];
        this.toppings = [];

        this._fetchBurgers();
        this._fetchFillings();
        this._fetchToppings();
    }

    /**
     * получает гамбургеры с сервера
     * @private
     */
    _fetchBurgers() {
        this.burgers = [
            {'id': 0, 'type': 'small', 'energy': 20, 'price': 50},
            {'id': 1, 'type': 'big', 'energy': 40, 'price': 100},
        ]
    }

    /**
     * получает начинки с сервера
     * @private
     */
    _fetchFillings() {
        this.fillings = [
            {'id': 0, 'title': 'cheese', 'energy': 20, 'price': 10},
            {'id': 1, 'title': 'salad', 'energy': 5, 'price': 20},
            {'id': 2, 'title': 'potato', 'energy': 10, 'price': 15},
        ]
    }

    /**
     * получает топпинги с сервера
     * @private
     */
    _fetchToppings() {
        this.toppings = [
            {'id': 0, 'title': 'spice', 'energy': 0, 'price': 15},
            {'id': 1, 'title': 'mayo', 'energy': 5, 'price': 20},
        ]

    }

    /**
     * получает выбранные значения начинки, топпинга из html
     * @param selector
     * @param tag
     * @return {Array}
     * @private
     */
    _getSelected(selector, tag = 'input') {
        let result = [];
        let block = document.querySelector(selector);
        let inputs = block.querySelectorAll(tag);
        for (let i of inputs) {
            if (i.checked) {
                result.push(+i.value)
            }
        }
        return result
    }

    /**
     * собирает заказ по нажатию на кнопку
     */
    parseData() {
        const orderBtn = document.querySelector(this.btnSelector);
        orderBtn.addEventListener('click', (event) => {
                this.burgerId = document.querySelector(this.burgerSelector).options.selectedIndex;
                this.fillingId = this._getSelected(this.fillingSelector)[0];
                this.toppingIdsList = this._getSelected(this.toppingSelector);
                this._makeBurger();
                this._renderOrder();
            }
        );
    }

    /**
     * собирает гамбургер
     * @private
     */
    _makeBurger() {
        let fillingObj = this.fillings.find(filling => filling['id'] === this.fillingId);
        let filling = new Filling(fillingObj['title'], fillingObj['energy'], fillingObj['price']);

        let burgerObj = this.burgers.find(burger => burger.id === this.burgerId);
        if (burgerObj['type'] === 'small') {
            this.burger = new smallBurger(filling)
        } else {
            this.burger = new bigBurger(filling)
        }

        for (let toppingItem of this.toppings) {
            let toppingObj = this.toppings.find(topping => topping.id === toppingItem.id);
            let topping = new Topping(toppingObj['title'], toppingObj['energy'], toppingObj['price']);
            if (this.burger) {
                this.burger.addTopping(topping);
            }
        }
    }

    /**
     * отрисовывает информацию о выбранном гамбургере
     * @private
     */
    _renderOrder() {
        let orderWidget = document.querySelector(this.orderBlockSelector);
        let burgerType = this.burger.type === 'small' ? 'маленький' : 'большой';
        orderWidget.innerHTML = `
                    <div>
                        Ваш заказ: <strong>${burgerType} гамбургер</strong>
                    </div>
                    <div>
                        начинка ${this.burger.getFilling()}
                    </div>
                    <div>
                        топпинги ${this.burger.getToppings()}
                    </div>
                    <div>
                        калорийность ${this.burger.getEnergy()}
                    </div>
                    <div>
                        цена ${this.burger.getPrice()}
                    </div>
         `
    }

    main() {
        this.parseData();
    }
}

let order = new OrderBurger();
order.main();