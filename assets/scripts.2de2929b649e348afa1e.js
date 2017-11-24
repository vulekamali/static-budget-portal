/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
	for (var i in props) {
		obj[i] = props[i];
	}return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},

	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},

	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
	return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

exports.h = h;
exports.createElement = h;
exports.cloneElement = cloneElement;
exports.Component = Component;
exports.render = render;
exports.rerender = rerender;
exports.options = options;
exports.default = preact;
//# sourceMappingURL=preact.esm.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var strictUriEncode = __webpack_require__(12);
var objectAssign = __webpack_require__(6);
var decodeComponent = __webpack_require__(13);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [encode(key, opts), '[', index, ']'].join('') : [encode(key, opts), '[', encode(index, opts), ']=', encode(value, opts)].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [encode(key, opts), '[]=', encode(value, opts)].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [encode(key, opts), '=', encode(value, opts)].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
};

exports.parse = function (str, opts) {
	opts = objectAssign({ arrayFormat: 'none' }, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(14);

__webpack_require__(17);

__webpack_require__(25);

__webpack_require__(37);

__webpack_require__(42);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.preact);
})(undefined, function (preact) {
	'use strict';

	// render modes


	var ATTR_KEY = '__preactattr_';

	// DOM properties that should NOT have "px" added when numeric

	/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */

	// Internal helpers from preact
	/**
  * Return a ReactElement-compatible object for the current state of a preact
  * component.
  */
	function createReactElement(component) {
		return {
			type: component.constructor,
			key: component.key,
			ref: null, // Unsupported
			props: component.props
		};
	}

	/**
  * Create a ReactDOMComponent-compatible object for a given DOM node rendered
  * by preact.
  *
  * This implements the subset of the ReactDOMComponent interface that
  * React DevTools requires in order to display DOM nodes in the inspector with
  * the correct type and properties.
  *
  * @param {Node} node
  */
	function createReactDOMComponent(node) {
		var childNodes = node.nodeType === Node.ELEMENT_NODE ? Array.from(node.childNodes) : [];

		var isText = node.nodeType === Node.TEXT_NODE;

		return {
			// --- ReactDOMComponent interface
			_currentElement: isText ? node.textContent : {
				type: node.nodeName.toLowerCase(),
				props: node[ATTR_KEY]
			},
			_renderedChildren: childNodes.map(function (child) {
				if (child._component) {
					return updateReactComponent(child._component);
				}
				return updateReactComponent(child);
			}),
			_stringText: isText ? node.textContent : null,

			// --- Additional properties used by preact devtools

			// A flag indicating whether the devtools have been notified about the
			// existence of this component instance yet.
			// This is used to send the appropriate notifications when DOM components
			// are added or updated between composite component updates.
			_inDevTools: false,
			node: node
		};
	}

	/**
  * Return the name of a component created by a `ReactElement`-like object.
  *
  * @param {ReactElement} element
  */
	function typeName(element) {
		if (typeof element.type === 'function') {
			return element.type.displayName || element.type.name;
		}
		return element.type;
	}

	/**
  * Return a ReactCompositeComponent-compatible object for a given preact
  * component instance.
  *
  * This implements the subset of the ReactCompositeComponent interface that
  * the DevTools requires in order to walk the component tree and inspect the
  * component's properties.
  *
  * See https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/getData.js
  */
	function createReactCompositeComponent(component) {
		var _currentElement = createReactElement(component);
		var node = component.base;

		var instance = {
			// --- ReactDOMComponent properties
			getName: function getName() {
				return typeName(_currentElement);
			},

			_currentElement: createReactElement(component),
			props: component.props,
			state: component.state,
			forceUpdate: component.forceUpdate && component.forceUpdate.bind(component),
			setState: component.setState && component.setState.bind(component),

			// --- Additional properties used by preact devtools
			node: node
		};

		// React DevTools exposes the `_instance` field of the selected item in the
		// component tree as `$r` in the console.  `_instance` must refer to a
		// React Component (or compatible) class instance with `props` and `state`
		// fields and `setState()`, `forceUpdate()` methods.
		instance._instance = component;

		// If the root node returned by this component instance's render function
		// was itself a composite component, there will be a `_component` property
		// containing the child component instance.
		if (component._component) {
			instance._renderedComponent = updateReactComponent(component._component);
		} else {
			// Otherwise, if the render() function returned an HTML/SVG element,
			// create a ReactDOMComponent-like object for the DOM node itself.
			instance._renderedComponent = updateReactComponent(node);
		}

		return instance;
	}

	/**
  * Map of Component|Node to ReactDOMComponent|ReactCompositeComponent-like
  * object.
  *
  * The same React*Component instance must be used when notifying devtools
  * about the initial mount of a component and subsequent updates.
  */
	var instanceMap = typeof Map === 'function' && new Map();

	/**
  * Update (and create if necessary) the ReactDOMComponent|ReactCompositeComponent-like
  * instance for a given preact component instance or DOM Node.
  *
  * @param {Component|Node} componentOrNode
  */
	function updateReactComponent(componentOrNode) {
		var newInstance = componentOrNode instanceof Node ? createReactDOMComponent(componentOrNode) : createReactCompositeComponent(componentOrNode);
		if (instanceMap.has(componentOrNode)) {
			var inst = instanceMap.get(componentOrNode);
			Object.assign(inst, newInstance);
			return inst;
		}
		instanceMap.set(componentOrNode, newInstance);
		return newInstance;
	}

	function nextRootKey(roots) {
		return '.' + Object.keys(roots).length;
	}

	/**
  * Find all root component instances rendered by preact in `node`'s children
  * and add them to the `roots` map.
  *
  * @param {DOMElement} node
  * @param {[key: string] => ReactDOMComponent|ReactCompositeComponent}
  */
	function findRoots(node, roots) {
		Array.from(node.childNodes).forEach(function (child) {
			if (child._component) {
				roots[nextRootKey(roots)] = updateReactComponent(child._component);
			} else {
				findRoots(child, roots);
			}
		});
	}

	/**
  * Create a bridge for exposing preact's component tree to React DevTools.
  *
  * It creates implementations of the interfaces that ReactDOM passes to
  * devtools to enable it to query the component tree and hook into component
  * updates.
  *
  * See https://github.com/facebook/react/blob/59ff7749eda0cd858d5ee568315bcba1be75a1ca/src/renderers/dom/ReactDOM.js
  * for how ReactDOM exports its internals for use by the devtools and
  * the `attachRenderer()` function in
  * https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/attachRenderer.js
  * for how the devtools consumes the resulting objects.
  */
	function createDevToolsBridge() {
		// The devtools has different paths for interacting with the renderers from
		// React Native, legacy React DOM and current React DOM.
		//
		// Here we emulate the interface for the current React DOM (v15+) lib.

		// ReactDOMComponentTree-like object
		var ComponentTree = {
			getNodeFromInstance: function getNodeFromInstance(instance) {
				return instance.node;
			},
			getClosestInstanceFromNode: function getClosestInstanceFromNode(node) {
				while (node && !node._component) {
					node = node.parentNode;
				}
				return node ? updateReactComponent(node._component) : null;
			}
		};

		// Map of root ID (the ID is unimportant) to component instance.
		var roots = {};
		findRoots(document.body, roots);

		// ReactMount-like object
		//
		// Used by devtools to discover the list of root component instances and get
		// notified when new root components are rendered.
		var Mount = {
			_instancesByReactRootID: roots,

			// Stub - React DevTools expects to find this method and replace it
			// with a wrapper in order to observe new root components being added
			_renderNewRootComponent: function _renderNewRootComponent() /* instance, ... */{}
		};

		// ReactReconciler-like object
		var Reconciler = {
			// Stubs - React DevTools expects to find these methods and replace them
			// with wrappers in order to observe components being mounted, updated and
			// unmounted
			mountComponent: function mountComponent() /* instance, ... */{},
			performUpdateIfNecessary: function performUpdateIfNecessary() /* instance, ... */{},
			receiveComponent: function receiveComponent() /* instance, ... */{},
			unmountComponent: function unmountComponent() /* instance, ... */{}
		};

		/** Notify devtools that a new component instance has been mounted into the DOM. */
		var componentAdded = function componentAdded(component) {
			var instance = updateReactComponent(component);
			if (isRootComponent(component)) {
				instance._rootID = nextRootKey(roots);
				roots[instance._rootID] = instance;
				Mount._renderNewRootComponent(instance);
			}
			visitNonCompositeChildren(instance, function (childInst) {
				childInst._inDevTools = true;
				Reconciler.mountComponent(childInst);
			});
			Reconciler.mountComponent(instance);
		};

		/** Notify devtools that a component has been updated with new props/state. */
		var componentUpdated = function componentUpdated(component) {
			var prevRenderedChildren = [];
			visitNonCompositeChildren(instanceMap.get(component), function (childInst) {
				prevRenderedChildren.push(childInst);
			});

			// Notify devtools about updates to this component and any non-composite
			// children
			var instance = updateReactComponent(component);
			Reconciler.receiveComponent(instance);
			visitNonCompositeChildren(instance, function (childInst) {
				if (!childInst._inDevTools) {
					// New DOM child component
					childInst._inDevTools = true;
					Reconciler.mountComponent(childInst);
				} else {
					// Updated DOM child component
					Reconciler.receiveComponent(childInst);
				}
			});

			// For any non-composite children that were removed by the latest render,
			// remove the corresponding ReactDOMComponent-like instances and notify
			// the devtools
			prevRenderedChildren.forEach(function (childInst) {
				if (!document.body.contains(childInst.node)) {
					instanceMap.delete(childInst.node);
					Reconciler.unmountComponent(childInst);
				}
			});
		};

		/** Notify devtools that a component has been unmounted from the DOM. */
		var componentRemoved = function componentRemoved(component) {
			var instance = updateReactComponent(component);
			visitNonCompositeChildren(function (childInst) {
				instanceMap.delete(childInst.node);
				Reconciler.unmountComponent(childInst);
			});
			Reconciler.unmountComponent(instance);
			instanceMap.delete(component);
			if (instance._rootID) {
				delete roots[instance._rootID];
			}
		};

		return {
			componentAdded: componentAdded,
			componentUpdated: componentUpdated,
			componentRemoved: componentRemoved,

			// Interfaces passed to devtools via __REACT_DEVTOOLS_GLOBAL_HOOK__.inject()
			ComponentTree: ComponentTree,
			Mount: Mount,
			Reconciler: Reconciler
		};
	}

	/**
  * Return `true` if a preact component is a top level component rendered by
  * `render()` into a container Element.
  */
	function isRootComponent(component) {
		// `_parentComponent` is actually `__u` after minification
		if (component._parentComponent || component.__u) {
			// Component with a composite parent
			return false;
		}
		if (component.base.parentElement && component.base.parentElement[ATTR_KEY]) {
			// Component with a parent DOM element rendered by Preact
			return false;
		}
		return true;
	}

	/**
  * Visit all child instances of a ReactCompositeComponent-like object that are
  * not composite components (ie. they represent DOM elements or text)
  *
  * @param {Component} component
  * @param {(Component) => void} visitor
  */
	function visitNonCompositeChildren(component, visitor) {
		if (component._renderedComponent) {
			if (!component._renderedComponent._component) {
				visitor(component._renderedComponent);
				visitNonCompositeChildren(component._renderedComponent, visitor);
			}
		} else if (component._renderedChildren) {
			component._renderedChildren.forEach(function (child) {
				visitor(child);
				if (!child._component) visitNonCompositeChildren(child, visitor);
			});
		}
	}

	/**
  * Create a bridge between the preact component tree and React's dev tools
  * and register it.
  *
  * After this function is called, the React Dev Tools should be able to detect
  * "React" on the page and show the component tree.
  *
  * This function hooks into preact VNode creation in order to expose functional
  * components correctly, so it should be called before the root component(s)
  * are rendered.
  *
  * Returns a cleanup function which unregisters the hooks.
  */
	function initDevTools() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
			// React DevTools are not installed
			return;
		}

		// Notify devtools when preact components are mounted, updated or unmounted
		var bridge = createDevToolsBridge();

		var nextAfterMount = preact.options.afterMount;
		preact.options.afterMount = function (component) {
			bridge.componentAdded(component);
			if (nextAfterMount) nextAfterMount(component);
		};

		var nextAfterUpdate = preact.options.afterUpdate;
		preact.options.afterUpdate = function (component) {
			bridge.componentUpdated(component);
			if (nextAfterUpdate) nextAfterUpdate(component);
		};

		var nextBeforeUnmount = preact.options.beforeUnmount;
		preact.options.beforeUnmount = function (component) {
			bridge.componentRemoved(component);
			if (nextBeforeUnmount) nextBeforeUnmount(component);
		};

		// Notify devtools about this instance of "React"
		__REACT_DEVTOOLS_GLOBAL_HOOK__.inject(bridge);

		return function () {
			preact.options.afterMount = nextAfterMount;
			preact.options.afterUpdate = nextAfterUpdate;
			preact.options.beforeUnmount = nextBeforeUnmount;
		};
	}

	initDevTools();
});
//# sourceMappingURL=devtools.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = __webpack_require__(5);

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadStringQueries() {
  window.budgetPortal = {
    stringQueries: _queryString2.default.parse(location.search) || {}
  };
}

exports.default = loadStringQueries();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + (typeof encodedURI === 'undefined' ? 'undefined' : _typeof(encodedURI)) + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _YearSelectContainer = __webpack_require__(15);

var _YearSelectContainer2 = _interopRequireDefault(_YearSelectContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function YearSelect() {
  var nodes = document.getElementsByClassName('YearSelect');
  var nodesArray = [].concat(_toConsumableArray(nodes));
  var search = window.budgetPortal.stringQueries.search;


  nodesArray.forEach(function (node, i) {
    var jsonData = JSON.parse(nodes[i].getAttribute('data-json')).data;

    (0, _preact.render)((0, _preact.h)(_YearSelectContainer2.default, { jsonData: jsonData, search: search }), nodes[i]);
  });
}

exports.default = YearSelect();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _YearSelectMarkup = __webpack_require__(16);

var _YearSelectMarkup2 = _interopRequireDefault(_YearSelectMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearSelectContainer = function (_Component) {
  _inherits(YearSelectContainer, _Component);

  function YearSelectContainer(props) {
    _classCallCheck(this, YearSelectContainer);

    var _this = _possibleConstructorReturn(this, (YearSelectContainer.__proto__ || Object.getPrototypeOf(YearSelectContainer)).call(this, props));

    _this.state = {
      open: false
    };

    _this.updateItem = _this.updateItem.bind(_this);
    return _this;
  }

  _createClass(YearSelectContainer, [{
    key: 'updateItem',
    value: function updateItem(key, value) {
      return this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_YearSelectMarkup2.default, {
        jsonData: this.props.jsonData,
        search: this.props.search,
        open: this.state.open,
        updateItem: this.updateItem
      });
    }
  }]);

  return YearSelectContainer;
}(_preact.Component);

exports.default = YearSelectContainer;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = YearSelectMarkup;

var _preact = __webpack_require__(0);

function YearSelectMarkup(_ref) {
  var jsonData = _ref.jsonData,
      open = _ref.open,
      updateItem = _ref.updateItem,
      search = _ref.search;

  var items = jsonData.map(function (data) {
    var Tag = data[2] === 'link' ? 'a' : 'span';
    var toggleOpen = function toggleOpen() {
      return updateItem('open', !open);
    };
    var linkWithQuery = search ? data[1] + '/?search=' + search : data[1];

    return (0, _preact.h)(
      'li',
      {
        className: 'YearSelect-item' + (data[2] === 'active' ? ' is-active' : ''),
        onClick: toggleOpen
      },
      (0, _preact.h)(
        Tag,
        { href: data[2] === 'active' ? null : linkWithQuery, className: 'YearSelect-link' },
        data[0]
      )
    );
  });

  return (0, _preact.h)(
    'div',
    { className: 'YearSelect-wrap' },
    (0, _preact.h)(
      'h2',
      { className: 'YearSelect-title' },
      'Show data for a financial year'
    ),
    (0, _preact.h)(
      'div',
      { className: 'YearSelect-content' },
      (0, _preact.h)(
        'ul',
        { className: 'YearSelect-bar' + (open ? ' is-open' : '') },
        items
      )
    )
  );
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _queryString = __webpack_require__(5);

var _queryString2 = _interopRequireDefault(_queryString);

var _SearchContainer = __webpack_require__(18);

var _SearchContainer2 = _interopRequireDefault(_SearchContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Search() {
  var nodes = document.getElementsByClassName('Search');
  var nodesArray = [].concat(_toConsumableArray(nodes));

  var _ref = _queryString2.default.parse(location.search) || {},
      search = _ref.search;

  if (nodesArray.length > 0) {
    nodesArray.forEach(function (node) {
      var selectedYear = node.getAttribute('data-year');
      (0, _preact.render)((0, _preact.h)(_SearchContainer2.default, { selectedYear: selectedYear, search: search }), node);
    });
  }
}

exports.default = Search();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _SearchMarkup = __webpack_require__(19);

var _SearchMarkup2 = _interopRequireDefault(_SearchMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchContainer = function (_Component) {
  _inherits(SearchContainer, _Component);

  function SearchContainer(props) {
    _classCallCheck(this, SearchContainer);

    var _this = _possibleConstructorReturn(this, (SearchContainer.__proto__ || Object.getPrototypeOf(SearchContainer)).call(this, props));

    _this.state = {
      keywords: _this.props.search || '',
      results: [],
      focus: null,
      loading: null,
      timeoutId: null,
      focusTimeout: null,
      count: null
    };

    _this.eventHandlers = {
      updateItem: _this.updateItem.bind(_this),
      initRequest: _this.initRequest.bind(_this),
      setFocus: _this.setFocus.bind(_this)
    };
    return _this;
  }

  _createClass(SearchContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.search) {
        this.initRequest(this.state.keywords);
      }
    }
  }, {
    key: 'setFocus',
    value: function setFocus(state) {
      var _this2 = this;

      if (state === false && this.state.focusTimeout === null) {
        var focusTimeout = setTimeout(function () {
          _this2.updateItem('focus', false);
          _this2.updateItem('focusTimeout', null);
        }, 500);

        this.setState({ focusTimeout: focusTimeout });
      }

      if (state === true) {
        if (this.state.focusTimeout !== null) {
          clearInterval(this.state.focusTimeout);
        }
        return this.updateItem('focus', true);
      }

      return null;
    }
  }, {
    key: 'updateItem',
    value: function updateItem(key, value) {
      return this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: 'sendRequest',
    value: function sendRequest(keyword) {
      var _this3 = this;

      var request = new Promise(function (resolve, reject) {
        fetch(keyword).then(function (response) {
          if (!response.ok) {
            reject(response);
          }

          response.json().then(function (data) {
            _this3.setState({ count: data.result.count });
            resolve(data.result.results);
          }).catch(function (err) {
            return reject(err);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });

      return request.then(function (array) {
        _this3.setState({ timeoutId: null });
        _this3.setState({ results: array });
        _this3.setState({ loading: false });
      }).catch(function (err) {
        _this3.setState({ loading: false });
        return new Error(err);
      });
    }
  }, {
    key: 'initRequest',
    value: function initRequest(keywords) {
      var _this4 = this;

      this.setState({ count: null });
      this.setState({ loading: true });
      this.setState({ keywords: keywords });

      if (this.state.keywords.length > 3) {
        if (this.state.timeoutId) {
          clearTimeout(this.state.timeoutId);
        }

        var url = 'https://treasurydata.openup.org.za/api/3/action/package_search?q=' + keywords + '&start=0&rows=4&fq=vocab_financial_years:' + this.props.selectedYear;
        var request = function request() {
          return _this4.sendRequest(url);
        };
        var newTimeoutId = setTimeout(request, 1000);
        this.setState({ timeoutId: newTimeoutId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_SearchMarkup2.default, {
        state: this.state,
        eventHandlers: this.eventHandlers,
        selectedYear: this.props.selectedYear
      });
    }
  }]);

  return SearchContainer;
}(_preact.Component);

exports.default = SearchContainer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchMarkup;

var _preact = __webpack_require__(0);

var _Form = __webpack_require__(20);

var _Form2 = _interopRequireDefault(_Form);

var _ResultsBox = __webpack_require__(22);

var _ResultsBox2 = _interopRequireDefault(_ResultsBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchMarkup(_ref) {
  var state = _ref.state,
      eventHandlers = _ref.eventHandlers,
      selectedYear = _ref.selectedYear;
  var loading = state.loading,
      focus = state.focus,
      keywords = state.keywords,
      results = state.results,
      count = state.count;


  return (0, _preact.h)(
    'div',
    { className: 'Search-wrap ' + (focus ? ' is-focused' : '') },
    (0, _preact.h)(_Form2.default, { eventHandlers: eventHandlers, keywords: keywords, selectedYear: selectedYear }),
    (0, _preact.h)(_ResultsBox2.default, { loading: loading, results: results, focus: focus, keywords: keywords, selectedYear: selectedYear, count: count })
  );
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;

var _preact = __webpack_require__(0);

var _Icon = __webpack_require__(21);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(_ref) {
  var eventHandlers = _ref.eventHandlers,
      keywords = _ref.keywords,
      selectedYear = _ref.selectedYear;
  var initRequest = eventHandlers.initRequest,
      setFocus = eventHandlers.setFocus;


  var updateKeyword = function updateKeyword(event) {
    return initRequest(event.target.value);
  };
  var addFocus = function addFocus() {
    return setFocus(true);
  };
  var removeFocus = function removeFocus() {
    return setFocus(false);
  };
  var searchUrl = '/' + selectedYear + '/search-result/';

  return (0, _preact.h)(
    'form',
    { className: 'Search-form', action: searchUrl, method: 'GET' },
    (0, _preact.h)('input', {
      name: 'search',
      className: 'Search-keywords',
      placeholder: 'Find departments',
      value: keywords,
      onInput: updateKeyword,
      onFocus: addFocus,
      onBlur: removeFocus,
      autoComplete: 'off'
    }),
    (0, _preact.h)(
      'div',
      { className: 'Search-action' },
      (0, _preact.h)(
        'button',
        { className: 'Search-button', type: 'submit', onClick: function onClick() {
            return console.log(searchUrl);
          } },
        (0, _preact.h)(_Icon2.default, null)
      )
    )
  );
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Icon;

var _preact = __webpack_require__(0);

function Icon() {
  return (0, _preact.h)(
    "svg",
    { className: "Search-icon", width: "18", height: "18", version: "1.2", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 99.9 100" },
    (0, _preact.h)(
      "title",
      null,
      "Search"
    ),
    (0, _preact.h)("path", { d: "M97.2 85.4L75.5 63.8l-.4-.3C79.5 57 82 49.3 82 41c0-22.6-18.3-41-41-41S0 18.3 0 41c0 22.6 18.3 41 41 41 8.3 0 16-2.5 22.5-6.7l.3.4 21.6 21.6c3.3 3.3 8.5 3.3 11.8 0 3.2-3.4 3.2-8.6 0-12zM41 67.7c-14.8 0-26.8-12-26.8-26.8 0-15 12-27 26.8-27s26.8 12 26.8 27c0 14.7-12 26.7-26.8 26.7z" })
  );
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResultsBox;

var _preact = __webpack_require__(0);

var _ResultsGroup = __webpack_require__(23);

var _ResultsGroup2 = _interopRequireDefault(_ResultsGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ResultsBox(_ref) {
  var loading = _ref.loading,
      results = _ref.results,
      focus = _ref.focus,
      keywords = _ref.keywords,
      selectedYear = _ref.selectedYear,
      count = _ref.count;

  return (0, _preact.h)(
    'div',
    { className: 'Search-results' + (keywords.length > 3 && focus ? ' is-open' : '') },
    loading === null ? null : (0, _preact.h)(_ResultsGroup2.default, { results: results, loading: loading, selectedYear: selectedYear, count: count })
  );
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResultsGroups;

var _preact = __webpack_require__(0);

var _Loading = __webpack_require__(24);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ResultsGroups(_ref) {
  var results = _ref.results,
      loading = _ref.loading,
      selectedYear = _ref.selectedYear,
      count = _ref.count;

  var buildList = function buildList() {
    if (results.length < 1) {
      return (0, _preact.h)(
        'div',
        null,
        'No results found'
      );
    }

    return (0, _preact.h)(
      'ul',
      { className: 'Search-list' },
      results.map(function (item) {
        var provSlugIndex = item.extras.findIndex(function (data) {
          return data.key === 'geographic_region_slug';
        });

        var nameSlugIndex = item.extras.findIndex(function (data) {
          return data.key === 'department_name_slug';
        });

        var provSlug = item.extras[provSlugIndex].value;
        var nameSlug = item.extras[nameSlugIndex].value;

        return (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'a',
            { className: 'Search-link', href: '/' + selectedYear + '/provincial/' + provSlug + '/departments/' + nameSlug },
            item.province[0],
            ' Department: ',
            item.extras[0].value
          )
        );
      })
    );
  };

  return (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
      'span',
      { className: 'Search-title' },
      'Suggested Departments',
      count ? ' (Showing 4 of ' + count + ')' : ''
    ),
    loading ? (0, _preact.h)(
      'ul',
      { className: 'Search-list' },
      (0, _preact.h)(_Loading2.default, null)
    ) : buildList()
  );
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loading;

var _preact = __webpack_require__(0);

function Loading() {
  return (0, _preact.h)(
    "div",
    { className: "Search-loading" },
    "Loading..."
  );
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _DeptSearchContainer = __webpack_require__(26);

var _DeptSearchContainer2 = _interopRequireDefault(_DeptSearchContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function DeptSearch() {
  var nodes = document.getElementsByClassName('DeptSearch');
  var nodesArray = [].concat(_toConsumableArray(nodes));
  var spheres = window.budgetPortal.stringQueries.spheres;


  if (nodesArray.length > 0) {
    nodesArray.forEach(function (node) {
      var nationalData = JSON.parse(node.getAttribute('data-national-json')).data;
      var provincialData = JSON.parse(node.getAttribute('data-provincial-json')).data;

      var jsonData = [_extends({}, nationalData, {
        name: 'National'
      })].concat(_toConsumableArray(provincialData));
      (0, _preact.render)((0, _preact.h)(_DeptSearchContainer2.default, { jsonData: jsonData, spheres: spheres }), node.parentNode, node);
    });
  }
}

exports.default = DeptSearch();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _fuse = __webpack_require__(27);

var _fuse2 = _interopRequireDefault(_fuse);

var _DeptSearchMarkup = __webpack_require__(29);

var _DeptSearchMarkup2 = _interopRequireDefault(_DeptSearchMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeptSearchContainer = function (_Component) {
  _inherits(DeptSearchContainer, _Component);

  function DeptSearchContainer(props) {
    _classCallCheck(this, DeptSearchContainer);

    var _this = _possibleConstructorReturn(this, (DeptSearchContainer.__proto__ || Object.getPrototypeOf(DeptSearchContainer)).call(this, props));

    _this.state = {
      keywords: '',
      province: null,
      spheres: _this.props.spheres || null,
      open: null,
      results: _this.props.jsonData
    };

    _this.eventHandlers = {
      updateFilter: _this.updateFilter.bind(_this),
      filterResults: _this.filterResults.bind(_this)
    };
    return _this;
  }

  _createClass(DeptSearchContainer, [{
    key: 'updateItem',
    value: function updateItem(key, value, parent) {
      if (parent) {
        return this.setState(_defineProperty({}, parent, _extends({}, this.state[parent], _defineProperty({}, key, value))));
      }

      return this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(filter, value) {
      if (this.state.open === filter) {
        this.setState({ open: null });
      } else {
        this.setState({ open: filter });
      }

      return this.setState(_defineProperty({}, filter, value));
    }
  }, {
    key: 'filterResults',
    value: function filterResults(keywords) {
      this.updateItem('keywords', keywords);

      if (keywords.length > 2) {
        var options = {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['name']
        };

        var jsonData = this.props.jsonData;
        var results = jsonData.map(function (group) {
          var items = new _fuse2.default(group.departments, options);
          return _extends({}, group, {
            departments: items.search(keywords)
          });
        });

        return this.setState({ results: results });
      }

      return this.setState({ results: this.props.jsonData });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_DeptSearchMarkup2.default, { state: this.state, eventHandlers: this.eventHandlers });
    }
  }]);

  return DeptSearchContainer;
}(_preact.Component);

exports.default = DeptSearchContainer;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Fuse.js v3.2.0 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["Fuse"] = factory();else root["Fuse"] = factory();
})(undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 8);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      };

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var bitapRegexSearch = __webpack_require__(5);
      var bitapSearch = __webpack_require__(7);
      var patternAlphabet = __webpack_require__(4);

      var Bitap = function () {
        function Bitap(pattern, _ref) {
          var _ref$location = _ref.location,
              location = _ref$location === undefined ? 0 : _ref$location,
              _ref$distance = _ref.distance,
              distance = _ref$distance === undefined ? 100 : _ref$distance,
              _ref$threshold = _ref.threshold,
              threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
              _ref$maxPatternLength = _ref.maxPatternLength,
              maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
              _ref$isCaseSensitive = _ref.isCaseSensitive,
              isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
              _ref$tokenSeparator = _ref.tokenSeparator,
              tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
              _ref$findAllMatches = _ref.findAllMatches,
              findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
              _ref$minMatchCharLeng = _ref.minMatchCharLength,
              minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

          _classCallCheck(this, Bitap);

          this.options = {
            location: location,
            distance: distance,
            threshold: threshold,
            maxPatternLength: maxPatternLength,
            isCaseSensitive: isCaseSensitive,
            tokenSeparator: tokenSeparator,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength
          };

          this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

          if (this.pattern.length <= maxPatternLength) {
            this.patternAlphabet = patternAlphabet(this.pattern);
          }
        }

        _createClass(Bitap, [{
          key: 'search',
          value: function search(text) {
            if (!this.options.isCaseSensitive) {
              text = text.toLowerCase();
            }

            // Exact match
            if (this.pattern === text) {
              return {
                isMatch: true,
                score: 0,
                matchedIndices: [[0, text.length - 1]]
              };
            }

            // When pattern length is greater than the machine word length, just do a a regex comparison
            var _options = this.options,
                maxPatternLength = _options.maxPatternLength,
                tokenSeparator = _options.tokenSeparator;

            if (this.pattern.length > maxPatternLength) {
              return bitapRegexSearch(text, this.pattern, tokenSeparator);
            }

            // Otherwise, use Bitap algorithm
            var _options2 = this.options,
                location = _options2.location,
                distance = _options2.distance,
                threshold = _options2.threshold,
                findAllMatches = _options2.findAllMatches,
                minMatchCharLength = _options2.minMatchCharLength;

            return bitapSearch(text, this.pattern, this.patternAlphabet, {
              location: location,
              distance: distance,
              threshold: threshold,
              findAllMatches: findAllMatches,
              minMatchCharLength: minMatchCharLength
            });
          }
        }]);

        return Bitap;
      }();

      // let x = new Bitap("od mn war", {})
      // let result = x.search("Old Man's War")
      // console.log(result)

      module.exports = Bitap;

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var isArray = __webpack_require__(0);

      var deepValue = function deepValue(obj, path, list) {
        if (!path) {
          // If there's no path left, we've gotten to the object we care about.
          list.push(obj);
        } else {
          var dotIndex = path.indexOf('.');
          var firstSegment = path;
          var remaining = null;

          if (dotIndex !== -1) {
            firstSegment = path.slice(0, dotIndex);
            remaining = path.slice(dotIndex + 1);
          }

          var value = obj[firstSegment];

          if (value !== null && value !== undefined) {
            if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
              list.push(value.toString());
            } else if (isArray(value)) {
              // Search each item in the array.
              for (var i = 0, len = value.length; i < len; i += 1) {
                deepValue(value[i], remaining, list);
              }
            } else if (remaining) {
              // An object. Recurse further.
              deepValue(value, remaining, list);
            }
          }
        }

        return list;
      };

      module.exports = function (obj, path) {
        return deepValue(obj, path, []);
      };

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = function () {
        var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        var matchedIndices = [];
        var start = -1;
        var end = -1;
        var i = 0;

        for (var len = matchmask.length; i < len; i += 1) {
          var match = matchmask[i];
          if (match && start === -1) {
            start = i;
          } else if (!match && start !== -1) {
            end = i - 1;
            if (end - start + 1 >= minMatchCharLength) {
              matchedIndices.push([start, end]);
            }
            start = -1;
          }
        }

        // (i-1 - start) + 1 => i - start
        if (matchmask[i - 1] && i - start >= minMatchCharLength) {
          matchedIndices.push([start, i - 1]);
        }

        return matchedIndices;
      };

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = function (pattern) {
        var mask = {};
        var len = pattern.length;

        for (var i = 0; i < len; i += 1) {
          mask[pattern.charAt(i)] = 0;
        }

        for (var _i = 0; _i < len; _i += 1) {
          mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
        }

        return mask;
      };

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

      module.exports = function (text, pattern) {
        var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

        var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
        var matches = text.match(regex);
        var isMatch = !!matches;
        var matchedIndices = [];

        if (isMatch) {
          for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
            var match = matches[i];
            matchedIndices.push([text.indexOf(match), match.length - 1]);
          }
        }

        return {
          // TODO: revisit this score
          score: isMatch ? 0.5 : 1,
          isMatch: isMatch,
          matchedIndices: matchedIndices
        };
      };

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = function (pattern, _ref) {
        var _ref$errors = _ref.errors,
            errors = _ref$errors === undefined ? 0 : _ref$errors,
            _ref$currentLocation = _ref.currentLocation,
            currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
            _ref$expectedLocation = _ref.expectedLocation,
            expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
            _ref$distance = _ref.distance,
            distance = _ref$distance === undefined ? 100 : _ref$distance;

        var accuracy = errors / pattern.length;
        var proximity = Math.abs(expectedLocation - currentLocation);

        if (!distance) {
          // Dodge divide by zero error.
          return proximity ? 1.0 : accuracy;
        }

        return accuracy + proximity / distance;
      };

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var bitapScore = __webpack_require__(6);
      var matchedIndices = __webpack_require__(3);

      module.exports = function (text, pattern, patternAlphabet, _ref) {
        var _ref$location = _ref.location,
            location = _ref$location === undefined ? 0 : _ref$location,
            _ref$distance = _ref.distance,
            distance = _ref$distance === undefined ? 100 : _ref$distance,
            _ref$threshold = _ref.threshold,
            threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
            _ref$findAllMatches = _ref.findAllMatches,
            findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
            _ref$minMatchCharLeng = _ref.minMatchCharLength,
            minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

        var expectedLocation = location;
        // Set starting location at beginning text and initialize the alphabet.
        var textLen = text.length;
        // Highest score beyond which we give up.
        var currentThreshold = threshold;
        // Is there a nearby exact match? (speedup)
        var bestLocation = text.indexOf(pattern, expectedLocation);

        var patternLen = pattern.length;

        // a mask of the matches
        var matchMask = [];
        for (var i = 0; i < textLen; i += 1) {
          matchMask[i] = 0;
        }

        if (bestLocation !== -1) {
          var score = bitapScore(pattern, {
            errors: 0,
            currentLocation: bestLocation,
            expectedLocation: expectedLocation,
            distance: distance
          });
          currentThreshold = Math.min(score, currentThreshold);

          // What about in the other direction? (speed up)
          bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

          if (bestLocation !== -1) {
            var _score = bitapScore(pattern, {
              errors: 0,
              currentLocation: bestLocation,
              expectedLocation: expectedLocation,
              distance: distance
            });
            currentThreshold = Math.min(_score, currentThreshold);
          }
        }

        // Reset the best location
        bestLocation = -1;

        var lastBitArr = [];
        var finalScore = 1;
        var binMax = patternLen + textLen;

        var mask = 1 << patternLen - 1;

        for (var _i = 0; _i < patternLen; _i += 1) {
          // Scan for the best match; each iteration allows for one more error.
          // Run a binary search to determine how far from the match location we can stray
          // at this error level.
          var binMin = 0;
          var binMid = binMax;

          while (binMin < binMid) {
            var _score3 = bitapScore(pattern, {
              errors: _i,
              currentLocation: expectedLocation + binMid,
              expectedLocation: expectedLocation,
              distance: distance
            });

            if (_score3 <= currentThreshold) {
              binMin = binMid;
            } else {
              binMax = binMid;
            }

            binMid = Math.floor((binMax - binMin) / 2 + binMin);
          }

          // Use the result from this iteration as the maximum for the next.
          binMax = binMid;

          var start = Math.max(1, expectedLocation - binMid + 1);
          var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

          // Initialize the bit array
          var bitArr = Array(finish + 2);

          bitArr[finish + 1] = (1 << _i) - 1;

          for (var j = finish; j >= start; j -= 1) {
            var currentLocation = j - 1;
            var charMatch = patternAlphabet[text.charAt(currentLocation)];

            if (charMatch) {
              matchMask[currentLocation] = 1;
            }

            // First pass: exact match
            bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

            // Subsequent passes: fuzzy match
            if (_i !== 0) {
              bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
            }

            if (bitArr[j] & mask) {
              finalScore = bitapScore(pattern, {
                errors: _i,
                currentLocation: currentLocation,
                expectedLocation: expectedLocation,
                distance: distance
              });

              // This match will almost certainly be better than any existing match.
              // But check anyway.
              if (finalScore <= currentThreshold) {
                // Indeed it is
                currentThreshold = finalScore;
                bestLocation = currentLocation;

                // Already passed `loc`, downhill from here on in.
                if (bestLocation <= expectedLocation) {
                  break;
                }

                // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
                start = Math.max(1, 2 * expectedLocation - bestLocation);
              }
            }
          }

          // No hope for a (better) match at greater error levels.
          var _score2 = bitapScore(pattern, {
            errors: _i + 1,
            currentLocation: expectedLocation,
            expectedLocation: expectedLocation,
            distance: distance
          });

          if (_score2 > currentThreshold) {
            break;
          }

          lastBitArr = bitArr;
        }

        // Count exact matches (those with a score of 0) to be "almost" exact
        return {
          isMatch: bestLocation >= 0,
          score: finalScore === 0 ? 0.001 : finalScore,
          matchedIndices: matchedIndices(matchMask, minMatchCharLength)
        };
      };

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Bitap = __webpack_require__(1);
      var deepValue = __webpack_require__(2);
      var isArray = __webpack_require__(0);

      var Fuse = function () {
        function Fuse(list, _ref) {
          var _ref$location = _ref.location,
              location = _ref$location === undefined ? 0 : _ref$location,
              _ref$distance = _ref.distance,
              distance = _ref$distance === undefined ? 100 : _ref$distance,
              _ref$threshold = _ref.threshold,
              threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
              _ref$maxPatternLength = _ref.maxPatternLength,
              maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
              _ref$caseSensitive = _ref.caseSensitive,
              caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
              _ref$tokenSeparator = _ref.tokenSeparator,
              tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
              _ref$findAllMatches = _ref.findAllMatches,
              findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
              _ref$minMatchCharLeng = _ref.minMatchCharLength,
              minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
              _ref$id = _ref.id,
              id = _ref$id === undefined ? null : _ref$id,
              _ref$keys = _ref.keys,
              keys = _ref$keys === undefined ? [] : _ref$keys,
              _ref$shouldSort = _ref.shouldSort,
              shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
              _ref$getFn = _ref.getFn,
              getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
              _ref$sortFn = _ref.sortFn,
              sortFn = _ref$sortFn === undefined ? function (a, b) {
            return a.score - b.score;
          } : _ref$sortFn,
              _ref$tokenize = _ref.tokenize,
              tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
              _ref$matchAllTokens = _ref.matchAllTokens,
              matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
              _ref$includeMatches = _ref.includeMatches,
              includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
              _ref$includeScore = _ref.includeScore,
              includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
              _ref$verbose = _ref.verbose,
              verbose = _ref$verbose === undefined ? false : _ref$verbose;

          _classCallCheck(this, Fuse);

          this.options = {
            location: location,
            distance: distance,
            threshold: threshold,
            maxPatternLength: maxPatternLength,
            isCaseSensitive: caseSensitive,
            tokenSeparator: tokenSeparator,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            id: id,
            keys: keys,
            includeMatches: includeMatches,
            includeScore: includeScore,
            shouldSort: shouldSort,
            getFn: getFn,
            sortFn: sortFn,
            verbose: verbose,
            tokenize: tokenize,
            matchAllTokens: matchAllTokens
          };

          this.setCollection(list);
        }

        _createClass(Fuse, [{
          key: 'setCollection',
          value: function setCollection(list) {
            this.list = list;
            return list;
          }
        }, {
          key: 'search',
          value: function search(pattern) {
            this._log('---------\nSearch pattern: "' + pattern + '"');

            var _prepareSearchers2 = this._prepareSearchers(pattern),
                tokenSearchers = _prepareSearchers2.tokenSearchers,
                fullSearcher = _prepareSearchers2.fullSearcher;

            var _search2 = this._search(tokenSearchers, fullSearcher),
                weights = _search2.weights,
                results = _search2.results;

            this._computeScore(weights, results);

            if (this.options.shouldSort) {
              this._sort(results);
            }

            return this._format(results);
          }
        }, {
          key: '_prepareSearchers',
          value: function _prepareSearchers() {
            var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var tokenSearchers = [];

            if (this.options.tokenize) {
              // Tokenize on the separator
              var tokens = pattern.split(this.options.tokenSeparator);
              for (var i = 0, len = tokens.length; i < len; i += 1) {
                tokenSearchers.push(new Bitap(tokens[i], this.options));
              }
            }

            var fullSearcher = new Bitap(pattern, this.options);

            return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
          }
        }, {
          key: '_search',
          value: function _search() {
            var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var fullSearcher = arguments[1];

            var list = this.list;
            var resultMap = {};
            var results = [];

            // Check the first item in the list, if it's a string, then we assume
            // that every item in the list is also a string, and thus it's a flattened array.
            if (typeof list[0] === 'string') {
              // Iterate over every item
              for (var i = 0, len = list.length; i < len; i += 1) {
                this._analyze({
                  key: '',
                  value: list[i],
                  record: i,
                  index: i
                }, {
                  resultMap: resultMap,
                  results: results,
                  tokenSearchers: tokenSearchers,
                  fullSearcher: fullSearcher
                });
              }

              return { weights: null, results: results };
            }

            // Otherwise, the first item is an Object (hopefully), and thus the searching
            // is done on the values of the keys of each item.
            var weights = {};
            for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
              var item = list[_i];
              // Iterate over every key
              for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
                var key = this.options.keys[j];
                if (typeof key !== 'string') {
                  weights[key.name] = {
                    weight: 1 - key.weight || 1
                  };
                  if (key.weight <= 0 || key.weight > 1) {
                    throw new Error('Key weight has to be > 0 and <= 1');
                  }
                  key = key.name;
                } else {
                  weights[key] = {
                    weight: 1
                  };
                }

                this._analyze({
                  key: key,
                  value: this.options.getFn(item, key),
                  record: item,
                  index: _i
                }, {
                  resultMap: resultMap,
                  results: results,
                  tokenSearchers: tokenSearchers,
                  fullSearcher: fullSearcher
                });
              }
            }

            return { weights: weights, results: results };
          }
        }, {
          key: '_analyze',
          value: function _analyze(_ref2, _ref3) {
            var key = _ref2.key,
                _ref2$arrayIndex = _ref2.arrayIndex,
                arrayIndex = _ref2$arrayIndex === undefined ? -1 : _ref2$arrayIndex,
                value = _ref2.value,
                record = _ref2.record,
                index = _ref2.index;
            var _ref3$tokenSearchers = _ref3.tokenSearchers,
                tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
                _ref3$fullSearcher = _ref3.fullSearcher,
                fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
                _ref3$resultMap = _ref3.resultMap,
                resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
                _ref3$results = _ref3.results,
                results = _ref3$results === undefined ? [] : _ref3$results;

            // Check if the texvaluet can be searched
            if (value === undefined || value === null) {
              return;
            }

            var exists = false;
            var averageScore = -1;
            var numTextMatches = 0;

            if (typeof value === 'string') {
              this._log('\nKey: ' + (key === '' ? '-' : key));

              var mainSearchResult = fullSearcher.search(value);
              this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

              if (this.options.tokenize) {
                var words = value.split(this.options.tokenSeparator);
                var scores = [];

                for (var i = 0; i < tokenSearchers.length; i += 1) {
                  var tokenSearcher = tokenSearchers[i];

                  this._log('\nPattern: "' + tokenSearcher.pattern + '"');

                  // let tokenScores = []
                  var hasMatchInText = false;

                  for (var j = 0; j < words.length; j += 1) {
                    var word = words[j];
                    var tokenSearchResult = tokenSearcher.search(word);
                    var obj = {};
                    if (tokenSearchResult.isMatch) {
                      obj[word] = tokenSearchResult.score;
                      exists = true;
                      hasMatchInText = true;
                      scores.push(tokenSearchResult.score);
                    } else {
                      obj[word] = 1;
                      if (!this.options.matchAllTokens) {
                        scores.push(1);
                      }
                    }
                    this._log('Token: "' + word + '", score: ' + obj[word]);
                    // tokenScores.push(obj)
                  }

                  if (hasMatchInText) {
                    numTextMatches += 1;
                  }
                }

                averageScore = scores[0];
                var scoresLen = scores.length;
                for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
                  averageScore += scores[_i2];
                }
                averageScore = averageScore / scoresLen;

                this._log('Token score average:', averageScore);
              }

              var finalScore = mainSearchResult.score;
              if (averageScore > -1) {
                finalScore = (finalScore + averageScore) / 2;
              }

              this._log('Score average:', finalScore);

              var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

              this._log('\nCheck Matches: ' + checkTextMatches);

              // If a match is found, add the item to <rawResults>, including its score
              if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
                // Check if the item already exists in our results
                var existingResult = resultMap[index];
                if (existingResult) {
                  // Use the lowest score
                  // existingResult.score, bitapResult.score
                  existingResult.output.push({
                    key: key,
                    arrayIndex: arrayIndex,
                    value: value,
                    score: finalScore,
                    matchedIndices: mainSearchResult.matchedIndices
                  });
                } else {
                  // Add it to the raw result list
                  resultMap[index] = {
                    item: record,
                    output: [{
                      key: key,
                      arrayIndex: arrayIndex,
                      value: value,
                      score: finalScore,
                      matchedIndices: mainSearchResult.matchedIndices
                    }]
                  };

                  results.push(resultMap[index]);
                }
              }
            } else if (isArray(value)) {
              for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
                this._analyze({
                  key: key,
                  arrayIndex: _i3,
                  value: value[_i3],
                  record: record,
                  index: index
                }, {
                  resultMap: resultMap,
                  results: results,
                  tokenSearchers: tokenSearchers,
                  fullSearcher: fullSearcher
                });
              }
            }
          }
        }, {
          key: '_computeScore',
          value: function _computeScore(weights, results) {
            this._log('\n\nComputing score:\n');

            for (var i = 0, len = results.length; i < len; i += 1) {
              var output = results[i].output;
              var scoreLen = output.length;

              var totalScore = 0;
              var bestScore = 1;

              for (var j = 0; j < scoreLen; j += 1) {
                var weight = weights ? weights[output[j].key].weight : 1;
                var score = weight === 1 ? output[j].score : output[j].score || 0.001;
                var nScore = score * weight;

                if (weight !== 1) {
                  bestScore = Math.min(bestScore, nScore);
                } else {
                  output[j].nScore = nScore;
                  totalScore += nScore;
                }
              }

              results[i].score = bestScore === 1 ? totalScore / scoreLen : bestScore;

              this._log(results[i]);
            }
          }
        }, {
          key: '_sort',
          value: function _sort(results) {
            this._log('\n\nSorting....');
            results.sort(this.options.sortFn);
          }
        }, {
          key: '_format',
          value: function _format(results) {
            var finalOutput = [];

            this._log('\n\nOutput:\n\n', JSON.stringify(results));

            var transformers = [];

            if (this.options.includeMatches) {
              transformers.push(function (result, data) {
                var output = result.output;
                data.matches = [];

                for (var i = 0, len = output.length; i < len; i += 1) {
                  var item = output[i];

                  if (item.matchedIndices.length === 0) {
                    continue;
                  }

                  var obj = {
                    indices: item.matchedIndices,
                    value: item.value
                  };
                  if (item.key) {
                    obj.key = item.key;
                  }
                  if (item.hasOwnProperty('arrayIndex') && item.arrayIndex > -1) {
                    obj.arrayIndex = item.arrayIndex;
                  }
                  data.matches.push(obj);
                }
              });
            }

            if (this.options.includeScore) {
              transformers.push(function (result, data) {
                data.score = result.score;
              });
            }

            for (var i = 0, len = results.length; i < len; i += 1) {
              var result = results[i];

              if (this.options.id) {
                result.item = this.options.getFn(result.item, this.options.id)[0];
              }

              if (!transformers.length) {
                finalOutput.push(result.item);
                continue;
              }

              var data = {
                item: result.item
              };

              for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
                transformers[j](result, data);
              }

              finalOutput.push(data);
            }

            return finalOutput;
          }
        }, {
          key: '_log',
          value: function _log() {
            if (this.options.verbose) {
              var _console;

              (_console = console).log.apply(_console, arguments);
            }
          }
        }]);

        return Fuse;
      }();

      module.exports = Fuse;

      /***/
    }]
    /******/)
  );
});
//# sourceMappingURL=fuse.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptSearchMarkup;

var _preact = __webpack_require__(0);

var _Form = __webpack_require__(30);

var _Form2 = _interopRequireDefault(_Form);

var _Results = __webpack_require__(36);

var _Results2 = _interopRequireDefault(_Results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeptSearchMarkup(_ref) {
  var state = _ref.state,
      eventHandlers = _ref.eventHandlers;

  return (0, _preact.h)(
    'div',
    { className: 'DeptSearch-wrap' },
    (0, _preact.h)(
      'h3',
      { className: 'u-sReadOnly' },
      'Filters'
    ),
    (0, _preact.h)(
      'ul',
      { className: 'DeptSearch-list' },
      (0, _preact.h)(
        'li',
        null,
        (0, _preact.h)(_Form2.default, { state: state, eventHandlers: eventHandlers })
      )
    ),
    (0, _preact.h)(
      'h3',
      { className: 'u-sReadOnly' },
      'Results'
    ),
    (0, _preact.h)(_Results2.default, { state: state })
  );
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;

var _preact = __webpack_require__(0);

var _Select = __webpack_require__(31);

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(_ref) {
  var state = _ref.state,
      eventHandlers = _ref.eventHandlers;

  var provinces = [{
    title: 'All Provinces',
    value: null
  }, {
    title: 'Eastern Cape',
    value: 'eastern-cape'
  }, {
    title: 'Free State',
    value: 'free-state'
  }, {
    title: 'Gauteng',
    value: 'gauteng'
  }, {
    title: 'KwaZulu-Natal',
    value: 'kwazulu-natal'
  }, {
    title: 'Limpopo',
    value: 'limpopo'
  }, {
    title: 'Mpumalanga',
    value: 'mpumalanga'
  }, {
    title: 'North West',
    value: 'north-west'
  }, {
    title: 'Northern Cape',
    value: 'northern-cape'
  }, {
    title: 'Western Cape',
    value: 'western-cape'
  }];

  var spheres = [{
    title: 'All Spheres',
    value: null
  }, {
    title: 'National',
    value: 'national'
  }, {
    title: 'Provincial',
    value: 'provincial'
  }];

  var updateResults = function updateResults(event) {
    return eventHandlers.filterResults(event.target.value);
  };
  var updateFilter = eventHandlers.updateFilter;

  var provinceFilter = (0, _preact.h)(
    'div',
    { className: 'DeptSearch-filterGroup' },
    (0, _preact.h)(
      'span',
      { className: 'DeptSearch-divider' },
      'in'
    ),
    (0, _preact.h)(_Select2.default, {
      update: updateFilter,
      items: provinces,
      filter: 'province',
      state: state.province,
      open: state.open
    })
  );

  return (0, _preact.h)(
    'div',
    { className: 'DeptSearch-form' },
    (0, _preact.h)('input', {
      value: state.keywords,
      className: 'DeptSearch-keywords',
      placeholder: 'Find a department',
      onInput: updateResults
    }),
    (0, _preact.h)(
      'div',
      { className: 'DeptSearch-filterGroup' },
      (0, _preact.h)(
        'span',
        { className: 'DeptSearch-divider' },
        'in'
      ),
      (0, _preact.h)(_Select2.default, {
        update: updateFilter,
        items: spheres,
        filter: 'spheres',
        state: state.spheres,
        open: state.open
      })
    ),
    state.spheres === 'provincial' ? provinceFilter : null
  );
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Select;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(32);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Select(_ref) {
  var items = _ref.items,
      state = _ref.state,
      update = _ref.update,
      open = _ref.open,
      filter = _ref.filter;

  var list = items.map(function (item) {
    var updateItem = function updateItem() {
      return update(filter, item.value);
    };

    return (0, _preact.h)(
      'li',
      { className: 'DeptSearch-item' + (item.value === state ? ' is-active' : '') },
      (0, _preact.h)(
        'label',
        {
          htmlFor: 'filter-' + filter + '-' + item.value,
          className: 'DeptSearch-label'
        },
        (0, _preact.h)('input', {
          className: 'DeptSearch-radio',
          type: 'radio',
          value: item.value,
          name: 'filter-' + filter,
          id: 'filter-' + filter + '-' + item.value,
          onClick: updateItem
        }),
        item.title
      )
    );
  });

  return (0, _preact.h)(
    'div',
    { className: 'DeptSearch-selectWrap' },
    (0, _preact.h)(
      'ul',
      { className: 'DeptSearch-select' + (filter === open ? ' is-open' : '') },
      list
    )
  );
}

Select.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.bool,
    value: _propTypes2.default.string
  })).isRequired,
  state: _propTypes2.default.shape({
    open: _propTypes2.default.bool,
    value: _propTypes2.default.string
  }).isRequired,
  action: _propTypes2.default.func.isRequired,
  filter: _propTypes2.default.string.isRequired
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(33)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(35)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(7);
var assign = __webpack_require__(6);

var ReactPropTypesSecret = __webpack_require__(4);
var checkPropTypes = __webpack_require__(34);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(3);
  var warning = __webpack_require__(7);
  var ReactPropTypesSecret = __webpack_require__(4);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(4);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Results;

var _preact = __webpack_require__(0);

function Results(_ref) {
  var state = _ref.state;
  var results = state.results,
      province = state.province,
      spheres = state.spheres;


  var content = results.map(function (group, i) {
    if ((province === null || province === group.slug) && !(i === 0 && spheres === 'provincial') && !(i > 0 && spheres === 'national')) {
      if (group.departments.length > 0) {
        return (0, _preact.h)(
          'li',
          { className: 'DeptSearch-group' },
          (0, _preact.h)(
            'h4',
            { className: 'DeptSearch-title' },
            group.name,
            ' Departments'
          ),
          (0, _preact.h)(
            'ul',
            { className: 'DeptSearch-results' },
            group.departments.map(function (link) {
              return (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { className: 'DeptSearch-link', href: link.url_path },
                  link.name
                )
              );
            })
          )
        );
      }

      return (0, _preact.h)(
        'div',
        { className: 'DeptSearch-group DeptSearch-group--blank' },
        (0, _preact.h)(
          'div',
          { className: 'DeptSearch-title' },
          group.name
        ),
        (0, _preact.h)(
          'div',
          { className: 'DeptSearch-link' },
          'No Results Found'
        )
      );
    }

    return null;
  });

  return (0, _preact.h)(
    'div',
    { className: 'DeptSearch-results' },
    content
  );
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _SearchResultContainer = __webpack_require__(38);

var _SearchResultContainer2 = _interopRequireDefault(_SearchResultContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function SearchResult() {
  var nodes = document.getElementsByClassName('SearchResult');
  var nodesArray = [].concat(_toConsumableArray(nodes));
  var search = window.budgetPortal.stringQueries.search;


  if (nodesArray.length > 0) {
    nodesArray.forEach(function (node) {
      var selectedYear = node.getAttribute('data-year');
      (0, _preact.render)((0, _preact.h)(_SearchResultContainer2.default, { selectedYear: selectedYear, search: search }), node);
    });
  }
}

exports.default = SearchResult();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _SearchResultMarkup = __webpack_require__(39);

var _SearchResultMarkup2 = _interopRequireDefault(_SearchResultMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResultsContainer = function (_Component) {
  _inherits(SearchResultsContainer, _Component);

  function SearchResultsContainer(props) {
    _classCallCheck(this, SearchResultsContainer);

    var _this = _possibleConstructorReturn(this, (SearchResultsContainer.__proto__ || Object.getPrototypeOf(SearchResultsContainer)).call(this, props));

    _this.state = {
      results: [],
      count: null,
      shown: 5,
      province: {
        value: null,
        open: false
      }
    };

    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.changeShown = _this.changeShown.bind(_this);
    return _this;
  }

  _createClass(SearchResultsContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var url = 'https://treasurydata.openup.org.za/api/3/action/package_search?q=' + this.props.search + '&start=0&rows=' + this.state.shown + '&fq=vocab_financial_years:' + this.props.selectedYear;

      var request = new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
          if (!response.ok) {
            reject(response);
          }

          response.json().then(function (data) {
            _this2.setState({ count: data.result.count });
            resolve(data.result.results);
          }).catch(function (err) {
            return reject(err);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });

      request.then(function (array) {
        return _this2.setState({ results: array });
      }).catch(function (err) {
        return new Error(err);
      });
    }
  }, {
    key: 'updateItem',
    value: function updateItem(key, value, parent) {
      if (parent) {
        return this.setState(_defineProperty({}, parent, _extends({}, this.state[parent], _defineProperty({}, key, value))));
      }

      return this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(filter, value) {
      if (this.state[filter].open) {
        return this.setState(_defineProperty({}, filter, _extends({}, this.state[filter], {
          value: value,
          open: false
        })));
      }

      return this.updateItem('open', true, [filter]);
    }
  }, {
    key: 'changeShown',
    value: function changeShown(value) {
      var _this3 = this;

      var realValue = value > this.state.count ? this.state.count : value;
      this.setState({ shown: realValue });

      var url = 'https://treasurydata.openup.org.za/api/3/action/package_search?q=' + this.props.search + '&start=0&rows=' + this.state.shown + '&fq=vocab_financial_years:' + this.props.selectedYear;

      var request = new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
          if (!response.ok) {
            reject(response);
          }

          response.json().then(function (data) {
            _this3.setState({ count: data.result.count });
            resolve(data.result.results);
          }).catch(function (err) {
            return reject(err);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });

      request.then(function (array) {
        return _this3.setState({ results: array });
      }).catch(function (err) {
        return new Error(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_SearchResultMarkup2.default, { state: this.state, count: this.state.count, search: this.props.search, selectedYear: this.props.selectedYear, updateFilter: this.updateFilter, shown: this.state.shown, changeShown: this.changeShown });
    }
  }]);

  return SearchResultsContainer;
}(_preact.Component);

exports.default = SearchResultsContainer;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchResultMarkup;

var _preact = __webpack_require__(0);

var _Form = __webpack_require__(40);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchResultMarkup(_ref) {
  var count = _ref.count,
      changeShown = _ref.changeShown,
      state = _ref.state,
      search = _ref.search,
      selectedYear = _ref.selectedYear,
      updateFilter = _ref.updateFilter,
      shown = _ref.shown;
  var results = state.results;

  var departments = results.map(function (item) {
    var provSlugIndex = item.extras.findIndex(function (data) {
      return data.key === 'geographic_region_slug';
    });

    var nameSlugIndex = item.extras.findIndex(function (data) {
      return data.key === 'department_name_slug';
    });

    var provSlug = item.extras[provSlugIndex].value;
    var nameSlug = item.extras[nameSlugIndex].value;

    if (state.province.value === null || state.province.value === provSlug) {
      return (0, _preact.h)(
        'a',
        { href: '/' + selectedYear + '/provincial/' + provSlug + '/departments/' + nameSlug, className: 'SearchResult-link' },
        item.province[0],
        ' Department: ',
        item.extras[0].value
      );
    }

    return null;
  });

  var extra = (0, _preact.h)(
    'span',
    { className: 'SearchResult-countWrap' },
    (0, _preact.h)(
      'span',
      null,
      'Showing '
    ),
    (0, _preact.h)('input', {
      className: 'SearchResult-count',
      type: 'number',
      max: count,
      value: shown,
      onInput: function onInput(event) {
        return changeShown(event.target.value);
      }
    }),
    (0, _preact.h)(
      'span',
      null,
      ' of ',
      count
    )
  );

  return (0, _preact.h)(
    'div',
    { className: 'SearchResult-wrap' },
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-heading' },
      'Search result for "',
      search,
      '" in Departments'
    ),
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-formWrap' },
      (0, _preact.h)(_Form2.default, { state: state, updateFilter: updateFilter })
    ),
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-group' },
      (0, _preact.h)(
        'div',
        { className: 'SearchResult-title' },
        'Suggested Departments',
        count ? extra : ''
      ),
      (0, _preact.h)(
        'div',
        { className: 'SearchResult-list' },
        departments
      )
    )
  );
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Form;

var _preact = __webpack_require__(0);

var _Select = __webpack_require__(41);

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(_ref) {
  var state = _ref.state,
      updateFilter = _ref.updateFilter;

  var items = [{
    title: 'All Provinces',
    value: null
  }, {
    title: 'Eastern Cape',
    value: 'eastern-cape'
  }, {
    title: 'Free State',
    value: 'free-state'
  }, {
    title: 'Gauteng',
    value: 'gauteng'
  }, {
    title: 'KwaZulu-Natal',
    value: 'kwazulu-natal'
  }, {
    title: 'Limpopo',
    value: 'limpopo'
  }, {
    title: 'Mpumalanga',
    value: 'mpumalanga'
  }, {
    title: 'North West',
    value: 'north-west'
  }, {
    title: 'Northern Cape',
    value: 'northern-cape'
  }, {
    title: 'Western Cape',
    value: 'western-cape'
  }];

  return (0, _preact.h)(
    'div',
    { className: 'SearchResult-form' },
    (0, _preact.h)(_Select2.default, _extends({ items: items, updateFilter: updateFilter }, { state: state.province }))
  );
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Select;

var _preact = __webpack_require__(0);

function Select(_ref) {
  var items = _ref.items,
      state = _ref.state,
      updateFilter = _ref.updateFilter;

  var list = items.map(function (item) {
    var updateProvince = function updateProvince() {
      return updateFilter('province', item.value);
    };

    return (0, _preact.h)(
      'li',
      {
        className: 'SearchResult-item' + (item.value === state.value ? ' is-active' : ''),
        onClick: updateProvince
      },
      (0, _preact.h)('input', { className: 'SearchResult-radio', type: 'radio' }),
      (0, _preact.h)(
        'label',
        { className: 'SearchResult-label' },
        item.title
      )
    );
  });

  return (0, _preact.h)(
    'div',
    { className: 'SearchResult-selectWrap' },
    (0, _preact.h)(
      'ul',
      { className: 'SearchResult-select' + (state.open ? ' is-open' : '') },
      list
    )
  );
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Intro() {
  var nodes = document.getElementsByClassName('Intro');
  var nodesArray = [].concat(_toConsumableArray(nodes));

  nodesArray.forEach(function (node, i) {
    var trigger = nodes[i].getElementsByClassName('js-alertTrigger')[0];
    var alert = nodes[i].getElementsByClassName('js-alert')[0];
    var close = nodes[i].getElementsByClassName('js-close')[0];

    var displayAlert = function displayAlert() {
      alert.classList.add('is-active');
    };

    var removeAlert = function removeAlert(event) {
      alert.classList.remove('is-active');
    };

    console.log(close);
    trigger.addEventListener('click', displayAlert);
    close.addEventListener('click', removeAlert);
  });
}

exports.default = Intro();

/***/ })
/******/ ]);
//# sourceMappingURL=scripts.2de2929b649e348afa1e.js.map