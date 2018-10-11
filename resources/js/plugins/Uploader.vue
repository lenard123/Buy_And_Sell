<template>
<center>
	<div class="img-container" :style="{'max-height':size, 'max-width':size}">
		<input type="file" :id="fileId" :name="fileName" class="uploader-file" @change="readFile(fileId, imgId)" />
		<img :src="imgSrc" :id="imgId" class="img" />
		<span class="img-text">Select Image</span>
	</div>
</center>
</template>

<script>
export default{
	props: {
		fileId: {default:'fileId'},
		fileName: {default:'file_name'},
		imgId: {default:'imgId'},
		imgSrc:{default:'#'},
		size: {default: '200px'}
	},

	methods: {
		readFile: function (fileId, imgId) {
			let input = document.getElementById(fileId);
			let output = document.getElementById(imgId);
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = (e) => {output.src = e.target.result;};
				reader.readAsDataURL(input.files[0]);
			}
		}
	}
}
</script>

<style>
.img-container{
	position: relative;
}

.uploader-file {
	position: absolute;
	height: 100%;
	width: 100%;
	opacity: 0;
}

.img{
	background-color: #ffffff;
	border:2px black solid;
	height: 100%;
	width: 100%;
}

.img-text{
	position: absolute; 
	left: 0; 
	top: 45%; 
	width: 100%; 
	text-align: center;
}
</style>
