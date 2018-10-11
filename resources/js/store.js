export default {
	state: {
		user: {},
		users:[],
		categories: [],
		category: {},
		products: [],
		carts: [],
		orders: [],
		messages: []
	},

	mutations: {
		messages: function (state, messages) {
			state.messages = messages;
		},

		user: function (state, user) {
			state.user = user;
		},

		users: function (state, users) {
			state.users = users;
		},

		appendUsers: function (state, users) {
			for (var i in users)
				state.users.splice(state.users.length,1,users[i]);
		},

		orders: function (state, orders) {
			state.orders = orders;
		},

		carts: function (state, carts) {
			state.carts = carts;
		},

		updateCartQty: function (state, [index, val]) {
			state.carts[index].qty = val;
		},

		addToCart: function (state, product) {
			state.carts.push(product);
		},

		categories: function (state, categories) {
			state.categories = categories;
		},

		addCategory: function (state, category) {
			state.categories.push(category);
		},

		updateCategory: function (state, [index, category]) {
			state.categories.splice(index, 1, category);
		},

		category: function (state, category) {
			state.category = category;
		},

		products: function (state, products) {
			//state.products.concat(products);
			for (var i in products) {
				state.products.splice(state.products.length, 1, products[i]);
			}
		},

		resetProducts: function (state) {
			state.products = [];
		},

		removeProduct: function (state, id) {
			let index = null;
			for (var i in state.products)
				if (state.products[i].id==id)
					index = i;
			console.log(index);
			if (index != null)
				state.products.splice(index, 1);
		}
	},

	actions: {
		clearData: function (context) {
			context.commit('user', {});
			context.commit('categories', []);
			context.commit('category', {});
			context.commit('products', []);
			context.commit('carts', []);
			context.commit('orders', []);
		}
	}
}