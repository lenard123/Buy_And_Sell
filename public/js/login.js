webpackJsonp([4],{

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(279)
/* template */
var __vue_template__ = __webpack_require__(280)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/pages/Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b6adb30", Component.options)
  } else {
    hotAPI.reload("data-v-3b6adb30", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			loading: false
		};
	},

	created: function created() {
		console.log(this);
	},

	methods: {
		submit: function submit() {
			var _this = this;

			if (this.loading) return;
			this.loading = true;

			var data = $('#login_form').serialize();
			axios.post(this.conf.baseurl + 'api/v1/user/login', data).then(function (response) {
				return _this.success(response);
			}).catch(function (error) {
				return _this.failed(error);
			}).then(function () {
				_this.loading = false;
			});
		},

		failed: function failed(error) {
			this.log(error);
			this.$l.handleError(error);
		},

		success: function success(response) {
			this.log(response);
			this.$l.notify('Success', 'Login successfully.', 'success');
			this.$l.setToken(response.data.token);
			this.$l.setAuthorization();
			localStorage['role'] = response.data.user.role;
			var role = this.$l.getRole();
			switch (role) {
				case "0":
					this.$router.push({ name: 'buyer-home' });
					break;
				case "1":
					this.$router.push({ name: 'seller-home' });
					break;
				case "2":
					this.$router.push({ name: 'admin-home' });
					break;
			}
		}
	}
});

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "col-md-9 mx-auto card mt-5" }, [
      _c("div", { staticClass: "card-body" }, [
        _c("h4", { staticClass: "card-title" }, [_vm._v("Login")]),
        _vm._v(" "),
        _c("hr"),
        _vm._v(" "),
        _c(
          "form",
          {
            attrs: { id: "login_form" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.submit()
              }
            }
          },
          [
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "username" } }, [_vm._v("Username")]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group" }, [
                _c("input", {
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    name: "username",
                    id: "username",
                    disabled: _vm.loading,
                    required: ""
                  }
                }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading,
                        expression: "loading"
                      }
                    ],
                    staticClass: "input-group-append"
                  },
                  [_vm._m(0)]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "password" } }, [_vm._v("Password")]),
              _vm._v(" "),
              _c("div", { staticClass: "input-group" }, [
                _c("input", {
                  staticClass: "form-control",
                  attrs: {
                    type: "password",
                    name: "password",
                    id: "password",
                    disabled: _vm.loading,
                    required: ""
                  }
                }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading,
                        expression: "loading"
                      }
                    ],
                    staticClass: "input-group-append"
                  },
                  [_vm._m(1)]
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "form-group text-center" },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary form-control mb-2",
                    attrs: { type: "save", disabled: _vm.loading }
                  },
                  [
                    _vm._v("Submit "),
                    _c("i", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.loading,
                          expression: "loading"
                        }
                      ],
                      staticClass: "fas fa-spinner fa-spin"
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-outline-secondary form-control",
                    attrs: { exact: "", to: "/", disabled: _vm.loading }
                  },
                  [_vm._v("Bact to home")]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  [
                    _vm._v("No account yet? Sign up "),
                    _c("router-link", { attrs: { to: { name: "signup" } } }, [
                      _vm._v("here.")
                    ])
                  ],
                  1
                )
              ],
              1
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "input-group-text" }, [
      _c("i", { staticClass: "fas fa-spinner fa-spin" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "input-group-text" }, [
      _c("i", { staticClass: "fas fa-spinner fa-spin" })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3b6adb30", module.exports)
  }
}

/***/ })

});