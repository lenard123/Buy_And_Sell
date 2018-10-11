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
            <router-link to="/" class="navbar-brand">
                <img :src="conf.logo"  class="rounded-circle" style="height: 32px;" />
            </router-link>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    
                    <router-link tag="li" :to="{name:'seller-home'}" class="nav-item" exact>
                        <a class="nav-link">HOME</a>
                    </router-link>

                    <router-link tag="li" :to="{name:'seller-products'}" class="nav-item">
                        <a class="nav-link">PRODUCTS</a>
                    </router-link>

                    <router-link tag="li" :to="{name:'seller-orders'}" class="nav-item">
                        <a class="nav-link">
                            <span>ORDERS</span>
                            <sup 
                                v-if="pending_orders>0" 
                                class="badge badge-danger rounded-circle">{{pending_orders}}
                            </sup>
                        </a>
                    </router-link>
                    <router-link tag="li" :to="{name: 'seller-messages'}" class="nav-item">
                         <a class="nav-link">
                            <span>MESSAGES</span>
                            <sup v-if="unread_messages>0" class="badge badge-danger rounded-circle">{{ unread_messages}}</sup>
                        </a>
                    </router-link>
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

import mixin from '../../mixins/app.js';

export default{
    mixins: [mixin],

    data: ()=>({
        status : ''
    }),

    created: function () {
        this.validate();
    },

    methods: {
        validate: function () {
            if (this.status =='loading') return;
            this.status = 'loading';

            axios.all([
                    axios.get(this.baseurl('api/user')),
                    axios.get(this.baseurl('api/v1/category')),
                    axios.get(this.baseurl('api/v1/order'))
                ])
                .then(axios.spread(this.success))
                .catch(this.failed)
        },

        getMessages: function () {
            axios.get(this.conf.baseurl+'api/v1/message')
                .then((response)=>{
                    this.$store.commit('messages', response.data);
                })
                .catch(this.log)
                .then(()=>{setTimeout(this.getMessages, 2000)});
        },

        success: function (response, categoryResponse, orderResponse) {
            this.status = 'success';
            this.log([response, categoryResponse, orderResponse]);
            if (response.data.role != 1) 
                this.logout();
            this.user = response.data;
            this.$store.commit('categories', categoryResponse.data);
            this.$store.commit('orders', orderResponse.data);
            this.getMessages();
        },

        failed: function (error) {
            this.log(error);
            if (error.response.status == 401) {
                this.$l.notify('Failed', 'You need to login first!', 'error');
                return this.logout();
            }
            this.status = 'error'
            this.$l.handleError(error);
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
        },

        unread_messages: function () {
            let unread_messages = 0;
            let messages = this.$store.state.messages;
            for (var i in messages)
                if (messages[i].unread_message > 0)
                    unread_messages++;
            return unread_messages;

        },

        pending_orders: function () {
            let orders = this.$store.state.orders;
            return orders.filter(order=>order.status===0).length;
        }
    }
}
</script>
