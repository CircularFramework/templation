'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/** user the passed object to execute the given code */
function using(obj, code, ref, refData) {
	/** replace html entities */
	var decodingMap = [{ entity: '&lt;', char: '<' }, { entity: '&gt;', char: '>' }, { entity: '&quot;', char: '"' }, { entity: '&amp;', char: '&' }, { entity: '&#10;', char: '\n' }, { entity: '&#9;', char: '\t' }];
	decodingMap.forEach(function (m) {
		code = code.replace(m.entity, m.char);
	});

	/** get the property and method names list */
	var properties = '';
	var methods = '';
	if (!Array.isArray(obj)) {
		/** get the property names */
		var propertyNames = Object.getOwnPropertyNames(obj);
		propertyNames.forEach(function (p) {
			properties += 'var ' + p + ' = obj.' + p + '; ';
		});

		/** create list of private methods to remove */
		var proto = Object.getPrototypeOf(obj);
		var publicMethods = Object.getOwnPropertyNames(proto);
		var privateMethods = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString'];
		publicMethods.forEach(function (m) {
			return m.startsWith('_') ? privateMethods.push(m) : null;
		});
		privateMethods.forEach(function (rm) {
			var index = publicMethods.indexOf(rm);
			if (index > -1) publicMethods.splice(index, 1);
		});

		/** create a method string */
		publicMethods.forEach(function (m) {
			methods += 'let ' + m + ' = obj.' + m + '.bind(obj); ';
		});
	}

	/** create a function for executing the given code */
	var withFunc = new Function('obj', ref, '\n\t\t' + properties + '\n\t\t' + methods + '\n\t\treturn (' + code + ');\n\t').bind(obj);

	/** execute the function */
	return withFunc(obj, refData);
}

/** export the function */
exports.using = using;
//# sourceMappingURL=using.function.js.map