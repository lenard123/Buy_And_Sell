<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Manage Products</h4>
			<hr/>

			<div>
				<product-card v-for="(product,key) in products" :product="product" :key="key"/>
			</div>

			<div class="text-center" v-if="status=='loading'">
				<i class="fas fa-spinner fa-spin"></i> fetching products
			</div>

			<div class="text-center" v-else-if="page<=total">
				<a @click="getProducts()">View more products</a>
			</div>

			<div class="text-center" v-else>
				Nothing to fetch
			</div>

		</div>
	</div>
</div>
</template>

<script>
export default{
	data: ()=>({
		status: '',
		page: 1,
		total: 0
	}),

	created: function () {
		this.$store.commit('resetProducts');
		this.getProducts();
	},

	methods: {
		getProducts: function () {
			this.status = 'loading';
			axios.get(this.conf.baseurl+'api/v1/product?status=pending&page='+this.page)		
				.then(this.success)
				.catch(this.failed);
		},

		success: function (response) {
			this.status = 'success';
			this.log(response);
			this.products = response.data.data;
			this.page++;
			this.total = response.data.last_page;
		}
	},

	computed: {
		products: {
			get: function () {
				return this.$store.state.products;
			},
			set: function (val) {
				this.$store.commit('products', val);
			}
		}
	}
}
</script>
