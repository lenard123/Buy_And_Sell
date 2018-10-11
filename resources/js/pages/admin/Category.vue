<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Manage Category</h4>
			<hr/>

			<div class="mb-3">
				<router-link tag="button" :to="getRoute()" class="btn btn-success"><i class="fas fa-plus"></i> Add Category</router-link>
				<button class="btn btn-outline-secondary" @click="getCategories()"><i class="fas fa-spinner" :class="{'fa-spin':status=='loading'}"></i> Refresh</button>
			</div>

			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Added by</th>
							<th>Updated by</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="status=='loading'">
							<td colspan="5" class="text-center">
								<i class="fas fa-spinner fa-spin"></i> Loading...
							</td>
						</tr>

						<tr v-else-if="status=='deleting'">
							<td colspan="5" class="text-center">
								<i class="fas fa-spinner fa-spin"></i> Deleting...
							</td>
						</tr>

						<tr v-else-if="status=='failed'">
							<td colspan="5" class="text-center">An error occured, try to refresh.</td>
						</tr>

						<tr v-else-if="categories.length < 1">
							<td colspan="5" class="text-center">No Categories</td>
						</tr>
						
						<tr v-else v-for="(category,i) in categories">
							<td><img height="32" width="32" :src="conf.baseurl+'api/v1/images/'+category.image_id"/></td>
							<td>{{ category.name }}</td>
							<td>{{ category.added_by }}</td>
							<td>{{ category.updated_by==null?'':category.updated_by }}
							<td>
								<button class="btn btn-primary" @click="updateCategory(i)"><i class="fas fa-edit"></i> Update</button>
								<button class="btn btn-outline-danger" @click="openDeleteModal(category.id)"><i class="fas fa-trash"></i> Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
	</div>

	<modal modal-id="delete-category-modal">
		<modal-header>Delete Category</modal-header>
		<modal-body>Make sure that there's no product under this category before deleting.</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="deleteCategory()">Delete</button>
			<button class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
		</modal-footer>
	</modal>

</div>
</template>

<script>
export default{
	data: ()=>({
		status: '',
		delete_id: 0
	}),

	methods: {

		getRoute: function () {
			if (this.$l.getRole() == 2) 
				return {name:'admin-category-add'};
			else
				return {name:'seller-home-add'};
		},

		openDeleteModal: function (id) {
			this.delete_id = id;
			$('#delete-category-modal').modal();
		},

		updateCategory: function (index) {

			if (this.$l.getRole() == 2)
				name = 'admin-category-update';
			else
				name = 'seller-home-update';

			this.$router.push({name, params:{id:index}});
		},

		deleteCategory: function () {
			this.status = 'deleting';
			$('#delete-category-modal').modal('hide');
			axios.delete(this.conf.baseurl+'api/v1/category/'+this.delete_id)
				.then(response=>{
					this.log(response);
					this.$l.notify('Success', 'Category deleted successfully.', 'success');
					this.categories = response.data;
				})
				.catch(error=>{
					this.log(error);
					this.$l.handleError(error);
				})
				.then(()=>{this.status='success'});
		},

		getCategories: function () {
			if (this.status == 'loading') return;
			this.status = 'loading';
			axios.get(this.conf.baseurl+'api/v1/category')
				.then((response)=>this.success(response))
				.catch((error)=>this.failed(error))
		},

		failed: function (error) {
			this.log(response);
			this.status = 'failed';
		},

		success: function (response) {
			this.log(response);
			this.status = 'success';
			this.categories = response.data;
		}
	},

	computed: {
		categories: {
			get: function () {
				return this.$store.state.categories;
			},

			set: function (val) {
				this.$store.commit('categories', val);
			}
		}
	}
}
</script>