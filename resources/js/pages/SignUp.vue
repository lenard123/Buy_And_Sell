<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
		<div class="card-body">
			<h4 class="card-title">Sign Up <span v-show="page==2">({{types[type]}})</span>
				<router-link tag="button" :to="{name:'login'}" class="btn btn-outline-secondary float-right">Back to login page</router-link>
			</h4>
			<hr/>

			<div v-if="page==1" class="d-flex justify-content-around">

				<div class="card" style="width: 300px">
					<img class="card-img-top" :src="$l.getLink(4)" alt="Buyer Image" />
					<div class="card-body">
						<h4 class="card-title">Buyer</h4>
						<p class="card-text">Choose this if you're a buyer.</p>
						<button class="btn btn-primary" @click="next(0)">Create Account</button>
					</div>
				</div>

				<div class="card" style="width: 300px">
					<img class="card-img-top" :src="$l.getLink(5)" alt="Seller Image" />
					<div class="card-body">
						<h4 class="card-title">Seller</h4>
						<p class="card-text">Choose this if you're a seller.</p>
						<button class="btn btn-primary" @click="next(1)">Create Account</button>
					</div>
				</div>				

			</div>

			<div v-if="page==2">
				<form class="row" @submit.prevent="submit()">
					<div class="col-md-3">
						<l-uploader :img-src="$l.getLink(1)" file-id="image" />
					</div>

					<div class="col-md-9">
						
						<div class="form-group">
							<label>First Name</label>
							<div class="input-group">
								<input type="text" name="fname" v-model="user.fname" id="fname" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label>Last Name</label>
							<div class="input-group">
								<input type="text" name="lname" v-model="user.lname" id="lname" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>						

						<div class="form-group">
							<label>E-mail</label>
							<div class="input-group">
								<input type="email" required="" name="email" v-model="user.email" id="email" class="form-control" :disabled="loading" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label>Username</label>
							<div class="input-group">
								<input type="text" name="username" v-model="user.username" id="username" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>

						<div class="form-group" v-if="type==0">
							<label>Address1</label>
							<div class="input-group">
								<input type="text" name="address1" v-model="user.address1" id="address1" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>	

						<div class="form-group" v-if="type==0">
							<label>Address2</label>
							<div class="input-group">
								<input type="text" name="address2" v-model="user.address2" id="address2" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>	

						<div class="form-group" v-if="type==1">
							<label>Description</label>
							<textarea class="form-control" required="" placeholder="Add description to help your buyers trust you" v-model="user.desc"></textarea>
						</div>				

						<div class="form-group">
							<label>Password</label>
							<div class="input-group">
								<input type="password" name="password" v-model="user.password" id="password" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label>Confirm Password</label>
							<div class="input-group">
								<input type="password" name="c_password" v-model="user.c_password" id="password" class="form-control" :disabled="loading" required="" />
								<div class="input-group-append" v-show="loading">
									<span class="input-group-text">
										<i class="fas fa-spinner fa-spin"></i>							
									</span>
								</div>
							</div>
						</div>

						<div class="form-group clearfix">

							<div class="float-left">
								<label><input v-model="tac" type="checkbox" name=""> I have read and agree to the <a href="#">terms and condition.</a></label>
							</div>

							<div class="float-right">
								<button class="btn btn-primary" type="submit">Submit</button>
								<button class="btn btn-outline-secondary" @click="page=1">Back</button>
							</div>
						</div>

					</div>

				</form>
			</div>

		</div>
	</div>
</div>
</template>

<script>
export default {
	data: ()=>({
		page: 1,
		type: 0,
		types: ['Buyer', 'Seller'],
		loading: false,
		tac: false,
		user:{
			fname: '',
			lname: '',
			email: '',
			username : '',
			password: '',
			c_password: '',
			address1:'',
			address2:'',
			desc: ''
		}
	}),

	created() {
		let register = this.$store.state.register;
		let user = this.user;
		user.fname = register.fname;
		user.lname = register.lname;
		user.email = register.email;
		user.username = register.username;
	},

	methods: {
		next: function (type) {
			this.page = 2;
			this.type = type;
		},

		submit: function () {
			if (this.loading) return;
			if (!this.isValid()) return;
			this.loading = true;

			let data = this.getData();
			let config = {headers:{'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}

			axios.post(this.conf.baseurl+'api/v1/user/signup', data, config)
				.then(response=>this.success(response))
				.catch(error=>this.failed(error))
				.then(()=>{this.loading=false});

		},

		success: function (response) {
			this.log(response);
			this.$l.notify('Success', 'Account added successfully.', 'success');
			localStorage.clear();
			this.$store.dispatch('clearData');
			this.$l.setAuthorization();
			this.$router.push({name:'login'});
		},

		failed: function (error) {
			this.log(error);
			this.$l.handleError(error);
		},


		isValid: function () {
			let isvalid = true;
			
			if (!this.tac) {
				isvalid = false;
				this.$l.notify('Failed', 'You need to agree on the terms and condition', 'warn');
			}

			if (this.user.password != this.user.c_password) {
				isvalid = false;
				this.$l.notify('Failed', 'Password not match.', 'error');
			}

			return isvalid;

		},

		getData: function () {
			let data = new FormData();
			let image = this.$l.getFile('image');
			data.append('fname', this.user.fname);
			data.append('lname', this.user.lname);
			data.append('email', this.user.email);
			data.append('username', this.user.username);
			data.append('password', this.user.password);
			data.append('c_password', this.user.c_password);
			data.append('role', this.type);
			
			if (image !== false)
				data.append('image', image);


			if (this.type==0) {
				data.append('address1', this.user.address1);
				data.append('address2', this.user.address2);
			} else {
				data.append('desc', this.user.desc);
			}

			return data;

		}
	}
}
</script>
