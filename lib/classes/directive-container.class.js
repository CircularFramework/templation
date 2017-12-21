"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}/**
 * @class DirectiveContainer
 * Contains all the defined Directives and allows for managing them
 */var DirectiveContainer=function(){function DirectiveContainer(){_classCallCheck(this,DirectiveContainer);/** public properties *//** @public {Directive[]} An array of Directive objects */this.directives=[]}/** public methods *//**
	 * Get the directives
	 * @return {Directive[]}
	 */_createClass(DirectiveContainer,[{key:"getDirectives",value:function getDirectives(){return this.directives}/**
	 * Get a specific directive
	 * @return {Directive}
	 */},{key:"getDirective",value:function getDirective(selector){/** find the directive */var match=this.directives.find(function(dir){return dir.selector===selector});return match}/**
	 * Add a new directive
	 * @param {Directive} directive A directive to add to the configured directives container
	 * @return {DirectiveContainer}
	 */},{key:"addDirective",value:function addDirective(directive){/** set the order and add to directives list */directive.setOrder(this.directives.length);this.directives.push(directive);/** return DirectiveContainer */return this}/**
	 * Remove a directive
	 * @param {string} selector A name of a directive to remove
	 * @return {DirectiveContainer}
	 */},{key:"removeDirective",value:function removeDirective(selector){/** find the index of the directive */var index=this.directives.findIndex(function(dir){return dir.selector===selector});if(index>=0)this.directives.splice(index,1);/** return DirectiveContainer */return this}/**
	 * Set the order of a directive
	 * @param {string} selector A name of a directive to reorder
	 * @return {DirectiveContainer}
	 */},{key:"setDirectiveOrder",value:function setDirectiveOrder(selector,order){/** find the matching directives */var index=this.directives.findIndex(function(dir){return dir.selector===selector});if(index>=0){/** set the order */this.directives[index].setOrder(order);/** add 1 to each directives over after this one */this.directives.forEach(function(dir,i){if(i>index)dir.setOrder(dir.getOrder()+1)});/** sort the directives */dirs.sort(function(a,b){return a.order-b.order})}/** return DirectiveContainer */return this}}]);return DirectiveContainer}();/** export the DirectiveContainer */exports.DirectiveContainer=DirectiveContainer;
//# sourceMappingURL=directive-container.class.js.map