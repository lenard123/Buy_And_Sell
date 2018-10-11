<template>
<div>

    <div v-if="status=='loading'" class="mx-auto col-md-9 mt-5 card">
        <div class="card-body">
            <h1><i class="fas fa-spinner fa-spin"></i> Loading....</h1>
        </div>
    </div>

    <div v-else-if="status=='error'" class="mx-auto col-md-9 mt-5 card">
        <div class="card-body">
            <h1>An error occured, <a @click="chkUser()">try again</a></h1>
        </div>
    </div>

    <div v-else>
        <nav class="navbar navbar-expand-sm bg-white shadow-sm navbar-light">
            <a class="navbar-brand" href="#">
                <img :src="conf.logo" class="rounded-circle" style="height: 32px"/>
            </a>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul class="navbar-nav"> 
                    <router-link tag="li" :to="{name:'buyer-home'}" class="nav-item" exact>
                        <a class="nav-link">HOME</a>
                    </router-link>
                    <router-link tag="li" :to="{name:'buyer-products'}" class="nav-item">
                        <a class="nav-link">PRODUCTS</a>
                    </router-link>
                    <router-link tag="li" :to="{name:'buyer-sellers'}" class="nav-item">
                        <a class="nav-link">SELLERS</a>
                    </router-link>
                    <router-link v-if="user.role===0" tag="li" :to="{name:'buyer-cart'}" class="nav-item">
                        <a class="nav-link">
                            <span>CART</span>
                            <sup v-if="cart_quantity>0" class="badge badge-danger rounded-circle">{{ cart_quantity }}</sup>
                        </a>
                    </router-link>
                    <router-link v-if="user.role===0" tag="li" :to="{name:'buyer-orders'}" class="nav-item">
                        <a class="nav-link">
                            <span>ORDERS</span>
                        </a>
                    </router-link>
                    <router-link tag="li" :to="{name:'buyer-messages'}" class="nav-item" v-if="user.role===0">
                        <a class="nav-link">
                            <span>MESSAGES</span>
                            <sup v-if="unread_messages>0" class="badge badge-danger rounded-circle">{{ unread_messages}}</sup>
                        </a>
                    </router-link>
                </ul>


                <div class="navbar-nav">
                    <div class="nav-item dropdown" v-if="user.role === 0">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ user.fname+' '+user.lname }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#" onclick="$('#logout_modal').modal()">Logout</a>
                        </div>
                    </div>                  
                    <div class="nav-item" v-if="user.role !== 0" @click="goto('signup')">
                        <a class="nav-link">Sign Up</a>
                    </div>

                    <div v-if="user.role !== 0" class="nav-item" @click="goto('login')">
                        <a class="nav-link">Login</a>
                    </div>

                </div>

            </div>
        </nav>

        <router-view></router-view>

        <modal modal-id="login_modal">
            <modal-header>You need to login first!</modal-header>
            <modal-body>
                <a class="btn btn-primary form-control mb-2 text-white" @click="goto('login')">
                    Login
                </a>
                <a class="btn btn-outline-secondary form-control" @click="goto('signUp')">
                    SignUp
                </a>
            </modal-body>
        </modal>

        <logout-modal/>

    </div>
</div>
</template>

<script>
export default{
    data:()=>({
        status:''
    }),
    created: function () {
        this.chkUser();
    },
    methods:{
        goto: function (name) {
            localStorage.clear();
            this.$l.setAuthorization();
            $('#login_modal').modal('hide');
            this.$router.push({name});
        },

        chkUser: function(){
            this.status = 'loading';
            if (this.$l.getRole()==0)
                axios.get(this.conf.baseurl+'api/user')
                    .then(response=>{
                        this.log(response);
                        this.user = response.data;
                        this.getCart();
                        this.getMessages();
                    })
                    .catch(error=>{
                        localStorage.clear();
                        this.$l.setAuthorization();
                    })
                    .then(this.getCategories);
            else
                this.getCategories();
        },

        getMessages: function () {
            axios.get(this.conf.baseurl+'api/v1/message')
                .then((response)=>{
                    this.$store.commit('messages', response.data);
                })
                .catch(this.log)
                .then(()=>{setTimeout(this.getMessages, 2000)});
        },

        getCart: function () {
            axios.all([
                    axios.get(this.conf.baseurl+'api/v1/cart'),
                    axios.get(this.conf.baseurl+'api/v1/order')
                ])
                .then(axios.spread((cartRes, ordRes)=>{
                    this.log([cartRes, ordRes]);
                    this.$store.commit('carts', cartRes.data);
                    this.$store.commit('orders', ordRes.data);
                }))
                .catch(()=>{});
        },

        getCategories: function () {
            axios.get(this.conf.baseurl+'api/v1/category')
                .then(response=>{
                    this.log(response);
                    this.$store.commit('categories', response.data);
                    this.status = 'success';
                })
                .catch(error=>{
                    this.$l.handleError(error);
                    this.log(error)
                    this.status = 'error';
                });
        }
    },
    computed: {
        user: {
            get: function () {
                return this.$store.state.user;
            },
            set: function (val) {
                return this.$store.commit('user', val);
            }
        },

        unread_messages: function () {
            let unread_messages = 0;
            let messages = this.$store.state.messages;
            for (var i in messages)
                if (messages[i].unread_message > 0)
                    unread_messages++;
            return unread_messages;

        },

        cart_quantity: function () {
            let carts = this.$store.state.carts;
            let qty = 0;
            for (var i in carts)
                qty += carts[i].qty;
            return qty;
        },

        orders: function () {
            return this.$store.state.orders;
        }
    }
}
</script>
