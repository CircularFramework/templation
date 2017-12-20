/** import dependencies */
import { Directive } from '../classes/directive.class';
import { virtualizeDOM, createElement } from '../functions';

/** create the directive */
const crForDirective = new Directive('crFor', forIterator);

/** export the directive */
export { crForDirective };

/** define the directive parser function */
function forIterator(details, forElement, data) {
	/** initialize the forHTML */
	let forHTML = '';

	/** get the for attribute value expression */
	var forAttrVal = details.value.split(' ');
	var entityRef = forAttrVal[0];
	var entityProp = forAttrVal[2];

	/** get the data property */
	let getDataProperty = new Function('obj', `
		return (obj.${entityProp});
	`);

	/** check the entityProperty type */
	let property = getDataProperty(data);

	/** check for array */
	if (Array.isArray(property)) {
		/** go thru each array item */
		property.forEach((p, i) => {
			/** virtualize the for element */
			let virtualDOM = virtualizeDOM(forElement.cloneNode(true));

			/** create html for each item */
			modifyNode(virtualDOM, entityRef, `${entityProp}[${i}]`);

			/** add the html */
			let el = createElement(virtualDOM);
			forHTML += el.outerHTML;
		});
	}
	
	/** check for create for html, otherwise remove from DOM */
	if (forHTML.length > 0) forElement.outerHTML = forHTML;
	else forElement.parentNode.removeChild(forElement);
}

/** adjust child attributes */
function modifyNode(node, entityRef, entityProp) {
	/** adjust value */
	if (node.type === '#text') {
		/** first match the expressions */
		let expression;
		let exRe = new RegExp('({{[^}}]*}})', 'g');
		while ((expression = exRe.exec(node.value)) !== null) {
			/** match the entity references */
			let match;
			let re = new RegExp(`(\\b${entityRef}\\b)`, 'g');
			while ((match = re.exec(expression[1])) !== null) {
				/** re-assemble property values */
				let pre = expression[1].substring(0, match.index);
				let mid = entityProp;
				let post = expression[1].substring((match.index + entityRef.length));
				expression[1] = `${pre}${mid}${post}`;
			}

			/** re-assemble property values */
			let pre = node.value.substring(0, expression.index);
			let mid = expression[1];
			let post = node.value.substring((expression.index + expression[0].length));
			node.value = `${pre}${mid}${post}`;
		}
	}

	/** adjust property values */
	node.props.forEach(p => {
		let match;
		let re = new RegExp(`(\\b${entityRef}\\b)`, 'g');
		while ((match = re.exec(p.value)) !== null) {
			/** re-assemble property values */
			let pre = p.value.substring(0, match.index);
			let mid = entityProp;
			let post = p.value.substring((match.index + entityRef.length));
			p.value = `${pre}${mid}${post}`;
		}
	});

	/** adjust all child node properties */
	node.children.forEach(c => modifyNode(c, entityRef, entityProp));
}