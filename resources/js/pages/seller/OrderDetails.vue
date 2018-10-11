<template>
<div class="container mt-5">
	<!-- IF Loading -->
	<div style="position:fixed;top:0;left:0;height:100%;width:100%;z-index:1000" v-if="loading">
		<l-loader/>
	</div>

	<div class="form-group">
		<button @click="back()" class="btn btn-outline-secondary" exact>&lt; Go Back</button>

		<button 
			v-if="!loading && order.status === 0" 
			@click="action='cancel'"
			onclick="$('#order_action').modal()" 
			class="btn btn-danger">
			Cancel Order		
		</button>

		<button 
			class="btn btn-success"  
			@click="action='success'"
			onclick="$('#order_action').modal()"
			v-if="!loading && order.status === 0 && $l.getRole()==1">
			Complete Order
		</button>

	</div>

	<div class="row">
		<div class="col-md-6">
			<table>
				<info _key="Name" :value="order.fname+' '+order.lname"/>
				<info _key="Address1" :value="order.address1"/>
				<info _key="Address2" :value="order.address2"/>
				<info _key="Phone" :value="order.phone" />
				<info _key="City" :value="order.city"/>
				<info _key="State" :value="order.state"/>
				<info _key="Postal Code" :value="order.postal_code"/>				
			</table>
		</div>
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h4><b>Order Details</b></h4>
					<div class="table-responsive">
						<table class="table table-hover">
							<tr v-for="item in order.order_items">
								<td><h5>{{ item.qty+' x '+item.product.name }}</h5></td>
								<td><h5 class="float-right">{{ item.qty*item.product.price }}</h5></td>
							</tr>
							<tr>
								<td><h5><b>TOTAL</b></h5></td>
								<td><h5 class="float-right"><b>{{ total_price }}</b></h5></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<modal modal-id="order_action">
		<modal-header>
			<span v-if="action=='cancel'">Cancel Order</span>
			<span v-else>Complete Order</span>
		</modal-header>

		<modal-body>
			<h1 v-if="action=='cancel'">Are you sure to cancel this order?</h1>
			<h1 v-else>Are you sure that this order is completed?</h1>

			<form @submit.prevent="submit()">
				<div class="form-group">
					<label>For security reason: </label>
					<input type="password" class="form-control" v-model="password" placeholder="Enter password" />
				</div>
			</form>
		</modal-body>

		<modal-footer>
			<button class="btn btn-danger" @click="submit()" v-if="action=='cancel'">Cancel</button>
			<button class="btn btn-success" @click="submit()" v-else>Complete</button>
			<button class="btn btn-outline-secondary" data-dismiss="modal">Back</button>
		</modal-footer>
	</modal>

</div>
</template>

<script>

import mixin from '../../mixins/app.js';

export default{
	mixins: [mixin],

	data: ()=>({
		password: '',
		action: '',
		loading : false,
		order: {
			fname: '',
			lname: '',
			order_items:[]
		}
	}),

	created: function() {
		this.getOrder();
	},

	methods: {
		back: function () {
			if (this.$l.getRole() == 0)
				this.$router.push({name:'buyer-orders'});
			else if (this.$l.getRole() == 1)
				this.$router.push({name:'seller-orders'});
		},

		submit: function () {
			if (this.action === 'cancel')
				this.cancelOrder();
			else
				this.completeOrder();
		},

		completeOrder: function () {
			$('#order_action').modal("hide");
			this.loading = true;
			axios.post(this.baseurl('api/v1/order/'+this.id+'/complete'),{password:this.password})
				.then(response=>{
					this.log(response);
					this.$l.notify('Success', 'Order completed successfully', 'success');
					this.$store.commit('orders', response.data);
					this.$router.push({name:'seller-orders'});
				})
				.catch(this.failed)
				.then(()=>{this.loading=false});
		},

		cancelOrder: function () {
			$('#order_action').modal("hide");
			this.loading = true;
			axios.post(this.baseurl('api/v1/order/'+this.id+'/cancel'),{password:this.password})
				.then(response=>{
					this.log(response);
					this.$l.notify('Success', 'Order cancelled successfully', 'success');
					this.$store.commit('orders', response.data);
					this.back();
				})
				.catch(this.failed)
				.then(()=>{this.loading=false});
		},

		getOrder: function () {
			this.loading = true;
			axios.get(this.baseurl('api/v1/order/'+this.id))
				.then(this.success)
				.catch(this.failed1)
				.then(()=>this.loading=false);
		},
		success: function (response) {
			this.log(response);
			this.order = response.data;
		},
		failed1: function (error) {
			this.failed(error, ()=>{
				this.back();
			});
		}
	},

	computed: {
		id: function () {
			return this.$route.params.id;
		},

		total_price: function () {
			let order_items = this.order.order_items;
			let price= 0;
			for (var x in order_items) {
				let order_item = order_items[x];
				price += order_item.qty*order_item.product.price;
			}
			return price;
		}
	},

	components: {
		'info': {
			props: ['_key','value'],
			template: '<tr>\
						<td>\
							<h5><b>{{ _key }}&nbsp;&nbsp;</b></h5>\
						</td>\
						<td>\
							<h5>{{ value }}</h5>\
						</td>\
					   </tr>'
		}
	}
}
</script>
