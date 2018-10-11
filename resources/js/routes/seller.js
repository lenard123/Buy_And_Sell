const Seller = () => import(/* webpackChunkName: "./js/seller" */'../pages/seller/Seller.vue');

const Category = () => import(/* webpackChunkName: "./js/seller" */'../pages/admin/Category.vue');
const CategoryAdd = () => import(/* webpackChunkName: "./js/seller" */'../pages/admin/CategoryAdd.vue');
const CategoryUpdate = () => import(/* webpackChunkName: "./js/seller" */'../pages/admin/CategoryUpdate.vue');

const Products = ()=> import(/* webpackChunkName: "./js/seller" */'../pages/seller/Products.vue');
const ProductsAdd = () => import(/* webpackChunkName: "./js/seller" */'../pages/seller/ProductsAdd.vue');

const Orders = () => import(/* webpackChunkName: "./js/seller" */'../pages/seller/Order.vue');
const OrderDetails = () => import(/* webpackChunkName: "./js/seller" */'../pages/seller/OrderDetails.vue');

const MessagesList = () => import(/* webpackChunkName: "./js/seller" */'../pages/buyer/MessagesList.vue');
const Messages = () => import(/* webpackChunkName: "./js/seller" */'../pages/buyer/Messages.vue');

export default {
	path: '/seller',
	component: Seller,
	beforeEnter: (to, from, next) =>{
		const vm = Vue.prototype.$l;
		if (vm.hasToken() && vm.getRole() == 1)
			next()
		else {
			localStorage.clear();
			next({name: 'login'});
		}
	},
	children: [
		{
			path: '',
			component: Category,
			name: 'seller-home'
		},

		{
			path: 'add',
			component: CategoryAdd,
			name: 'seller-home-add'
		},

		{
			path: ':id/update',
			component: CategoryUpdate,
			name: 'seller-home-update',
			beforeEnter: (to, from, next) => {
				if (from.name !== 'seller-home')
					next({name:'seller-home'});
				next();
			}
		},

		{
			path: 'products',
			component: Products,
			name: 'seller-products'
		},

		{
			path: 'products/add',
			component: ProductsAdd,
			name: 'seller-products-add',
			beforeEnter: (to, from, next) => {
				if (from.name !== 'seller-products')
					next({name:'seller-products'});
				next();
			}
		},

		{
			path: 'orders',
			component: Orders,
			name: 'seller-orders'
		},

		{
			path: 'orders/:id',
			component: OrderDetails,
			name: 'seller-orders-details'
		},

		{
			path: 'messages',
			component: MessagesList,
			name: 'seller-messages'
		},

		{
			path: 'messages/:id',
			component: Messages,
			name: 'seller-messages-user'
		}
	]
}
