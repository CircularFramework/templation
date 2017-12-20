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
	let properties = '';
	let methods = '';
	if (!Array.isArray(obj)) {
		/** get the property names */
		let propertyNames = Object.getOwnPropertyNames(obj);
		propertyNames.forEach(p => {
			properties += `var ${p} = obj.${p}; `;
		});

		/** create list of private methods to remove */
		let proto = Object.getPrototypeOf(obj);
		let publicMethods = Object.getOwnPropertyNames(proto);
		let privateMethods = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString'];
		publicMethods.forEach(m => m.startsWith('_') ? privateMethods.push(m) : null);
		privateMethods.forEach(rm => {
			let index = publicMethods.indexOf(rm);
			if (index > -1) publicMethods.splice(index, 1);
		});

		/** create a method string */
		publicMethods.forEach(m => {
			methods += `let ${m} = obj.${m}.bind(obj); `;
		});
	}

	/** create a function for executing the given code */
	let withFunc = new Function('obj', ref, `
		${properties}
		${methods}
		return (${code});
	`).bind(obj);

	/** execute the function */
	return withFunc(obj, refData);
}

/** export the function */
export { using };