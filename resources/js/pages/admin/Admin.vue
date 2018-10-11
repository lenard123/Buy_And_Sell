<template>

<div>

    <div v-if="status=='loading'" class="mx-auto col-md-9 mt-5 card">
        <div class="card-body">
            <h1><i class="fas fa-spinner fa-spin"></i> Loading....</h1>
        </div>
    </div>

    <div v-else-if="status=='failed'" class="mx-auto col-md-9 mt-5">
        <div class="card-body">
            <h1>An error occured, <a @click="validate()">try again</a></h1>
        </div>
    </div>

    <div v-else>
        <nav class="navbar navbar-expand-sm bg-white shadow-sm navbar-light">
            <a class="navbar-brand" href="#">
                <img :src="conf.logo"  class="rounded-circle" style="height: 32px;" />
            </a>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul class="navbar-nav">

                    <router-link tag="li" :to="{name: 'admin-home'}" class="nav-item" exact>
                        <a class="nav-link">Home</a>
                    </router-link>

                    <router-link tag="li" :to="{name: 'admin-category'}" class="nav-item">
                        <a class="nav-link">Categories</a>
                    </router-link>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Seller</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Buyer</a>
                    </li>

                </ul>
                <div class="navbar-nav">
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ user.fname+' '+user.lname }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#" onclick="$('#logout_modal').modal()">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <logout-modal/>
        <router-view></router-view>
    </div>
</div>
</template>
<script>
export default{
    data: ()=>({
        status: 'loading'
    }),

    created: function () {
        this.validate();
    },

    methods: {
        validate: function () {
            this.status = 'loading'
            axios.all([
                    axios.get(this.conf.baseurl+'api/user'),
                    axios.get(this.conf.baseurl+'api/v1/category')
                ])
                .then(axios.spread(this.success))
                .catch(this.failed);
            /*
            axios.get(this.conf.baseurl+'api/user')
                .then(response=>this.success(response))
                .catch(error=>this.failed(error))*/
        },

        failed: function (error) {
            this.log(error);
            if (error.response.status == 401) {
                this.$l.notify('Failed', 'You need to login first!', 'error');
                return this.logout();
            }
            this.status = 'error'
            this.$l.handleError(error);
        },

        success: function (userRes, categoryRes) {
            this.status = 'success';
            this.log([userRes, categoryRes]);
            if (userRes.data.role != 2) 
                this.logout();
            this.user = userRes.data;
            this.$store.commit('categories', categoryRes.data);
        },

        logout: function () {
            localStorage.clear();
            this.$store.dispatch('clearData');
            this.$l.setAuthorization();
            this.$router.push({name:'login'});
        }
    },

    computed: {
        user: {
            get: function () {
                return this.$store.state.user;
            },

            set: function (val) {
                this.$store.commit('user', val);
            }
        }
    }
}
</script>