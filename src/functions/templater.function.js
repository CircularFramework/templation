/** import functions */
import { using } from './using.function';

/** do some simple template parsing/value replacing */
function templater(template, data) {
	/** get the html */
	let html = template.innerHTML;

	/** set the pattern for replacement */
	const re = /{{\s?([\w\W]*?)\s?}}/gmi;

	/** cycle over matches */
	let match;
	while ((match = re.exec(html)) !== null) {
		/** catch exceptions */
		try {
			/** replace the values in the html and reset the lastIndex of the regex */
			html = html.replace(match[0], using(data, match[1]));
			re.lastIndex = 0;
		} catch (ex) {
			console.log(ex);
		}
	}

	/** reset the innerHTML */
	template.innerHTML = html;
}

/** export function */
export { templater };