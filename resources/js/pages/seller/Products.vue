<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Manage Products</h4>
			<hr/>

			<div class="mb-3">
				<router-link tag="button" :to="{name:'seller-products-add'}" class="btn btn-success" :disabled="status=='loading'">
					<i class="fas fa-plus"></i> Add Product
				</router-link>

				<select class="btn btn-outline-secondary" v-model="category_id">
					<option value="0">Select Category</option>
					<option v-for="category in categories" :value="category.id">{{ category.name }}</option>
				</select>


				<select class="btn btn-outline-secondary" v-model="product_type">
					<option value="3">All</option>
					<option value="0">Pending</option>
					<option value="1">Approved</option>
					<option value="2">Rejected</option>
				</select>

				<button class="btn btn-outline-secondary" @click="getProducts()">
					<i class="fas fa-spinner" :class="{'fa-spin':status=='loading'}"></i> Refresh
				</button>
			</div>

			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Status</th>
							<th>Category</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						
						<tr v-if="status=='loading'">
							<td colspan="6" class="text-center">
								<i class="fas fa-spinner fa-spin"></i> Loading...
							</td>
						</tr>

						<tr v-else-if="status=='deleting'">
							<td colspan="6" class="text-center">
								<i class="fas fa-spinner fa-spin"></i> Deleting...
							</td>
						</tr>

						<tr v-else-if="status=='failed'">
							<td colspan="6" class="text-center">
								An error occured, try to refresh
							</td>
						</tr>

						<tr v-else-if="products.length < 1">
							<td colspan="6" class="text-center">
								No products
							</td>
						</tr>

						<tr v-else v-for="product in products">
							<td><img height="32" width="32" :src="$l.getLink(product.image_id)"/></td>
							<td>{{ product.name }}</td>
							<td v-html="getStatus(product.status)"></td>
							<td>{{ getCategory(product.category_id) }}</td>
							<td>{{ product.price }}</td>
							<td>
								<button class="btn btn-primary">
									<i class="fas fa-edit"></i>Update
								</button>
								<router-link :to="{name:'seller-products-detail', params:{id:product.id}}" class="btn btn-info">View Details</router-link>
								<button class="btn btn-outline-danger">
									<i class="fas fa-trash"></i>Delete
								</button>
							</td>
						</tr>

					</tbody>
				</table>
			</div>

			<ul v-show="total > 1" class="pagination justify-content-center">
				<li class="page-item" :class="{'disabled':page==1}" @click="page--">
					<a class="page-link">Previous</a>
				</li>
				<li v-for="_page in total" class="page-item" :class="{'active':page==_page}" @click="page=_page">
					<a class="page-link">{{ _page }}</a>
				</li>
				<li class="page-item" :class="{'disabled':page==total}" @click="page++">
					<a class="page-link">Next</a>
				</li>
			</ul>

		</div>
	</div>
</div>
</template>

<script>
export default{
	data:()=>({
		status:'',
		product_status: ['Pending', 'Approved', 'Rejected'],
		total: 0,
		category_id: 0,
		product_type: 3
	}),

	created: function () {
		this.getProducts();
	},

	methods: {

		getLink: function () {
			let params = '?';
			params+='page='+this.page+'&';
			if (this.category_id!=0)
				params+='category_id='+this.category_id+'&';
			if (this.product_type!=3)
				params+='status='+this.product_type
			return this.conf.baseurl+'api/v1/user/'+this.id+'/product'+params;
		},

		getStatus: function (i) {
			let label = ['warning', 'success', 'danger'];
			return `<span class="badge badge-${label[i]}">${this.product_status[i]}</span>`;
		},

		getCategory: function (id) {
			return this.categories.find((category)=>category.id==id).name;
		},

		getProducts: function () {
			this.status = 'loading';

			/*axios.all([
				axios.get(this.conf.baseurl+'api/v1/category'),
				axios.get(this.getLink())
				])
				.then(axios.spread(this.succcess))
				.catch(this.failed);*/
			axios.get(this.getLink())
				.then(this.succcess)
				.catch(this.failed);
		},

		succcess: function (productRes) {
			this.log(productRes);
			this.status = 'succcess';
			this.$store.commit('resetProducts');
			this.products = productRes.data.data;
			this.total = productRes.data.last_page;
		},

		failed: function (error) {
			this.log(error)
			this.status = 'failed';
			this.$l.handleError(error);
		}
	},

	watch: {
		page: function (val) {
			if (val < 1)
				this.page = 1;
			if (val > this.total)
				this.page = this.total;
		},

		'$route.query.page': function (val) {
			this.getProducts();
		},

		category_id: function () {
			if (this.page == 1)
				this.getProducts();
			else
				this.page = 1;
		},

		product_type: function () {
			if (this.page == 1)
				this.getProducts();
			else
				this.page = 1;
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
		},

		categories: {
			get: function () {
				return this.$store.state.categories;
			},

			set: function (val) {
				this.$store.commit('categories', val);
			}
		},

		page: {
			get: function () {
				return this.$route.query.page?this.$route.query.page:1;
			},

			set: function (val) {
				this.$router.push({query:{page:val}});
			}
		},

		id: function () {
			return this.$store.state.user.id;
		}
	}
}
</script>
