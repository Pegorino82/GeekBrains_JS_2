const searchSettings = {
    searchClass: 'search',
    searchFieldClass: '',
    searchBtnClass: '',
};

Vue.component('search', {
    data() {
        return {
            settings: searchSettings,
            searchLine: '',
        }
    },

    template: `
        <div :class="this.settings.searchClass">
            <input :class="this.settings.searchFieldClass" type="text" v-model="searchLine">
            <button 
            :class="this.settings.searchBtnClass" 
            type="button" 
            @click="$parent.$refs.productsList.filterGoods(searchLine)">Найти</button>
        </div>
    `
});