import AdminRoutes from './admin.js';
import SellerRoutes from './seller.js';
import BuyerRoutes from './buyer.js';

const Login = () => import(/* webpackChunkName: "./js/login" */'../pages/Login.vue');
const SignUp = () => import(/* webpackChunkName: "./js/signup" */'../pages/SignUp.vue');

let routes = [
	{
		path: '/login',
		component:Login,
		name: 'login',
		beforeEnter: (to, from, next) => {
			const vm = Vue.prototype.$l;
			if (vm.hasToken()) {
				const role = vm.getRole();
				switch (role) {
					case "0":
						console.log('buyer');
						break;
					case "1":
						console.log('seller');
						next({name: 'seller-home'});
						break;
					case "2":
						console.log('admin');
						next({name: 'admin-home'});
						break;
					default:
						localStorage.clear();
						console.log('unknown role');
						next();
						break;
				}
			} else next();
		}
	},

	{
		path: '/signup',
		name: 'signup',
		component: SignUp
	},

	AdminRoutes,
	SellerRoutes,
	BuyerRoutes

];
export default routes;