'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.crOnDirective = undefined;

var _directive = require('../classes/directive.class');

var _functions = require('../functions');

/** an array of event names to look for in the crOn event directive */
/** import dependencies */
var eventTypes = [
/** mouse events */
'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup',

/** keyboard events */
'keydown', 'keypress', 'keyup',

/** frame / object events */
'abort', 'beforeunload', 'error', 'hashchange', 'load', 'pageshow', 'pagehide', 'resize', 'scroll', 'unload',

/** form events */
'blur', 'change', 'focus', 'focusin', 'focusout', 'input', 'invalid', 'reset', 'search', 'select', 'submit',

/** drag events */
'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop',

/** clipboard events */
'copy', 'cut', 'paste',

/** print events */
'afterprint', 'beforeprint',

/** media events */
'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting',

/** misc events */
'online', 'offline', 'wheel',

/** touch events */
'touchcancel', 'touchend', 'touchmove', 'touchstart'];

/** create the directive */
var crOnDirective = new _directive.Directive('crOn', eventAttach).setSubSelectors(eventTypes).setPre(false).setPost(true);

/** export the directive */
exports.crOnDirective = crOnDirective;

/** define the directive parser function */

function eventAttach(details, element, data) {
	/** create the event function */
	var eventFunc = function eventFunc() {
		return (0, _functions.using)(data, details.value);
	};

	/** remove and re-add the event listener */
	element.removeEventListener(details.subSelector, eventFunc);
	element.addEventListener(details.subSelector, eventFunc);
}
//# sourceMappingURL=cron.directive.js.map