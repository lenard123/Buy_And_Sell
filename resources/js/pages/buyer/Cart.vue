<template>
<div class="container mt-5">
	<div v-if="cart_quantity > 0">
	<h1><b>Shopping Cart</b></h1>
	<div class="card col-md-8">
		<div class="card-body">
			<h6>You have {{ cart_quantity }} products in your shopping cart</h6>
			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<th width="80"></th>
						<th>Product</th>
						<th><center>Quantity</center></th>
						<th><span class="float-right">Price</span></th> 
					</thead>
					<tbody>
						<cart-item v-for="(cart,i) in carts" :cart="cart" :key="i" :index="i"/>
						<td colspan="4">
							<span class="float-right"><b>{{ total_price }}</b></span>
						</td>
					</tbody>
				</table>
			</div>
			<router-link class="btn btn-success" tag="button" :to="{name:'buyer-cart-checkout'}" :disabled="isloading">Check out</router-link>
		</div>
	</div>
	</div>
	<div v-else class="jumbotron">
		<h1>No products in cart</h1>
	</div>
</div>
</template>

<script>
export default{
	data: ()=>({
		isloadings:[]
	}),

	created: function () {
		this.log(this)
		for (var i in this.carts)
			this.isloadings.push({loading:false});
	},

	computed: {

		isloading: function () {
			return this.isloadings.find((x)=>x.loading)?true:false;
		},

		carts: function () {
			return this.$store.state.carts;
		},

		cart_quantity: function () {
			let carts = this.carts;
			let qty = 0;
			for (var i in carts)
				qty += carts[i].qty;
			return qty;
		},

		total_price: function () {
			let carts = this.carts;
			let price = 0;
			for (var i in carts){
				price += (carts[i].qty*carts[i].product.price);
			}
			return this.$l.toCurrency(price);
		}
	}
}
</script>
