<template>
<div class="container mt-5">
    <h1><b>Messages</b></h1>
    <div class="card col-md-6 no-padding">
        <div class="card-body message-box no-padding">
            <div class="message-box-header">
                <div class="float-left">
                    <img :src="$l.getLink(user.image_id)" height="30" width="30" class="rounded-circle" /> 
                    <b>{{ name }}</b>
                </div>
                <div class="float-right">
                    <button class="btn btn-outline-secondary" @click="getMessages()" :disabled="refresh" style="padding: 2px 5px;">{{ button }}</button>
                </div>
            </div>

            <div class="message-box-body" id="messages">
                <div v-for="message in messages" :class="{'message-to':message.from==$store.state.user.id,'message-from':message.from!=$store.state.user.id}">
                    <div class="message-date">{{ fromNow(message.created_at) }}</div>
                    <div class="message-text">{{ message.messages }}</div>
                </div>

            </div>

            <div class="message-box-footer">
                <form @submit.prevent="send()">
                    <div class="input-group">
                        <input type="text" v-model="message" class="form-control" placeholder="Enter your message here" :disabled="sending">
                        <span class="input-group-btn">
                            <button :disabled="sending" class="btn btn-primary" type="submit">SEND</button>
                        </span>
                    </div>
                </form>
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
        message: '',
        sending: false,
        messages: [],
        button: 'Refresh',
        refresh: false,
        user: {
            image_id: 1,
            fname: 'Loading...',
            lname: ''
        }
    }),

    created: function (){
        this.getUser();
        this.getMessages();
    },

    methods: {
        getUser: function () {
            axios.get(this.baseurl('api/v1/user/'+this.id))
                .then((response)=>{this.user= response.data;})
                .catch(this.getUser);
        },

        getMessages: function () {
            this.button = 'Refreshing';
            this.refresh = true;
            axios.get(this.baseurl('api/v1/message/'+this.id))
                .then((response)=>{
                    this.log(response);
                    this.button = 'Refresh';
                    this.refresh = false;
                    this.messages=response.data;
                    this.$nextTick(()=>$('#messages').scrollTop(10000000000000));
                })
                .catch(this.log);  
        },

        send: function () {
            if (this.sending) return;
            this.sending = true;

            axios.post(this.baseurl('api/v1/message/'+this.id), {
                messages: this.message
            }).then(this.sent)
                .catch(this.sendFailed)
                .then(()=>{this.sending=false});
        },

        sent: function (response) {
            this.log(response);
            this.message = '';
            this.messages = response.data;
            this.$nextTick(()=>$('#messages').scrollTop(10000000000000));
        },

        sendFailed: function (response) {
            this.log(response);
            this.$l.notify('Failed', 'Message not sent', 'danger');
        }
    },

    computed: {
        id: function () {
            return this.$route.params.id;
        },

        name: function () {
            let role = ['Buyer', 'Seller', 'Admin'];
            let name = this.user.fname +' '+this.user.lname;
            if (this.user.role !== undefined)
                name += ` (${role[this.user.role]})`;
            return name;

        }
    }
}
</script>

<style>
    .message-box {
        height: 438px;
        border: 0px;
        border-top: 3px;
        border-color: #007bff;
        border-style: solid;
        position: relative;
    }

    .message-box-header {
        position: absolute;
        top: 0;
        padding: 10px;
        width: 100%;
        border-bottom: .5px solid gray;
    }

    .message-box-body {
        position: absolute;
        top: 50px;
        width: 100%;
        padding: 10px;
        height: 343px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .message-box-footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: .5px solid gray;
    }

    .message-date {
        color: gray;
    }


    .message-from > .message-date {
        float: right;
    }

    .message-to > .message-date {
        float: left;
    }

    .message-from > .message-text {
      background: #d2d6de;
      border: 1px solid #d2d6de;
      color: #444444;
      float: right;
    }

    .message-to > .message-text {
        background: #3c8dbc;
        border-color: #3c8dbc;
        color: #fff;
        float: left;
    }

    .message-to > .message-text::before,.message-from > .message-text::before {
        border-width: 6px !important;
        margin-top: -6px;
        position: absolute;
        top: 15px;
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        pointer-events: none;
        box-sizing: border-box;    
    }

    .message-to > .message-text::before {
        left: 100%;
        right: auto;
        border-left-color: #3c8dbc;
    }

    .message-from > .message-text::before {
        right: 100%;
        border-right-color: #d2d6de;
    }



    .message-text {
      border-radius: 5px;
      position: relative;
      padding: 5px 10px;
      width: 100%;
    }

    .message-from, .message-to {
        position: relative;
    }

    .no-padding {
        padding: 0px !important;
    }   
</style>