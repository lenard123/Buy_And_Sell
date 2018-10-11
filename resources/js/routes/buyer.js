const Buyer = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Buyer.vue');
const Home = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Home.vue');
const Products = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Products.vue');
const Cart = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Cart.vue');
const Checkout = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Checkout.vue');
const Order = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Order.vue');
const OrderDetail = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/seller/OrderDetails.vue');
const Sellers = ()=>import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Sellers.vue');
const SellerProfile = () => import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/SellerProfile.vue');
const MessagesList = () => import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/MessagesList.vue');
const Messages = () => import(/* webpackChunkName: "./js/buyer" */'../pages/buyer/Messages.vue');

export default {
	path: '/',
	component: Buyer,
	children: [
		{
			path: '',
			component: Home,
			name: 'buyer-home'
		},
		{
			path:'products',
			component: Products,
			name: 'buyer-products'
		},
		{
			path: 'orders',
			component:Order,
			beforeEnter: (to, from, next) => {
				const vm = Vue.prototype.$l;
				if (vm.hasToken() && vm.getRole()==0)
					next();
				else next({name:'buyer-home'});
			},
			name: 'buyer-orders'
		},

		{
			path: 'orders/:id',
			component: OrderDetail,
			name: 'buyer-orders-details'
		},

		{
			path: 'sellers',
			component: Sellers,
			name: 'buyer-sellers'
		},

		{
			path: 'sellers/:id',
			component: SellerProfile,
			name: 'buyer-sellers-profile'
		},

		{
			path: 'messages',
			component: MessagesList,
			name: 'buyer-messages',
			beforeEnter: (to, from, next) =>{
				const vm = Vue.prototype.$l;
				if (vm.hasToken() && vm.getRole()==0)
					next();
				else next({name:'buyer-home'});
			}
		},

		{
			path: 'messages/:id',
			component: Messages,
			name: 'buyer-messages-user',
			beforeEnter: (to, from, next) =>{
				const vm = Vue.prototype.$l;
				if (vm.hasToken() && vm.getRole()==0)
					next();
				else next({name:'buyer-home'});
			}
		},

		{
			path:'cart',
			component:{template:'<router-view></router-view>'},
			beforeEnter: (to, from, next) =>{
				const vm = Vue.prototype.$l;
				if (vm.hasToken() && vm.getRole()==0)
					next();
				else next({name:'buyer-home'});
			},
			children: [
				{
					path: '',
					component: Cart,
					name: 'buyer-cart'
				},
				{
					path: 'check-out',
					component: Checkout,
					name: 'buyer-cart-checkout',
					beforeEnter: (to, from, next) => {
						if (from.name !== 'buyer-cart')
							next({name:'buyer-cart'});
						else
							next();
					} //Close the function
				} // Close the path
			] // Close the children of cart
		}
	]
}

