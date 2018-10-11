<template>
<tr v-if="cart_quantity>0">
	<td><img :src="$l.getLink(product.image_id)" class="thumbnail" height="60" width="60"></td>
	<td class="align-middle">{{ product.name }}</td>
	<td>
		<div class="input-group justify-content-center">
			<div class="input-group-prepend">
				<span @click="subtractToCart()" class="btn btn-primary">
					<i class="fas fa-minus"></i>
				</span>
			</div>
			<div class="text-center" style="padding:6px 12px">
				<b><span>{{ cart_quantity }}</span> in cart</b>
			</div>
			<div class="input-group-append">
				<span @click="addToCart()" class="btn btn-primary">
					<i class="fas fa-plus"></i>
				</span>
			</div>
		</div>
	</td>
	<td><span class="float-right" style="color:lime">{{$l.toCurrency(product.price*cart_quantity)}}</span></td>
</tr>
</template>

<script>
export default{
	props:['cart', 'index'],

	data: ()=>({
		time:0,
		last_click:0
	}),

	created: function () {
		setInterval(()=>{
			this.time++;
		}, 1000);
	},

	methods: {
		addToCart: function () {
			if (this.cart_quantity+1 > this.product.qty) 
				return this.$l.notify('Failed', 'Out of stock', 'warn');
			this.cart_quantity++;
			this.add();
		},

		loading: function (loading) {
			this.$parent.isloadings.splice(this.index,1,{loading})
		},

		add: function () {

			if (this.preventMultiClick()) return;
			this.last_click = this.time;

			this.loading(true);

			setTimeout(()=>{
				if ((this.time-this.last_click)==2)
					this.$nextTick(()=>this.updateCart(this.product.id, this.cart_quantity));
			}, 2000)
		},

		subtractToCart: function () {
			if (this.cart_quantity <= 0) this.cart_quantity = 0;
			else --this.cart_quantity;
			this.add();
		},

		preventMultiClick: function () {//(2-0) < 2 != 0
			return (this.time - this.last_click) < 2 && this.last_click != 0;
		},

		updateCart: function (product_id, qty) {
			axios.post(this.conf.baseurl+'api/v1/cart',{product_id, qty})
				.then(response=>{
					this.log(response);
					this.loading(false);
				})
				.catch(this.log);
		}
	},

	computed:{

		carts: function () {
			return this.$store.state.carts;
		},

		product: function () {
			return this.cart.product;
		},

		cart_quantity: {
			get: function () {
				return this.cart.qty?this.cart.qty:0;
			},
			set: function (val) {
				let carts = this.carts;
				for (var i in carts)
					if (carts[i].id == this.cart.id)
						return this.$store.commit('updateCartQty', [i, val]);
			}
		}
	}
}
</script>
