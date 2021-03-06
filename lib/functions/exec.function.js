"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** execute some dynamically written code */
function exec(code, refs, data, context) {
	/** get the references and data */
	if (!Array.isArray(refs)) refs = [refs];
	if (!Array.isArray(data)) data = [data];

	/** create a function for executing the given code */
	var functionCode = new (Function.prototype.bind.apply(Function, [null].concat(_toConsumableArray(refs), ["\n\t\treturn (" + code + ");\n\t"])))().bind(context || null);

	/** execute the function */
	return functionCode.apply(undefined, _toConsumableArray(data));
}

/** export the function */
exports.exec = exec;
//# sourceMappingURL=exec.function.js.map