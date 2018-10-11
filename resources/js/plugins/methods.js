export default {
		/**
		 * Show Notification
		 * @param 	{String}	title
		 * @param 	{String}	text
		 * @param 	{String}	type 	(warn|error|success)
		 */
		notify: function(title, text, type) {
			Vue.notify({
				group: 'all',
				title:title,
				text:text,
				type: type
			})
		},

		/**
		 * Handle HTTP request error
		 * @param 	{Object}	error
		 */
		handleError: function(error) {
			if (error.response.status === 422) 
				this.validationError(error.response.data.errors);
			else if (error.response.status === 400)
				this.notify('An error occured', error.response.data.message, 'error');
			else
				this.notify('Failed!', 'An error occured.', 'error');
		},

		/**
		 * Handle Validation Error
		 * @param 	{Object[]}	errors
		 */
		validationError: function(errors) {
			for (var error in errors) {
				for (var message in errors[error]) {
					this.notify(error, errors[error][message], 'error');
				}
			}
		},

		/**
		 * Check if there's already a token
		 * @return 	{Boolean}	hasToken
		 */
		hasToken: function() {
			return localStorage['token'] !== undefined;
		},

		/**
		 * Add default header
		 */
		setAuthorization: function() {
			axios.defaults.headers.common['Authorization'] = localStorage['token'];
		},

		/**
		 * Save token and set authorization of axios
		 * @param 	{String}	token
		 */
		setToken: function (token) {
			localStorage['token'] = 'Bearer '+token;
			this.setAuthorization();
		},

		/**
		 * Get the file from input
		 * @param 	{String}	id
		 * @return	{File}		file
		 * @return 	{Boolean}	(false) if no file
		 */
		getFile: function (fileId) {
			let file = document.getElementById(fileId);
			if (file.files && file.files[0])
				return file.files[0];
			return false;
		},

		/** 
		 * Replace whitespace to <br/>
		 * @param 	{String}	text
		 */
		lineBreak: function(string) {
			return string.replace(/\n/g, function(x) {
				return '<br/>';
			});
		},

		/**
		 * Read file
		 * @param 	{String}	inputId
		 * @param 	{String}	outputId
		 */
		readFile: function (inputId, outputId, store = 'src') {
			let input = this.getFile(inputId);
			let output = document.getElementById(output);
			if (input !== false)
				out[store] = URL.createObjectURL(input);
		},

		getRole: function () {
			return localStorage["role"];
		},

		getLink: function (id) {
			return Vue.prototype.conf.baseurl+'api/v1/images/'+id;
		},

		toCurrency: function (x) {
			return '₱'+x.toFixed(2);
		}


}