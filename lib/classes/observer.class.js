'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Observer
 * Recursively observes every property on an object
 * @param {object} obj The object to setup observance on
 * @param {function} callback The callback function to execute when the data has changed
 */
var Observer = function () {
	function Observer(obj, callback, compiler) {
		_classCallCheck(this, Observer);

		/** public properties */

		/** @public {object} The obj to observe */
		this.obj = obj;

		/** @public {function} The callback function to execute when the obj has changed */
		this.callback = callback.bind(compiler);

		/** start observing */
		this.observe(this.obj);
	}

	/**
  * @method Setup data observation on an object
  * @param {object} An object to observe
  * @returns {Directive}
  */


	_createClass(Observer, [{
		key: 'observe',
		value: function observe(obj) {
			/** check for array and observe */
			if (Array.isArray(obj) && !obj.hasOwnProperty('push')) this.observeArray(obj);

			/** for every property on the object setup observance */
			for (var prop in obj) {
				this.observeProp(obj, prop);
				if (_typeof(obj[prop]) === 'object') {
					this.observe(obj[prop]);
				}
			}
		}

		/** observe the value of a property on an object */

	}, {
		key: 'observeProp',
		value: function observeProp(obj, prop) {
			/** get a reference to this */
			var self = this;

			/** create getter / setter for firing callback on change */
			var value = obj[prop];
			Object.defineProperty(obj, prop, {
				get: function get() {
					return value;
				},
				set: function set(newValue) {
					/** set the value to the new value */
					value = newValue;

					/** setup observance */
					if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') self.observe(value);

					/** fire callback */
					self.callback();
				}
			});
		}

		/** observe an array for changes */

	}, {
		key: 'observeArray',
		value: function observeArray(arrayObj) {
			/** get a reference to this */
			var self = this;

			/** overwrite array methods */
			var arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice'];
			arrayMethods.forEach(function (m) {
				var _method = Array.prototype[m];
				Object.defineProperty(arrayObj, m, {
					configurable: false,
					enumerable: false,
					writable: false,
					value: function value() {
						/** get the result of the base array function */
						var result = _method.apply(this, arguments);

						/** setup observance on the new value */
						self.observe(this);

						/** fire callback */
						self.callback();

						/** return the result */
						return result;
					}
				});
			});
		}
	}]);

	return Observer;
}();

/** export the class */


exports.Observer = Observer;
//# sourceMappingURL=observer.class.js.map