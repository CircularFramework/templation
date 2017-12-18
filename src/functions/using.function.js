/** user the passed object to execute the given code */
function using(obj, code, ref, refData) {
	/** replace html entities */
	const decodingMap = [
		{ entity: '&lt;', char: '<' },
		{ entity: '&gt;', char: '>' },
		{ entity: '&quot;', char: '"' },
		{ entity: '&amp;', char: '&' },
		{ entity: '&#10;', char: '\n' },
		{ entity: '&#9;', char: '\t' }
	];
	decodingMap.forEach(m => {
		code = code.replace(m.entity, m.char);
	});

	/** get the property and method names list */
	let properties = Object.getOwnPropertyNames(obj);
	let proto = Object.getPrototypeOf(obj);
	let methods = Object.getOwnPropertyNames(proto);

	/** create list of private methods to remove */
	let removedMethods = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString'];
	methods.forEach(m => m.startsWith('_') ? removedMethods.push(m) : null);
	removedMethods.forEach(rm => {
		let index = methods.indexOf(rm);
		if (index > -1) methods.splice(index, 1);
	});

	/** concatenate the properties and methods */
	let propsAndMethods = properties.concat(methods);

	/** create a function for executing the given code */
	let withFunc = new Function('obj', ref, `
		let { ${propsAndMethods.join(', ')} } = obj;
		return (${code});
	`).bind(obj);

	/** execute the function */
	return withFunc(obj, refData);
}

/** export the function */
export { using };