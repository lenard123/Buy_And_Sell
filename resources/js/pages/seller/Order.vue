<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<div class="card-title">Orders ({{ type }})</div>
			<hr/>

			<div class="mb-3">
				<select class="btn btn-outline-secondary" v-model="order_status">
					<option value="3">All Orders</option>
					<option value="0">New Orders</option>
					<option value="1">Completed Orders</option>
					<option value="2">Cancelled Orders</option>
				</select>

				<button class="btn btn-outline-secondary" @click="refresh()">
					<i class="fas fa-spinner" :class="{'fa-spin':status=='loading'}"></i>
					<span>Refresh</span>
				</button>

			</div>

			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Customer Name</th>
							<th>Price</th>
							<th>Status</th>
							<th>Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="status=='loading'">
							<td colspan="5" class="text-center">
								<span>Loading...</span>
							</td>
						</tr>
						<tr v-else-if="orders.length < 1">
							<td colspan="5" class="text-center">
								<span>No orders</span>
							</td>
						</tr>
						<tr v-else v-for="order in orders">
							<td>{{ order.user_name }}</td>
							<td>{{ order.price }}</td>
							<td v-html="getStatus(order.status)"></td>
							<td>{{ fromNow(order.created_at) }}</td>
							<td>
								<router-link :to="{name:'seller-orders-details', params:{id:order.id}}" class="btn btn-primary">View Details</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
	</div>
</div>
</template>

<script>

import mixin from '../../mixins/app.js';

export default {
	mixins: [mixin],

	created(){
		this.log(['order', this]);
	},

	data: ()=>({
		status: ''
	}),

	methods: {
		refresh: function () {
			if (this.status==='loading') return;
			this.status = 'loading';

			axios.get(this.baseurl('api/v1/order'))
				.then((response)=>this.orders=response.data)
				.catch((error)=>this.handleError(error))
				.then(()=>this.status='');	
		},

		getStatus: function (status) {
			let classes = ['primary', 'success', 'danger'];
			let types = ['New', 'Completed', 'Cancelled'];
			return `<span class="badge badge-${classes[status]}">
						${types[status]}
					</span>`;
		}
	},

	computed: {
		type: function () {
			const types = ['New', 'Completed', 'Cancelled', 'All'];
			return types[this.order_status];
		},

		order_status: {
			get: function () {
				let status = this.$route.query.status;
				return status ? status : 3; 
			},
			set: function (val) {
				this.$router.push({query:{status:val}});
			}
		},

		orders: {
			get: function () {
				let orders = this.$store.state.orders;
				if (this.order_status == 3)
					return orders;
				else
					return orders.filter(order=>order.status==this.order_status);
			},
			set: function (val) {
				this.$store.commit('orders', val);
			}
		}
	}
}
</script>
