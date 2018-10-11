<template>
<div class="container mt-5">
	<div class="row">
		<div class="col-md-3">
			<div class="card">
				<div class="card-body">
					<h4 class="card-title">Select Category</h4>
					<ul class="list-group">
						<router-link 
							class="list-group-item" 
							tag="li"
							:to="{query:{category_id:0}}"
							:class="{'active':isActive(0)}"
							exact>
							All Categories
						</router-link>
						<router-link 
							tag="li" 
							:to="{query:{category_id:category.id}}" 
							class="list-group-item" 
							v-for="(category,i) in categories"
							:key="i"
							exact>
							{{ category.name }}
						</router-link>
					</ul>
				</div>
			</div>
		</div>

		<div class="jumbotron col-md-9" v-if="page==1 && status=='loading'">
			<h1><i class="fas fa-spinner fa-spin"></i> Loading</h1>
		</div>

		<div class="jumbotron col-md-9" v-else-if="products.length < 1">
			<h1>No Products</h1>
		</div>

		<div v-else class="col-md-9 d-flex justify-content-around flex-wrap">

			<product-item 
				v-for="(product,i) in products" 
				:product="product"
				:key="i"/>

			<div v-if="page <= last_page" class="card mb-5 bg-dark text-light" style="width:250px">
				<l-loader v-if="status=='loading'"/>
				<div class="card-body mx-auto" style="margin-top:50%">
					<button @click="getProducts()" class="btn btn-primary" style="font-size:larger;">View More</button>
				</div>
			</div>				

		</div>
	</div>
</div>
</template>

<script>
export default{
	data: ()=>({
		page: 1,
		last_page: 0,
		status: ''
	}),
	created: function () {
		this.log(this)
		this.$store.commit('resetProducts');
		this.getProducts();
	},
	methods: {
		isActive: function (id) {
			return id==this.category_id
		},

		getProducts: function () {
			this.status = 'loading';
			axios.get(this.conf.baseurl+'api/v1/product?status=approve&page='+this.page+(this.category_id!=0?'&category_id='+this.category_id:''))
				.then(this.success)
				.catch(this.log);
		},

		success: function (response) {
			this.log(response);
			this.status = 'success';
			this.products = response.data.data;
			this.page++;
			this.last_page = response.data.last_page;
		}
	},
	watch:{
		category_id: function () {
			this.page = 1;
			this.$store.commit('resetProducts');
			this.getProducts();
		}
	},
	computed: {
		categories: {
			get: function () {
				return this.$store.state.categories;
			}
		},

		category_id: function () {
			return this.$route.query.category_id?this.$route.query.category_id:0;
		},

		products: {
			get: function () {
				return this.$store.state.products;
			},

			set: function (val) {
				return this.$store.commit('products', val);
			}
		}
	}
}
</script>
