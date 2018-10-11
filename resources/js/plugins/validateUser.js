export default {
	install: function (Vue, option) {
		
		getOption = function (option) {
			option.before = option.before ? option.before : ()=>{};
			option.success = option.success ? option.success : ()=>{};
			option.wrongrole = option.wrongrole ? option.wrongrole : ()=>{};
			option.failed = option.failed ? option.failed:()=>{};
			option.after = option.after ? option.after:()=>{};
			return option;
		}

		wrongrole = function (response, role) {
			
		}

		Vue.prototype.validateUser = function(vm, role, option) {
			option = getOption(option);

			option.before();

			axios.get(vm.conf.baseurl+'api/user')
				.then(response=>{
					if (response.data.role == role) {
						option.success(response);
					} else {
						option.wrongrole(response, role);
					}
				})
				.catch(error=>option.failed(error))
				.then(()=>option.after())
		};
	}
}