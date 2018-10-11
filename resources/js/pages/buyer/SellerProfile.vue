<template>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-3">
            <div class="card">
                <div class="card-img-top">
                    <img :src="$l.getLink(user.image_id)" width="100%" height="auto" />
                </div>
                <div class="card-body" style="overflow: hidden;overflow-x: scroll;text-overflow: ellipsis;white-space: nowrap;">
                    <h4 class="card-title">Seller's Profile</h4>
                    <span>Name : </span><b>{{ user.fname+' '+user.lname }}</b><br/>
                    <span>Email : </span><b>{{ user.email }}</b><br/>
                    <details>
                        <summary><b>Description</b></summary>
                        <span style="white-space: normal;">{{ user.seller.desc }}</span>
                    </details>
                </div>
                <div class="card-img-bottom">
                    <input type="button" value="Send Message" class="btn btn-primary form-control" @click="message()"/>
                </div>
            </div>
        </div>

        <div class="jumbotron col-md-9" v-if="page==1 && status=='loading'">
            <h1><i class="fas fa-spinner fa-spin"></i> Loading...</h1>
        </div>

        <div class="jumbotron col-md-9" v-else-if="products.length < 1">
            <h1>No Products</h1>
        </div>

        <div v-else class="col-md-9 d-flex justify-content-around flex-wrap">
            <product-item 
                v-for="(product,i) in products" 
                :product="product"
                :key="i"/>

            <div v-if="page <= last_page" class="card mb-5 bg-dark text-light" style="width:250px">
                <l-loader v-if="status=='loading'"/>
                <div class="card-body mx-auto" style="margin-top:50%">
                    <button @click="getProducts()" class="btn btn-primary" style="font-size:larger;">View More</button>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import mixin from '../../mixins/app.js';

export default {
    mixins: [mixin],

    data: ()=>({
        user:{
            image_id: 1,
            fname: 'loading...',
            lname: '',
            email: 'loading...',
            seller: {
                desc: 'loading...'
            }
        },
        page: 1,
        last_page: 0,
        try: 0,
        status: ''
    }),

    created(){
        this.log(this);
        this.$store.commit('resetProducts');
        this.getUser();
        this.getProducts();
    },

    methods: {
        getUser: function (response) {
            this.log(response);
            axios.get(this.baseurl('api/v1/user/'+this.id))
                .then(this.setUser)
                .catch(this.getUser);
        },

        setUser: function (response) {
            this.log(['user', response]);
            this.user = response.data;
        },

        getProducts: function (response) {
            if (this.try > 3) return;
            this.try++;
            this.log(response);
            this.status = 'loading';
            axios.get(this.baseurl('api/v1/user/'+this.id+'/product?status=approve&page='+this.page))
                .then(this.setProducts)
                .catch(this.getProducts);
        },

        setProducts: function (response) {
            this.log(response);
            this.status = 'success';
            this.products = response.data.data;
            this.page++;
            this.last_page = response.data.last_page;
            this.try = 0;
        },

        message: function () {
            if (this.$l.getRole() != 0)
                $('#login_modal').modal();
            else
                this.$router.push({name: 'buyer-messages-user', params:{id:this.id}});
        }
    },

    computed: {
        id: function () {
            return this.$route.params.id;
        },

        products: {
            get: function () {
                return this.$store.state.products;
            },
            set: function (val) {
                this.$store.commit('products', val);
            }
        }
    }
}
</script>