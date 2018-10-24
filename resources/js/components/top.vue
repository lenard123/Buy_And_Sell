<template>
<div @click="top" id="top">Back to Top</div>
</template>

<style>
#top {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 50;
    cursor: pointer;
    padding: 15px;
    border-radius: 10px;
    background-color: red;
    color: white;
}
</style>

<script>
export default {
    created: function () {
        window.onscroll = this.scroll;
    },

    methods: {
        top: function () {
            $('html, body').animate({scrollTop:0});
        },

        scroll: function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
                document.getElementById("top").style.display = "block";
            } else { 
                document.getElementById("top").style.display = "none"
            }
        }
    }
}
</script>
