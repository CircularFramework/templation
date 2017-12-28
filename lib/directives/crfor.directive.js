'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.crForDirective = undefined;

var _directive = require('../classes/directive.class');

var _functions = require('../functions');

/** create the directive */
/** import dependencies */
var crForDirective = new _directive.Directive('crFor', forIterator);

/** export the directive */
exports.crForDirective = crForDirective;

/** define the directive parser function */

function forIterator(details, forElement, data) {
	/** initialize the forHTML */
	var forHTML = '';

	/** get the for attribute value expression */
	var forAttrVal = details.value.split(' ');
	var entityRef = forAttrVal[0];
	var entityProp = forAttrVal[2];

	/** get the data property */
	var getDataProperty = new Function('obj', '\n\t\treturn (obj.' + entityProp + ');\n\t');

	/** check the entityProperty type */
	var property = getDataProperty(data);

	/** check for array */
	if (Array.isArray(property)) {
		/** go thru each array item */
		property.forEach(function (p, i) {
			/** virtualize the for element */
			var virtualDOM = (0, _functions.virtualizeDOM)(forElement.cloneNode(true));

			/** create html for each item */
			modifyNode(virtualDOM, entityRef, entityProp + '[' + i + ']');

			/** add the html */
			var el = (0, _functions.createElement)(virtualDOM);
			forHTML += el.outerHTML;
		});
	}

	/** check for create for html, otherwise remove from DOM */
	if (forHTML.length > 0) forElement.outerHTML = forHTML;else forElement.parentNode.removeChild(forElement);
}

/** adjust child attributes */
function modifyNode(node, entityRef, entityProp) {
	/** adjust value */
	if (node.type === '#text') {
		/** first match the expressions */
		var expression = void 0;
		var exRe = new RegExp('({{[^}}]*}})', 'g');
		while ((expression = exRe.exec(node.value)) !== null) {
			/** match the entity references */
			var match = void 0;
			var re = new RegExp('(\\b' + entityRef + '\\b)', 'g');
			while ((match = re.exec(expression[1])) !== null) {
				/** re-assemble property values */
				var _pre = expression[1].substring(0, match.index);
				var _mid = entityProp;
				var _post = expression[1].substring(match.index + entityRef.length);
				expression[1] = '' + _pre + _mid + _post;
			}

			/** re-assemble property values */
			var pre = node.value.substring(0, expression.index);
			var mid = expression[1];
			var post = node.value.substring(expression.index + expression[0].length);
			node.value = '' + pre + mid + post;
		}
	}

	/** adjust property values */
	node.props.forEach(function (p) {
		var match = void 0;
		var re = new RegExp('(\\b' + entityRef + '\\b)', 'g');
		while ((match = re.exec(p.value)) !== null) {
			/** re-assemble property values */
			var _pre2 = p.value.substring(0, match.index);
			var _mid2 = entityProp;
			var _post2 = p.value.substring(match.index + entityRef.length);
			p.value = '' + _pre2 + _mid2 + _post2;
		}
	});

	/** adjust all child node properties */
	node.children.forEach(function (c) {
		return modifyNode(c, entityRef, entityProp);
	});
}
//# sourceMappingURL=crfor.directive.js.map