const productSettings = {
    productItemClass: 'product-item',
    productImageClass: 'product-image',
};

Vue.component('product', {
    props: ['product', 'productImg'],
    data() {
        return {
            settings: productSettings,
        }
    },

    computed: {
        prodImageStyle() {
            return {
                backgroundImage: `url(${this.productImg})`,
                backgroundSize: `cover`
            }
        },
    },

    template: `
            <div :class='this.settings.productItemClass'>
                <h3>{{ product.product_name }}</h3>
                <div :class='this.settings.productImageClass'
                     :style='this.prodImageStyle'></div>
                <p>$ {{ product.price }}</p>
                <button class="del-btn" @click.stop="$emit('del-product', product, $event)">Убрать из корзины</button>
                <button class="buy-btn" @click.stop="$emit('add-product', product, $event)">Положить в корзину</button>
            </div>
    `

});

