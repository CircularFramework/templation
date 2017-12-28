'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.crClassDirective = undefined;

var _directive = require('../classes/directive.class');

var _functions = require('../functions');

/** create the directive */
/** import dependencies */
var crClassDirective = new _directive.Directive('crClass', classCheck);

/** export the directive */
exports.crClassDirective = crClassDirective;

/** define the directive parser function */

function classCheck(details, classElement, data) {
	/** get the current class list */
	var classList = [];
	for (var i = 0; i < classElement.classList.length; i++) {
		classList.push(classElement.classList[i]);
	}

	/** evaluate the expression */
	var classObj = (0, _functions.using)(data, details.value);

	/** create internal class check function */
	var hasClass = function hasClass(className) {
		return classList.includes(className);
	};

	/** add/remove classes */
	Object.keys(classObj).forEach(function (key) {
		/** check if the class is true */
		if (classObj[key] === true) {
			if (!hasClass(key)) classList.push(key);
		} else {
			if (hasClass(key)) classList.splice(classList.indexOf(key), 1);
		}
	});

	/** reset the class list */
	classElement.classList = classList.join(' ');
}
//# sourceMappingURL=crclass.directive.js.map