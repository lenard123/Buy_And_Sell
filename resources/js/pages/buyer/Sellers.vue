<template>
<div class="container mt-5">
    <h1><b>Sellers List</b></h1>
    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td><img :src="$l.getLink(user.image_id)" class="rounded-circle thumbnail" height="60" width="60" /></td>
                            <td>{{ user.fname+' '+user.lname }}</td>
                            <td>{{ user.email }}</td>
                            <td><router-link :to="{name:'buyer-sellers-profile', params:{id:user.id}}">View Products</router-link></td>
                        </tr>
                        <tr v-if="status=='loading'">
                            <td colspan="4" class="text-center">
                                <i class="fas fa-spinner fa-spin"></i> fetching sellers
                            </td>
                        </tr>
                        <tr v-else-if="status=='error'">
                            <td colspan="4" class="text-center">An error occured <a href="#" @click="getUsers()">Refresh</a></td>
                        </tr>
                        <tr v-else-if="page <= total">
                            <td colspan="4" class="text-center">
                                <a @click="getUsers()">View More</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import mixin from '../../mixins/app.js';
export default {
    mixins: [mixin],

    data:()=>({
        status: '',
        page: 1,
        total: 0
    }),

    created(){
        this.$store.commit('users', []);
        this.getUsers();
    },

    methods: {
        getUsers(){
            if (this.status=='loading') return;
            this.status = 'loading';

            axios.get(this.baseurl('api/v1/user/seller?page='+this.page))
                .then(response=>{
                    this.status = '';
                    this.log(response);
                    this.$store.commit('appendUsers', response.data.data);
                    this.page++;
                    this.total = response.data.last_page;
                })
                .catch(error => this.failed(error, ()=>{
                    this.status = 'error';
                }));
        }
    },

    computed: {
        users(){
            return this.$store.state.users;
        }
    }
}
</script>
