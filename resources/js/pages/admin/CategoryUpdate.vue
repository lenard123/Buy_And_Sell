<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Update Category</h4>
			<hr/>

			<form class="row" @submit.prevent="submit()" id="category_update_form">
				<div class="col-md-3">
					<l-uploader :img-src="conf.baseurl+'api/v1/images/'+category.image_id" file-id="image" />
				</div>

				<div class="col-md-8">


					<div class="form-group">
						<label>Name</label>
						<div class="input-group">
							<input type="text" class="form-control" v-model="name" required="" name="name" :disabled="loading"/>
							<div class="input-group-append" v-show="loading">
								<span class="input-group-text">
									<i class="fas fa-spinner fa-spin"></i>
								</span>
							</div>
						</div>
					</div>


					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" :disabled="loading" name="desc" v-model="desc"></textarea>
					</div>


					<div class="form-group float-right">
						<button type="submit" class="btn btn-primary" :disabled="loading">Submit</button>
						<button type="button" class="btn btn-outline-secondary" @click="$router.go(-1)" :disabled="loading">Back</button>
					</div>


				</div>

			</form>

		</div>
	</div>
</div>
</template>

<script>
export default {
	data: () => ({
		loading: false,
		name: '',
		desc: ''
	}),

	created: function () {
		this.name = this.category.name;
		this.desc = this.category.desc;
	},

	methods: {
		submit: function () {
			if (this.loading) return;
			this.loading = true;

			let data = this.getData();
			let config = {headers:{'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}

			axios.post(this.conf.baseurl+'api/v1/category/'+this.category.id, data, config)
				.then(this.success)
				.catch(error=>this.failed(error))
				.then(()=>{this.loading=false});
		},

		failed: function (error) {
			this.log(error);
			this.$l.handleError(error);
		},

		success: function (response) {
			this.log(response);
			this.$l.notify('Success', 'Category updated successfully.', 'success');
			this.$store.commit('updateCategory', [this.id, response.data]);
		},

		getData: function () {
			let data = new FormData();
			let image = this.$l.getFile('image');
			data.append('name', this.name);
			data.append('_method', 'PUT');
			if (this.desc != null)
				data.append('desc', this.desc);
			if (image !== false)
				data.append('image', image);
			return data;
		}
	},

	computed: {
		category: function () {
			return this.$store.state.categories[this.id];
		},

		id: function () {
			return this.$route.params.id;
		}
	}
}
</script>
