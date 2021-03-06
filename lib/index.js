'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Templation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** import dependencies */


var _directiveContainer = require('./classes/directive-container.class');

var _directive = require('./classes/directive.class');

var _compiler = require('./classes/compiler.class');

var _directives = require('./directives');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Templation
 * Initializes and configures the Templation engine
 */
var Templation = function () {
	function Templation() {
		_classCallCheck(this, Templation);

		/** public properties */

		/** @public {DirectiveContainer} The directive container */
		this.directiveContainer = new _directiveContainer.DirectiveContainer();

		/** add the built-in directives */
		this.directiveContainer.addDirective(_directives.crForDirective);
		this.directiveContainer.addDirective(_directives.crIfDirective);
		this.directiveContainer.addDirective(_directives.crClassDirective);
		this.directiveContainer.addDirective(_directives.crOnDirective);
	}

	/** public methods */

	/** create new compiler */


	_createClass(Templation, [{
		key: 'compile',
		value: function compile(container, template, data) {
			/** create the compiler */
			var compiler = new _compiler.Compiler(container, template, data);
			compiler.setDirectiveContainer(this.directiveContainer);

			/** return the compiler */
			return compiler;
		}
	}]);

	return Templation;
}();

/** export Templation */


exports.Templation = Templation;
//# sourceMappingURL=index.js.map