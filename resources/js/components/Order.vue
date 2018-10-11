<template>
<div class="col-md-9 mb-3" v-if="orders.length > 0">
    <div class="card">
        <div class="card-body">
            <h4>{{ title }}</h4>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Seller</th>
                            <th>Items</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders">
                            <td>{{ fromNow(order.created_at) }}</td>
                            <td><router-link :to="{name:'buyer-sellers-profile', params:{id:order.seller_id}}">{{ order.seller_name }}</router-link></td>
                            <td>{{ order.qty }} items</td>
                            <td>{{ order.price }}</td>
                            <td><span class="float-right"><router-link :to="{name:'buyer-orders-details', params:{id:order.id}}">View</router-link></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import mixin from '../mixins/app.js';
export default {
    mixins: [mixin],
    props: ['orders', 'title']
}
</script>
