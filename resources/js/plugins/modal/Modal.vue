<template>
<div class="modal fade" :id="modalId">
	<div class="modal-dialog">
		<div class="modal-content">

			<slot></slot>

		</div>
	</div>
</div>
</template>

<script>
export default{
	props: ['modalId']
}
</script>