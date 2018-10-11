export default{
	install: (Vue, option) => {
		Vue.prototype.conf = require('./config.js').default;
		Vue.prototype.log = c=>console.log(c);
		Vue.prototype.$l = require('./methods.js').default;

		//Components
		Vue.component('l-uploader', require('./Uploader.vue'));
		Vue.component('l-loader', require('./Loader.vue'));

		Vue.component('modal', require('./modal/Modal.vue'));
		Vue.component('modal-header', require('./modal/ModalHeader.vue'));
		Vue.component('modal-body', require('./modal/ModalBody.vue'));
		Vue.component('modal-footer', require('./modal/ModalFooter.vue'));
	}
}