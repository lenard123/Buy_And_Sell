<template>
<div class="d-flex justify-content-center l-loader">
	<div class="l-loader-content">

	</div>
</div>
</template>

<style>
.l-loader{
	height:100%;
	width: 100%;
	background: rgba(0,0,0,0.5);
	position: absolute;
	top:0;
	left: 0;
	z-index: 100;
}

.l-loader-content{
	height: 80px;
	width: 80px;
	border: 5px solid white;
	border-top: 5px solid blue;
	border-radius: 50%;
	animation: l-spin 2s linear infinite;
	position: absolute;
	top: 40%;
}

@keyframes l-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
