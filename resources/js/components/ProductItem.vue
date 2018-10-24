<template>
<transition name="fade">
<div v-if="show">
<div class="card mb-5" style="width:250px">
	<div class="card-img-top product-img">
		<img :src="$l.getLink(product.image_id)" width="100%" height="100%" @click="details()"/>
	</div>
	<div class="card-body">
		<div class="card-title" style="font-size: 20px;">"{{ product.name }}"</div>	
		<p>Stocks : {{ product.qty }}<br/>
		   Price : <span style="color:lime">${{ product.price }}</span><br>
		   Seller: <router-link :to="{name: 'buyer-sellers-profile', params:{id:product.user_id}}">{{ product.user_name }}</router-link>
		</p>
	</div>
	<div class="carm-img-bottom">
		<input type="button" value="Add to Card" class="btn btn-primary form-control" v-if="cart_quantity==0" @click="addToCart()"/>
		
		<div v-else class="input-group">
			<div class="input-group-prepend">
				<span class="btn btn-primary" @click="subtractToCart()">
					<i class="fas fa-minus"></i>
				</span>
			</div>
			<div class="form-control text-center">
				<b><span>{{ cart_quantity }}</span> in cart</b>
			</div>
			<div class="input-group-append">
				<span class="btn btn-primary" @click="addToCart()">
					<i class="fas fa-plus"></i>
				</span>
			</div>
		</div>
	</div>

</div>
</div>
</div>
</transition>
</template>

<style>

.product-img {
	padding: 10px;
	transition: padding .1s;
	height: 200px;
}

.product-img:hover {
	padding: 0px;
}

</style>

<script>
export default{
	props:['product'],
	data:()=>({
		show: true,
		time: 0,
		last_click: 0
	}),

	created: function () {
		setInterval(()=>{
			this.time++;
		}, 1000);
	},

	methods: {
		details: function() {
			let role = this.$store.state.user.role;
			if (role == 0)
				this.$router.push({name:'buyer-products-details', params:{id:this.product.id}});
		},

		addToCart: function () {
			if (!this.chkLogin()) return;
			if (this.cart_quantity+1 > this.product.qty) 
				return this.$l.notify('Failed', 'The product is out of stocks', 'warn');
			this.cart_quantity++;
			this.add();
		},

		subtractToCart: function () {
			if (this.cart_quantity <= 0) this.cart_quantity = 0;
			else this.cart_quantity--;
			this.add();
		},

		add: function () {
			if (this.preventMultiClick()) return;
			this.last_click = this.time;

			setTimeout(()=>{
				if ((this.time-this.last_click) == 2)
					this.updateCart(this.product.id, this.cart_quantity);
			}, 2000);

		},

		updateCart: function (product_id, qty) {
			axios.post(this.conf.baseurl+'api/v1/cart',{product_id, qty})
				.then(this.log)
				.catch(this.log);
		},

		preventMultiClick: function () {
			return (this.time - this.last_click) < 2 && this.last_click != 0;
		},

		chkLogin: function () {
			if (this.user.role != 0)
				$('#login_modal').modal();
			return this.user.role == 0;
		}
	},

	computed: {
		user: function () {
			return this.$store.state.user;
		},

		carts: function () {
			return this.$store.state.carts;
		},
		cart: function () {
			let carts = this.carts;
			for (var i in carts) 
				if (this.product.id == carts[i].product_id)
					return carts[i];
			return {};
		},

		unique_id: function () {
			let id = 0;
			for (var i in this.carts) 
				id += this.carts[i].id;
			return id;
		},

		cart_quantity: {
			get: function () {
				return this.cart.qty?this.cart.qty:0;
			},
			set: function (val) {
				let carts = this.carts;
				for (var i in carts)
					if (carts[i].product_id == this.product.id)
						return this.$store.commit('updateCartQty', [i, val]);
				if (val !==0)
				this.$store.commit('addToCart',{
					id: this.unique_id,
					product_id: this.product.id,
					user_id: this.user.id,
					qty: val,
					product: this.product
				});

			}
		}
	}
}
</script>
