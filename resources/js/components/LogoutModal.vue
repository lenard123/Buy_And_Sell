<template>
<modal modal-id="logout_modal">
	<modal-header>Logout</modal-header>
	<modal-body>
		<h4>Are you sure to logout?</h4>
	</modal-body>
	<modal-footer>
		<button class="btn btn-danger" @click="logout" onclick="$('#logout_modal').modal('hide')">Logout</button>
		<button class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
	</modal-footer>
</modal>
</template>

<script>
import mixin from '../mixins/app.js';
export default{
	mixins: [mixin]
}
</script>
