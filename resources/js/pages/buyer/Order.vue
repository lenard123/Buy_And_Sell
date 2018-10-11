<template>
<div class="container mt-5">
    <div v-if="orders.length > 0">
        <h1><b>Orders List</b></h1>
        <order v-for="(order, i) in orders" :key="i" :title="order.title" :orders="order.orders"/>
    </div>
    <div v-else>
        <div class="jumbotron"><h2>No orders</h2></div>
    </div>
</div>
</template>

<script>
export default {
    created() {
        this.log(this);
    },

    computed: {
        orders: function () {
            let orders = this.$store.state.orders;
            let _orders = [
                {title: 'New Orders'},
                {title: 'Completed Orders'},
                {title: 'Cancelled Orders'}
            ];
            for (var i in _orders) {
                _orders[i].orders = orders.filter(order=>order.status==i);
            }
            return _orders;
        }
    }
}
</script>
