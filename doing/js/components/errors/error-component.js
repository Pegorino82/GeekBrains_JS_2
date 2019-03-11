Vue.component('error-component', {
    data() {
        return {
            errorBlock: false,
            errorUrl: null
        }
    },

    methods: {
        renderError(error, url) {
            // console.log('here!');
            // console.log(url);
            this.errorUrl = url.split('/').pop();
            this.errorBlock = true;
        }
    },

    template: `
        <div v-if="errorBlock" class="error-message">
            <p>ERROR!</p>
            <p>Ошибка запроса к серверу!</p>
            <p>/{{ errorUrl }}</p>
        </div>        
    `
});