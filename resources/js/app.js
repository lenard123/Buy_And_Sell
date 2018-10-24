
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vuex from 'vuex';
import Notification from 'vue-notification';
import App from './App.vue';
import routes from './routes/routes.js';
import MyPlugin from './plugins/l.js';
import Store from './store.js';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Notification);
Vue.use(MyPlugin);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('logout-modal', require('./components/LogoutModal.vue'));
Vue.component('product-card', require('./components/ProductCard.vue'));
Vue.component('product-item', require('./components/ProductItem.vue'));
Vue.component('cart-item', require('./components/CartItem.vue'));
Vue.component('order', require('./components/Order.vue'));
Vue.component('top', require('./components/top.vue'));

const router = new VueRouter({
    mode: 'history',
	routes,
	linkActiveClass: 'active'
});

const app = new Vue({
    el: '#app',
    created: function () {
    	if (this.$l.hasToken())
    		this.$l.setAuthorization();
    },
    router,
    store: new Vuex.Store(Store),
    render: h => h(App)
});
