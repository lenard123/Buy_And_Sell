export default {
	methods: {
		logout: function (cb) {
			localStorage.clear();
			this.$store.dispatch('clearData');
			this.$l.setAuthorization();
			this.$router.push({name:'login'});
			if (typeof cb === "function")
				cb();
		},

		failed: function (error, callback) {
			this.log(error);
			this.$l.handleError(error);
			if (callback)
				callback();
		},

		baseurl: function (url) {
			return this.conf.baseurl+url;
		},

		fromNow: function (date) {
			return (new moment(date)).fromNow();
		}
	}
}