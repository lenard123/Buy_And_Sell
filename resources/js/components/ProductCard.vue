<template>
<transition name="fade">
<div v-if="show">
<div class="card col-md-11 text-white mx-auto shadow-sm mb-3 bg-dark">	

	<div class="card-body">
		<l-loader v-if="status=='loading'"/>
		<div class="float-left mr-2">
			<img :src="$l.getLink(product.user_image_id)" height="50" width="50"> 
		</div>
		<div>
			<b>{{ product.user_name }}</b><br/>
			<span class="text-muted">{{ product.created_at }}</span>
		</div>

		<hr class="bg-light" />

		<div class="row">
			<div class="col-md-3">
				<img :src="$l.getLink(product.image_id)" width="130" height="130" class="mb-1">
				<button class="btn btn-success btn-block" @click="openModal('approve')" :disabled="status=='loading'">
					<i class="fas fa-check"></i> Approve
				</button>
				<button class="btn btn-danger btn-block" @click="openModal('reject')" :disabled="status=='loading'">
					<i class="fas fa-trash"></i> Reject
				</button>
				<button class="btn btn-primary btn-block" @click="$router.push({name:'admin-product-details', params:{id:product.id}})">
					View Details
				</button>
			</div>

			<div class="col-md-6">
				<h4>"{{ product.name }}"</h4>

				<div class="card bg-secondary">
					<div class="card-body">
						<div class="card-text">
							<span>Category : <b>{{ getCategory(product.category_id) }}</b></span><br/>
							<span>Price : <b>{{ product.price }}</b></span><br/>
							<span>Quantity : <b>{{ product.qty }}</b></span>
						</div>
					</div>
				</div>

			</div>
		</div>

	</div>

</div>
	<modal :modal-id="'approve-product-'+product.id" v-if="approve">
		<modal-header>Are you sure to approve this product?</modal-header>
		<modal-body>
			<form :id="'approve-form-'+product.id" @submit.prevent="submitApprove()">
				<div class="form-group">
					<label>For Secutity reason</label>
					<input type="password" placeholder="Enter your password" name="password" class="form-control" required=""/>
				</div>
				<input v-show="false" type="submit" :id="'approve-submit-button-'+product.id"/>
			</form>	
		</modal-body>			
		<modal-footer>
			<button class="btn btn-success" @click="submitApprove(false)">Approve</button>
			<button class="btn btn-outline-secondary" @click="closeModal('approve')">Cancel</button>
		</modal-footer>
	</modal>

	<modal :modal-id="'reject-product-'+product.id" v-if="reject">
		<modal-header>Are you sure to reject this product?</modal-header>
		<modal-body>
			<form :id="'reject-form-'+product.id" @submit.prevent="submitReject()">
				<div class="form-group">
					<label>Reason</label>
					<textarea class="form-control" name="reason" required=""></textarea>
				</div>
				<div class="form-group">
					<label>For Security reason</label>
					<input type="password" placeholder="Enter your password" name="password" class="form-control" required="" />
				</div>
				<input v-show="false" type="submit" :id="'reject-submit-button-'+product.id">
			</form>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="submitReject(false)">Reject</button>
			<button class="btn btn-outline-secondary" @click="closeModal('reject')">Cancel</button>
		</modal-footer>
	</modal>
</div>
</transition>
</template>

<script>
export default{
	data:()=>({
		reject: false,
		approve: false,
		status: '',
		show: true
	}),
	props:['product'],
	methods:{

		removeProduct: function () {
			this.show = false;
			this.$store.commit('removeProduct', this.product.id);
		},

		submitApprove: function (x) {
			if (x === false)
				return $('#approve-submit-button-'+this.product.id).click();
			$('#approve-product-'+this.product.id).modal("hide");
			this.status = 'loading';
			axios.post(this.conf.baseurl+'api/v1/product/'+this.product.id+'/approve', $('#approve-form-'+this.product.id).serialize())
				.then((response)=>{
					this.log(response);
					this.removeProduct();
					this.$l.notify('Success', 'The product has been approve', 'success');
				})
				.catch((error)=>{
					this.log(error);
					this.$l.handleError(error);
				})
				.then(()=>{this.status=''});
		},

		submitReject: function (x) {
			if (x ===false)
				return $('#reject-submit-button-'+this.product.id).click();
			$('#reject-product-'+this.product.id).modal("hide")
			this.status = 'loading';
			axios.post(this.conf.baseurl+'api/v1/product/'+this.product.id+'/reject', $('#reject-form-'+this.product.id).serialize())
				.then((response)=>{
					this.log(response);
					this.removeProduct();
					this.$l.notify('Success', 'The product rejected Successfully.', 'success');
				})
				.catch((error)=>{
					this.log(error);
					this.$l.handleError(error);
				})
				.then(()=>{this.status=''})
		},

		closeModal: function (type) {
			if (type=='reject'){
				$('#reject-product-'+this.product.id).modal("hide")
				this.$nextTick(()=>{this.reject = false});
			}else if (type=='approve'){
				$('#approve-product-'+this.product.id).modal("hide");
				this.$nextTick(()=>{this.approve = false});
			}
		},

		openModal: function (type) {
			if (type=='reject') {
				this.reject = true;
				this.$nextTick(()=>$('#reject-product-'+this.product.id).modal());
			} else if (type=='approve') {
				this.approve = true;
				this.$nextTick(()=>$('#approve-product-'+this.product.id).modal());
			}
		},

		getCategory: function (id) {
			let cat = this.categories;
			for (var i in cat)
				if (cat[i].id==id)
					return cat[i].name;
			return 'Error occured.';
		}
	},
	computed:{
		categories: function () {
			return this.$store.state.categories;
		}
	}
}
</script>
