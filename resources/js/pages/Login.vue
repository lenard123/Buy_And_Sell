<template>
<div class="container d-flex" id="login">
	<div class="mt-5">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Login</h4>
				<hr/>
				<form id="login_form" @submit.prevent="submit()">
					<div class="form-group">
						<label for="username">Username</label>
						<div class="input-group">
							<input type="text" name="username" id="username" class="form-control" :disabled="loading" required="" />
							<div class="input-group-append" v-show="loading">
								<span class="input-group-text">
									<i class="fas fa-spinner fa-spin"></i>							
								</span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<div class="input-group">
							<input type="password" name="password" id="password" class="form-control" :disabled="loading" required="" />
							<div class="input-group-append" v-show="loading">
								<span class="input-group-text">
									<i class="fas fa-spinner fa-spin"></i>							
								</span>
							</div>
						</div>
					</div>

					<div class="form-group text-center">
						<button type="save" class="btn btn-primary form-control mb-2" :disabled="loading">Submit <i v-show="loading" class="fas fa-spinner fa-spin"></i></button>
						<router-link exact to="/" class="btn btn-outline-secondary form-control" :disabled="loading">Bact to home</router-link>
					</div>

				</form>
			</div>
		</div>
	</div>

	<div class="card mt-5">
		<div class="card-body">
			<h4 class="card-title">Register</h4>
			<hr/>
			<form id="login_form" @submit.prevent="register()">

				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label for="fname">First Name</label>
							<input type="text" name="fname" id="fname" class="form-control" v-model="user.fname" required="" />
						</div>						
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="lname">Last Name</label>
							<input type="text" name="lname" id="lname" class="form-control" v-model="user.lname" required="" />
						</div>						
					</div>
				</div>


				<div class="form-group">
					<label for="username">Username</label>
					<input type="text" name="username" id="username" class="form-control" required="" v-model="user.username" />
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" class="form-control" v-model="user.email" required="" />
				</div>

				<div class="form-group text-center">
					<button type="save" class="btn btn-primary form-control mb-2">Submit</button>
					<router-link exact to="/" class="btn btn-outline-secondary form-control">Bact to home</router-link>
				</div>

			</form>
		</div>

	</div>
</div>
</template>

<style>
#login{
	justify-content: space-between;
}

#login > * {
	min-width: 500px !important;
}
</style>

<script>
export default{
	data: ()=>({
		loading: false,
		user: {
			fname: '',
			lname: '',
			username: '',
			email: ''
		}
	}),

	created: function () {
		console.log(this);
		this.user = this.$store.state.register;
	},

	methods: {
		register: function () {
			this.$store.commit('register', this.user);
			this.$router.push({name: 'signup'});
		},

		submit: function () {
			if (this.loading) return;
			this.loading = true;

			const data = $('#login_form').serialize();
			axios.post(this.conf.baseurl+'api/v1/user/login', data)
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
			this.$l.notify('Success', 'Login successfully.', 'success');
			this.$l.setToken(response.data.token);
			this.$l.setAuthorization();
			localStorage['role'] = response.data.user.role;
			const role = this.$l.getRole();
			switch (role) {
				case "0":
					this.$router.push({name:'buyer-home'});
					break;
				case "1":
					this.$router.push({name:'seller-home'});
					break;
				case "2":
					this.$router.push({name:'admin-home'});
					break;
			}
		}
	}
}
</script>
