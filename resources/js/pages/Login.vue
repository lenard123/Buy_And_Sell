<template>
<div class="container">
	<div class="col-md-9 mx-auto card mt-5">
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
					<span>No account yet? Sign up <router-link :to="{name:'signup'}">here.</router-link></span> 
				</div>

			</form>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data: ()=>({
		loading: false
	}),

	created: function () {
		console.log(this);
	},

	methods: {
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
