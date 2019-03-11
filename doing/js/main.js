const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const settings = {
    appSelector: '#app',
};

const app = new Vue({
    el: settings.appSelector,
    data: {},

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
    },

    mounted() {
    }
});
