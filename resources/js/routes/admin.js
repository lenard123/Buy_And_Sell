const Admin = ()=> import(/* webpackChunkName: "./js/admin" */'../pages/admin/Admin.vue');
const Category = ()=> import(/* webpackChunkName: "./js/admin" */'../pages/admin/Category.vue');
const CategoryAdd = ()=>import(/* webpackChunkName: "./js/admin" */'../pages/admin/CategoryAdd.vue');
const CategoryUpdate = ()=>import(/* webpackChunkName: "./js/admin" */'../pages/admin/CategoryUpdate.vue');
const Home = ()=>import(/* webpackChunkName: "./js/admin" */'../pages/admin/Home.vue');

export default	{
	path: '/admin',
	component: Admin,
	beforeEnter: (to, from, next) =>{
		const vm = Vue.prototype.$l;
		if (vm.hasToken() && vm.getRole() == 2)
			next()
		else {
			localStorage.clear();
			next({name: 'login'});
		}
	},
	children: [
		{
			path: '',
			name: 'admin-home',
			component: Home
		},

		{
			path: 'category',
			name: 'admin-category',
			component: Category
		},

		{
			path: 'category/add',
			name: 'admin-category-add',
			component: CategoryAdd
		},

		{
			path: 'category/:id/update',
			name: 'admin-category-update',
			component: CategoryUpdate,
			beforeEnter: (to, from, next) => {
				if (from.name != 'admin-category')
					next({name:'admin-category'})
				next();
			}
		}
	]
}