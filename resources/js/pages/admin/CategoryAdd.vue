<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Add Category</h4>
			<hr/>

			<form class="row" @submit.prevent="submit()">
				
				<div class="col-md-3">
					<l-uploader :img-src="$l.getLink(2)" file-id="image"/>
				</div>

				<div class="col-md-8">

					<div class="form-group">
						<label>Name</label>
						<div class="input-group">
							<input type="text" class="form-control" v-model="name" required="" :disabled="loading"/>
							<div class="input-group-append" v-show="loading">
								<span class="input-group-text">
									<i class="fas fa-spinner fa-spin"></i>
								</span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" :disabled="loading" v-model="desc"></textarea>
					</div>

					<div class="form-group float-right">
						<button class="btn btn-primary" type="submit" :disabled="loading">Submit</button>
						<button class="btn btn-outline-secondary" type="button" :disabled="loading" @click="$router.push(getRoute())">Back</button>
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
		name: '',
		desc: ''
	}),

	methods: {

		getRoute: function () {
			if (this.$l.getRole() == 2) 
				return {name:'admin-category'};
			else
				return {name:'seller-home'};
		},

		submit: function () {
			if (this.loading) return;
			this.loading = true;
			
			let data = this.getData();
			let config = {headers:{'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}
			axios.post(this.conf.baseurl+'api/v1/category', data, config)
				.then(response=>this.success(response))
				.catch(error=>this.failed(error))
				.then(()=>{this.loading=false});
		},

		failed: function (error) {
			this.log(error);
			this.$l.handleError(error);
		},

		success: function (response) {
			this.log(response);
			this.$l.notify('Success', 'Category added successfully', 'success');
			this.$store.commit('addCategory', response.data);
		},

		getData: function () {
			let data = new FormData();
			let image = this.$l.getFile('image');
			data.append('name', this.name);
			data.append('desc', this.desc);
			if (image !== false)
				data.append('image', image);
			return data;
		}
	}
}
</script>