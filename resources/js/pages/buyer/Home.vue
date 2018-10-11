<template>
<div>
	<div style="background: rgba(0,0,0,0.5)" class="mb-5">
		<div id="myCarousel" style="max-width: 700px" class="carousel slide mx-auto" data-ride="carousel">

			<ol class="carousel-indicators">
				<li v-for="(image,i) in conf.slideImages" data-target="#myCarousel" :data-slide-to="i" :class="{active:i==0}"></li>
			</ol>

			<div class="carousel-inner" role="listbox">
				<div class="carousel-item" :class="{active:i==0}" v-for="(image,i) in conf.slideImages">
					<img :src="$l.getLink(image)" width="100%" />
				</div>
			</div>

			<!-- Left and right controls -->
			<a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
				<span class="carousel-control-prev-icon"></span>
			</a>
			<a class="carousel-control-next" href="#myCarousel" data-slide="next">
				<span class="carousel-control-next-icon"></span>
			</a>		
		</div>
	</div>

	<div v-if class="d-flex mb-5 justify-content-around flex-wrap">

		<div v-for="category in categories" class="card mb-2" style="width:300px">
			<div class="card-img-top bg-dark" style="height:300px;" :style="getStyle(category.image_id)">
			</div>
			<div class="card-body">
				<h4 class="card-title">{{ category.name }}</h4>
				<p class="card-text">{{ category.desc }}</p>
				<router-link :to="{name:'buyer-products', query:{category_id:category.id}}" class="btn btn-primary">View Products</router-link>
			</div>
		</div>

	</div>

</div>
</template>

<script>
export default{
	data:()=>({
		status:''
	}),

	methods: {
		getStyle: function (id) {
			let style = {}
			style.background = `url(${this.$l.getLink(id)})`;
			style.backgroundRepeat = 'no-repeat';
			style.backgroundSize = 'cover';
			style.backgroundPosition = 'center';
			return style;
		},

	},

	computed: {
		categories: {
			get: function () {
				return this.$store.state.categories;
			},
			set: function (val) {
				this.$store.commit('categories', val);
			}
		}
	}
}
</script>
