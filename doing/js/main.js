// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
// 3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const settings = {
    appSelector: '#app',
    cartClass: 'cart',
    cartWidgetClass: 'widget-cart',
    cartButtonClass: 'btn-cart',
    productsContainerClass: 'products',
    productItemClass: 'product-item',
    productImageClass: 'product-image',
};


const app = new Vue({
    el: settings.appSelector,
    data: {
        productItemClass: 'product-item',
        productImageClass: 'product-image',

        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',

        products: [],
        productImg: 'https://placehold.it/200x150',

        showCartProperty: false,
        cart: {},

        searchLine: '',

    },
    computed: {
        prodImageStyle() {
            return {
                backgroundImage: `url(${this.productImg})`,
                backgroundSize: `cover`
            }
        },

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },

        addProduct(product, event) {
            let item = this.$data.cart.contents.find(elem => {
                return elem.id_product === product.id_product
            });
            if (item) {
                item.quantity++;
                this.$data.cart.countGoods++;
                this.$data.cart.amount += item.price;
            } else {
                const cartItem = {...product};
                cartItem['quantity'] = 1;
                this.$data.cart.contents.push(cartItem);
                this.$data.cart.countGoods++;
                this.$data.cart.amount += product.price;
            }
        },

        delProduct(product, event) {
            let item = this.$data.cart.contents.find(elem => {
                return elem.id_product === product.id_product
            });
            if (item && item.quantity > 1) {
                item.quantity--;
                this.$data.cart.countGoods--;
                this.$data.cart.amount -= item.price;
            } else if (item && item.quantity === 1) {
                const idx = this.$data.cart.contents.indexOf(item);
                this.$data.cart.contents.splice(idx, 1);
                this.$data.cart.countGoods--;
                this.$data.cart.amount -= item.price;
            }
        },

        cartUpdate(product, action) {

        },

        showCart(event) {
            this.$data.showCartProperty = true;
        },

        closeCart(event) {
            this.$data.showCartProperty = false;
        },

        filterGoods() {
            let filteredGoods = [];
            const field = new RegExp(this.$data.searchLine, 'ig');
            for (let elem of this.$data.products) {
                if (elem.product_name.match(field)) {
                    filteredGoods.push(elem);
                }
            }
            console.log(filteredGoods);
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                this.$data.cart = {...data};
                console.log(this.$data.cart)
            })
    }
});


// class Main {
//     constructor(container = '.products',
//                 productItemClass = 'product-item',
//                 productImageClass = 'product-image',
//                 cartClass = 'cart',
//                 cartButtonClass = 'btn-cart',
//                 cartWidgetClass = 'widget-cart',) {
//         this.ProductList = new ProductsList(container);
//         this.Cart = new Cart(cartClass, cartButtonClass, cartWidgetClass);
//
//         this._productBtnsListener();
//         this._cartItemsBtnsListener();
//     }
//
//     /**
//      * обработчик на кнопки добавления/удаления на карточке продукта
//      * @private
//      */
//     _productBtnsListener() {
//         this.ProductList.container.addEventListener('click', event => {
//             event.stopImmediatePropagation();
//             if (event.target.tagName === 'BUTTON') {
//                 let item = event.target.dataset;
//                 if (event.target.getAttribute('class') === 'buy-btn') {
//                     this.Cart.addItem(item);
//                 } else if (event.target.getAttribute('class') === 'dec-btn') {
//                     this.Cart.removeItem(item);
//                 }
//             }
//         })
//     }
//
//     /**
//      * обработчик на добавление/удаление в корзине
//      * @private
//      */
//     _cartItemsBtnsListener() {
//         this.Cart.itemsTable.addEventListener('click', event => {
//             event.stopImmediatePropagation();
//             if (event.target.tagName === 'BUTTON') {
//                 let item = event.target.dataset;
//                 if (event.target.getAttribute('class') === 'buy-btn') {
//                     this.Cart.incItem(item);
//                 } else if (event.target.getAttribute('class') === 'dec-btn') {
//                     this.Cart.decItem(item);
//                 }
//             }
//         })
//     }
// }
//
// class ProductsList {
//     constructor(container = '.products', productClass = Product, rout = '/catalogData.json') {
//         this.container = document.querySelector(container);
//         this.rout = `${API}${rout}`;
//         this.fetchedGoods = [];
//         this.ProductClass = productClass;
//         this._fetchProducts();
//     }
//
//     _fetchProducts() {
//         fetch(this.rout)
//             .then(result => result.json())
//             .then(data => {
//                 this.fetchedGoods = data;
//                 this.render()
//             })
//             .catch(error => console.log(error))
//     }
//
//     render() {
//         for (let prd of this.fetchedGoods) {
//             let product = new this.ProductClass(prd);
//             this.container.insertAdjacentHTML('beforeend', product.render());
//         }
//     }
// }
//
// class Product {
//     constructor(item,
//                 img = 'https://placehold.it/200x150',
//                 productItemClass = 'product-item',
//                 productImageClass = 'product-image') {
//         this.id_product = item.id_product;
//         this.product_name = item.product_name;
//         this.price = item.price;
//         this.img = img;
//         this.productItemClass = productItemClass;
//         this.productImageClass = productImageClass;
//     }
//
//     render() {
//         return `<div class='${this.productItemClass}'>
//                         <h3>${this.product_name}</h3>
//                         <div class='${this.productImageClass}'
//                             style="background-image: url('${this.img}');
//                             background-size: cover"></div>
//                         <p>$ ${this.price}</p>
//                         <button class="dec-btn"
//                         data-id_product="${this.id_product}"
//                         data-price="${this.price}"
//                         data-product_name="${this.product_name}"
//                         >Убрать из корзины</button>
//                         <button class="buy-btn"
//                         data-id_product="${this.id_product}"
//                         data-price="${this.price}"
//                         data-product_name="${this.product_name}"
//                         >Положить в корзину</button>
//                     </div>`
//     }
// }
//
// class Cart {
//     constructor(cartClass = 'cart', cartButtonClass = 'btn-cart', cartWidgetClass = 'widget-cart') {
//         this.cartClass = cartClass;
//         this.cartButton = document.querySelector(`.${cartButtonClass}`);
//         this.cartWidget = document.querySelector(`.${cartWidgetClass}`);
//         this.itemsTable = this.cartWidget.querySelector('table'); // список товров в корзине на странице
//         this.itemsTableBody = this.itemsTable.querySelector('tbody'); // список товров в корзине на странице
//         this.itemClass = CartItem; //
//         this.itemsList = {}; // {prod_id: {price: , title: , quantity:}, ...}
//         this._fillAllCartItems();
//         this._showCart();
//     }
//
//     /**
//      * добавляет товар в корзину
//      */
//     addItem(item) {
//         if (item.id_product in this.itemsList) {
//             this.incItem(item);
//         } else {
//             this.itemsList[item.id_product] = {
//                 'price': item.price,
//                 'product_name': item.product_name,
//                 'quantity': 1
//             };
//             // отрисовка добавленного товара
//             this._renderCartItem(item.id_product, this.itemsList[item.id_product]);
//         }
//         // console.log('add', this.itemsList) //
//     }
//
//     /**
//      * удаляет товар из корзины
//      */
//     removeItem(item) {
//         if (item.id_product in this.itemsList) {
//             delete this.itemsList[item.id_product];
//             let neededItem = this.itemsTable.querySelector(`#order-item_${item.id_product}`);
//             neededItem.remove();
//             this._showTotalQuantity();
//             this._showTotalCost()
//         }
//         // console.log('rem', this.itemsList)//
//     }
//
//
//     /**
//      * увеличивает количество товара в корзине
//      */
//     incItem(item) {
//         this.itemsList[item.id_product]['quantity']++;
//         this._renderCartItem(item.id_product, this.itemsList[item.id_product]);
//         // console.log('inc', this.itemsList)
//     }
//
//     /**
//      * уменьшает количество товара в корзине
//      */
//     decItem(item) {
//         if (this.itemsList[item.id_product]['quantity'] > 1) {
//             this.itemsList[item.id_product]['quantity']--;
//             this._renderCartItem(item.id_product, this.itemsList[item.id_product]);
//         } else {
//             delete this.itemsList[item.id_product];
//             let neededItem = this.itemsTable.querySelector(`#order-item_${item.id_product}`);
//             neededItem.remove();
//             this._showTotalQuantity();
//             this._showTotalCost()
//         }
//         // console.log('dec', this.itemsList)
//     }
//
//
//     /**
//      * возвращает полную стоимость корзины
//      */
//     _getTotalCost() {
//         return Object.values(this.itemsList).reduce(
//             (accumulator, currentValue) => {
//                 return accumulator + currentValue.price * currentValue.quantity;
//             },
//             0
//         );
//     }
//
//     /**
//      * возвращает общее количество товаров в корзине
//      */
//     _getTotalQuantity() {
//         return Object.values(this.itemsList).reduce(
//             (accumulator, currentValue) => {
//                 return accumulator + currentValue.quantity;
//             },
//             0
//         );
//     }
//
//     _renderCartItem(id, item) {
//         let neededItem = this.itemsTable.querySelector(`#order-item_${id}`);
//         if (neededItem) {
//             neededItem.innerHTML =
//                 `<td>${item.product_name}</td>
//                     <td>${item.price}</td>
//                     <td>${item.quantity}</td>
//                     <td>${item.price * item.quantity}</td>
//                     <td><button class="buy-btn"
//                         data-id_product="${id}"
//                         data-price="${item.price}"
//                         data-product_name="${item.product_name}">+</button></td>
//                     <td><button class="dec-btn"
//                         data-id_product="${id}"
//                         data-price="${item.price}"
//                         data-product_name="${item.product_name}">-</button></td>`
//         } else {
//             const rowsItems = this.itemsTable.querySelector('tbody');
//             rowsItems.insertAdjacentHTML('beforeend',
//                 `
//                 <tr id="order-item_${id}">
//                     <td>${item.product_name}</td>
//                     <td>${item.price}</td>
//                     <td>${item.quantity}</td>
//                     <td>${item.price * item.quantity}</td>
//                     <td><button class="buy-btn"
//                         data-id_product="${id}"
//                         data-price="${item.price}"
//                         data-product_name="${item.product_name}">+</button></td>
//                     <td><button class="dec-btn"
//                         data-id_product="${id}"
//                         data-price="${item.price}"
//                         data-product_name="${item.product_name}">-</button></td>
//                 </tr>`
//             )
//         }
//         this._showTotalQuantity();
//         this._showTotalCost()
//     }
//
//     _fillAllCartItems() {
//         for (let ptod_id in this.itemsList) {
//             let poduct = this.itemsList[ptod_id];
//             this.itemsTableBody.insertAdjacentHTML('beforeend', `
//                 <tr id="order-item_${ptod_id}">
//                     <td>${poduct['product_name']}</td>
//                     <td>${poduct['price']}</td>
//                     <td>${poduct['quantity']}</td>
//                     <td>${poduct['price'] * poduct['quantity']}</td>
//                     <td><button class="buy-btn"
//                         data-id_product="${ptod_id}"
//                         data-price="${poduct['price']}"
//                         data-product_name="${poduct['product_name']}">+</button></td>
//                     <td><button class="dec-btn"
//                         data-id_product="${ptod_id}"
//                         data-price="${poduct['price']}"
//                         data-product_name="${poduct['product_name']}">-</button></td>
//                 </tr>`)
//         }
//     }
//
//     _showTotalQuantity() {
//         const totalQuantityTable = this.itemsTable.querySelector('#total-goods');
//         totalQuantityTable.innerHTML = this._getTotalQuantity();
//         const totalQuantityBtn = this.cartButton.querySelector('#btn-cart-total-goods');
//         totalQuantityBtn.innerHTML = this._getTotalQuantity();
//     }
//
//     _showTotalCost() {
//         const totalCostTable = this.itemsTable.querySelector('#total-price');
//         totalCostTable.innerHTML = this._getTotalCost();
//         const totalCostBtn = this.cartButton.querySelector('#btn-cart-total-price');
//         totalCostBtn.innerHTML = this._getTotalCost();
//     }
//
//     _showCart() {
//         this.cartButton.addEventListener('click', () => {
//             this.cartWidget.style.display = 'block';
//         });
//         this.cartWidget.querySelector('#close-cart-btn').addEventListener('click', () => {
//             this.cartWidget.style.display = 'none';
//         })
//     }
// }
//
// class CartItem {
//     constructor(product, cartItemClass = 'cart-item') {
//         this.product_name = product.product_name; // instance of Product ?
//         this.price = product.price;
//         this.quantity = 1;
//         this.cartItemClass = cartItemClass;
//     }
//
//     /**
//      * добавляет товар
//      */
//     inc() {
//         this.quantity++
//     }
//
//     /**
//      * удаляет товар
//      */
//     dec() {
//         if (this.quantity > 0) {
//             this.quantity--
//         }
//     }
//
//     /**
//      * возвращает полную стоимость позиции
//      */
//     getTotalPrice() {
//         return this.product.price * this.quantity
//     }
//
//     /**
//      * возвращает общее количество товаров позиции
//      */
//     getTotalQuantity() {
//         return this.quantity
//     }
// }
//
// // const pList = new ProductsList();
// // let cart = new Cart();
//
// new Main();