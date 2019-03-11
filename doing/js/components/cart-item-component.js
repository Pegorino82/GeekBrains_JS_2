Vue.component('cart-item', {
    props: ['cart'],

    template: `
    <div>
        <button id="close-cart-btn" @click="$emit('close-cart')">X</button>
        <table>
            <thead>
            <tr>
                <td>Наименование</td>
                <td>Цена</td>
                <td>Кол.</td>
                <td>Общая цена</td>
                <td>Добавить</td>
                <td>Удалить</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cartItem of cart.contents">
                <td>{{ cartItem.product_name }}</td>
                <td>{{ cartItem.price }}</td>
                <td>{{ cartItem.quantity }}</td>
                <td>{{ cartItem.quantity * cartItem.price }}</td>
                <td>
                    <button class="buy-btn" @click.stop="$emit('add-product', cartItem, $event)">+</button>
                </td>
                <td>
                    <button class="dec-btn" @click.stop="$emit('del-product', cartItem, $event)">-</button>
                </td>
            </tr>

            </tbody>
            <tfoot>
            <tr>
                <td>товаров в корзине:</td>
                <td></td>
                <td></td>
                <td id="total-goods">{{ cart.countGoods }}</td>
            </tr>
            <tr>
                <td>обшая стоимость:</td>
                <td></td>
                <td></td>
                <td id="total-price">{{ cart.amount }}</td>
            </tr>
            </tfoot>
        </table>
    </div>
    `
});


