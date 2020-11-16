webpackJsonp([3],{

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(293)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(295)
/* template */
var __vue_template__ = __webpack_require__(296)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
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

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(294);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("1a9ddfdc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b6adb30\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b6adb30\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n#login{\r\n\t-webkit-box-pack: justify;\r\n\t    -ms-flex-pack: justify;\r\n\t        justify-content: space-between;\n}\n#login > * {\r\n\tmin-width: 500px !important;\n}\r\n", ""]);

// exports


/***/ }),

/***/ 295:
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
			loading: false,
			user: {
				fname: '',
				lname: '',
				username: '',
				email: ''
			}
		};
	},

	created: function created() {
		console.log(this);
		this.user = this.$store.state.register;
	},

	methods: {
		register: function register() {
			this.$store.commit('register', this.user);
			this.$router.push({ name: 'signup' });
		},

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

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container d-flex", attrs: { id: "login" } },
    [
      _c("div", { staticClass: "mt-5" }, [
        _c("div", { staticClass: "card" }, [
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
                  _c("label", { attrs: { for: "username" } }, [
                    _vm._v("Username")
                  ]),
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
                  _c("label", { attrs: { for: "password" } }, [
                    _vm._v("Password")
                  ]),
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
                    )
                  ],
                  1
                )
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card mt-5" }, [
        _c("div", { staticClass: "card-body" }, [
          _c("h4", { staticClass: "card-title" }, [_vm._v("Register")]),
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
                  _vm.register()
                }
              }
            },
            [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "fname" } }, [
                      _vm._v("First Name")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.user.fname,
                          expression: "user.fname"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "fname",
                        id: "fname",
                        required: ""
                      },
                      domProps: { value: _vm.user.fname },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.user, "fname", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "lname" } }, [
                      _vm._v("Last Name")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.user.lname,
                          expression: "user.lname"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "lname",
                        id: "lname",
                        required: ""
                      },
                      domProps: { value: _vm.user.lname },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.user, "lname", $event.target.value)
                        }
                      }
                    })
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "username" } }, [
                  _vm._v("Username")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.user.username,
                      expression: "user.username"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    name: "username",
                    id: "username",
                    required: ""
                  },
                  domProps: { value: _vm.user.username },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.user, "username", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "email" } }, [_vm._v("Email")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.user.email,
                      expression: "user.email"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "email",
                    name: "email",
                    id: "email",
                    required: ""
                  },
                  domProps: { value: _vm.user.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.user, "email", $event.target.value)
                    }
                  }
                })
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
                      attrs: { type: "save" }
                    },
                    [_vm._v("Submit")]
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    {
                      staticClass: "btn btn-outline-secondary form-control",
                      attrs: { exact: "", to: "/" }
                    },
                    [_vm._v("Bact to home")]
                  )
                ],
                1
              )
            ]
          )
        ])
      ])
    ]
  )
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