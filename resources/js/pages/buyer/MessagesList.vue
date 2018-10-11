<template>
<div class="container mt-5">
    <h1><b>Messages</b></h1>
    <div class="card col-md-6">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <tbody>
                    <tr v-if="messages.length < 1">
                        <td><span class="text-centered">No Messages</span></td>
                    </tr>
                    <tr v-for="message in messages">
                        <td style="width: 50px"><img :src="$l.getLink(message.user.image_id)" height="50" width="50" class="rounded-circle"/></td>
                        <router-link tag="td" :to="{name: route_name, params:{id:message.user.id}}">
                            <h5>{{ message.user.fname+' '+message.user.lname+ ' ('+role[message.user.role]+')' }}</h5>
                            <h6 v-if="message.unread_message > 0"><b>You have {{ message.unread_message }} unread messages</b></h6>
                            <h6 v-else>No new message.</h6>
                        </router-link>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default{
    data: function () {
        return {
            role: ['Buyer', 'Seller', 'Admin']
        }
    },

    computed: {
        messages: function () {
            return this.$store.state.messages;
        },

        route_name: function () {
            if (this.$l.getRole()==0)
                return 'buyer-messages-user';
            else if (this.$l.getRole()==1)
                return 'seller-messages-user';
        }
    }
}
</script>