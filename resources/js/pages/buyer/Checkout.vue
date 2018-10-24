<template>
<div class="container mt-5">
	<!-- IF Loading -->
	<div style="position:fixed;top:0;left:0;height:100%;width:100%;z-index:1000" v-if="loading">
		<l-loader/>
	</div>
	<h1><b>Shipping</b></h1>
	<div class="row">
		<div class="col-md-6">
			<form @submit.prevent="modal(true)" id="check_out_form">

				<div class="form-group">
					<label>First Name</label>
					<input type="text" name="fname" class="form-control" required :value="user.fname"/>
				</div>

				<div class="form-group">
					<label>Last Name</label>
					<input type="text" name="lname" class="form-control" required :value="user.lname"/>
				</div>

				<div class="form-group">
					<label>Address</label>
					<select class="form-control" name="address1">
						<option :value="user.buyer.address1">Address 1 : {{ user.buyer.address1 }}</option>
						<option :value="user.buyer.address2">Address 2 : {{ user.buyer.address2 }}</option>
					</select>
				</div>

				<div class="form-group">
					<label for="phone">Phone</label>
					<input type="text" name="phone" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="city">City</label>
					<input type="text" name="city" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="state">State</label>
					<input type="text" name="state" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="postal_code">Postal Code</label>
					<input type="number" name="postal_code" class="form-control" required/>
				</div>

				<div class="form-group">
					<button class="btn btn-primary" type="submit">
						<b>Place Order</b>
					</button>
				</div>				
			</form>
		</div>
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h2>Order Summary</h2>
					<h6>You have {{ cart_quantity }} items in your shopping cart.</h6>
					<div class="table-responsive">
						<table class="table table-hover">
							<tbody>
								<tr v-for="cart in carts">
									<td>{{ cart.qty }} x {{ cart.product.name }}</td>
									<td>
										<span class="float-right">{{ $l.toCurrency(cart.qty*cart.product.price) }}</span>
									</td>
								</tr>
								<tr>
									<td><b>Total</b></td>
									<td><b class="float-right">{{ $l.toCurrency(total_price) }}</b></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<modal modal-id="confirm-order">
		<modal-header>Confirm Order</modal-header>
		<modal-body>Are you sure to order this products?</modal-body>
		<modal-footer>
			<button class="btn btn-primary" @click="submit()">Confirm</button>
			<button class="btn btn-outline-secondary" @click="modal(false)">Cancel</button>
		</modal-footer>
	</modal>
</div>
</template>

<script>
export default{
	data: ()=>({
		loading: false
	}),

	created: function () {
		this.log(this)
	},

	methods:{
		submit: function () {
			this.loading = true;
			this.modal(false);
			axios.post(this.conf.baseurl+'api/v1/order', $('#check_out_form').serialize())
				.then(this.success)
				.catch(this.failed)
				.then(()=>{this.loading=false});
		},

		success: function (response) {
			this.log(response);
			this.$l.notify('Success', 'products ordered', 'success');
			this.$store.commit('orders', response.data);
			this.$store.commit('carts', []);
			this.$router.push({name:'buyer-orders'});
		},

		failed: function (error) {
			this.log(error);
			this.$l.handleError(error);
		},

		modal: function (x) {
			if (x)
				$('#confirm-order').modal();
			else
				$('#confirm-order').modal('hide');
		}
	},

	computed: {
		user: function () {
			return this.$store.state.user;
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
			for (var i in carts)
				price += (carts[i].qty*carts[i].product.price);
			return price;
		}
	}
}
</script>
