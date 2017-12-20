/** execute some dynamically written code */
function exec(code, refs, data, context) {
	/** get the references and data */
	if (!Array.isArray(refs)) refs = [refs];
	if (!Array.isArray(data)) data = [data];

	/** create a function for executing the given code */
	let functionCode = new Function(...refs, `
		return (${code});
	`).bind(context || null);

	/** execute the function */
	return functionCode(...data);
}

/** export the function */
export { exec };