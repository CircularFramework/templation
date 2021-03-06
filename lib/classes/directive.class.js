"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Directive
 * Defines a directive that Templation will search for in the template and parse
 * @param {string} selector The selector that will be used in the directive (ex: crFor)
 * @param {function} parser The function that will be executed for the directive. The parser receives a reference to the directive, the effected element, and the associated data
 */
var Directive = function () {
	function Directive(selector, parser) {
		var _this = this;

		_classCallCheck(this, Directive);

		/** public properties */

		/** @public {string} The selector name for the directive */
		this.selector = selector;

		/** @public {function} The function that is executed for the directive */
		this.parser = parser;

		/** @public {string[]} An array of sub selectors. Referenced by using a colon (:) after the main selector (ex: crOn:click) */
		this.subSelectors = [];

		/** private properties */

		/** @private {number} A number indicating the order in which the directive should be processed */
		var _order = 0;
		this.setOrder = function (order) {
			_order = order;
			return _this;
		};
		this.getOrder = function () {
			return _order;
		};

		/** @private {boolean} A boolean indicating if this directive should be processed before DOM insertion */
		var _pre = true;
		this.setPre = function (pre) {
			_pre = pre;
			return _this;
		};
		this.isPre = function () {
			return _pre;
		};

		/** @private {boolean} A boolean indicating if this directive should be processed after DOM insertion */
		var _post = false;
		this.setPost = function (post) {
			_post = post;
			return _this;
		};
		this.isPost = function () {
			return _post;
		};
	}

	/** public methods */

	/**
  * @method Set the sub selectors
  * @param {string[]} An array of strings to function as sub selectors
  * @returns {Directive}
  */


	_createClass(Directive, [{
		key: "setSubSelectors",
		value: function setSubSelectors(subSelectors) {
			this.subSelectors = subSelectors;
			return this;
		}
	}]);

	return Directive;
}();

/** export Directive */


exports.Directive = Directive;
//# sourceMappingURL=directive.class.js.map