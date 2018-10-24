<template>
<div class="container mt-5">
    <h1><b>Product Details</b></h1>
    <div class="col-md-9">
        <div class="card mb-5">
            <div class="card-img-top prod_image_cover">
                <img :src="$l.getLink(product[images[active_image][0]])" width="300" height="300" />
            </div>
            <div class="card-body">
                <div class="form-group d-flex justify-content-between" style="overflow-x:visible">
                    <div class="prod_image"  :class="{'active':i==active_image}" v-for="(image,i) in images">
                        <img :src="$l.getLink(product[image[0]])" class="thumbnail rounded" @click="active_image=i" height="100%" width="100%" />
                    </div>
                </div>
        

                <div class="row">
                    <div class="col-md-4">
                        <div class="list-group">
                            <div class="list-group-item">
                                <b>Category : </b> {{ product.category_name }}
                            </div>
                            <div class="list-group-item">
                                <b>Price : </b> {{ product.price }}
                            </div>
                            <div class="list-group-item">
                                <b>Quantity : </b> {{ product.qty }}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <h2><b>"{{ product.name }}"</b></h2>
                        <div class="alert alert-dark" v-html="desc"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.prod_image{
    height: 130px;
    width: 130px;
    margin:0px 6px;
    padding: 10px;
    transition: padding .3s, border 1s, border-color 1s;
    flex-shrink: 0;
}

.prod_image > img {
    box-shadow: 2px 2px 5px;
}

.prod_image:hover{
    padding: 0px;
    border: 1px solid gray;
}

.prod_image > img:hover {
    box-shadow: 0px 0px;
}

.prod_image.active {
    padding: 0px;
    border: 2px solid black;
}

.prod_image.active > img {
    box-shadow: 0px 0px;
}

.prod_image_cover {
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    padding: 0px;
}

</style>

<script>
import mixin from '../../mixins/app.js';
export default {
    mixins: [mixin],
    data:()=>({
        active_image: 0,
        product: {
            image_id: 3,
            image1_id: 3,
            image2_id: 3,
            image3_id: 3,
            image4_id: 3,
            name: "Loading...",
            category_name: "Loading...",
            price: 0,
            qty: 0,
            desc: "Loading..."
        }
    }),

    created() {
        this.getProduct();
    },

    methods: {
        getProduct: function () {
            axios.get(this.baseurl('api/v1/product/'+this.id))
                 .then(response=>{
                    this.product = response.data;
                 })
                 .catch(this.handleError);
        }
    },

    computed: {
        id: function () {
            return this.$route.params.id;
        },

        images:  function () {
            return [
                ['image_id', this.product.image_id],
                ['image1_id', this.product.image1_id],
                ['image2_id',this.product.image2_id],
                ['image3_id',this.product.image3_id],
                ['image4_id',this.product.image4_id]
            ];
        },

        desc: function () {
            return this.product.desc.replace("\n/m", "<br/>");
        }
    }
}
</script>