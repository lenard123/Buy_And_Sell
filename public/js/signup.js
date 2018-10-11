webpackJsonp([3],{

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(281)
/* template */
var __vue_template__ = __webpack_require__(282)
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
Component.options.__file = "resources/js/pages/SignUp.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47af6401", Component.options)
  } else {
    hotAPI.reload("data-v-47af6401", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 281:
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
			page: 1,
			type: 0,
			types: ['Buyer', 'Seller'],
			loading: false,
			tac: false,
			user: {
				fname: '',
				lname: '',
				email: '',
				username: '',
				password: '',
				c_password: ''
			}
		};
	},

	methods: {
		next: function next(type) {
			this.page = 2;
			this.type = type;
		},

		submit: function submit() {
			var _this = this;

			if (this.loading) return;
			if (!this.isValid()) return;
			this.loading = true;

			var data = this.getData();
			var config = { headers: { 'Content-Type': 'multipart/form-data; boundary=' + data._boundary } };

			axios.post(this.conf.baseurl + 'api/v1/user/signup', data, config).then(function (response) {
				return _this.success(response);
			}).catch(function (error) {
				return _this.failed(error);
			}).then(function () {
				_this.loading = false;
			});
		},

		success: function success(response) {
			this.log(response);
			this.$l.notify('Success', 'Account added successfully.', 'success');
			localStorage.clear();
			this.$store.dispatch('clearData');
			this.$l.setAuthorization();
			this.$router.push({ name: 'login' });
		},

		failed: function failed(error) {
			this.log(error);
			this.$l.handleError(error);
		},

		isValid: function isValid() {
			var isvalid = true;

			if (!this.tac) {
				isvalid = false;
				this.$l.notify('Failed', 'You need to agree on the terms and condition', 'warn');
			}

			if (this.user.password != this.user.c_password) {
				isvalid = false;
				this.$l.notify('Failed', 'Password not match.', 'error');
			}

			return isvalid;
		},

		getData: function getData() {
			var data = new FormData();
			var image = this.$l.getFile('image');
			data.append('fname', this.user.fname);
			data.append('lname', this.user.lname);
			data.append('email', this.user.email);
			data.append('username', this.user.username);
			data.append('password', this.user.password);
			data.append('c_password', this.user.c_password);
			data.append('role', this.type);
			if (image !== false) data.append('image', image);
			return data;
		}
	}
});

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "col-md-9 mx-auto card mt-5" }, [
      _c("div", { staticClass: "card-body" }, [
        _c(
          "h4",
          { staticClass: "card-title" },
          [
            _vm._v("Sign Up "),
            _c(
              "span",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.page == 2,
                    expression: "page==2"
                  }
                ]
              },
              [_vm._v("(" + _vm._s(_vm.types[_vm.type]) + ")")]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              {
                staticClass: "btn btn-outline-secondary float-right",
                attrs: { tag: "button", to: { name: "login" } }
              },
              [_vm._v("Back to login page")]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c("hr"),
        _vm._v(" "),
        _vm.page == 1
          ? _c("div", { staticClass: "d-flex justify-content-around" }, [
              _c(
                "div",
                { staticClass: "card", staticStyle: { width: "300px" } },
                [
                  _c("img", {
                    staticClass: "card-img-top",
                    attrs: { src: _vm.$l.getLink(4), alt: "Buyer Image" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("h4", { staticClass: "card-title" }, [_vm._v("Buyer")]),
                    _vm._v(" "),
                    _c("p", { staticClass: "card-text" }, [
                      _vm._v("Choose this if you're a buyer.")
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        on: {
                          click: function($event) {
                            _vm.next(0)
                          }
                        }
                      },
                      [_vm._v("Create Account")]
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "card", staticStyle: { width: "300px" } },
                [
                  _c("img", {
                    staticClass: "card-img-top",
                    attrs: { src: _vm.$l.getLink(5), alt: "Seller Image" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("h4", { staticClass: "card-title" }, [_vm._v("Seller")]),
                    _vm._v(" "),
                    _c("p", { staticClass: "card-text" }, [
                      _vm._v("Choose this if you're a seller.")
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        on: {
                          click: function($event) {
                            _vm.next(1)
                          }
                        }
                      },
                      [_vm._v("Create Account")]
                    )
                  ])
                ]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.page == 2
          ? _c("div", [
              _c(
                "form",
                {
                  staticClass: "row",
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.submit()
                    }
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "col-md-3" },
                    [
                      _c("l-uploader", {
                        attrs: {
                          "img-src": _vm.$l.getLink(1),
                          "file-id": "image"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-9" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", [_vm._v("First Name")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
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
                            disabled: _vm.loading,
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
                      _c("label", [_vm._v("Last Name")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
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
                            disabled: _vm.loading,
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
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", [_vm._v("E-mail")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
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
                            required: "",
                            name: "email",
                            id: "email",
                            disabled: _vm.loading
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
                          [_vm._m(2)]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", [_vm._v("Username")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
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
                            disabled: _vm.loading,
                            required: ""
                          },
                          domProps: { value: _vm.user.username },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.user,
                                "username",
                                $event.target.value
                              )
                            }
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
                          [_vm._m(3)]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", [_vm._v("Password")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.password,
                              expression: "user.password"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "password",
                            name: "password",
                            id: "password",
                            disabled: _vm.loading,
                            required: ""
                          },
                          domProps: { value: _vm.user.password },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.user,
                                "password",
                                $event.target.value
                              )
                            }
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
                          [_vm._m(4)]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", [_vm._v("Confirm Password")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.c_password,
                              expression: "user.c_password"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "password",
                            name: "c_password",
                            id: "password",
                            disabled: _vm.loading,
                            required: ""
                          },
                          domProps: { value: _vm.user.c_password },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.user,
                                "c_password",
                                $event.target.value
                              )
                            }
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
                          [_vm._m(5)]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group clearfix" }, [
                      _c("div", { staticClass: "float-left" }, [
                        _c("label", [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.tac,
                                expression: "tac"
                              }
                            ],
                            attrs: { type: "checkbox", name: "" },
                            domProps: {
                              checked: Array.isArray(_vm.tac)
                                ? _vm._i(_vm.tac, null) > -1
                                : _vm.tac
                            },
                            on: {
                              change: function($event) {
                                var $$a = _vm.tac,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? true : false
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 && (_vm.tac = $$a.concat([$$v]))
                                  } else {
                                    $$i > -1 &&
                                      (_vm.tac = $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1)))
                                  }
                                } else {
                                  _vm.tac = $$c
                                }
                              }
                            }
                          }),
                          _vm._v(" I have read and agree to the "),
                          _c("a", { attrs: { href: "#" } }, [
                            _vm._v("terms and condition.")
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "float-right" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit" }
                          },
                          [_vm._v("Submit")]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-outline-secondary",
                            on: {
                              click: function($event) {
                                _vm.page = 1
                              }
                            }
                          },
                          [_vm._v("Back")]
                        )
                      ])
                    ])
                  ])
                ]
              )
            ])
          : _vm._e()
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
  },
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
  },
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
    require("vue-hot-reload-api")      .rerender("data-v-47af6401", module.exports)
  }
}

/***/ })

});