const cartSettings = {
    cartClass: 'cart',
    cartWidgetClass: 'widget-cart',
    cartButtonClass: 'btn-cart',
};

// запросы для работы с сервером
const cartApiRequests = {
    cartUrl: '/getBasket.json',
    addToBasket: '/addToBasket.json',
    deleteFromBasket: '/deleteFromBasket.json',
};

Vue.component('cart', {
    data() {
        return {
            api: cartApiRequests,
            settings: cartSettings,

            showCartProperty: false,
            cart: {},
        }
    },

    methods: {
        addProduct(product, event) {
            this.$parent.getJson(`${API}${this.api.addToBasket}`)
                .then(data => {
                    if (data.result === 1) {
                        let item = this.cart.contents.find(elem => {
                            return elem.id_product === product.id_product
                        });
                        if (item) {
                            item.quantity++;
                            this.cart.countGoods++;
                            this.cart.amount += item.price;
                        } else {
                            const cartItem = {...product};
                            cartItem['quantity'] = 1;
                            this.cart.contents.push(cartItem);
                            this.cart.countGoods++;
                            this.cart.amount += product.price;
                        }
                    }
                });
        },

        delProduct(product, event) {
            this.$parent.getJson(`${API}${this.api.deleteFromBasket}`)
                .then(data => {
                    if (data.result === 1) {
                        let item = this.cart.contents.find(elem => {
                            return elem.id_product === product.id_product
                        });
                        if (item && item.quantity > 1) {
                            item.quantity--;
                            this.cart.countGoods--;
                            this.cart.amount -= item.price;
                        } else if (item && item.quantity === 1) {
                            const idx = this.$data.cart.contents.indexOf(item);
                            this.cart.contents.splice(idx, 1);
                            this.cart.countGoods--;
                            this.cart.amount -= item.price;
                        }
                    }
                })
        },

        cartUpdate(product, action) {

        },

        showCart(event) {
            this.showCartProperty = true;
        },

        closeCart(event) {
            this.showCartProperty = false;
        },
    },

   mounted() {
       this.$parent.getJson(`${API + this.api.cartUrl}`)
            .then(data => {
                this.$data.cart = {...data};
            })
   },

   template: `
        <div :class="this.settings.cartClass">
            <div :class="this.settings.cartWidgetClass" v-if="showCartProperty">
            <cart-item 
            :cart="cart"
            @close-cart="closeCart"
            @add-product="addProduct"
            @del-product="delProduct"></cart-item>                
            </div>
            <button :class="this.settings.cartButtonClass" type="button" @click="showCart($event)">
                <p>Корзина</p>
                <div v-if="!cart.amount">нет товаров</div>
                <div v-else>
                    <p>товаров: <span id="btn-cart-total-goods">{{ cart.countGoods }}</span></p>
                    <p>цена: <span id="btn-cart-total-price"></span>{{ cart.amount }}</p>
                </div>
            </button>
        </div>
   `
});