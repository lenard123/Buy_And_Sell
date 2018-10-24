<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Add Product</h4>
			<hr/>

			<form @submit.prevent="submit()">

				<div class="form-group d-flex" style="overflow-x: auto;">
					<div style="margin: 0px 3px;" v-for="(image,i) in images" v-if="image !== false">
						<img :src="view(i)" height="140" width="140" class="thumbnail"  />
					</div>
					<div class="img-add" @click="addImage()" v-if="active_image<images.length" style=" margin: 0px 3px;">
						<i class="fas fa-plus"></i>
					</div>
					<input type="file" class="d-none" :id="'img-'+i" v-for="(image,i) in images" @change="displayImage(i)"/>
				</div>		


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


			</form>

		</div>
	</div>
</div>
</template>

<style>
.img-add {
	width: 140px;
	height: 140px;
	border: solid 1px gray;
	text-align: center;
	color: gray;
}
.img-add > * {
	transform: translateY(25%);
	font-size: 100px;
}
.img-add:hover {
	color: black;
	border-color: black;
}
</style>

<script>
export default{
	created(){
		this.log(this);
	},

	data:()=>({
		loading: false,
		images: [false, false, false, false, false],
		product: {
			category_id: 1,
			name: '',
			desc: '',
			price: 0.00,
			qty:0
		}
	}),

	methods: {
		addImage: function () {
			let active_image = this.active_image;
			$('#img-'+active_image).click();
		},

		displayImage: function (i) {
			let file = this.$l.getFile('img-'+i);
			if (file !== false)
				this.images.splice(i, 1, true);
		},

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
			let images = this.images;
			data.append('category_id', this.product.category_id);
			data.append('name', this.product.name);
			data.append('desc', this.product.desc);
			data.append('price', this.product.price);
			data.append('qty', this.product.qty);

			let image = 1;
			for (var i in images) {
				if (images[i] !== false) {
					let file = this.$l.getFile('img-'+i);
					data.append('image'+image, file);
					image++;
				}
			}

			return data;
		},

		view: function (i) {
			let file = this.$l.getFile('img-'+i);
			return URL.createObjectURL(file);
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
		},
		active_image: function () {
			let images = this.images;
			for (var i in images)
				if (images[i]===false)
					return i;
		}
	}
}
</script>
