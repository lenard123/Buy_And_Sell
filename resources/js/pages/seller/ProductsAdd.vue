<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Add Product</h4>
			<hr/>

			<form class="row" @submit.prevent="submit()">

				<div class="col-md-3">
					<l-uploader :img-src="$l.getLink(3)" file-id="image"/>
				</div>

				<div class="col-md-8">

					<div class="form-group">
						<label>Category</label>
						<select class="form-control" v-model="product.category_id" required>
							<option v-for="category in categories" :value="category.id">
								{{ category.name }}
							</option>
						</select>
					</div>

					<div class="form-group">
						<label>Name</label>
						<div class="input-group">
							<input type="text" class="form-control" v-model="product.name" required="" :disabled="loading"/>
							<div class="input-group-append" v-show="loading">
								<span class="input-group-text">
									<i class="fas fa-spinner fa-spin"></i>
								</span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>Description</label>
						<textarea v-model="product.desc" class="form-control" :disabled="loading"></textarea>
					</div>

					<div class="form-group">
						<label>Price</label>
						<div class="input-group">
							<input type="text" class="form-control" v-model="product.price" required="" :disabled="loading"/>
							<div class="input-group-append" v-show="loading">
								<span class="input-group-text">
									<i class="fas fa-spinner fa-spin"></i>
								</span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>Quantity</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span @click="product.qty--" class="btn btn-primary">
									<i class="fa fa-minus"></i>
								</span>
							</div>
							<div class="form-control" style="text-align: center;">
								<b><span>{{ product.qty }}</span> in stock</b>
							</div>
							<div class="input-group-append">
								<span class="btn btn-primary" @click="product.qty++">
									<i class="fa fa-plus"></i>
								</span>
							</div>
						</div>
					</div>

					<div class="form-group float-right">
						<button class="btn btn-primary" type="submit" :disabled="loading">Submit</button>
						<button class="btn btn-outline-secondary" type="button" :disabled="loading" @click="$router.go(-1)">Back</button>
					</div>

				</div>

			</form>

		</div>
	</div>
</div>
</template>

<script>
export default{
	data:()=>({
		loading: false,
		product: {
			category_id: 1,
			name: '',
			desc: '',
			price: 0.00,
			qty:0
		}
	}),

	methods: {
		submit: function () {
			if (this.loading) return;
			this.loading = true;

			let data = this.getData();
			let config = {headers:{'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
			axios.post(this.conf.baseurl+'api/v1/product', data, config)
				.then(this.success)
				.catch(this.failed)
				.then(()=>{this.loading=false});

		},

		success: function (response) {
			this.log(response)
			this.$l.notify('Success','Product added successfully.', 'success');
		},

		failed: function (error) {
			this.log(error);
			this.$l.handleError(error);
		},

		getData: function () {
			let data = new FormData();
			let image = this.$l.getFile('image');
			data.append('category_id', this.product.category_id);
			data.append('name', this.product.name);
			data.append('desc', this.product.desc);
			data.append('price', this.product.price);
			data.append('qty', this.product.qty);
			if (image !== false)
				data.append('image', image);
			return data;
		}
	},

	watch: {
		'product.qty': function (val) {
			if (val < 0)
				this.product.qty = 0;
		}
	},

	computed: {
		categories: function() {
			return this.$store.state.categories;
		}
	}
}
</script>
