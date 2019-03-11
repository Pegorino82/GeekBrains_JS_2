const productsListSettings = {
    productsContainerClass: 'products',
};

const apiProductsRequests = {
    catalogUrl: '/catalogData.json',
};

Vue.component('products-list', {
    data() {
        return {
            settings: productsListSettings,
            api: apiProductsRequests,

            products: [],
            filtered: [],

            productImg: 'https://placehold.it/200x150',
        }
    },

    methods: {
        filterGoods(searchLine) {
            const field = new RegExp(searchLine, 'ig');
            // this.filtered = this.products.find(elem => field.test(elem.product_name)); //TODO не работает
            let filteredGoods = [];
            for (let elem of this.products) {
                if (elem.product_name.match(field)) {
                    filteredGoods.push(elem);
                }
            }
            this.filtered = [...filteredGoods];
        }
    },

    mounted() {
        this.$parent.getJson(`${API + this.api.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },

    template : `
        <div :class="this.settings.productsContainerClass">
            <product v-for="product of filtered" 
            :key="product.id_product"
            :product="product"
            :productImg ="productImg"
            @add-product="$parent.$refs.cart.addProduct"
            @del-product="$parent.$refs.cart.delProduct"></product>           
        </div>
    `
});