'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.emptyElement = exports.updateProps = exports.removeProp = exports.setProps = exports.setProp = exports.isEventProp = exports.createElement = exports.parseDirectives = exports.hasChanged = exports.updateDOM = exports.virtualizeDOM = exports.createTemporaryDOM = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** import functions */


var _using = require('./using.function');

var _templater = require('./templater.function');

/** create a temporary DOM object based on the template */
function createTemporaryDOM(template, data, directives) {
	/** create new template */
	var tempDOM = template.cloneNode(true);

	/** cycle through pre directives */
	parseDirectives(directives.filter(function (dir) {
		return dir.isPre();
	}), tempDOM.content, data);

	/** replace simple template values */
	(0, _templater.templater)(tempDOM, data);

	/** return the virtual DOM */
	return tempDOM;
}

/** virtualize the passed DOM element */
function virtualizeDOM(element) {
	var vElement = { type: element.nodeName, props: [], children: [], value: '' };
	if (['#text', '#comment'].includes(element.nodeName)) vElement.value = element.nodeValue;

	if (element.attributes) {
		for (var i = 0; i < element.attributes.length; i++) {
			var a = element.attributes[i];
			vElement.props.push({ 'name': a.name, 'value': a.value });
		}
	}

	if (element.childNodes) {
		element.childNodes.forEach(function (c) {
			vElement.children.push(virtualizeDOM(c));
		});
	}

	return vElement;
}

/** update the given parent with new virtual DOM nodes */
function updateDOM(parent, newNode, oldNode, index) {
	if (!index) index = 0;

	if (!oldNode) {
		if (newNode) {
			var newDOMNode = createElement(newNode);
			parent.appendChild(newDOMNode);
		}
	} else if (!newNode) {
		parent.removeChild(parent.childNodes[index]);
	} else if (hasChanged(newNode, oldNode)) {
		var _newDOMNode = createElement(newNode);
		parent.replaceChild(_newDOMNode, parent.childNodes[index]);
	} else if (newNode.type) {
		updateProps(parent.childNodes[index], newNode.props, oldNode.props);

		var newLength = newNode.children.length;
		var oldLength = oldNode.children.length;

		/** check for less new than old */
		if (newLength < oldLength) {
			/** get all the old elements that are past the new */
			var children = [];
			for (var i = newLength; i < oldLength; i++) {
				children.push(parent.childNodes[index].childNodes[i]);
			}

			/** remove old elements */
			children.forEach(function (c) {
				return parent.childNodes[index].removeChild(c);
			});
		}

		/** compare all new nodes */
		for (var _i = 0; _i < newLength; _i++) {
			updateDOM(parent.childNodes[index], newNode.children[_i], oldNode.children[_i], _i);
		}
	}
}

/** check to see if has changed */
function hasChanged(node1, node2) {
	return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || node1.type !== node2.type || ['#text', '#comment'].includes(node1.type) && node1.value !== node2.value;
}

/** find references to the given directives on the given element and parse */
function parseDirectives(dirs, element, data) {
	/** sort the directives */
	dirs.sort(function (a, b) {
		return a.order - b.order;
	});

	/** execute each directive */
	dirs.forEach(function (dir) {
		/** create an array of selectors */
		var selectors = [];

		/** check for sub selectors */
		if (dir.subSelectors.length > 0) {
			/** cycle thru sub selectors */
			dir.subSelectors.forEach(function (ss) {
				/** add the selector with sub selector */
				selectors.push(dir.selector + '\\:' + ss);
			});
		} else {
			/** add the single selector */
			selectors.push(dir.selector);
		}

		/** cycle through selectors */
		selectors.forEach(function (selector) {
			/** initialize the directive elements */
			var directiveElement = void 0;
			while ((directiveElement = element.querySelector('[' + selector + ']')) !== null) {
				var details = getDirectiveDetails(directiveElement, dir, selector);
				dir.parser(details, directiveElement, data);
			}
		});
	});
}

/** get the attribute name (selector), sub selector, and value of a directive */
function getDirectiveDetails(element, directive, selector) {
	/** initialize the details */
	var details = { 'value': null, 'subSelector': null };

	/** get the selector */
	selector = selector.replace('\\', '');
	if (directive.isPost()) selector = selector.toLowerCase();

	/** get the attribute value expression, and remove the attribute */
	var attrVal = element.getAttribute(selector);
	element.removeAttribute(selector);

	/** set details */
	details.value = attrVal;

	/** check for sub selector */
	if (selector.includes(':')) details.subSelector = selector.split(':')[1];

	/** return the details */
	return details;
}

/** create a DOM element based on the virtual DOM node passed */
function createElement(node) {
	if (node.type === '#text') {
		return document.createTextNode(node.value);
	}
	if (node.type === '#comment') {
		return document.createComment(node.value);
	}
	var $el = document.createElement(node.type);
	setProps($el, node.props);
	node.children.map(createElement).forEach($el.appendChild.bind($el));
	return $el;
}

/** check this property to see if it is an event property */
function isEventProp(prop) {
	return (/^cron:/.test(prop.name)
	);
}

/** set a target element's property value */
function setProp(target, prop) {
	target.setAttribute(prop.name, prop.value);
}

/** set multiple property values on a target element */
function setProps(target, props) {
	props.forEach(function (prop) {
		setProp(target, prop);
	});
}

/** remove a property from a target element */
function removeProp(target, prop) {
	target.removeAttribute(prop.name);
}

/** update the properties on a target element */
function updateProps(target, newProps, oldProps) {
	newProps.forEach(function (prop) {
		var match = oldProps.find(function (p) {
			return p.name === prop.name;
		});
		if (match) {
			if (match.value !== prop.value) setProp(target, prop); // update
		} else {
			if (!isEventProp(prop)) {
				setProp(target, prop); // add new
			}
		}
	});
	oldProps.forEach(function (prop) {
		var match = newProps.find(function (p) {
			return p.name === prop.name;
		});
		if (!match) {
			removeProp(target, prop);
		}
	});
}

/** empty an element of all children */
function emptyElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
};

/** export the DOM related functions */
exports.createTemporaryDOM = createTemporaryDOM;
exports.virtualizeDOM = virtualizeDOM;
exports.updateDOM = updateDOM;
exports.hasChanged = hasChanged;
exports.parseDirectives = parseDirectives;
exports.createElement = createElement;
exports.isEventProp = isEventProp;
exports.setProp = setProp;
exports.setProps = setProps;
exports.removeProp = removeProp;
exports.updateProps = updateProps;
exports.emptyElement = emptyElement;
//# sourceMappingURL=dom.functions.js.map