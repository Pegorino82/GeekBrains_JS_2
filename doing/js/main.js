const settings = {
    cartClass: 'cart',
    cartButtonClass: 'btn-cart',
    productsContainerClass: 'products',
    productItemClass: 'product-item',
    productImageClass: 'product-image',
};

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.fetchedGoods = [];
        this.allProducts = [];
        this._fetchProducts();
        this._fillAllProducts();
    }

    _fetchProducts() {
        this.fetchedGoods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 35},
            {id: 4, title: 'Gamepad', price: 58},
            {id: 5, title: 'Chair', price: 200},
            {id: 6, title: 'Light', price: 200},
            {id: 7, title: 'Basket', price: 20},
            {id: 8, title: 'Something Else', price: 200},
        ];
    }

    _fillAllProducts() {
        for (let product of this.fetchedGoods) {
            let newProduct = new Product(product);
            this.allProducts.push(newProduct);
        }
    }

    // это наверное подразумевалось для корзины?
    getTotalCost() {
        let totalCost = this.allProducts.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue.price;
            },
            0
        );
        return `total cost: ${totalCost}`
    }

    render() {
        let container = document.querySelector(this.container);
        // container.innerHTML = this.allProducts.map(item => item.render()).join('');
        container.insertAdjacentHTML('beforeend', this.allProducts.map(item => item.render()).join(''));
    }
}

class Product {
    constructor(item, img = 'https://placehold.it/200x150',
                productItemClass = 'product-item',
                productImageClass = 'product-image') {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = img;
        this.productItemClass = productItemClass;
        this.productImageClass = productImageClass;
    }

    render() {
        return `<div class='${this.productItemClass}'>
                        <h3>${this.title}</h3>
                        <div class='${this.productImageClass}'
                            style="background-image: url('${this.img}');
                            background-size: cover"></div>
                        <p>$ ${this.price}</p>
                        <button
                        data-id="${this.id}"
                        data-price="${this.price}"
                        data-title="${this.title}"
                        >Купить</button>
                    </div>`
    }
}

class Cart {
    constructor(cartClass = 'cart', cartButtonClass = 'btn-cart',) {
        this.cartClass = cartClass;
        this.cartButtonClass = cartButtonClass;
        this.itemsList = [];
    }

    /**
     * добавляет товар в корзину
     */
    addItem(item) {
        let idx = this.itemsList.indexOf(item);
        if (idx !== -1) {
            this.itemsList[idx].inc()
        } else {
            this.itemsList.push(item)
        }
        console.log('add', this.itemsList) // TODO for debug
    }

    /**
     * удаляет товар из корзины
     */
    removeItem(item) {
        let idx = this.itemsList.indexOf(item);
        if (idx !== -1 && this.itemsList[idx].quantity > 0) {
            this.itemsList[idx].dec()
        } else if (idx !== -1 && this.itemsList[idx].quantity === 0) {
            this.itemsList.splice(idx, 1)
        }
        console.log('rem', this.itemsList)// TODO for debug
    }

    /**
     * возвращает полную стоимость корзины
     */
    getTotalCost() {
        return this.itemsList.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.quantity;
            },
            0
        );
    }

    /**
     * возвращает общее количество товаров в корзине
     */
    getTotalQuantity() {
        return this.itemsList.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue.quantity;
            },
            0
        );
    }
}

class CartItem {
    constructor(product, cartItemClass = 'cart-item') {
        this.product = product; // instance of Product ?
        this.price = product.price;
        this.quantity = 1;
        this.cartItemClass = cartItemClass;
    }

    /**
     * добавляет товар
     */
    inc() {
        this.quantity++
    }

    /**
     * удаляет товар
     */
    dec() {
        if (this.quantity > 0) {
            this.quantity--
        }
    }

    /**
     * возвращает полную стоимость позиции
     */
    getTotalPrice() {
        return this.product.price * this.quantity
    }

    /**
     * возвращает общее количество товаров позиции
     */
    getTotalQuantity() {
        return this.quantity
    }
}

const pList = new ProductsList();
pList.render();
// console.log(pList.getTotalCost());
let item = {id: 1, title: 'Notebook', price: 2000};
let item2 = {id: 7, title: 'Basket', price: 20};
let product = new Product(item);
let product2 = new Product(item2);
let product3 = new Product(item); // вот такое спокойно проходит, тут будет два "разных" продукта
let cartItem = new CartItem(product);
let cartItem2 = new CartItem(product2);
let cartItem3 = new CartItem(product3);
let cartItem4 = new CartItem(product); // и такое тоже
let cart = new Cart();
cart.addItem(cartItem);
cart.addItem(cartItem);
cart.addItem(cartItem2);
cart.addItem(cartItem3);
cart.addItem(cartItem4);
