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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
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

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
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

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
	for (var i in props) {
		obj[i] = props[i];
	}return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
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

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
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

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
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


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = decodeHtmlEntities;
function decodeHtmlEntities(input) {
  var element = document.createElement('div');
  element.innerHTML = input;

  return element.childNodes.length === 0 ? '' : element.childNodes[0].nodeValue;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var keys = __webpack_require__(61);
var foreach = __webpack_require__(63);
var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function isFunction(fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
		/* eslint-disable no-unused-vars, no-restricted-syntax */
		for (var _ in obj) {
			return false;
		}
		/* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) {
		/* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function defineProperty(object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function defineProperties(object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PseudoSelect;

var _preact = __webpack_require__(0);

function PseudoSelect(props) {
  var open = props.open,
      items = props.items,
      loading = props.loading,
      changeAction = props.changeAction,
      name = props.name,
      selected = props.selected;


  var keys = Object.keys(items);
  var radioChange = function radioChange(event) {
    return changeAction(event.target.value);
  };

  var renderList = keys.map(function (key, index) {
    var id = 'pseudo-select-' + name + '-' + index;

    return (0, _preact.h)(
      'li',
      { className: 'PseudoSelect-item' + (selected === items[key] ? ' is-active' : '') },
      (0, _preact.h)(
        'label',
        { className: 'PseudoSelect-label', htmlFor: id },
        (0, _preact.h)('input', _extends({ id: id, name: name }, {
          value: items[key],
          type: 'radio',
          checked: selected === items[key],
          onClick: radioChange,
          className: 'PseudoSelect-radio'
        })),
        (0, _preact.h)(
          'span',
          { className: 'PseudoSelect-text' },
          key
        )
      )
    );
  });

  return (0, _preact.h)(
    'div',
    { className: 'PseudoSelect' },
    (0, _preact.h)(
      'ul',
      { className: 'PseudoSelect-list' + (open ? ' is-open' : '') },
      renderList
    )
  );
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = analyticsEvent;
function analyticsEvent() {
  try {
    var _window;

    return (_window = window).ga.apply(_window, arguments);
  } catch (err) {
    console.log(err);
  }
}

/***/ }),
/* 6 */
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
  module.exports = __webpack_require__(88)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(90)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(64);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSizeModifier;
function createSizeModifier(string) {
  switch (string) {
    case 'small':
      return ' is-small';
    default:
      return '';
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = breakIntoWrap;
function breakIntoWrap(string, wrap) {
  var splitter = string.split(' ');

  var count = 0;
  var word = '';
  var results = [];

  for (var i = 0; i < splitter.length; i++) {
    if (splitter[count].length >= wrap) {
      // for (let ii = 0; ii < splitter[count].length; ii += wrap) {
      //   results.push(splitter[count].substr(ii, wrap));
      // }

      results.push(splitter[count]);

      word = '';
      count++;
    } else {
      word = word + ' ' + splitter[count];
      count++;

      if (word.length >= wrap) {
        results.push(word);
        word = '';
      }

      if (i === splitter.length - 1) {
        results.push(word);
        word = '';
      }
    }
  }

  return results;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trimValues;
function trimValues(value, abbreviated) {
  var million = abbreviated ? 'm' : 'million';
  var billion = abbreviated ? 'bn' : 'billion';

  if (value > 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + ' ' + billion;
  } else if (value > 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + ' ' + million;
  }

  return value.toFixed(1).replace(/\.0$/, '');
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var strictUriEncode = __webpack_require__(55);
var objectAssign = __webpack_require__(26);
var decodeComponent = __webpack_require__(56);

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

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
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
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
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

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Icon;

var _preact = __webpack_require__(0);

var _Close = __webpack_require__(91);

var _Close2 = _interopRequireDefault(_Close);

var _Download = __webpack_require__(92);

var _Download2 = _interopRequireDefault(_Download);

var _Facebook = __webpack_require__(93);

var _Facebook2 = _interopRequireDefault(_Facebook);

var _Search = __webpack_require__(94);

var _Search2 = _interopRequireDefault(_Search);

var _Twitter = __webpack_require__(95);

var _Twitter2 = _interopRequireDefault(_Twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Icon(_ref) {
  var size = _ref.size,
      type = _ref.type;

  switch (type) {
    case 'close':
      return (0, _preact.h)(_Close2.default, { size: size });
    case 'download':
      return (0, _preact.h)(_Download2.default, { size: size });
    case 'facebook':
      return (0, _preact.h)(_Facebook2.default, { size: size });
    case 'search':
      return (0, _preact.h)(_Search2.default, { size: size });
    case 'twitter':
      return (0, _preact.h)(_Twitter2.default, { size: size });
    default:
      return null;
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BarChart;

var _preact = __webpack_require__(0);

var _calcMaxValue = __webpack_require__(108);

var _calcMaxValue2 = _interopRequireDefault(_calcMaxValue);

var _buildGroupSpaceArray = __webpack_require__(109);

var _buildGroupSpaceArray2 = _interopRequireDefault(_buildGroupSpaceArray);

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

var _Breakpoints = __webpack_require__(110);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _Grid = __webpack_require__(112);

var _Grid2 = _interopRequireDefault(_Grid);

var _Guides = __webpack_require__(113);

var _Guides2 = _interopRequireDefault(_Guides);

var _LineGroups = __webpack_require__(115);

var _LineGroups2 = _interopRequireDefault(_LineGroups);

var _Tooltips = __webpack_require__(117);

var _Tooltips2 = _interopRequireDefault(_Tooltips);

var _Attribution = __webpack_require__(120);

var _Attribution2 = _interopRequireDefault(_Attribution);

var _Heading = __webpack_require__(121);

var _Heading2 = _interopRequireDefault(_Heading);

var _Logo = __webpack_require__(122);

var _Logo2 = _interopRequireDefault(_Logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BarChart(props) {
  var items = props.items,
      width = props.width,
      hover = props.hover,
      guides = props.guides,
      _props$scale = props.scale,
      scale = _props$scale === undefined ? 1 : _props$scale,
      download = props.download;
  var parentAction = props.parentAction;


  var content = null;

  var styling = {
    fontSize: 14,
    popupFontSize: 14,
    maxValue: (0, _calcMaxValue2.default)(items),
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    padding: [0, 110, 60, 2],
    valueSpace: width - 112,
    lineGutter: 23,
    popupHeight: 30,
    popupCentre: 5,
    barWidth: 16,
    groupMargin: 60,
    charWrap: width / 10,
    charLineHeight: 16,
    titleSpace: 0,
    labelBreakpoints: Math.floor(width / 150),
    showGuides: true
  };

  if (hover) {
    styling = _extends({}, styling, {
      charLineHeight: 14,
      lineGutter: 8,
      barWidth: 12,
      groupMargin: 40
    });
  }

  if (download) {
    var titleArray = (0, _breakIntoWrap2.default)(download.heading, 33);

    styling = _extends({}, styling, {
      padding: [83 + 30 * titleArray.length, 140, 137, 30],
      valueSpace: width - (140 + 30)
    });
  }

  if (width > 200) {
    var _styling = styling,
        valueSpace = _styling.valueSpace,
        padding = _styling.padding,
        showGuides = _styling.showGuides;

    var groupSpaceArray = (0, _buildGroupSpaceArray2.default)(items, styling);
    var totalGroupSpace = groupSpaceArray.reduce(function (result, val) {
      return result + val;
    }, 0);
    var height = padding[0] + totalGroupSpace + padding[2];
    var newWidth = padding[3] + valueSpace + padding[1];

    var background = (0, _preact.h)('rect', {
      x: '0',
      y: '0',
      width: newWidth,
      height: height,
      fill: 'white'
    });

    content = (0, _preact.h)(
      'svg',
      {
        version: '1.1',
        className: 'BarChart-svg ' + (hover ? ' is-hoverable' : ''),
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 ' + newWidth + ' ' + height,
        width: newWidth * (scale || 1),
        height: height * (scale || 1),
        style: { maxWidth: newWidth * (scale || 1) }
      },
      download ? background : null,
      download ? (0, _preact.h)(_Heading2.default, {
        left: padding[3],
        heading: download.heading,
        subHeading: download.subHeading,
        type: download.type
      }) : null,
      width > 300 ? (0, _preact.h)(_Breakpoints2.default, { styling: styling, totalGroupSpace: totalGroupSpace }) : null,
      (0, _preact.h)(_Grid2.default, { styling: styling, totalGroupSpace: totalGroupSpace }),
      guides ? (0, _preact.h)(_Guides2.default, { styling: styling, totalGroupSpace: totalGroupSpace }) : null,
      (0, _preact.h)(_LineGroups2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling }),
      (0, _preact.h)(_Tooltips2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling }),
      download ? (0, _preact.h)(
        'g',
        null,
        (0, _preact.h)(_Logo2.default, { top: (padding[0] + totalGroupSpace) / 2 + 17, left: padding[3] }),
        (0, _preact.h)(_Attribution2.default, { top: padding[0] + totalGroupSpace + 90, left: padding[3] + valueSpace })
      ) : null
    );
  }

  if (!download) {
    return (0, _preact.h)(
      'div',
      {
        className: 'BarChart',
        ref: function ref(node) {
          return parentAction && parentAction(node);
        }
      },
      content
    );
  }

  return content;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProp;

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseString = function parseString(string, parse) {
  switch (parse) {
    case 'json':
      return JSON.parse(string);
    case 'num':
      return parseFloat(string, 10);
    default:
      return string;
  }
};

function getProp(name, node, parse) {
  var result = node.getAttribute('data-' + name);
  if (result === null) {
    return null;
  }

  if (parse === 'bool') {
    return result !== null;
  }

  return parseString((0, _decodeHtmlEntities2.default)(result), parse);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(16);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(65);

module.exports = Function.prototype.bind || implementation;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) {
			return false;
		}
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

module.exports = function isCallable(value) {
	if (!value) {
		return false;
	}
	if (typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
		return false;
	}
	if (hasToStringTag) {
		return tryFunctionObject(value);
	}
	if (isES6ClassFn(value)) {
		return false;
	}
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _preact = __webpack_require__(0);

var _preactCssTransitionGroup = __webpack_require__(87);

var _preactCssTransitionGroup2 = _interopRequireDefault(_preactCssTransitionGroup);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(12);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Modal(_ref) {
  var children = _ref.children,
      title = _ref.title,
      open = _ref.open,
      closeAction = _ref.closeAction;

  var modal = (0, _preact.h)(
    'div',
    { className: 'Modal-inner' },
    (0, _preact.h)('div', { className: 'Modal-overlay', onClick: closeAction, 'aria-hidden': true }),
    (0, _preact.h)(
      'div',
      { className: 'Modal-boxWrap' },
      (0, _preact.h)(
        'div',
        { className: 'Modal-box' },
        (0, _preact.h)(
          'div',
          { className: 'Modal-heading' },
          title
        ),
        (0, _preact.h)(
          'div',
          { className: 'Modal-content' },
          children
        )
      ),
      (0, _preact.h)(
        'button',
        { className: 'Modal-close', onClick: closeAction },
        (0, _preact.h)(_index2.default, { type: 'close' })
      )
    )
  );

  return (0, _preact.h)(
    'div',
    { className: 'Modal' },
    (0, _preact.h)(
      _preactCssTransitionGroup2.default,
      {
        transitionName: 'is',
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300
      },
      open ? modal : null
    )
  );
}

Modal.propTypes = {
  children: _propTypes2.default.node.isRequired,
  title: _propTypes2.default.string.isRequired,
  closeAction: _propTypes2.default.func.isRequired,
  open: _propTypes2.default.bool.isRequired
};

/***/ }),
/* 19 */
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
/* 20 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Markup = __webpack_require__(107);

var _Markup2 = _interopRequireDefault(_Markup);

var _DebounceFunction = __webpack_require__(23);

var _DebounceFunction2 = _interopRequireDefault(_DebounceFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveChart = function (_Component) {
  _inherits(ResponsiveChart, _Component);

  function ResponsiveChart(props) {
    _classCallCheck(this, ResponsiveChart);

    var _this = _possibleConstructorReturn(this, (ResponsiveChart.__proto__ || Object.getPrototypeOf(ResponsiveChart)).call(this, props));

    var _this$props = _this.props,
        _this$props$minWidth = _this$props.minWidth,
        minWidth = _this$props$minWidth === undefined ? 250 : _this$props$minWidth,
        _this$props$breakpoin = _this$props.breakpoint,
        breakpoint = _this$props$breakpoin === undefined ? 600 : _this$props$breakpoin;


    _this.state = {
      width: minWidth,
      mobile: true
    };

    _this.updateWidth = function () {
      if (_this.state.mobile && window.innerWidth >= breakpoint) {
        _this.setState({ mobile: false });
      } else if (!_this.state.mobile && window.innerWidth < breakpoint) {
        _this.setState({ mobile: true });
      }

      if (_this.node && _this.node.offsetWidth !== _this.state.width) {
        if (_this.node.offsetWidth <= minWidth && _this.state.width !== minWidth) {
          return _this.setState({ width: minWidth });
        }

        return _this.setState({ width: _this.node.offsetWidth });
      }

      return null;
    };

    var viewportDebounce = new _DebounceFunction2.default(300);
    var updateViewport = function updateViewport() {
      return viewportDebounce.update(_this.updateWidth);
    };

    window.addEventListener('resize', updateViewport);

    _this.node = null;
    _this.parentAction = _this.parentAction.bind(_this);
    return _this;
  }

  _createClass(ResponsiveChart, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.widthAction) {
        return this.props.widthAction(this.state.width);
      }

      return null;
    }
  }, {
    key: 'parentAction',
    value: function parentAction(node) {
      this.node = node;
      this.updateWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          items = _props.items;
      var _state = this.state,
          mobile = _state.mobile,
          width = _state.width;


      return (0, _preact.h)(_Markup2.default, _extends({
        parentAction: this.parentAction,
        guides: !mobile,
        hover: !mobile
      }, { type: type, items: items, width: width }));
    }
  }]);

  return ResponsiveChart;
}(_preact.Component);

exports.default = ResponsiveChart;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DebounceFunction = function () {
  function DebounceFunction(time) {
    _classCallCheck(this, DebounceFunction);

    this.time = time;
    this.timeout = null;
  }

  _createClass(DebounceFunction, [{
    key: "update",
    value: function update(func) {
      var _this = this;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = window.setTimeout(function () {
        clearTimeout(_this.timeout);
        func();
      }, this.time);
    }
  }]);

  return DebounceFunction;
}();

exports.default = DebounceFunction;

/***/ }),
/* 24 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(144)(module)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RevenueMarkup;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RevenueMarkup(_ref) {
  var items = _ref.items;

  var keys = Object.keys(items);

  return (0, _preact.h)(
    'div',
    { className: 'ValueBlocks' },
    keys.map(function (key) {
      var link = items[key].link;
      var value = items[key].value;
      var Tag = link ? 'a' : 'div';

      return (0, _preact.h)(
        'div',
        { className: 'ValueBlocks-itemWrap' },
        (0, _preact.h)(
          Tag,
          { href: link, className: 'ValueBlocks-item' + (link ? ' ValueBlocks-item--link' : '') },
          (0, _preact.h)(
            'div',
            { className: 'ValueBlocks-title' },
            key
          ),
          value ? (0, _preact.h)(
            'div',
            { className: 'ValueBlocks-value' },
            'R',
            (0, _trimValues2.default)(value)
          ) : null
        )
      );
    })
  );
}

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(7);
var supportsDescriptors = __webpack_require__(2).supportsDescriptors;

/*! https://mths.be/array-from v0.2.0 by @mathias */
module.exports = function from(arrayLike) {
	var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
		object[key] = descriptor.value;
	};
	var C = this;
	if (arrayLike === null || typeof arrayLike === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var items = ES.ToObject(arrayLike);

	var mapFn, T;
	if (typeof arguments[1] !== 'undefined') {
		mapFn = arguments[1];
		if (!ES.IsCallable(mapFn)) {
			throw new TypeError('When provided, the second argument to `Array.from` must be a function');
		}
		if (arguments.length > 2) {
			T = arguments[2];
		}
	}

	var len = ES.ToLength(items.length);
	var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
	var k = 0;
	var kValue, mappedValue;
	while (k < len) {
		kValue = items[k];
		if (mapFn) {
			mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
		} else {
			mappedValue = kValue;
		}
		defineProperty(A, k, {
			'configurable': true,
			'enumerable': true,
			'value': mappedValue,
			'writable': true
		});
		k += 1;
	}
	A.length = len;
	return A;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = Number.isNaN || function (a) {
  return a !== a;
};

module.exports = Number.isFinite || function (x) {
  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var $isNaN = __webpack_require__(29);
var $isFinite = __webpack_require__(30);

var sign = __webpack_require__(31);
var mod = __webpack_require__(32);

var IsCallable = __webpack_require__(17);
var toPrimitive = __webpack_require__(71);

var has = __webpack_require__(15);

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) {
			return 0;
		}
		if (number === 0 || !$isFinite(number)) {
			return number;
		}
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) {
			return 0;
		}
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) {
			// 0 === -0, but they are not identical.
			if (x === 0) {
				return 1 / x === 1 / y;
			}
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) {
			// eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(7);
var implementation = __webpack_require__(27);

var tryCall = function tryCall(fn) {
	try {
		fn();
		return true;
	} catch (e) {
		return false;
	}
};

module.exports = function getPolyfill() {
	var implemented = ES.IsCallable(Array.from) && tryCall(function () {
		Array.from({ 'length': -Infinity });
	}) && !tryCall(function () {
		Array.from([], undefined);
	});

	return implemented ? Array.from : implementation;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(33);
var bind = __webpack_require__(16);
var isString = __webpack_require__(78);

// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var strSplit = bind.call(Function.call, String.prototype.split);

module.exports = function every(callbackfn) {
	var O = ES.ToObject(this);
	var self = splitString && isString(O) ? strSplit(O, '') : O;
	var len = ES.ToUint32(self.length);
	var T;
	if (arguments.length > 1) {
		T = arguments[1];
	}

	// If no callback function or if callback is not a callable function
	if (!ES.IsCallable(callbackfn)) {
		throw new TypeError('Array.prototype.every callback must be a function');
	}

	for (var i = 0; i < len; i++) {
		if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, O) : callbackfn.call(T, self[i], i, O))) {
			return false;
		}
	}
	return true;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(36);

module.exports = function getPolyfill() {
	if (typeof Array.prototype.every === 'function') {
		var hasPrimitiveContextInStrict = [1].every(function () {
			'use strict';

			return typeof this === 'string' && this === 'x';
		}, 'x');
		if (hasPrimitiveContextInStrict) {
			return Array.prototype.every;
		}
	}
	return implementation;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Array.prototype.findIndex - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
// For all details and docs: <https://github.com/paulmillr/Array.prototype.findIndex>


var ES = __webpack_require__(7);

module.exports = function findIndex(predicate) {
	var list = ES.ToObject(this);
	var length = ES.ToLength(list.length);
	if (!ES.IsCallable(predicate)) {
		throw new TypeError('Array#findIndex: predicate must be a function');
	}
	if (length === 0) return -1;
	var thisArg = arguments[1];
	for (var i = 0, value; i < length; i++) {
		value = list[i];
		if (ES.Call(predicate, thisArg, [value, i, list])) return i;
	}
	return -1;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getPolyfill() {
	// Detect if an implementation exists
	// Detect early implementations which skipped holes in sparse arrays
	var implemented = Array.prototype.findIndex && [, 1].findIndex(function (item, idx) {
		return idx === 0;
	}) === 0;

	return implemented ? Array.prototype.findIndex : __webpack_require__(38);
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(19);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {"Accounting officer":"The public servant in a department who is accountable to Parliament for financial management, usually the director-general or head of the department.","Accrual":"An accounting convention by which payments and receipts are recorded as they occur, even if no cash flow takes place.","Acquisition debt":"Debt used to purchase shares or assets.","Ad valorem duties":"Duties levied on commodities as a certain percentage of their value.","Adjustments estimate":"Presentation to Parliament of the amendments to be made to the appropriations voted in the main budget for the year.","Administered prices":"Prices set outside ordinary market processes through administrative decisions by government, a public entity or a regulator.","Agro-processing":"Manufacturing activities that transform raw materials and intermediary goods derived from agriculture into intermediate or final goods.","Allocated expenditure":"The part of the national budget that can be divided between the national, provincial and local spheres of government, after interest and the contingency reserve have been taken into account.","Amortisation":"The repayment of a loan by instalments over the duration of the loan.","Annuity":"A fixed amount of money paid over a period of time as a return on an investment.","Anti-avoidance rule":"A provision aimed at preventing tax avoidance. See principal purpose test.","Anti-fragmentation rule":"A rule that aims to prevent taxpayers from artificially avoiding permanent establishment status by breaking up a cohesive business into several small operations.","Appropriation":"The approval by Parliament of spending from the National Revenue Fund, or by a provincial legislature from a provincial revenue fund.","Artificial debt":"A \"loan\" that is presented as debt but is in effect equity. Often used in tax avoidance or evasion.","Asset price bubble":"A condition occurring when prices for a category of assets rise above the level justified by economic fundamentals.","Balance of payments":"A summary statement of all the international transactions of the residents of a country with the rest of the world over a particular period of time.","Base erosion and profit shifting":"Corporate tax-planning strategies that exploit the gaps and mismatches in tax laws between countries to artificially shift taxable income to lower or no-tax jurisdictions. See also tax evasion and profit shifting.","Basel III":"Reforms developed by the Basel Committee on Banking Supervision to strengthen the regulation, supervision and risk management of the banking sector.","Baseline":"The initial allocations used during the budget process, derived from the previous year's forward estimates.","Basis point":"One hundredth of one per cent.","Beneficiation":"Manufacturing activities that transform raw minerals into higher-value products.","Bond":"A certificate of debt issued by a government or corporation guaranteeing payment of the original investment plus interest by a specified future date.","Bond premium":"Amount by which the purchase price of a bond is greater than its par value.","Bond spread":"The difference in yield between two bonds.","Bond-switch programme":"An auction that aims to ease pressure on targeted areas of the redemption profile by exchanging shorter-dated debt for longer-term debt. See switch auction.","Bracket creep":"Increased real tax liability that arises when the personal income tax tables are not fully adjusted for inflation.","Budget balance":"The difference between budgeted expenditure and budgeted revenue. If expenditure exceeds revenue, the budget is in deficit. If the reverse is true, it is in surplus.","Capital adequacy":"A measure of a financial institution’s capital, expressed as a percentage of its credit exposure.","Capital asset":"Property of any kind, including assets that are movable or immovable, tangible or intangible, fixed or circulating, but excluding trading stock held for the purpose of realising a financial or economic return.","Capital expenditure":"Spending on assets such as buildings, land, infrastructure and equipment.","Capital flow":"A flow of investments in or out of the country.","Capital formation":"A measure of the net increase in the country’s total stock of capital goods, after allowing for depreciation.","Capital gains tax":"Tax levied on the income realised from the disposal of a capital asset by a taxpayer. A capital gain is the excess of the selling price over the purchase price of the capital asset.","Capital goods":"Durable goods used over a period of time for the production of other goods. See also intermediate goods.","Carbon tax":"An environmental tax on emissions of carbon dioxide (CO2).","Category A, B and C municipalities":"Municipal categories established by the Constitution: Category A, or metropolitan municipalities; Category B, or local municipalities; and Category C, or district municipalities.","Collateral":"An asset placed as a guarantee for the repayment of debt, to be recouped in the case of a default.","Commercial paper issuances":"Debt issued by companies through short-term promissory notes.","Conditional grants":"Allocations of money from one sphere of government to another, conditional on certain services being delivered or on compliance with specified requirements.","Connected person debt/credit":"Debt or credit granted by a person/entity to a connected person/entity. In the case of a holding company, for example, a subsidiary company would be a connected person.","Consolidated general government":"National, provincial and local government, as well as extra-budgetary government institutions and social security funds.","Consolidated government expenditure":"Total expenditure by national and provincial government, social security funds and selected public entities, including transfers and subsidies to municipalities, businesses and other entities.","Consumer price index (CPI)":"The measure of inflation based on prices in a basket of goods and services.","Consumption expenditure":"Expenditure on goods and services, including salaries, which are used up within a short period of time, usually a year.","Contingency reserve":"An amount set aside, but not allocated in advance, to accommodate changes to the economic environment and to meet unforeseeable spending pressures.","Contingent liability":"A government obligation, such as a guarantee, that will only result in expenditure upon the occurrence of a specific event. See government guarantee.","Controlled foreign entity":"A foreign business in which South Africans hold a greater than 50 per cent interest, usually of the share capital of a company.","Corporatisation":"The transformation of state-owned enterprises into commercial entities, subject to commercial legal requirements and governance structures, while the state retains ownership.","Cost-push inflation":"Inflation that is caused by an increase in production costs, such as wages or oil prices.","Countercyclical fiscal policy":"Policy that has the opposite effect on economic activity to that caused by the business cycle, such as slowing spending growth in a boom period and accelerating spending in a recession.","Coupon (bond)":"The periodic interest payment made to bondholders during the life of the bond. The interest is usually paid twice a year.","Credit rating":"An indicator of the risk of default by a borrower or the riskiness of a financial instrument. Credit ratings generally fit into three broad risk categories: minimal or low, moderate and high. These categories indicate the extent of a borrower’s capacity to meet their financial obligations or the probability that the value of a financial instrument will be realised. Investments rated as high risk are considered sub-investment grade (or “junk”).","Crowding-in":"An increase in private investment through the income-raising effect of government spending financed by deficits.","Crowding-out":"A fall in private investment or consumption as a result of increased government expenditure financed through borrowing, thereby competing for loanable funds and raising the interest rate, which curtails private investment and consumption spending.","Currency risk":"The potential for a change in the price of a currency that would affect investors with assets, liabilities or operations denominated in other currencies.","Current account (of the balance of payments)":"The difference between total imports and total exports, taking into account service payments and receipts, interest, dividends and transfers. The current account can be in deficit or surplus. See also trade balance.","Current balance":"The difference between revenue and current expenditure, which consists of compensation of employees, goods and services, and interest and rent on land.","Current expenditure":"Government expenditure on salaries and goods and services, such as rent, maintenance and interest payments. See also consumption expenditure.","Customs duties":"Tax levied on imported goods.","Debenture":"An unsecured loan backed by general credit rather than by specified assets.","Debt redemption profile":"The set of fixed repayment dates and amounts to which an issuer of debt, such as a preferred stock or bond, has committed to meeting.","Debt switching":"The exchange of bonds to manage refinancing risk or improve tradability.","Debt-service costs":"The cost of interest on government debt and other costs directly associated with borrowing.","Deflation":"A consistent decrease in the price of goods and services.","Deleveraging":"The reduction of debt previously used to increase the potential return of an investment.","Depreciation (capital)":"A reduction in the value of fixed capital as a result of wear and tear or redundancy.","Depreciation (exchange rate)":"A reduction in the external value of a currency.","Derivative financial instrument":"A financial asset that derives its value from an underlying asset, which may be a physical asset such as gold, or a financial asset such as a government bond.","Designated countries":"Foreign countries from which income may be exempt from South African tax under certain circumstances. See also double tax agreement.","Development finance institutions":"State agencies that aim to meet the credit needs of riskier but socially and economically desirable projects that are beyond the acceptance limits of commercial banks.","Direct taxes":"Taxes charged on taxable income or capital of individuals and legal entities.","Discretionary trust":"A trust where the executor has the choice of whether and how much of the trust’s income or capital is to be distributed to beneficiaries. The beneficiaries have only provisional rights to the income or capital of the trust.","Disposable income":"Total income by households less all taxes and employee contributions.","Dissaving":"An excess of current expenditure, including the depreciation of fixed capital, over current income.","Dividend":"The distribution of a portion of a company's earnings to a class of its shareholders.","Dividend withholding tax":"A tax on dividends that is subtracted and withheld by a company or intermediary before the net dividend is paid to the shareholder.","Division of revenue":"The allocation of funds between spheres of government, as required by the Constitution. See also equitable share.","Domestic demand":"The total level of spending in an economy, including imports but excluding exports.","Double tax agreement":"An agreement between two countries to prevent income that is taxed in one country from being taxed in the other as well. See also designated countries.","Economic cost":"The cost of an alternative that must be forgone to pursue a certain action. In other words, the benefits that could have been received by taking an alternative action.","Economic growth":"An increase in the total amount of output, income and spending in the economy.","Economic rent":"The difference between the return made by a factor of production (capital or labour) and the return necessary to keep the factor in its current occupation. For example, a firm making excess profits is earning economic rent.","Economically active population":"The part of the population that is of working age and is either employed or seeking work.","Effective tax rate":"Actual tax liability (or a reasonable estimate thereof) expressed as a percentage of a pre-tax income base rather than as a percentage of taxable income. In other words, tax rates that take into account not only the statutory or nominal tax rate, but also other aspects of the tax system (for example, allowable deductions), which determine the tax liability.","Embedded derivative":"A provision in a contract modifying its cash flows by making them dependent on an underlying measure – such as interest or exchange rates, or commodity prices – the value of which changes independently.","Emerging economies":"A name given by international investors to middle-income economies.","Employment coefficient":"The ratio of employment growth to economic growth.","Equitable share":"The allocation of revenue to the national, provincial and local spheres of government as required by the Constitution. See also division of revenue.","Equity finance":"Raising money by selling shares of stock to investors, who receive an ownership interest in return.","Exchange control":"Rules that regulate the flow of currency out of South Africa, or restrict the amount of foreign assets held by South African individuals and companies.","Exchange-traded funds":"Funds that track indexes, commodities or baskets of assets, and trade like stocks.","Excise duties":"Taxes on the manufacture or sale of certain domestic or imported products. Excise duties are usually charged on products such as alcoholic beverages, tobacco and petroleum.","Expenditure ceiling":"The maximum allowable level of expenditure to which government has committed itself.","Extra-budgetary institutions":"Public entities not directly funded from the fiscus.","Fair-value adjustment":"A change in the value of an asset or liability resulting from the periodic reassessment of its expected future economic in- or outflows.","Financial Services Board":"An independent institution established by statute that regulates insurers, intermediaries, retirement funds, friendly societies, unit trust schemes, management companies and financial markets.","Financial Stability Board":"An international body made up of representatives of financial authorities and institutions, and central banks. It proposes regulatory, supervisory and other policies in the interest of financial stability.","Financial account":"A statement of all financial transactions between the nation and the rest of the world, including portfolio and fixed investment flows and movements in foreign reserves.","Financial and Fiscal Commission (FFC)":"An independent body established by the Constitution to make recommendations to Parliament and provincial legislatures about financial issues affecting the three spheres of government.","Financial year":"The 12 months according to which companies and organisations budget and account. See also fiscal year.","Fiscal consolidation":"Policy aimed at reducing government deficits and debt accumulation.","Fiscal incidence":"The combined overall economic impact that fiscal policy has on the economy.","Fiscal leakage":"The outflow of revenue from an economy through tax evasion and avoidance.","Fiscal policy":"Policy on taxation, public spending and borrowing by the government.","Fiscal space":"The ability of government’s budget to provide additional resources for a desired programme without jeopardising fiscal or debt sustainability.","Fiscal year":"The 12 months on which government budgets are based, beginning 1 April and ending 31 March of the subsequent calendar year.","Fixed investment/capital formation":"Spending on buildings, machinery and equipment contributing to production capacity in the economy. See also gross fixed-capital formation.","Fixed-income bond":"A bond that pays a specific interest rate.","Floating rate notes":"A bond on which the interest rate is reset periodically in line with a money market reference rate.","Flow-through vehicles":"A vehicle, such as a trust, where income earned is treated as income of the vehicle’s beneficiaries.","Foreign currency swaps":"The exchange of principal and/or interest payments in one currency for those in another.","Foreign direct investment (FDI)":"The acquisition of a controlling interest by governments, institutions or individuals of a business in another country.","Forward book":"The total amount of contracts for the future exchange of foreign currency entered into by the Reserve Bank at any given point in time.","Forward cover":"Transactions involving an agreed exchange rate at which foreign currency will be purchased or sold at a future date.","Fringe benefit":"A benefit supplementing an employee’s wages or salary, such as medical insurance, company cars, housing allowances and pension schemes.","Fuel levy":"An excise tax on liquid fuels.","Function shift":"The movement of a function from one departmental vote or sphere of government to another.","Funded pension arrangements":"A pension scheme in which expected future benefits are funded in advance and as entitlement accrues.","Gold and foreign exchange reserves":"Reserves held by the Reserve Bank to meet foreign exchange obligations and to maintain liquidity in the presence of external shocks.","Government debt":"The total amount of money owed by the government as a consequence of its past borrowing.","Government guarantee":"An assurance made by government to a lender that a financial obligation will be honoured, even if the borrowing government institution is unable to repay the debt. See contingent liability.","Green paper":"A policy document intended for public discussion.","Gross borrowing requirement":"The sum of the main budget balance, extraordinary receipts and payments (referred to as National Revenue Fund receipts and payments), and maturing debt. The amount is funded through domestic short- and long- term loans, foreign loans and changes in cash balances.","Gross domestic product (GDP)":"A measure of the total national output, income and expenditure in the economy. GDP per head is the simplest overall measure of welfare, although it does not take account of the distribution of income, nor of goods and services that are produced outside the market economy, such as work within the household.","Gross domestic product inflation":"A measure of the total increase in prices in the whole economy. Unlike CPI inflation, GDP inflation includes price increases in goods that are exported and intermediate goods such as machines, but excludes imported goods.","Gross fixed-capital formation":"The addition to a country’s fixed-capital stock during a specific period, before provision for depreciation.","Gross value added":"The value of output less intermediate consumption. It is also a measure of the contribution to the economy made by an industry or sector.","Group of Twenty (G20)":"An international forum made up of finance ministers and central bank governors from 20 of the world’s largest economies.","Hedging":"An action taken by a buyer or seller to protect income against changes in prices, interest rates or exchange rates.","Horizontal equity":"A principle in taxation that holds that similarly situated taxpayers should face a similar tax treatment or tax burden. In other words, taxpayers with the same amount of income or capital should be accorded equal treatment.","Impaired advances":"Loans or advances that may not be collected in full.","Impairment":"A reduction in the recorded value of a long-lived asset arising from circumstances that prevent the asset from generating the future economic benefits previously expected and recorded.","Import parity pricing":"When a firm sells goods locally at the price customers would pay if they were to import the same goods from another country.","Inclusion rate":"The portion of the net capital gain derived from the disposal of an asset that will be taxed at the applicable rate.","Industrial development zone":"Designated sites linked to an international air or sea port, supported by incentives to encourage investment in export-orientated manufacturing and job creation.","Inflation":"An increase in the overall price level of goods and services in an economy over a specific period of time.","Inflation targeting":"A monetary policy framework intended to achieve price stability over a certain period of time.","Inter-state debt":"Money that different organs of state owe to each other.","Intergenerational equity":"A value based on ensuring that future generations do not have to repay debts taken on today, unless they also share in the benefits of assets.","Intermediate goods":"Goods produced to be used as inputs in the production of final goods.","Inventories":"Stocks of goods held by firms. An increase in inventories reflects an excess of output relative to spending over a period of time.","Labour intensity":"The relative amount of labour used to produce a unit of output.","Liquidity":"The ease with which assets can be bought and sold.","Liquidity requirements":"The amount of liquid or freely convertible assets that banks are required to hold relative to their liabilities for prudential and regulatory purposes.","Liquidity risk":"The risk that an asset might not easily and quickly be converted into cash through sale, or the risk to a debtor that it cannot meet its current debt obligations.","Lump-sum benefit":"A one-time payment for the total or partial value of an asset, usually received in place of recurring smaller payments.","M3":"The broadest definition of money supply in South Africa, including notes and coins, demand and fixed deposits, and credit.","Macroeconomics":"The branch of economics that deals with the whole economy – including issues such as growth, inflation, unemployment and the balance of payments.","Macroprudential regulation":"Rules that protect the stability of the financial sector and guard against systemic risk.","Marginal income tax rate":"The rate of tax on an incremental unit of income.","Marginal lending rate":"A penalty rate of interest charged by the Reserve Bank for lending to financial institutions in the money market in excess of the daily liquidity provided to the money market at the repurchase rate. See also repurchase agreements.","Marketable securities":"Tradable financial securities listed with a securities exchange.","Means test":"A method for determining whether someone qualifies for state assistance.","Medium Term Expenditure Committee (MTEC)":"The technical committee responsible for evaluating the medium-term expenditure framework budget submissions of national departments and making recommendations to the Minister of Finance regarding allocations to national departments.","Medium-term expenditure framework (MTEF)":"The three-year spending plans of national and provincial governments, published at the time of the Budget.","Microeconomics":"The branch of economics that deals with the behaviour of individual firms, consumers and sectors.","Ministers’ Committee on the Budget":"The political committee that considers key policy and budgetary issues that pertain to the budget process before they are tabled in Cabinet.","Monetary easing":"See quantitative easing.","Monetary policy":"Policy concerning total money supply, exchange rates and the general level of interest rates.","Money supply":"The total stock of money in an economy.","National Development Plan":"A planning framework prepared by the National Planning Commission that aims to eliminate poverty and reduce inequality by 2030.","National Revenue Fund":"The consolidated account of the national government into which all taxes, fees and charges collected by SARS and departmental revenue must be paid.","National budget":"The projected revenue and expenditures that flow through the National Revenue Fund. It does not include spending by provinces or local government from their own revenues.","Negotiable certificate of deposit":"Short-term deposit instruments issued by banks, at a variable interest rate, for a fixed period.","Net borrowing requirement":"The main budget balance.","Net exports":"Exports less imports.","Net open foreign currency position":"Gold and foreign exchange reserves minus the oversold forward book. The figure is expressed in dollars.","Net trade":"The difference between the value of exports and the value of imports.","New Development Bank":"A multilateral lending institution being established by Brazil, Russia, India, China and South Africa.","Nominal exchange rates":"The current rate of exchange between the rand and foreign currencies. The “effective” exchange rate is a trade-weighted average of the rates of exchange with other currencies.","Nominal wage":"The return, or wage, to employees at the current price level.","Non-competitive bid auction":"An auction in which an investor agrees to purchase a certain number of securities such as bonds at the average price of all competitive bids over a given period of time.","Non-financial public enterprises":"Government-owned or controlled organisations that deliver goods and non- financial services, trading as business enterprises, such as Eskom or Transnet.","Non-interest expenditure":"Total expenditure by government less debt-service costs.","Non-tax revenue":"Income received by government as a result of administrative charges, licences, fees, sales of goods and services, and so on.","Occupation-specific salary dispensation":"Revised salary structures unique to identified occupations in the public service, including doctors, nurses and teachers.","Opportunity cost":"The value of that which must be given up to achieve or acquire something. It is represented by the next highest valued alternative use of a resource.","Organisation for Economic Cooperation and Development (OECD)":"An organisation of 35 mainly industrialised member countries. South Africa is not a member.","PAYE":"The pay-as-you-earn (PAYE) system of income tax withholding requires employers to deduct income tax, and in some cases, the employees’ portion of social benefit taxes, from each paycheque delivered to employees.","Payroll tax":"Tax an employer withholds and/or pays on behalf of employees based on employee wages or salaries.","Permanent establishment":"A fixed place of business from which a company operates. When two countries have a tax treaty, the concept of “permanent establishment” is used to determine the right of one state to tax the profits of the business in the other state. See also anti-fragmentation.","Policy reserve":"Additional money in the fiscus to fund new and crucial priorities.","Portfolio investment":"Investment in financial assets such as stocks and bonds.","Potential growth":"The fastest growth an economy can sustain without increasing inflation.","Presidential Infrastructure Coordinating Commission (PICC)":"A commission established by Cabinet to develop, review and coordinate a 20-year infrastructure plan.","Price discovery":"The process of determining the price level of a commodity or asset, based on supply and demand factors.","Price sensitivity":"The extent to which changes in price affect consumer purchasing behaviour.","Primary deficit/surplus":"The difference between total revenue and non-interest expenditure. When revenue exceeds non-interest expenditure there is a surplus.","Primary sector":"The agricultural and mining sectors of the economy.","Principal purpose test":"A test where the benefits of a tax treaty are denied if it is reasonable to conclude that obtaining the benefit was one of the principal purposes behind the arrangement or transaction.","Private-sector credit extension":"Credit provided to the private sector. This includes all loans, credit cards and leases.","Privatisation":"The full or partial sale of state-owned enterprises to private individuals or companies.","Producer price index (PPI)":"Price increases measured by the producer price index – a measure of the prices paid based mainly on producers’ published price lists.","Productivity":"A measure of the amount of output generated from every unit of input. Typically used to measure changes in labour efficiency.","Profit shifting":"The allocation of income and expenses between related corporations or branches of the same legal entity to reduce overall tax liability.","Public Finance Management Act (PFMA)":"The act regulating financial management of national and provincial government, including the efficiency and effectiveness of public expenditure and the responsibilities of those engaging with government financial management.","Public Investment Corporation (PIC)":"A government-owned investment management company that invests funds on behalf of public-sector entities. Its largest client is the Government Employees Pension Fund.","Public entities":"Companies, agencies, funds and accounts that are fully or partly owned by government or public authorities and are regulated by law.","Public goods":"Goods and services that would not be fully provided in a pure free-market system and are largely provided by government.","Public sector":"National government, provincial government, local government, extra- budgetary governmental institutions, social security funds and non- financial public enterprises.","Public-benefit organisations (PBOs)":"Organisations that are mainly funded by donations from the public and other institutions, which engage in social activities to meet the needs of the general public.","Public-private partnerships (PPPs)":"A contractual arrangement whereby a private party performs a government function and assumes the associated risks. In return, the private party receives a fee according to predefined performance criteria. See unitary payment.","Public-sector borrowing requirement":"The consolidated cash borrowing requirement of general government and non-financial public enterprises.","Purchasing managers’ index (PMI)":"A composite index measuring the change in manufacturing activity compared with the previous month. An index value of 50 indicates no change in activity, a value above 50 indicates increased activity and a value below 50 indicates decreased activity.","Quantitative easing":"A measure used by central banks to stimulate economic growth when interest rates are near zero by increasing money supply. Also called monetary easing.","Quarterly Employment Survey":"An establishment-based survey conducted by Statistics South Africa to obtain information about the number of employees and gross salaries paid.","Quarterly Labour Force Survey":"A household-based survey conducted by Statistics South Africa to measure the dynamics of the labour market, producing indicators such as employment, unemployment and inactivity.","Rating agency":"A company that evaluates the ability of countries or other borrowers to honour their debt obligations. Credit ratings are used by international investors as indications of sovereign risk. See also credit rating.","Real effective exchange rate":"A measure of the rate of exchange of the rand relative to a trade-weighted average of South Africa’s trading partners’ currencies, adjusted for price trends in South Africa and the countries included.","Real exchange rate":"The level of the exchange rate taking account of inflation differences.","Real expenditure":"Expenditure measured in constant prices after taking account of inflation.","Real interest rate":"The level of interest after taking account of inflation.","Real wage":"The return, or wage, to employees, measured at a constant price level.","Recapitalisation":"Injection of funds into a company or entity to aid liquidity, either as a loan or in return for equity.","Recession":"A period in which national output and income decline. A recession is usually defined as two consecutive quarters of negative growth.","Redemption":"The return of an investor’s principal in a fixed-income security, such as a preferred stock or bond.","Refinancing":"The repayment of debt at a scheduled time with the proceeds of new loans.","Refinancing risk":"The risk that government will not be able to raise money to repay debt at any scheduled point, or that it will have to do so at a high cost.","Regional integration":"An economic policy intended to boost economic activity in a geographical area extending beyond one country.","Remuneration":"The costs of personnel, including salaries, housing allowances, car allowances and other benefits received by personnel.","Repurchase (repo) rate":"The rate at which the Reserve Bank lends to commercial banks.","Repurchase agreements":"Short-term contracts between the Reserve Bank and private banks in the money market to sell specified amounts of money at an interest rate determined by daily auction.","Reserves (foreign exchange)":"Holdings of foreign exchange, either by the Reserve Bank only or by the Reserve Bank and domestic banking institutions.","Residence-based income tax system":"A tax system in which the worldwide income accruing to a resident of a country is subject to the taxes of that country.","Reticulation scheme":"A piped water network that ensures that water is collected and treated before it reaches the consumer.","Revaluation gain/loss":"The difference between the value of a foreign currency deposit from the original (historical) rate to execution of a trade based on the spot rate.","Risk premium":"A return that compensates for uncertainty.","Saving":"The difference between income and spending.","Seasonally adjusted":"Removal of seasonal volatility (monthly or quarterly) from a time series. This provides a measure of the underlying trend in the data.","Secondary rebate":"A rebate from income tax, in addition to the primary rebate, that is available to taxpayers aged 65 years and older.","Secondary sector":"The part of the economy concerned with the manufacture of goods.","Secondary tax on companies (STC)":"Tax on dividends declared by a company, calculated at the rate of 10 per cent of the net amount of dividends declared. This was discontinued in 2012 and replaced with a 15 per cent dividend withholding tax.","Section 21 company":"Non-profit entities registered in terms of Section 21 of the Companies Act.","Sector education and training authorities":"Institutions funded through employer training levies, responsible for learnership programmes and implementing strategic sector skills plans.","Secured debt instruments":"Debt backed or secured by collateral to reduce the risk of lending.","Securitisation":"The pooling of assets into a financial instrument to sell to different types of investors.","Service and transfer payments":"Services involve transactions of non-tangible commodities, while transfers are unrequited transactions that do not generate a counter-economic value (for example, gifts and grants).","Skills development levy":"A payroll tax designed to finance training initiatives in terms of the skills development strategy.","Social infrastructure":"Infrastructure that supports social services.","Social wage":"Social benefits available to all individuals, funded wholly or partly by the state.","Source-based income tax system":"A system in which income is taxed in the country where the income originates.","Southern African Customs Union (SACU) agreement":"An agreement between South Africa, Botswana, Namibia, Lesotho and Swaziland that allows for the unrestricted flow of goods and services, and the sharing of customs and excise revenue.","Southern African Development Community (SADC)":"A regional intergovernmental organisation that promotes collaboration, economic integration and technical cooperation throughout southern Africa.","Sovereign debt":"Debt issued by a government.","Sovereign debt rating":"An assessment of the likelihood that a government will default on its debt obligations.","Spatial planning":"Planning to influence the geographic distribution of people and economic activity.","Special economic zones":"A designated zone where business and trade laws incentivise trade, investment and employment.","Specific excise duty":"A tax on each unit of output or sale of a good, unrelated to the value of a good.","Standing appropriations":"Government’s expenditure obligations that do not require a vote or statutory provision, including contractual guarantee commitments and international agreements.","Statutory appropriations":"Amounts appropriated to be spent in terms of statutes and not requiring appropriation by vote.","Sterilisation":"Action taken by the Reserve Bank to neutralise excess cash created in the money market when purchasing foreign currency.","Structural budget balance":"A representation of what government revenue and expenditure would be if output were at its potential level, with cyclical variations stripped out.","Structural constraints":"Imbalances in the structure of the economy that hinder growth and development.","Switch auction":"An auction to exchange bonds to manage refinancing risk or improve tradability.","Syndicated loan":"A large loan in which a group of banks work together to provide funds, which they solicit from their clients for the borrower.","Tax amnesty":"A period allowed by tax authorities during which taxpayers who are outside the tax net, but should be registered for tax purposes, can register for tax without incurring penalties.","Tax avoidance":"When individuals or businesses legitimately use provisions in the tax law to reduce their tax liability.","Tax base":"The aggregate value of income, sales or transactions on which particular taxes are levied.","Tax buoyancy":"Describes the relationship between total tax revenue collections and economic growth. This measure includes the effects of policy changes on revenue. A value above one means that revenues are growing faster than the economy and below one means they are growing below the rate of GDP growth.","Tax evasion":"When individuals or businesses illegally reduce their tax liability.","Tax expenditure":"Government revenue forgone due to provisions that allow deductions, exclusions, or exemptions from taxable income. The revenue can also be foregone through the deferral of tax liability or preferential tax rates.","Tax gap":"A measure of tax evasion that emerges from comparing the tax liability or tax base declared to the tax authorities with the tax liability or tax base calculated from other sources.","Tax incentives":"Specific provisions in the tax code that provide favourable tax treatment to individuals and businesses to encourage specific behaviour or activities.","Tax incidence":"The final distribution of the burden of tax. Statutory incidence defines where the law requires a tax to be levied. Economic incidence refers to those who experience a decrease in real income as a result of the imposition of a tax.","Tax loopholes":"Unintended weaknesses in the legal provisions of the tax system used by taxpayers to avoid paying tax liability.","Tax morality":"The willingness, or motivation, of citizens to pay tax. This is separate to the statutory obligation to pay taxes, but may have an influence on tax compliance.","Tax-to-GDP ratio":"For public finance comparison purposes, a country’s tax burden, or tax-to- GDP ratio, is calculated by taking the total tax payments for a particular fiscal year as a fraction or percentage of the GDP for that year.","Term-to-maturity":"The time between issuance and expiry.","Terms of trade":"An index measuring the ratio of a country’s export prices relative to its import prices.","Tertiary sector":"The part of the economy concerned with the provision of services.","Total factor productivity":"An index used to measure the efficiency of all inputs that contribute to the production process.","Trade balance":"The monetary record of a country’s net imports and exports of physical merchandise. See also current account.","Trade regime":"The system of tariffs, quotas and quantitative restrictions applied to protect domestic industries, together with subsidies and incentives used to promote international trade.","Trade-weighted rand":"The value of the rand pegged to or expressed relative to a market basket of selected foreign currencies.","Trademark":"A legal right pointing distinctly to the origin or ownership of merchandise to which it is applied and legally reserved for the exclusive use of the owner as maker or seller.","Treasury bills":"Short-term government debt instruments that yield no interest but are issued at a discount. Maturities vary from one day to 12 months.","Treasury committee":"The Cabinet committee that evaluates all requests for additional funds for unavoidable and unforeseen expenditure during a financial year.","Treaty shopping":"When related companies in different countries establish a third entity in another location to take advantage of a favourable tax arrangement.","Trend GDP growth":"The theoretical level of GDP growth determined by the full utilisation of all factors of production (land, labour and capital). Growth above the trend rate results in macroeconomic imbalances such as rising inflation or a weakening of the current account. Increases in trend GDP growth are achieved through capital formation, growth in employment and/or technological development.","Unallocated reserves":"Potential expenditure provision not allocated to a particular use. It mainly consists of the contingency reserve and amounts of money left unallocated by provinces.","Unemployment (broad definition)":"All those of working age who are unemployed, including those actively seeking employment and discouraged work seekers.","Unemployment (official definition)":"Those of working age, who are unemployed and actively seeking work (excludes discouraged work seekers).","Unit labour cost":"The cost of labour per unit of output, calculated by dividing average wages by productivity (output per worker per hour).","Unitary payment":"The payment made to the private party for meeting its obligations in the project deliverables in a public-private partnership.","Unqualified audit":"An assessment by a registered auditing firm or the Auditor-General of South Africa asserting that the financial statements of a department, entity or company are free of material misstatement.","Unsecured debt instruments":"Debt not backed or secured by collateral to reduce the risk of lending.","Unsecured lending":"A loan that is not backed or secured by any type of collateral to reduce the lender’s risk.","Vertical equity":"A doctrine in taxation that holds that differently situated taxpayers should be treated differently in terms of income tax provisions. In other words, taxpayers with more income and/or capital should pay more tax.","Vested right":"The right to ownership of an asset that cannot be arbitrarily taken away by a third party.","Virement":"The transfer of resources from one programme to another within the same department during a financial year.","Vote":"An appropriation voted by Parliament.","Water trading account":"A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure.","Weighted average cost of capital":"The average rate of return an organisation expects to pay to investors in its securities, such as bonds, debt and shares. Each category of security is accorded a proportionate weight in the calculation.","White paper":"A policy document used to present government policy preferences.","Withholding tax":"Tax on income deducted at source. Withholding taxes are widely used for dividends, interest and royalties.","Yield":"A financial return or interest paid to buyers of government bonds. The yield/rate of return on bonds takes into account the total annual interest payments, the purchase price, the redemption value and the amount of time remaining until maturity.","Yield curve":"A graph showing the relationship between the yield on bonds of the same credit quality but different maturity at a given point in time."}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tooltip;

var _preact = __webpack_require__(0);

var _Box = __webpack_require__(103);

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tooltip(_ref) {
  var block = _ref.block,
      children = _ref.children,
      title = _ref.title,
      description = _ref.description,
      actions = _ref.actions,
      down = _ref.down,
      open = _ref.open,
      openAction = _ref.openAction,
      closeAction = _ref.closeAction;


  return (0, _preact.h)(
    'span',
    { className: 'Tooltip' + (block ? ' is-block' : '') },
    (0, _preact.h)(
      'div',
      { className: 'Tooltip-trigger', onClick: openAction },
      children
    ),
    (0, _preact.h)(
      'div',
      { className: 'Tooltip-boxWrap' + (open ? ' is-open' : '') + (down ? ' is-down' : '') },
      (0, _preact.h)('div', { className: 'Tooltip-modalCover', onClick: closeAction }),
      (0, _preact.h)(_Box2.default, { title: title, description: description, actions: actions, down: down, closeAction: closeAction })
    )
  );
}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {"apiBaseURL":"https://data.vulekamali.gov.za"}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removePunctuation;
function removePunctuation(string) {
  return string.replace(/[^\w\s]/g, ' ');
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	( false ? 'undefined' : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.preactRenderToString = factory();
})(undefined, function () {

	var NON_DIMENSION_PROPS = {
		boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
		flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
		opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
	};

	var ESC = {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'&': '&amp;'
	};

	var objectKeys = Object.keys || function (obj) {
		var keys = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) keys.push(i);
		}return keys;
	};

	var encodeEntities = function encodeEntities(s) {
		return String(s).replace(/[<>"&]/g, escapeChar);
	};

	var escapeChar = function escapeChar(a) {
		return ESC[a] || a;
	};

	var falsey = function falsey(v) {
		return v == null || v === false;
	};

	var memoize = function memoize(fn) {
		var mem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		return function (v) {
			return mem[v] || (mem[v] = fn(v));
		};
	};

	var indent = function indent(s, char) {
		return String(s).replace(/(\n+)/g, '$1' + (char || '\t'));
	};

	var isLargeString = function isLargeString(s, length, ignoreLines) {
		return String(s).length > (length || 40) || !ignoreLines && String(s).indexOf('\n') !== -1 || String(s).indexOf('<') !== -1;
	};

	function styleObjToCss(s) {
		var str = '';
		for (var prop in s) {
			var val = s[prop];
			if (val != null) {
				if (str) str += ' ';
				str += jsToCss(prop);
				str += ': ';
				str += val;
				if (typeof val === 'number' && !NON_DIMENSION_PROPS[prop]) {
					str += 'px';
				}
				str += ';';
			}
		}
		return str || undefined;
	}

	function hashToClassName(c) {
		var str = '';
		for (var prop in c) {
			if (c[prop]) {
				if (str) str += ' ';
				str += prop;
			}
		}
		return str;
	}

	var jsToCss = memoize(function (s) {
		return s.replace(/([A-Z])/g, '-$1').toLowerCase();
	});

	function assign(obj, props) {
		for (var i in props) {
			obj[i] = props[i];
		}return obj;
	}

	function getNodeProps(vnode) {
		var defaultProps = vnode.nodeName.defaultProps,
		    props = assign({}, defaultProps || vnode.attributes);
		if (defaultProps) assign(props, vnode.attributes);
		if (vnode.children) props.children = vnode.children;
		return props;
	}

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	var SHALLOW = { shallow: true };

	var UNNAMED = [];

	var EMPTY = {};

	var VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

	renderToString.render = renderToString;

	var shallowRender = function shallowRender(vnode, context) {
		return renderToString(vnode, context, SHALLOW);
	};

	function renderToString(vnode, context, opts, inner, isSvgMode) {
		var _ref = vnode || EMPTY,
		    nodeName = _ref.nodeName,
		    attributes = _ref.attributes,
		    children = _ref.children,
		    isComponent = false;

		context = context || {};
		opts = opts || {};

		var pretty = opts.pretty,
		    indentChar = typeof pretty === 'string' ? pretty : '\t';

		if (vnode == null || typeof vnode === 'boolean') {
			return '';
		}

		if ((typeof vnode === 'undefined' ? 'undefined' : _typeof(vnode)) !== 'object' && !nodeName) {
			return encodeEntities(vnode);
		}

		if (typeof nodeName === 'function') {
			isComponent = true;
			if (opts.shallow && (inner || opts.renderRootComponent === false)) {
				nodeName = getComponentName(nodeName);
			} else {
				var props = getNodeProps(vnode),
				    rendered = void 0;

				if (!nodeName.prototype || typeof nodeName.prototype.render !== 'function') {
					rendered = nodeName(props, context);
				} else {
					var c = new nodeName(props, context);

					c._disable = c.__x = true;
					c.props = props;
					c.context = context;
					if (c.componentWillMount) c.componentWillMount();
					rendered = c.render(c.props, c.state, c.context);

					if (c.getChildContext) {
						context = assign(assign({}, context), c.getChildContext());
					}
				}

				return renderToString(rendered, context, opts, opts.shallowHighOrder !== false);
			}
		}

		var s = '',
		    html = void 0;

		if (attributes) {
			var attrs = objectKeys(attributes);

			if (opts && opts.sortAttributes === true) attrs.sort();

			for (var i = 0; i < attrs.length; i++) {
				var name = attrs[i],
				    v = attributes[name];
				if (name === 'children') continue;
				if (!(opts && opts.allAttributes) && (name === 'key' || name === 'ref')) continue;

				if (name === 'className') {
					if (attributes['class']) continue;
					name = 'class';
				} else if (isSvgMode && name.match(/^xlink\:?(.+)/)) {
					name = name.toLowerCase().replace(/^xlink\:?(.+)/, 'xlink:$1');
				}

				if (name === 'class' && v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
					v = hashToClassName(v);
				} else if (name === 'style' && v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
					v = styleObjToCss(v);
				}

				var hooked = opts.attributeHook && opts.attributeHook(name, v, context, opts, isComponent);
				if (hooked || hooked === '') {
					s += hooked;
					continue;
				}

				if (name === 'dangerouslySetInnerHTML') {
					html = v && v.__html;
				} else if ((v || v === 0 || v === '') && typeof v !== 'function') {
					if (v === true || v === '') {
						v = name;

						if (!opts || !opts.xml) {
							s += ' ' + name;
							continue;
						}
					}
					s += ' ' + name + '="' + encodeEntities(v) + '"';
				}
			}
		}

		var sub = s.replace(/^\n\s*/, ' ');
		if (sub !== s && !~sub.indexOf('\n')) s = sub;else if (pretty && ~s.indexOf('\n')) s += '\n';

		s = '<' + nodeName + s + '>';

		if (VOID_ELEMENTS.indexOf(nodeName) > -1) {
			s = s.replace(/>$/, ' />');
		}

		if (html) {
			if (pretty && isLargeString(html)) {
				html = '\n' + indentChar + indent(html, indentChar);
			}
			s += html;
		} else {
			var len = children && children.length,
			    pieces = [],
			    hasLarge = ~s.indexOf('\n');
			for (var _i = 0; _i < len; _i++) {
				var child = children[_i];
				if (!falsey(child)) {
					var childSvgMode = nodeName === 'svg' ? true : nodeName === 'foreignObject' ? false : isSvgMode,
					    ret = renderToString(child, context, opts, true, childSvgMode);
					if (!hasLarge && pretty && isLargeString(ret)) hasLarge = true;
					if (ret) pieces.push(ret);
				}
			}
			if (pretty && hasLarge) {
				for (var _i2 = pieces.length; _i2--;) {
					pieces[_i2] = '\n' + indentChar + indent(pieces[_i2], indentChar);
				}
			}
			if (pieces.length) {
				s += pieces.join('');
			} else if (opts && opts.xml) {
				return s.substring(0, s.length - 1) + ' />';
			}
		}

		if (VOID_ELEMENTS.indexOf(nodeName) === -1) {
			if (pretty && ~s.indexOf('\n')) s += '\n';
			s += '</' + nodeName + '>';
		}

		return s;
	}

	function getComponentName(component) {
		return component.displayName || component !== Function && component.name || getFallbackComponentName(component);
	}

	function getFallbackComponentName(component) {
		var str = Function.prototype.toString.call(component),
		    name = (str.match(/^\s*function\s+([^\( ]+)/) || EMPTY)[1];
		if (!name) {
			var index = -1;
			for (var i = UNNAMED.length; i--;) {
				if (UNNAMED[i] === component) {
					index = i;
					break;
				}
			}

			if (index < 0) {
				index = UNNAMED.push(component) - 1;
			}
			name = 'UnnamedComponent' + index;
		}
		return name;
	}
	renderToString.shallowRender = shallowRender;

	return renderToString;
});
//# sourceMappingURL=index.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RGBColor = __webpack_require__(178);
var stackblur = __webpack_require__(179);
var xmldom = __webpack_require__(180);

/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
 */

/*
canvg(target, s)
  empty parameters: replace all 'svg' elements on page with 'canvas' elements
  target: canvas element or the id of a canvas element
  s: svg string, url to svg file, or xml document
  opts: optional hash of options
    ignoreMouse: true => ignore mouse events
    ignoreAnimation: true => ignore animations
    ignoreDimensions: true => does not try to resize canvas
    ignoreClear: true => does not clear canvas
    offsetX: int => draws at a x offset
    offsetY: int => draws at a y offset
    scaleWidth: int => scales horizontally to width
    scaleHeight: int => scales vertically to height
    renderCallback: function => will call the function after the first render is completed
    forceRedraw: function => will call the function on every frame, if it returns true, will redraw
*/
function canvg(target, s, opts) {

	// no parameters
	if (target == null && s == null && opts == null) {
		var svgTags = document.querySelectorAll('svg');
		for (var i = 0; i < svgTags.length; i++) {
			var svgTag = svgTags[i];
			var c = document.createElement('canvas');
			c.width = svgTag.clientWidth;
			c.height = svgTag.clientHeight;
			svgTag.parentNode.insertBefore(c, svgTag);
			svgTag.parentNode.removeChild(svgTag);
			var div = document.createElement('div');
			div.appendChild(svgTag);
			canvg(c, div.innerHTML);
		}
		return;
	}

	if (typeof target == 'string') {
		target = document.getElementById(target);
	}

	// store class on canvas
	if (target.svg != null) target.svg.stop();
	var svg = build(opts || {});
	// on i.e. 8 for flash canvas, we can't assign the property so check for it
	if (!(target.childNodes.length == 1 && target.childNodes[0].nodeName == 'OBJECT')) target.svg = svg;

	var ctx = target.getContext('2d');
	if (typeof s.documentElement != 'undefined') {
		// load from xml doc
		svg.loadXmlDoc(ctx, s);
	} else if (s.substr(0, 1) == '<') {
		// load from xml string
		svg.loadXml(ctx, s);
	} else {
		// load from url
		svg.load(ctx, s);
	}
}

function getMatchesSelector() {
	// see https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
	var matchesSelector;
	if (typeof Element.prototype.matches != 'undefined') {
		matchesSelector = function matchesSelector(node, selector) {
			return node.matches(selector);
		};
	} else if (typeof Element.prototype.webkitMatchesSelector != 'undefined') {
		matchesSelector = function matchesSelector(node, selector) {
			return node.webkitMatchesSelector(selector);
		};
	} else if (typeof Element.prototype.mozMatchesSelector != 'undefined') {
		matchesSelector = function matchesSelector(node, selector) {
			return node.mozMatchesSelector(selector);
		};
	} else if (typeof Element.prototype.msMatchesSelector != 'undefined') {
		matchesSelector = function matchesSelector(node, selector) {
			return node.msMatchesSelector(selector);
		};
	} else if (typeof Element.prototype.oMatchesSelector != 'undefined') {
		matchesSelector = function matchesSelector(node, selector) {
			return node.oMatchesSelector(selector);
		};
	} else {
		// requires Sizzle: https://github.com/jquery/sizzle/wiki/Sizzle-Documentation
		// or jQuery: http://jquery.com/download/
		// or Zepto: http://zeptojs.com/#
		// without it, this is a ReferenceError

		if (typeof jQuery == 'function' || typeof Zepto == 'function') {
			matchesSelector = function matchesSelector(node, selector) {
				return $(node).is(selector);
			};
		}

		if (typeof matchesSelector == 'undefined') {
			matchesSelector = Sizzle.matchesSelector;
		}
	}

	return matchesSelector;
}

function getSelectorSpecificity(selector) {
	var typeCount = [0, 0, 0];

	// slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
	var attributeRegex = /(\[[^\]]+\])/g;
	var idRegex = /(#[^\s\+>~\.\[:]+)/g;
	var classRegex = /(\.[^\s\+>~\.\[:]+)/g;
	var pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi;
	var pseudoClassWithBracketsRegex = /(:[\w-]+\([^\)]*\))/gi;
	var pseudoClassRegex = /(:[^\s\+>~\.\[:]+)/g;
	var elementRegex = /([^\s\+>~\.\[:]+)/g;

	var findMatch = function findMatch(regex, type) {
		var matches = selector.match(regex);
		if (matches == null) {
			return;
		}
		typeCount[type] += matches.length;
		selector = selector.replace(regex, ' ');
	};

	selector = selector.replace(/:not\(([^\)]*)\)/g, '     $1 ');
	selector = selector.replace(/{[^]*/gm, ' ');
	findMatch(attributeRegex, 1);
	findMatch(idRegex, 0);
	findMatch(classRegex, 1);
	findMatch(pseudoElementRegex, 2);
	findMatch(pseudoClassWithBracketsRegex, 1);
	findMatch(pseudoClassRegex, 1);
	selector = selector.replace(/[\*\s\+>~]/g, ' ');
	selector = selector.replace(/[#\.]/g, ' ');
	findMatch(elementRegex, 2);
	return typeCount.join('');
}

function build(opts) {
	var svg = { opts: opts };

	var matchesSelector = getMatchesSelector();

	if (typeof CanvasRenderingContext2D != 'undefined') {
		CanvasRenderingContext2D.prototype.drawSvg = function (s, dx, dy, dw, dh, opts) {
			var cOpts = {
				ignoreMouse: true,
				ignoreAnimation: true,
				ignoreDimensions: true,
				ignoreClear: true,
				offsetX: dx,
				offsetY: dy,
				scaleWidth: dw,
				scaleHeight: dh
			};

			for (var prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					cOpts[prop] = opts[prop];
				}
			}
			canvg(this.canvas, s, cOpts);
		};
	}

	svg.FRAMERATE = 30;
	svg.MAX_VIRTUAL_PIXELS = 30000;

	svg.log = function (msg) {};
	if (svg.opts.log == true && typeof console != 'undefined') {
		svg.log = function (msg) {
			console.log(msg);
		};
	}

	// globals
	svg.init = function (ctx) {
		var uniqueId = 0;
		svg.UniqueId = function () {
			uniqueId++;return 'canvg' + uniqueId;
		};
		svg.Definitions = {};
		svg.Styles = {};
		svg.StylesSpecificity = {};
		svg.Animations = [];
		svg.Images = [];
		svg.ctx = ctx;
		svg.ViewPort = new function () {
			this.viewPorts = [];
			this.Clear = function () {
				this.viewPorts = [];
			};
			this.SetCurrent = function (width, height) {
				this.viewPorts.push({ width: width, height: height });
			};
			this.RemoveCurrent = function () {
				this.viewPorts.pop();
			};
			this.Current = function () {
				return this.viewPorts[this.viewPorts.length - 1];
			};
			this.width = function () {
				return this.Current().width;
			};
			this.height = function () {
				return this.Current().height;
			};
			this.ComputeSize = function (d) {
				if (d != null && typeof d == 'number') return d;
				if (d == 'x') return this.width();
				if (d == 'y') return this.height();
				return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
			};
		}();
	};
	svg.init();

	// images loaded
	svg.ImagesLoaded = function () {
		for (var i = 0; i < svg.Images.length; i++) {
			if (!svg.Images[i].loaded) return false;
		}
		return true;
	};

	// trim
	svg.trim = function (s) {
		return s.replace(/^\s+|\s+$/g, '');
	};

	// compress spaces
	svg.compressSpaces = function (s) {
		return s.replace(/[\s\r\t\n]+/gm, ' ');
	};

	// ajax
	svg.ajax = function (url) {
		var AJAX;
		if (window.XMLHttpRequest) {
			AJAX = new XMLHttpRequest();
		} else {
			AJAX = new ActiveXObject('Microsoft.XMLHTTP');
		}
		if (AJAX) {
			AJAX.open('GET', url, false);
			AJAX.send(null);
			return AJAX.responseText;
		}
		return null;
	};

	// parse xml
	svg.parseXml = function (xml) {
		if (typeof Windows != 'undefined' && typeof Windows.Data != 'undefined' && typeof Windows.Data.Xml != 'undefined') {
			var xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
			var settings = new Windows.Data.Xml.Dom.XmlLoadSettings();
			settings.prohibitDtd = false;
			xmlDoc.loadXml(xml, settings);
			return xmlDoc;
		} else if (window.DOMParser) {
			var parser = new DOMParser();
			return parser.parseFromString(xml, 'text/xml');
		} else {
			xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
			var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = 'false';
			xmlDoc.loadXML(xml);
			return xmlDoc;
		}
	};

	svg.Property = function (name, value) {
		this.name = name;
		this.value = value;
	};
	svg.Property.prototype.getValue = function () {
		return this.value;
	};

	svg.Property.prototype.hasValue = function () {
		return this.value != null && this.value != '';
	};

	// return the numerical value of the property
	svg.Property.prototype.numValue = function () {
		if (!this.hasValue()) return 0;

		var n = parseFloat(this.value);
		if ((this.value + '').match(/%$/)) {
			n = n / 100.0;
		}
		return n;
	};

	svg.Property.prototype.valueOrDefault = function (def) {
		if (this.hasValue()) return this.value;
		return def;
	};

	svg.Property.prototype.numValueOrDefault = function (def) {
		if (this.hasValue()) return this.numValue();
		return def;
	};

	// color extensions
	// augment the current color value with the opacity
	svg.Property.prototype.addOpacity = function (opacityProp) {
		var newValue = this.value;
		if (opacityProp.value != null && opacityProp.value != '' && typeof this.value == 'string') {
			// can only add opacity to colors, not patterns
			var color = new RGBColor(this.value);
			if (color.ok) {
				newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacityProp.numValue() + ')';
			}
		}
		return new svg.Property(this.name, newValue);
	};

	// definition extensions
	// get the definition from the definitions table
	svg.Property.prototype.getDefinition = function () {
		var name = this.value.match(/#([^\)'"]+)/);
		if (name) {
			name = name[1];
		}
		if (!name) {
			name = this.value;
		}
		return svg.Definitions[name];
	};

	svg.Property.prototype.isUrlDefinition = function () {
		return this.value.indexOf('url(') == 0;
	};

	svg.Property.prototype.getFillStyleDefinition = function (e, opacityProp) {
		var def = this.getDefinition();

		// gradient
		if (def != null && def.createGradient) {
			return def.createGradient(svg.ctx, e, opacityProp);
		}

		// pattern
		if (def != null && def.createPattern) {
			if (def.getHrefAttribute().hasValue()) {
				var pt = def.attribute('patternTransform');
				def = def.getHrefAttribute().getDefinition();
				if (pt.hasValue()) {
					def.attribute('patternTransform', true).value = pt.value;
				}
			}
			return def.createPattern(svg.ctx, e);
		}

		return null;
	};

	// length extensions
	svg.Property.prototype.getDPI = function (viewPort) {
		return 96.0; // TODO: compute?
	};

	svg.Property.prototype.getEM = function (viewPort) {
		var em = 12;

		var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
		if (fontSize.hasValue()) em = fontSize.toPixels(viewPort);

		return em;
	};

	svg.Property.prototype.getUnits = function () {
		var s = this.value + '';
		return s.replace(/[0-9\.\-]/g, '');
	};

	// get the length as pixels
	svg.Property.prototype.toPixels = function (viewPort, processPercent) {
		if (!this.hasValue()) return 0;
		var s = this.value + '';
		if (s.match(/em$/)) return this.numValue() * this.getEM(viewPort);
		if (s.match(/ex$/)) return this.numValue() * this.getEM(viewPort) / 2.0;
		if (s.match(/px$/)) return this.numValue();
		if (s.match(/pt$/)) return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0);
		if (s.match(/pc$/)) return this.numValue() * 15;
		if (s.match(/cm$/)) return this.numValue() * this.getDPI(viewPort) / 2.54;
		if (s.match(/mm$/)) return this.numValue() * this.getDPI(viewPort) / 25.4;
		if (s.match(/in$/)) return this.numValue() * this.getDPI(viewPort);
		if (s.match(/%$/)) return this.numValue() * svg.ViewPort.ComputeSize(viewPort);
		var n = this.numValue();
		if (processPercent && n < 1.0) return n * svg.ViewPort.ComputeSize(viewPort);
		return n;
	};

	// time extensions
	// get the time as milliseconds
	svg.Property.prototype.toMilliseconds = function () {
		if (!this.hasValue()) return 0;
		var s = this.value + '';
		if (s.match(/s$/)) return this.numValue() * 1000;
		if (s.match(/ms$/)) return this.numValue();
		return this.numValue();
	};

	// angle extensions
	// get the angle as radians
	svg.Property.prototype.toRadians = function () {
		if (!this.hasValue()) return 0;
		var s = this.value + '';
		if (s.match(/deg$/)) return this.numValue() * (Math.PI / 180.0);
		if (s.match(/grad$/)) return this.numValue() * (Math.PI / 200.0);
		if (s.match(/rad$/)) return this.numValue();
		return this.numValue() * (Math.PI / 180.0);
	};

	// text extensions
	// get the text baseline
	var textBaselineMapping = {
		'baseline': 'alphabetic',
		'before-edge': 'top',
		'text-before-edge': 'top',
		'middle': 'middle',
		'central': 'middle',
		'after-edge': 'bottom',
		'text-after-edge': 'bottom',
		'ideographic': 'ideographic',
		'alphabetic': 'alphabetic',
		'hanging': 'hanging',
		'mathematical': 'alphabetic'
	};
	svg.Property.prototype.toTextBaseline = function () {
		if (!this.hasValue()) return null;
		return textBaselineMapping[this.value];
	};

	// fonts
	svg.Font = new function () {
		this.Styles = 'normal|italic|oblique|inherit';
		this.Variants = 'normal|small-caps|inherit';
		this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

		this.CreateFont = function (fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
			var f = inherit != null ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
			return {
				fontFamily: fontFamily || f.fontFamily,
				fontSize: fontSize || f.fontSize,
				fontStyle: fontStyle || f.fontStyle,
				fontWeight: fontWeight || f.fontWeight,
				fontVariant: fontVariant || f.fontVariant,
				toString: function toString() {
					return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ');
				}
			};
		};

		var that = this;
		this.Parse = function (s) {
			var f = {};
			var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
			var set = { fontSize: false, fontStyle: false, fontWeight: false, fontVariant: false };
			var ff = '';
			for (var i = 0; i < d.length; i++) {
				if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) {
					if (d[i] != 'inherit') f.fontStyle = d[i];set.fontStyle = true;
				} else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) {
					if (d[i] != 'inherit') f.fontVariant = d[i];set.fontStyle = set.fontVariant = true;
				} else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) {
					if (d[i] != 'inherit') f.fontWeight = d[i];set.fontStyle = set.fontVariant = set.fontWeight = true;
				} else if (!set.fontSize) {
					if (d[i] != 'inherit') f.fontSize = d[i].split('/')[0];set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true;
				} else {
					if (d[i] != 'inherit') ff += d[i];
				}
			}if (ff != '') f.fontFamily = ff;
			return f;
		};
	}();

	// points and paths
	svg.ToNumberArray = function (s) {
		var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');
		for (var i = 0; i < a.length; i++) {
			a[i] = parseFloat(a[i]);
		}
		return a;
	};
	svg.Point = function (x, y) {
		this.x = x;
		this.y = y;
	};
	svg.Point.prototype.angleTo = function (p) {
		return Math.atan2(p.y - this.y, p.x - this.x);
	};

	svg.Point.prototype.applyTransform = function (v) {
		var xp = this.x * v[0] + this.y * v[2] + v[4];
		var yp = this.x * v[1] + this.y * v[3] + v[5];
		this.x = xp;
		this.y = yp;
	};

	svg.CreatePoint = function (s) {
		var a = svg.ToNumberArray(s);
		return new svg.Point(a[0], a[1]);
	};
	svg.CreatePath = function (s) {
		var a = svg.ToNumberArray(s);
		var path = [];
		for (var i = 0; i < a.length; i += 2) {
			path.push(new svg.Point(a[i], a[i + 1]));
		}
		return path;
	};

	// bounding box
	svg.BoundingBox = function (x1, y1, x2, y2) {
		// pass in initial points if you want
		this.x1 = Number.NaN;
		this.y1 = Number.NaN;
		this.x2 = Number.NaN;
		this.y2 = Number.NaN;

		this.x = function () {
			return this.x1;
		};
		this.y = function () {
			return this.y1;
		};
		this.width = function () {
			return this.x2 - this.x1;
		};
		this.height = function () {
			return this.y2 - this.y1;
		};

		this.addPoint = function (x, y) {
			if (x != null) {
				if (isNaN(this.x1) || isNaN(this.x2)) {
					this.x1 = x;
					this.x2 = x;
				}
				if (x < this.x1) this.x1 = x;
				if (x > this.x2) this.x2 = x;
			}

			if (y != null) {
				if (isNaN(this.y1) || isNaN(this.y2)) {
					this.y1 = y;
					this.y2 = y;
				}
				if (y < this.y1) this.y1 = y;
				if (y > this.y2) this.y2 = y;
			}
		};
		this.addX = function (x) {
			this.addPoint(x, null);
		};
		this.addY = function (y) {
			this.addPoint(null, y);
		};

		this.addBoundingBox = function (bb) {
			this.addPoint(bb.x1, bb.y1);
			this.addPoint(bb.x2, bb.y2);
		};

		this.addQuadraticCurve = function (p0x, p0y, p1x, p1y, p2x, p2y) {
			var cp1x = p0x + 2 / 3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)
			var cp1y = p0y + 2 / 3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)
			var cp2x = cp1x + 1 / 3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)
			var cp2y = cp1y + 1 / 3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)
			this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
		};

		this.addBezierCurve = function (p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
			// from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
			var p0 = [p0x, p0y],
			    p1 = [p1x, p1y],
			    p2 = [p2x, p2y],
			    p3 = [p3x, p3y];
			this.addPoint(p0[0], p0[1]);
			this.addPoint(p3[0], p3[1]);

			for (var i = 0; i <= 1; i++) {
				var f = function f(t) {
					return Math.pow(1 - t, 3) * p0[i] + 3 * Math.pow(1 - t, 2) * t * p1[i] + 3 * (1 - t) * Math.pow(t, 2) * p2[i] + Math.pow(t, 3) * p3[i];
				};

				var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
				var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
				var c = 3 * p1[i] - 3 * p0[i];

				if (a == 0) {
					if (b == 0) continue;
					var t = -c / b;
					if (0 < t && t < 1) {
						if (i == 0) this.addX(f(t));
						if (i == 1) this.addY(f(t));
					}
					continue;
				}

				var b2ac = Math.pow(b, 2) - 4 * c * a;
				if (b2ac < 0) continue;
				var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
				if (0 < t1 && t1 < 1) {
					if (i == 0) this.addX(f(t1));
					if (i == 1) this.addY(f(t1));
				}
				var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
				if (0 < t2 && t2 < 1) {
					if (i == 0) this.addX(f(t2));
					if (i == 1) this.addY(f(t2));
				}
			}
		};

		this.isPointInBox = function (x, y) {
			return this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2;
		};

		this.addPoint(x1, y1);
		this.addPoint(x2, y2);
	};

	// transforms
	svg.Transform = function (v) {
		var that = this;
		this.Type = {};

		// translate
		this.Type.translate = function (s) {
			this.p = svg.CreatePoint(s);
			this.apply = function (ctx) {
				ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
			};
			this.unapply = function (ctx) {
				ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
			};
			this.applyToPoint = function (p) {
				p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
			};
		};

		// rotate
		this.Type.rotate = function (s) {
			var a = svg.ToNumberArray(s);
			this.angle = new svg.Property('angle', a[0]);
			this.cx = a[1] || 0;
			this.cy = a[2] || 0;
			this.apply = function (ctx) {
				ctx.translate(this.cx, this.cy);
				ctx.rotate(this.angle.toRadians());
				ctx.translate(-this.cx, -this.cy);
			};
			this.unapply = function (ctx) {
				ctx.translate(this.cx, this.cy);
				ctx.rotate(-1.0 * this.angle.toRadians());
				ctx.translate(-this.cx, -this.cy);
			};
			this.applyToPoint = function (p) {
				var a = this.angle.toRadians();
				p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
				p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]);
				p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
			};
		};

		this.Type.scale = function (s) {
			this.p = svg.CreatePoint(s);
			this.apply = function (ctx) {
				ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
			};
			this.unapply = function (ctx) {
				ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
			};
			this.applyToPoint = function (p) {
				p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
			};
		};

		this.Type.matrix = function (s) {
			this.m = svg.ToNumberArray(s);
			this.apply = function (ctx) {
				ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
			};
			this.unapply = function (ctx) {
				var a = this.m[0];
				var b = this.m[2];
				var c = this.m[4];
				var d = this.m[1];
				var e = this.m[3];
				var f = this.m[5];
				var g = 0.0;
				var h = 0.0;
				var i = 1.0;
				var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
				ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
			};
			this.applyToPoint = function (p) {
				p.applyTransform(this.m);
			};
		};

		this.Type.SkewBase = function (s) {
			this.base = that.Type.matrix;
			this.base(s);
			this.angle = new svg.Property('angle', s);
		};
		this.Type.SkewBase.prototype = new this.Type.matrix();

		this.Type.skewX = function (s) {
			this.base = that.Type.SkewBase;
			this.base(s);
			this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
		};
		this.Type.skewX.prototype = new this.Type.SkewBase();

		this.Type.skewY = function (s) {
			this.base = that.Type.SkewBase;
			this.base(s);
			this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
		};
		this.Type.skewY.prototype = new this.Type.SkewBase();

		this.transforms = [];

		this.apply = function (ctx) {
			for (var i = 0; i < this.transforms.length; i++) {
				this.transforms[i].apply(ctx);
			}
		};

		this.unapply = function (ctx) {
			for (var i = this.transforms.length - 1; i >= 0; i--) {
				this.transforms[i].unapply(ctx);
			}
		};

		this.applyToPoint = function (p) {
			for (var i = 0; i < this.transforms.length; i++) {
				this.transforms[i].applyToPoint(p);
			}
		};

		var data = svg.trim(svg.compressSpaces(v)).replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g, ') ').split(/\s(?=[a-z])/);
		for (var i = 0; i < data.length; i++) {
			var type = svg.trim(data[i].split('(')[0]);
			var s = data[i].split('(')[1].replace(')', '');
			var transformType = this.Type[type];
			if (typeof transformType != 'undefined') {
				var transform = new transformType(s);
				transform.type = type;
				this.transforms.push(transform);
			}
		}
	};

	// aspect ratio
	svg.AspectRatio = function (ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
		// aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
		aspectRatio = svg.compressSpaces(aspectRatio);
		aspectRatio = aspectRatio.replace(/^defer\s/, ''); // ignore defer
		var align = aspectRatio.split(' ')[0] || 'xMidYMid';
		var meetOrSlice = aspectRatio.split(' ')[1] || 'meet';

		// calculate scale
		var scaleX = width / desiredWidth;
		var scaleY = height / desiredHeight;
		var scaleMin = Math.min(scaleX, scaleY);
		var scaleMax = Math.max(scaleX, scaleY);
		if (meetOrSlice == 'meet') {
			desiredWidth *= scaleMin;desiredHeight *= scaleMin;
		}
		if (meetOrSlice == 'slice') {
			desiredWidth *= scaleMax;desiredHeight *= scaleMax;
		}

		refX = new svg.Property('refX', refX);
		refY = new svg.Property('refY', refY);
		if (refX.hasValue() && refY.hasValue()) {
			ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
		} else {
			// align
			if (align.match(/^xMid/) && (meetOrSlice == 'meet' && scaleMin == scaleY || meetOrSlice == 'slice' && scaleMax == scaleY)) ctx.translate(width / 2.0 - desiredWidth / 2.0, 0);
			if (align.match(/YMid$/) && (meetOrSlice == 'meet' && scaleMin == scaleX || meetOrSlice == 'slice' && scaleMax == scaleX)) ctx.translate(0, height / 2.0 - desiredHeight / 2.0);
			if (align.match(/^xMax/) && (meetOrSlice == 'meet' && scaleMin == scaleY || meetOrSlice == 'slice' && scaleMax == scaleY)) ctx.translate(width - desiredWidth, 0);
			if (align.match(/YMax$/) && (meetOrSlice == 'meet' && scaleMin == scaleX || meetOrSlice == 'slice' && scaleMax == scaleX)) ctx.translate(0, height - desiredHeight);
		}

		// scale
		if (align == 'none') ctx.scale(scaleX, scaleY);else if (meetOrSlice == 'meet') ctx.scale(scaleMin, scaleMin);else if (meetOrSlice == 'slice') ctx.scale(scaleMax, scaleMax);

		// translate
		ctx.translate(minX == null ? 0 : -minX, minY == null ? 0 : -minY);
	};

	// elements
	svg.Element = {};

	svg.EmptyProperty = new svg.Property('EMPTY', '');

	svg.Element.ElementBase = function (node) {
		this.attributes = {};
		this.styles = {};
		this.stylesSpecificity = {};
		this.children = [];

		// get or create attribute
		this.attribute = function (name, createIfNotExists) {
			var a = this.attributes[name];
			if (a != null) return a;

			if (createIfNotExists == true) {
				a = new svg.Property(name, '');this.attributes[name] = a;
			}
			return a || svg.EmptyProperty;
		};

		this.getHrefAttribute = function () {
			for (var a in this.attributes) {
				if (a == 'href' || a.match(/:href$/)) {
					return this.attributes[a];
				}
			}
			return svg.EmptyProperty;
		};

		// get or create style, crawls up node tree
		this.style = function (name, createIfNotExists, skipAncestors) {
			var s = this.styles[name];
			if (s != null) return s;

			var a = this.attribute(name);
			if (a != null && a.hasValue()) {
				this.styles[name] = a; // move up to me to cache
				return a;
			}

			if (skipAncestors != true) {
				var p = this.parent;
				if (p != null) {
					var ps = p.style(name);
					if (ps != null && ps.hasValue()) {
						return ps;
					}
				}
			}

			if (createIfNotExists == true) {
				s = new svg.Property(name, '');this.styles[name] = s;
			}
			return s || svg.EmptyProperty;
		};

		// base render
		this.render = function (ctx) {
			// don't render display=none
			if (this.style('display').value == 'none') return;

			// don't render visibility=hidden
			if (this.style('visibility').value == 'hidden') return;

			ctx.save();
			if (this.style('mask').hasValue()) {
				// mask
				var mask = this.style('mask').getDefinition();
				if (mask != null) mask.apply(ctx, this);
			} else if (this.style('filter').hasValue()) {
				// filter
				var filter = this.style('filter').getDefinition();
				if (filter != null) filter.apply(ctx, this);
			} else {
				this.setContext(ctx);
				this.renderChildren(ctx);
				this.clearContext(ctx);
			}
			ctx.restore();
		};

		// base set context
		this.setContext = function (ctx) {}
		// OVERRIDE ME!


		// base clear context
		;this.clearContext = function (ctx) {}
		// OVERRIDE ME!


		// base render children
		;this.renderChildren = function (ctx) {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].render(ctx);
			}
		};

		this.addChild = function (childNode, create) {
			var child = childNode;
			if (create) child = svg.CreateElement(childNode);
			child.parent = this;
			if (child.type != 'title') {
				this.children.push(child);
			}
		};

		this.addStylesFromStyleDefinition = function () {
			// add styles
			for (var selector in svg.Styles) {
				if (selector[0] != '@' && matchesSelector(node, selector)) {
					var styles = svg.Styles[selector];
					var specificity = svg.StylesSpecificity[selector];
					if (styles != null) {
						for (var name in styles) {
							var existingSpecificity = this.stylesSpecificity[name];
							if (typeof existingSpecificity == 'undefined') {
								existingSpecificity = '000';
							}
							if (specificity > existingSpecificity) {
								this.styles[name] = styles[name];
								this.stylesSpecificity[name] = specificity;
							}
						}
					}
				}
			}
		};

		if (node != null && node.nodeType == 1) {
			//ELEMENT_NODE
			// add attributes
			for (var i = 0; i < node.attributes.length; i++) {
				var attribute = node.attributes[i];
				this.attributes[attribute.nodeName] = new svg.Property(attribute.nodeName, attribute.value);
			}

			this.addStylesFromStyleDefinition();

			// add inline styles
			if (this.attribute('style').hasValue()) {
				var styles = this.attribute('style').value.split(';');
				for (var i = 0; i < styles.length; i++) {
					if (svg.trim(styles[i]) != '') {
						var style = styles[i].split(':');
						var name = svg.trim(style[0]);
						var value = svg.trim(style[1]);
						this.styles[name] = new svg.Property(name, value);
					}
				}
			}

			// add id
			if (this.attribute('id').hasValue()) {
				if (svg.Definitions[this.attribute('id').value] == null) {
					svg.Definitions[this.attribute('id').value] = this;
				}
			}

			// add children
			for (var i = 0; i < node.childNodes.length; i++) {
				var childNode = node.childNodes[i];
				if (childNode.nodeType == 1) this.addChild(childNode, true); //ELEMENT_NODE
				if (this.captureTextNodes && (childNode.nodeType == 3 || childNode.nodeType == 4)) {
					var text = childNode.value || childNode.text || childNode.textContent || '';
					if (svg.compressSpaces(text) != '') {
						this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
					}
				}
			}
		}
	};

	svg.Element.RenderedElementBase = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.setContext = function (ctx) {
			// fill
			if (this.style('fill').isUrlDefinition()) {
				var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
				if (fs != null) ctx.fillStyle = fs;
			} else if (this.style('fill').hasValue()) {
				var fillStyle = this.style('fill');
				if (fillStyle.value == 'currentColor') fillStyle.value = this.style('color').value;
				if (fillStyle.value != 'inherit') ctx.fillStyle = fillStyle.value == 'none' ? 'rgba(0,0,0,0)' : fillStyle.value;
			}
			if (this.style('fill-opacity').hasValue()) {
				var fillStyle = new svg.Property('fill', ctx.fillStyle);
				fillStyle = fillStyle.addOpacity(this.style('fill-opacity'));
				ctx.fillStyle = fillStyle.value;
			}

			// stroke
			if (this.style('stroke').isUrlDefinition()) {
				var fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));
				if (fs != null) ctx.strokeStyle = fs;
			} else if (this.style('stroke').hasValue()) {
				var strokeStyle = this.style('stroke');
				if (strokeStyle.value == 'currentColor') strokeStyle.value = this.style('color').value;
				if (strokeStyle.value != 'inherit') ctx.strokeStyle = strokeStyle.value == 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value;
			}
			if (this.style('stroke-opacity').hasValue()) {
				var strokeStyle = new svg.Property('stroke', ctx.strokeStyle);
				strokeStyle = strokeStyle.addOpacity(this.style('stroke-opacity'));
				ctx.strokeStyle = strokeStyle.value;
			}
			if (this.style('stroke-width').hasValue()) {
				var newLineWidth = this.style('stroke-width').toPixels();
				ctx.lineWidth = newLineWidth == 0 ? 0.001 : newLineWidth; // browsers don't respect 0
			}
			if (this.style('stroke-linecap').hasValue()) ctx.lineCap = this.style('stroke-linecap').value;
			if (this.style('stroke-linejoin').hasValue()) ctx.lineJoin = this.style('stroke-linejoin').value;
			if (this.style('stroke-miterlimit').hasValue()) ctx.miterLimit = this.style('stroke-miterlimit').value;
			if (this.style('stroke-dasharray').hasValue() && this.style('stroke-dasharray').value != 'none') {
				var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);
				if (typeof ctx.setLineDash != 'undefined') {
					ctx.setLineDash(gaps);
				} else if (typeof ctx.webkitLineDash != 'undefined') {
					ctx.webkitLineDash = gaps;
				} else if (typeof ctx.mozDash != 'undefined' && !(gaps.length == 1 && gaps[0] == 0)) {
					ctx.mozDash = gaps;
				}

				var offset = this.style('stroke-dashoffset').numValueOrDefault(1);
				if (typeof ctx.lineDashOffset != 'undefined') {
					ctx.lineDashOffset = offset;
				} else if (typeof ctx.webkitLineDashOffset != 'undefined') {
					ctx.webkitLineDashOffset = offset;
				} else if (typeof ctx.mozDashOffset != 'undefined') {
					ctx.mozDashOffset = offset;
				}
			}

			// font
			if (typeof ctx.font != 'undefined') {
				ctx.font = svg.Font.CreateFont(this.style('font-style').value, this.style('font-variant').value, this.style('font-weight').value, this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '', this.style('font-family').value).toString();
			}

			// transform
			if (this.style('transform', false, true).hasValue()) {
				var transform = new svg.Transform(this.style('transform', false, true).value);
				transform.apply(ctx);
			}

			// clip
			if (this.style('clip-path', false, true).hasValue()) {
				var clip = this.style('clip-path', false, true).getDefinition();
				if (clip != null) clip.apply(ctx);
			}

			// opacity
			if (this.style('opacity').hasValue()) {
				ctx.globalAlpha = this.style('opacity').numValue();
			}
		};
	};
	svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase();

	svg.Element.PathElementBase = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.path = function (ctx) {
			if (ctx != null) ctx.beginPath();
			return new svg.BoundingBox();
		};

		this.renderChildren = function (ctx) {
			this.path(ctx);
			svg.Mouse.checkPath(this, ctx);
			if (ctx.fillStyle != '') {
				if (this.style('fill-rule').valueOrDefault('inherit') != 'inherit') {
					ctx.fill(this.style('fill-rule').value);
				} else {
					ctx.fill();
				}
			}
			if (ctx.strokeStyle != '') ctx.stroke();

			var markers = this.getMarkers();
			if (markers != null) {
				if (this.style('marker-start').isUrlDefinition()) {
					var marker = this.style('marker-start').getDefinition();
					marker.render(ctx, markers[0][0], markers[0][1]);
				}
				if (this.style('marker-mid').isUrlDefinition()) {
					var marker = this.style('marker-mid').getDefinition();
					for (var i = 1; i < markers.length - 1; i++) {
						marker.render(ctx, markers[i][0], markers[i][1]);
					}
				}
				if (this.style('marker-end').isUrlDefinition()) {
					var marker = this.style('marker-end').getDefinition();
					marker.render(ctx, markers[markers.length - 1][0], markers[markers.length - 1][1]);
				}
			}
		};

		this.getBoundingBox = function () {
			return this.path();
		};

		this.getMarkers = function () {
			return null;
		};
	};
	svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase();

	// svg element
	svg.Element.svg = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.baseClearContext = this.clearContext;
		this.clearContext = function (ctx) {
			this.baseClearContext(ctx);
			svg.ViewPort.RemoveCurrent();
		};

		this.baseSetContext = this.setContext;
		this.setContext = function (ctx) {
			// initial values and defaults
			ctx.strokeStyle = 'rgba(0,0,0,0)';
			ctx.lineCap = 'butt';
			ctx.lineJoin = 'miter';
			ctx.miterLimit = 4;
			if (typeof ctx.font != 'undefined' && typeof window.getComputedStyle != 'undefined') {
				ctx.font = window.getComputedStyle(ctx.canvas).getPropertyValue('font');
			}

			this.baseSetContext(ctx);

			// create new view port
			if (!this.attribute('x').hasValue()) this.attribute('x', true).value = 0;
			if (!this.attribute('y').hasValue()) this.attribute('y', true).value = 0;
			ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));

			var width = svg.ViewPort.width();
			var height = svg.ViewPort.height();

			if (!this.attribute('width').hasValue()) this.attribute('width', true).value = '100%';
			if (!this.attribute('height').hasValue()) this.attribute('height', true).value = '100%';
			if (typeof this.root == 'undefined') {
				width = this.attribute('width').toPixels('x');
				height = this.attribute('height').toPixels('y');

				var x = 0;
				var y = 0;
				if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
					x = -this.attribute('refX').toPixels('x');
					y = -this.attribute('refY').toPixels('y');
				}

				if (this.attribute('overflow').valueOrDefault('hidden') != 'visible') {
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.lineTo(width, y);
					ctx.lineTo(width, height);
					ctx.lineTo(x, height);
					ctx.closePath();
					ctx.clip();
				}
			}
			svg.ViewPort.SetCurrent(width, height);

			// viewbox
			if (this.attribute('viewBox').hasValue()) {
				var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
				var minX = viewBox[0];
				var minY = viewBox[1];
				width = viewBox[2];
				height = viewBox[3];

				svg.AspectRatio(ctx, this.attribute('preserveAspectRatio').value, svg.ViewPort.width(), width, svg.ViewPort.height(), height, minX, minY, this.attribute('refX').value, this.attribute('refY').value);

				svg.ViewPort.RemoveCurrent();
				svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
			}
		};
	};
	svg.Element.svg.prototype = new svg.Element.RenderedElementBase();

	// rect element
	svg.Element.rect = function (node) {
		this.base = svg.Element.PathElementBase;
		this.base(node);

		this.path = function (ctx) {
			var x = this.attribute('x').toPixels('x');
			var y = this.attribute('y').toPixels('y');
			var width = this.attribute('width').toPixels('x');
			var height = this.attribute('height').toPixels('y');
			var rx = this.attribute('rx').toPixels('x');
			var ry = this.attribute('ry').toPixels('y');
			if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
			if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
			rx = Math.min(rx, width / 2.0);
			ry = Math.min(ry, height / 2.0);
			if (ctx != null) {
				ctx.beginPath();
				ctx.moveTo(x + rx, y);
				ctx.lineTo(x + width - rx, y);
				ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
				ctx.lineTo(x + width, y + height - ry);
				ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
				ctx.lineTo(x + rx, y + height);
				ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
				ctx.lineTo(x, y + ry);
				ctx.quadraticCurveTo(x, y, x + rx, y);
				ctx.closePath();
			}

			return new svg.BoundingBox(x, y, x + width, y + height);
		};
	};
	svg.Element.rect.prototype = new svg.Element.PathElementBase();

	// circle element
	svg.Element.circle = function (node) {
		this.base = svg.Element.PathElementBase;
		this.base(node);

		this.path = function (ctx) {
			var cx = this.attribute('cx').toPixels('x');
			var cy = this.attribute('cy').toPixels('y');
			var r = this.attribute('r').toPixels();

			if (ctx != null) {
				ctx.beginPath();
				ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
				ctx.closePath();
			}

			return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
		};
	};
	svg.Element.circle.prototype = new svg.Element.PathElementBase();

	// ellipse element
	svg.Element.ellipse = function (node) {
		this.base = svg.Element.PathElementBase;
		this.base(node);

		this.path = function (ctx) {
			var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
			var rx = this.attribute('rx').toPixels('x');
			var ry = this.attribute('ry').toPixels('y');
			var cx = this.attribute('cx').toPixels('x');
			var cy = this.attribute('cy').toPixels('y');

			if (ctx != null) {
				ctx.beginPath();
				ctx.moveTo(cx, cy - ry);
				ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
				ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
				ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
				ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
				ctx.closePath();
			}

			return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
		};
	};
	svg.Element.ellipse.prototype = new svg.Element.PathElementBase();

	// line element
	svg.Element.line = function (node) {
		this.base = svg.Element.PathElementBase;
		this.base(node);

		this.getPoints = function () {
			return [new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')), new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
		};

		this.path = function (ctx) {
			var points = this.getPoints();

			if (ctx != null) {
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				ctx.lineTo(points[1].x, points[1].y);
			}

			return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
		};

		this.getMarkers = function () {
			var points = this.getPoints();
			var a = points[0].angleTo(points[1]);
			return [[points[0], a], [points[1], a]];
		};
	};
	svg.Element.line.prototype = new svg.Element.PathElementBase();

	// polyline element
	svg.Element.polyline = function (node) {
		this.base = svg.Element.PathElementBase;
		this.base(node);

		this.points = svg.CreatePath(this.attribute('points').value);
		this.path = function (ctx) {
			var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);
			if (ctx != null) {
				ctx.beginPath();
				ctx.moveTo(this.points[0].x, this.points[0].y);
			}
			for (var i = 1; i < this.points.length; i++) {
				bb.addPoint(this.points[i].x, this.points[i].y);
				if (ctx != null) ctx.lineTo(this.points[i].x, this.points[i].y);
			}
			return bb;
		};

		this.getMarkers = function () {
			var markers = [];
			for (var i = 0; i < this.points.length - 1; i++) {
				markers.push([this.points[i], this.points[i].angleTo(this.points[i + 1])]);
			}
			if (markers.length > 0) {
				markers.push([this.points[this.points.length - 1], markers[markers.length - 1][1]]);
			}
			return markers;
		};
	};
	svg.Element.polyline.prototype = new svg.Element.PathElementBase();

	// polygon element
	svg.Element.polygon = function (node) {
		this.base = svg.Element.polyline;
		this.base(node);

		this.basePath = this.path;
		this.path = function (ctx) {
			var bb = this.basePath(ctx);
			if (ctx != null) {
				ctx.lineTo(this.points[0].x, this.points[0].y);
				ctx.closePath();
			}
			return bb;
		};
	};
	svg.Element.polygon.prototype = new svg.Element.polyline();

	// path element
	svg.Element.path = function (node) {
		this.base = svg.Element.PathElementBase;
		this.base(node);

		var d = this.attribute('d').value;
		// TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
		d = d.replace(/,/gm, ' '); // get rid of all commas
		// As the end of a match can also be the start of the next match, we need to run this replace twice.
		for (var i = 0; i < 2; i++) {
			d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, '$1 $2');
		} // suffix commands with spaces
		d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, '$1 $2'); // prefix commands with spaces
		d = d.replace(/([0-9])([+\-])/gm, '$1 $2'); // separate digits on +- signs
		// Again, we need to run this twice to find all occurances
		for (var i = 0; i < 2; i++) {
			d = d.replace(/(\.[0-9]*)(\.)/gm, '$1 $2');
		} // separate digits when they start with a comma
		d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, '$1 $3 $4 '); // shorthand elliptical arc path syntax
		d = svg.compressSpaces(d); // compress multiple spaces
		d = svg.trim(d);
		this.PathParser = new function (d) {
			this.tokens = d.split(' ');

			this.reset = function () {
				this.i = -1;
				this.command = '';
				this.previousCommand = '';
				this.start = new svg.Point(0, 0);
				this.control = new svg.Point(0, 0);
				this.current = new svg.Point(0, 0);
				this.points = [];
				this.angles = [];
			};

			this.isEnd = function () {
				return this.i >= this.tokens.length - 1;
			};

			this.isCommandOrEnd = function () {
				if (this.isEnd()) return true;
				return this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
			};

			this.isRelativeCommand = function () {
				switch (this.command) {
					case 'm':
					case 'l':
					case 'h':
					case 'v':
					case 'c':
					case 's':
					case 'q':
					case 't':
					case 'a':
					case 'z':
						return true;
						break;
				}
				return false;
			};

			this.getToken = function () {
				this.i++;
				return this.tokens[this.i];
			};

			this.getScalar = function () {
				return parseFloat(this.getToken());
			};

			this.nextCommand = function () {
				this.previousCommand = this.command;
				this.command = this.getToken();
			};

			this.getPoint = function () {
				var p = new svg.Point(this.getScalar(), this.getScalar());
				return this.makeAbsolute(p);
			};

			this.getAsControlPoint = function () {
				var p = this.getPoint();
				this.control = p;
				return p;
			};

			this.getAsCurrentPoint = function () {
				var p = this.getPoint();
				this.current = p;
				return p;
			};

			this.getReflectedControlPoint = function () {
				if (this.previousCommand.toLowerCase() != 'c' && this.previousCommand.toLowerCase() != 's' && this.previousCommand.toLowerCase() != 'q' && this.previousCommand.toLowerCase() != 't') {
					return this.current;
				}

				// reflect point
				var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
				return p;
			};

			this.makeAbsolute = function (p) {
				if (this.isRelativeCommand()) {
					p.x += this.current.x;
					p.y += this.current.y;
				}
				return p;
			};

			this.addMarker = function (p, from, priorTo) {
				// if the last angle isn't filled in because we didn't have this point yet ...
				if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length - 1] == null) {
					this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(priorTo);
				}
				this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
			};

			this.addMarkerAngle = function (p, a) {
				this.points.push(p);
				this.angles.push(a);
			};

			this.getMarkerPoints = function () {
				return this.points;
			};
			this.getMarkerAngles = function () {
				for (var i = 0; i < this.angles.length; i++) {
					if (this.angles[i] == null) {
						for (var j = i + 1; j < this.angles.length; j++) {
							if (this.angles[j] != null) {
								this.angles[i] = this.angles[j];
								break;
							}
						}
					}
				}
				return this.angles;
			};
		}(d);

		this.path = function (ctx) {
			var pp = this.PathParser;
			pp.reset();

			var bb = new svg.BoundingBox();
			if (ctx != null) ctx.beginPath();
			while (!pp.isEnd()) {
				pp.nextCommand();
				switch (pp.command) {
					case 'M':
					case 'm':
						var p = pp.getAsCurrentPoint();
						pp.addMarker(p);
						bb.addPoint(p.x, p.y);
						if (ctx != null) ctx.moveTo(p.x, p.y);
						pp.start = pp.current;
						while (!pp.isCommandOrEnd()) {
							var p = pp.getAsCurrentPoint();
							pp.addMarker(p, pp.start);
							bb.addPoint(p.x, p.y);
							if (ctx != null) ctx.lineTo(p.x, p.y);
						}
						break;
					case 'L':
					case 'l':
						while (!pp.isCommandOrEnd()) {
							var c = pp.current;
							var p = pp.getAsCurrentPoint();
							pp.addMarker(p, c);
							bb.addPoint(p.x, p.y);
							if (ctx != null) ctx.lineTo(p.x, p.y);
						}
						break;
					case 'H':
					case 'h':
						while (!pp.isCommandOrEnd()) {
							var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
							pp.addMarker(newP, pp.current);
							pp.current = newP;
							bb.addPoint(pp.current.x, pp.current.y);
							if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
						}
						break;
					case 'V':
					case 'v':
						while (!pp.isCommandOrEnd()) {
							var newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
							pp.addMarker(newP, pp.current);
							pp.current = newP;
							bb.addPoint(pp.current.x, pp.current.y);
							if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
						}
						break;
					case 'C':
					case 'c':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var p1 = pp.getPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, p1);
							bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'S':
					case 's':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var p1 = pp.getReflectedControlPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, p1);
							bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'Q':
					case 'q':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, cntrl);
							bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'T':
					case 't':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var cntrl = pp.getReflectedControlPoint();
							pp.control = cntrl;
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, cntrl);
							bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'A':
					case 'a':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var rx = pp.getScalar();
							var ry = pp.getScalar();
							var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
							var largeArcFlag = pp.getScalar();
							var sweepFlag = pp.getScalar();
							var cp = pp.getAsCurrentPoint();

							// Conversion from endpoint to center parameterization
							// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
							// x1', y1'
							var currp = new svg.Point(Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0, -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0);
							// adjust radii
							var l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);
							if (l > 1) {
								rx *= Math.sqrt(l);
								ry *= Math.sqrt(l);
							}
							// cx', cy'
							var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(currp.y, 2) - Math.pow(ry, 2) * Math.pow(currp.x, 2)) / (Math.pow(rx, 2) * Math.pow(currp.y, 2) + Math.pow(ry, 2) * Math.pow(currp.x, 2)));
							if (isNaN(s)) s = 0;
							var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
							// cx, cy
							var centp = new svg.Point((curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y);
							// vector magnitude
							var m = function m(v) {
								return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
							};
							// ratio between two vectors
							var r = function r(u, v) {
								return (u[0] * v[0] + u[1] * v[1]) / (m(u) * m(v));
							};
							// angle between two vectors
							var a = function a(u, v) {
								return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(r(u, v));
							};
							// initial angle
							var a1 = a([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]);
							// angle delta
							var u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
							var v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
							var ad = a(u, v);
							if (r(u, v) <= -1) ad = Math.PI;
							if (r(u, v) >= 1) ad = 0;

							// for markers
							var dir = 1 - sweepFlag ? 1.0 : -1.0;
							var ah = a1 + dir * (ad / 2.0);
							var halfWay = new svg.Point(centp.x + rx * Math.cos(ah), centp.y + ry * Math.sin(ah));
							pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
							pp.addMarkerAngle(cp, ah - dir * Math.PI);

							bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better
							if (ctx != null) {
								var r = rx > ry ? rx : ry;
								var sx = rx > ry ? 1 : rx / ry;
								var sy = rx > ry ? ry / rx : 1;

								ctx.translate(centp.x, centp.y);
								ctx.rotate(xAxisRotation);
								ctx.scale(sx, sy);
								ctx.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
								ctx.scale(1 / sx, 1 / sy);
								ctx.rotate(-xAxisRotation);
								ctx.translate(-centp.x, -centp.y);
							}
						}
						break;
					case 'Z':
					case 'z':
						if (ctx != null) ctx.closePath();
						pp.current = pp.start;
				}
			}

			return bb;
		};

		this.getMarkers = function () {
			var points = this.PathParser.getMarkerPoints();
			var angles = this.PathParser.getMarkerAngles();

			var markers = [];
			for (var i = 0; i < points.length; i++) {
				markers.push([points[i], angles[i]]);
			}
			return markers;
		};
	};
	svg.Element.path.prototype = new svg.Element.PathElementBase();

	// pattern element
	svg.Element.pattern = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.createPattern = function (ctx, element) {
			var width = this.attribute('width').toPixels('x', true);
			var height = this.attribute('height').toPixels('y', true);

			// render me using a temporary svg element
			var tempSvg = new svg.Element.svg();
			tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
			tempSvg.attributes['width'] = new svg.Property('width', width + 'px');
			tempSvg.attributes['height'] = new svg.Property('height', height + 'px');
			tempSvg.attributes['transform'] = new svg.Property('transform', this.attribute('patternTransform').value);
			tempSvg.children = this.children;

			var c = document.createElement('canvas');
			c.width = width;
			c.height = height;
			var cctx = c.getContext('2d');
			if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
				cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
			}
			// render 3x3 grid so when we transform there's no white space on edges
			for (var x = -1; x <= 1; x++) {
				for (var y = -1; y <= 1; y++) {
					cctx.save();
					tempSvg.attributes['x'] = new svg.Property('x', x * c.width);
					tempSvg.attributes['y'] = new svg.Property('y', y * c.height);
					tempSvg.render(cctx);
					cctx.restore();
				}
			}
			var pattern = ctx.createPattern(c, 'repeat');
			return pattern;
		};
	};
	svg.Element.pattern.prototype = new svg.Element.ElementBase();

	// marker element
	svg.Element.marker = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.baseRender = this.render;
		this.render = function (ctx, point, angle) {
			ctx.translate(point.x, point.y);
			if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(angle);
			if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(ctx.lineWidth, ctx.lineWidth);
			ctx.save();

			// render me using a temporary svg element
			var tempSvg = new svg.Element.svg();
			tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
			tempSvg.attributes['refX'] = new svg.Property('refX', this.attribute('refX').value);
			tempSvg.attributes['refY'] = new svg.Property('refY', this.attribute('refY').value);
			tempSvg.attributes['width'] = new svg.Property('width', this.attribute('markerWidth').value);
			tempSvg.attributes['height'] = new svg.Property('height', this.attribute('markerHeight').value);
			tempSvg.attributes['fill'] = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
			tempSvg.attributes['stroke'] = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
			tempSvg.children = this.children;
			tempSvg.render(ctx);

			ctx.restore();
			if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
			if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(-angle);
			ctx.translate(-point.x, -point.y);
		};
	};
	svg.Element.marker.prototype = new svg.Element.ElementBase();

	// definitions element
	svg.Element.defs = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.render = function (ctx) {
			// NOOP
		};
	};
	svg.Element.defs.prototype = new svg.Element.ElementBase();

	// base for gradients
	svg.Element.GradientBase = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.stops = [];
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child.type == 'stop') this.stops.push(child);
		}

		this.getGradient = function () {
			// OVERRIDE ME!
		};

		this.gradientUnits = function () {
			return this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
		};

		this.attributesToInherit = ['gradientUnits'];

		this.inheritStopContainer = function (stopsContainer) {
			for (var i = 0; i < this.attributesToInherit.length; i++) {
				var attributeToInherit = this.attributesToInherit[i];
				if (!this.attribute(attributeToInherit).hasValue() && stopsContainer.attribute(attributeToInherit).hasValue()) {
					this.attribute(attributeToInherit, true).value = stopsContainer.attribute(attributeToInherit).value;
				}
			}
		};

		this.createGradient = function (ctx, element, parentOpacityProp) {
			var stopsContainer = this;
			if (this.getHrefAttribute().hasValue()) {
				stopsContainer = this.getHrefAttribute().getDefinition();
				this.inheritStopContainer(stopsContainer);
			}

			var addParentOpacity = function addParentOpacity(color) {
				if (parentOpacityProp.hasValue()) {
					var p = new svg.Property('color', color);
					return p.addOpacity(parentOpacityProp).value;
				}
				return color;
			};

			var g = this.getGradient(ctx, element);
			if (g == null) return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color);
			for (var i = 0; i < stopsContainer.stops.length; i++) {
				g.addColorStop(stopsContainer.stops[i].offset, addParentOpacity(stopsContainer.stops[i].color));
			}

			if (this.attribute('gradientTransform').hasValue()) {
				// render as transformed pattern on temporary canvas
				var rootView = svg.ViewPort.viewPorts[0];

				var rect = new svg.Element.rect();
				rect.attributes['x'] = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS / 3.0);
				rect.attributes['y'] = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS / 3.0);
				rect.attributes['width'] = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
				rect.attributes['height'] = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);

				var group = new svg.Element.g();
				group.attributes['transform'] = new svg.Property('transform', this.attribute('gradientTransform').value);
				group.children = [rect];

				var tempSvg = new svg.Element.svg();
				tempSvg.attributes['x'] = new svg.Property('x', 0);
				tempSvg.attributes['y'] = new svg.Property('y', 0);
				tempSvg.attributes['width'] = new svg.Property('width', rootView.width);
				tempSvg.attributes['height'] = new svg.Property('height', rootView.height);
				tempSvg.children = [group];

				var c = document.createElement('canvas');
				c.width = rootView.width;
				c.height = rootView.height;
				var tempCtx = c.getContext('2d');
				tempCtx.fillStyle = g;
				tempSvg.render(tempCtx);
				return tempCtx.createPattern(c, 'no-repeat');
			}

			return g;
		};
	};
	svg.Element.GradientBase.prototype = new svg.Element.ElementBase();

	// linear gradient element
	svg.Element.linearGradient = function (node) {
		this.base = svg.Element.GradientBase;
		this.base(node);

		this.attributesToInherit.push('x1');
		this.attributesToInherit.push('y1');
		this.attributesToInherit.push('x2');
		this.attributesToInherit.push('y2');

		this.getGradient = function (ctx, element) {
			var bb = this.gradientUnits() == 'objectBoundingBox' ? element.getBoundingBox() : null;

			if (!this.attribute('x1').hasValue() && !this.attribute('y1').hasValue() && !this.attribute('x2').hasValue() && !this.attribute('y2').hasValue()) {
				this.attribute('x1', true).value = 0;
				this.attribute('y1', true).value = 0;
				this.attribute('x2', true).value = 1;
				this.attribute('y2', true).value = 0;
			}

			var x1 = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('x1').numValue() : this.attribute('x1').toPixels('x');
			var y1 = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('y1').numValue() : this.attribute('y1').toPixels('y');
			var x2 = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('x2').numValue() : this.attribute('x2').toPixels('x');
			var y2 = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('y2').numValue() : this.attribute('y2').toPixels('y');

			if (x1 == x2 && y1 == y2) return null;
			return ctx.createLinearGradient(x1, y1, x2, y2);
		};
	};
	svg.Element.linearGradient.prototype = new svg.Element.GradientBase();

	// radial gradient element
	svg.Element.radialGradient = function (node) {
		this.base = svg.Element.GradientBase;
		this.base(node);

		this.attributesToInherit.push('cx');
		this.attributesToInherit.push('cy');
		this.attributesToInherit.push('r');
		this.attributesToInherit.push('fx');
		this.attributesToInherit.push('fy');

		this.getGradient = function (ctx, element) {
			var bb = element.getBoundingBox();

			if (!this.attribute('cx').hasValue()) this.attribute('cx', true).value = '50%';
			if (!this.attribute('cy').hasValue()) this.attribute('cy', true).value = '50%';
			if (!this.attribute('r').hasValue()) this.attribute('r', true).value = '50%';

			var cx = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('cx').numValue() : this.attribute('cx').toPixels('x');
			var cy = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('cy').numValue() : this.attribute('cy').toPixels('y');

			var fx = cx;
			var fy = cy;
			if (this.attribute('fx').hasValue()) {
				fx = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('fx').numValue() : this.attribute('fx').toPixels('x');
			}
			if (this.attribute('fy').hasValue()) {
				fy = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('fy').numValue() : this.attribute('fy').toPixels('y');
			}

			var r = this.gradientUnits() == 'objectBoundingBox' ? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue() : this.attribute('r').toPixels();

			return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
		};
	};
	svg.Element.radialGradient.prototype = new svg.Element.GradientBase();

	// gradient stop element
	svg.Element.stop = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.offset = this.attribute('offset').numValue();
		if (this.offset < 0) this.offset = 0;
		if (this.offset > 1) this.offset = 1;

		var stopColor = this.style('stop-color', true);
		if (stopColor.value == '') stopColor.value = '#000';
		if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity'));
		this.color = stopColor.value;
	};
	svg.Element.stop.prototype = new svg.Element.ElementBase();

	// animation base element
	svg.Element.AnimateBase = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		svg.Animations.push(this);

		this.duration = 0.0;
		this.begin = this.attribute('begin').toMilliseconds();
		this.maxDuration = this.begin + this.attribute('dur').toMilliseconds();

		this.getProperty = function () {
			var attributeType = this.attribute('attributeType').value;
			var attributeName = this.attribute('attributeName').value;

			if (attributeType == 'CSS') {
				return this.parent.style(attributeName, true);
			}
			return this.parent.attribute(attributeName, true);
		};

		this.initialValue = null;
		this.initialUnits = '';
		this.removed = false;

		this.calcValue = function () {
			// OVERRIDE ME!
			return '';
		};

		this.update = function (delta) {
			// set initial value
			if (this.initialValue == null) {
				this.initialValue = this.getProperty().value;
				this.initialUnits = this.getProperty().getUnits();
			}

			// if we're past the end time
			if (this.duration > this.maxDuration) {
				// loop for indefinitely repeating animations
				if (this.attribute('repeatCount').value == 'indefinite' || this.attribute('repeatDur').value == 'indefinite') {
					this.duration = 0.0;
				} else if (this.attribute('fill').valueOrDefault('remove') == 'freeze' && !this.frozen) {
					this.frozen = true;
					this.parent.animationFrozen = true;
					this.parent.animationFrozenValue = this.getProperty().value;
				} else if (this.attribute('fill').valueOrDefault('remove') == 'remove' && !this.removed) {
					this.removed = true;
					this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue;
					return true;
				}
				return false;
			}
			this.duration = this.duration + delta;

			// if we're past the begin time
			var updated = false;
			if (this.begin < this.duration) {
				var newValue = this.calcValue(); // tween

				if (this.attribute('type').hasValue()) {
					// for transform, etc.
					var type = this.attribute('type').value;
					newValue = type + '(' + newValue + ')';
				}

				this.getProperty().value = newValue;
				updated = true;
			}

			return updated;
		};

		this.from = this.attribute('from');
		this.to = this.attribute('to');
		this.values = this.attribute('values');
		if (this.values.hasValue()) this.values.value = this.values.value.split(';');

		// fraction of duration we've covered
		this.progress = function () {
			var ret = { progress: (this.duration - this.begin) / (this.maxDuration - this.begin) };
			if (this.values.hasValue()) {
				var p = ret.progress * (this.values.value.length - 1);
				var lb = Math.floor(p),
				    ub = Math.ceil(p);
				ret.from = new svg.Property('from', parseFloat(this.values.value[lb]));
				ret.to = new svg.Property('to', parseFloat(this.values.value[ub]));
				ret.progress = (p - lb) / (ub - lb);
			} else {
				ret.from = this.from;
				ret.to = this.to;
			}
			return ret;
		};
	};
	svg.Element.AnimateBase.prototype = new svg.Element.ElementBase();

	// animate element
	svg.Element.animate = function (node) {
		this.base = svg.Element.AnimateBase;
		this.base(node);

		this.calcValue = function () {
			var p = this.progress();

			// tween value linearly
			var newValue = p.from.numValue() + (p.to.numValue() - p.from.numValue()) * p.progress;
			return newValue + this.initialUnits;
		};
	};
	svg.Element.animate.prototype = new svg.Element.AnimateBase();

	// animate color element
	svg.Element.animateColor = function (node) {
		this.base = svg.Element.AnimateBase;
		this.base(node);

		this.calcValue = function () {
			var p = this.progress();
			var from = new RGBColor(p.from.value);
			var to = new RGBColor(p.to.value);

			if (from.ok && to.ok) {
				// tween color linearly
				var r = from.r + (to.r - from.r) * p.progress;
				var g = from.g + (to.g - from.g) * p.progress;
				var b = from.b + (to.b - from.b) * p.progress;
				return 'rgb(' + parseInt(r, 10) + ',' + parseInt(g, 10) + ',' + parseInt(b, 10) + ')';
			}
			return this.attribute('from').value;
		};
	};
	svg.Element.animateColor.prototype = new svg.Element.AnimateBase();

	// animate transform element
	svg.Element.animateTransform = function (node) {
		this.base = svg.Element.AnimateBase;
		this.base(node);

		this.calcValue = function () {
			var p = this.progress();

			// tween value linearly
			var from = svg.ToNumberArray(p.from.value);
			var to = svg.ToNumberArray(p.to.value);
			var newValue = '';
			for (var i = 0; i < from.length; i++) {
				newValue += from[i] + (to[i] - from[i]) * p.progress + ' ';
			}
			return newValue;
		};
	};
	svg.Element.animateTransform.prototype = new svg.Element.animate();

	// font element
	svg.Element.font = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.horizAdvX = this.attribute('horiz-adv-x').numValue();

		this.isRTL = false;
		this.isArabic = false;
		this.fontFace = null;
		this.missingGlyph = null;
		this.glyphs = [];
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child.type == 'font-face') {
				this.fontFace = child;
				if (child.style('font-family').hasValue()) {
					svg.Definitions[child.style('font-family').value] = this;
				}
			} else if (child.type == 'missing-glyph') this.missingGlyph = child;else if (child.type == 'glyph') {
				if (child.arabicForm != '') {
					this.isRTL = true;
					this.isArabic = true;
					if (typeof this.glyphs[child.unicode] == 'undefined') this.glyphs[child.unicode] = [];
					this.glyphs[child.unicode][child.arabicForm] = child;
				} else {
					this.glyphs[child.unicode] = child;
				}
			}
		}
	};
	svg.Element.font.prototype = new svg.Element.ElementBase();

	// font-face element
	svg.Element.fontface = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.ascent = this.attribute('ascent').value;
		this.descent = this.attribute('descent').value;
		this.unitsPerEm = this.attribute('units-per-em').numValue();
	};
	svg.Element.fontface.prototype = new svg.Element.ElementBase();

	// missing-glyph element
	svg.Element.missingglyph = function (node) {
		this.base = svg.Element.path;
		this.base(node);

		this.horizAdvX = 0;
	};
	svg.Element.missingglyph.prototype = new svg.Element.path();

	// glyph element
	svg.Element.glyph = function (node) {
		this.base = svg.Element.path;
		this.base(node);

		this.horizAdvX = this.attribute('horiz-adv-x').numValue();
		this.unicode = this.attribute('unicode').value;
		this.arabicForm = this.attribute('arabic-form').value;
	};
	svg.Element.glyph.prototype = new svg.Element.path();

	// text element
	svg.Element.text = function (node) {
		this.captureTextNodes = true;
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.baseSetContext = this.setContext;
		this.setContext = function (ctx) {
			this.baseSetContext(ctx);

			var textBaseline = this.style('dominant-baseline').toTextBaseline();
			if (textBaseline == null) textBaseline = this.style('alignment-baseline').toTextBaseline();
			if (textBaseline != null) ctx.textBaseline = textBaseline;
		};

		this.getBoundingBox = function () {
			var x = this.attribute('x').toPixels('x');
			var y = this.attribute('y').toPixels('y');
			var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
			return new svg.BoundingBox(x, y - fontSize, x + Math.floor(fontSize * 2.0 / 3.0) * this.children[0].getText().length, y);
		};

		this.renderChildren = function (ctx) {
			this.x = this.attribute('x').toPixels('x');
			this.y = this.attribute('y').toPixels('y');
			if (this.attribute('dx').hasValue()) this.x += this.attribute('dx').toPixels('x');
			if (this.attribute('dy').hasValue()) this.y += this.attribute('dy').toPixels('y');
			this.x += this.getAnchorDelta(ctx, this, 0);
			for (var i = 0; i < this.children.length; i++) {
				this.renderChild(ctx, this, this, i);
			}
		};

		this.getAnchorDelta = function (ctx, parent, startI) {
			var textAnchor = this.style('text-anchor').valueOrDefault('start');
			if (textAnchor != 'start') {
				var width = 0;
				for (var i = startI; i < parent.children.length; i++) {
					var child = parent.children[i];
					if (i > startI && child.attribute('x').hasValue()) break; // new group
					width += child.measureTextRecursive(ctx);
				}
				return -1 * (textAnchor == 'end' ? width : width / 2.0);
			}
			return 0;
		};

		this.renderChild = function (ctx, textParent, parent, i) {
			var child = parent.children[i];
			if (child.attribute('x').hasValue()) {
				child.x = child.attribute('x').toPixels('x') + textParent.getAnchorDelta(ctx, parent, i);
				if (child.attribute('dx').hasValue()) child.x += child.attribute('dx').toPixels('x');
			} else {
				if (child.attribute('dx').hasValue()) textParent.x += child.attribute('dx').toPixels('x');
				child.x = textParent.x;
			}
			textParent.x = child.x + child.measureText(ctx);

			if (child.attribute('y').hasValue()) {
				child.y = child.attribute('y').toPixels('y');
				if (child.attribute('dy').hasValue()) child.y += child.attribute('dy').toPixels('y');
			} else {
				if (child.attribute('dy').hasValue()) textParent.y += child.attribute('dy').toPixels('y');
				child.y = textParent.y;
			}
			textParent.y = child.y;

			child.render(ctx);

			for (var i = 0; i < child.children.length; i++) {
				textParent.renderChild(ctx, textParent, child, i);
			}
		};
	};
	svg.Element.text.prototype = new svg.Element.RenderedElementBase();

	// text base
	svg.Element.TextElementBase = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.getGlyph = function (font, text, i) {
			var c = text[i];
			var glyph = null;
			if (font.isArabic) {
				var arabicForm = 'isolated';
				if ((i == 0 || text[i - 1] == ' ') && i < text.length - 2 && text[i + 1] != ' ') arabicForm = 'terminal';
				if (i > 0 && text[i - 1] != ' ' && i < text.length - 2 && text[i + 1] != ' ') arabicForm = 'medial';
				if (i > 0 && text[i - 1] != ' ' && (i == text.length - 1 || text[i + 1] == ' ')) arabicForm = 'initial';
				if (typeof font.glyphs[c] != 'undefined') {
					glyph = font.glyphs[c][arabicForm];
					if (glyph == null && font.glyphs[c].type == 'glyph') glyph = font.glyphs[c];
				}
			} else {
				glyph = font.glyphs[c];
			}
			if (glyph == null) glyph = font.missingGlyph;
			return glyph;
		};

		this.renderChildren = function (ctx) {
			var customFont = this.parent.style('font-family').getDefinition();
			if (customFont != null) {
				var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
				var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
				var text = this.getText();
				if (customFont.isRTL) text = text.split("").reverse().join("");

				var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
				for (var i = 0; i < text.length; i++) {
					var glyph = this.getGlyph(customFont, text, i);
					var scale = fontSize / customFont.fontFace.unitsPerEm;
					ctx.translate(this.x, this.y);
					ctx.scale(scale, -scale);
					var lw = ctx.lineWidth;
					ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
					if (fontStyle == 'italic') ctx.transform(1, 0, .4, 1, 0, 0);
					glyph.render(ctx);
					if (fontStyle == 'italic') ctx.transform(1, 0, -.4, 1, 0, 0);
					ctx.lineWidth = lw;
					ctx.scale(1 / scale, -1 / scale);
					ctx.translate(-this.x, -this.y);

					this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;
					if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
						this.x += dx[i];
					}
				}
				return;
			}

			if (ctx.fillStyle != '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
			if (ctx.strokeStyle != '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
		};

		this.getText = function () {
			// OVERRIDE ME
		};

		this.measureTextRecursive = function (ctx) {
			var width = this.measureText(ctx);
			for (var i = 0; i < this.children.length; i++) {
				width += this.children[i].measureTextRecursive(ctx);
			}
			return width;
		};

		this.measureText = function (ctx) {
			var customFont = this.parent.style('font-family').getDefinition();
			if (customFont != null) {
				var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
				var measure = 0;
				var text = this.getText();
				if (customFont.isRTL) text = text.split("").reverse().join("");
				var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
				for (var i = 0; i < text.length; i++) {
					var glyph = this.getGlyph(customFont, text, i);
					measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
					if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
						measure += dx[i];
					}
				}
				return measure;
			}

			var textToMeasure = svg.compressSpaces(this.getText());
			if (!ctx.measureText) return textToMeasure.length * 10;

			ctx.save();
			this.setContext(ctx);
			var width = ctx.measureText(textToMeasure).width;
			ctx.restore();
			return width;
		};
	};
	svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase();

	// tspan
	svg.Element.tspan = function (node) {
		this.captureTextNodes = true;
		this.base = svg.Element.TextElementBase;
		this.base(node);

		this.text = svg.compressSpaces(node.value || node.text || node.textContent || '');
		this.getText = function () {
			// if this node has children, then they own the text
			if (this.children.length > 0) {
				return '';
			}
			return this.text;
		};
	};
	svg.Element.tspan.prototype = new svg.Element.TextElementBase();

	// tref
	svg.Element.tref = function (node) {
		this.base = svg.Element.TextElementBase;
		this.base(node);

		this.getText = function () {
			var element = this.getHrefAttribute().getDefinition();
			if (element != null) return element.children[0].getText();
		};
	};
	svg.Element.tref.prototype = new svg.Element.TextElementBase();

	// a element
	svg.Element.a = function (node) {
		this.base = svg.Element.TextElementBase;
		this.base(node);

		this.hasText = node.childNodes.length > 0;
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].nodeType != 3) this.hasText = false;
		}

		// this might contain text
		this.text = this.hasText ? node.childNodes[0].value : '';
		this.getText = function () {
			return this.text;
		};

		this.baseRenderChildren = this.renderChildren;
		this.renderChildren = function (ctx) {
			if (this.hasText) {
				// render as text element
				this.baseRenderChildren(ctx);
				var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
				svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.toPixels('y'), this.x + this.measureText(ctx), this.y));
			} else if (this.children.length > 0) {
				// render as temporary group
				var g = new svg.Element.g();
				g.children = this.children;
				g.parent = this;
				g.render(ctx);
			}
		};

		this.onclick = function () {
			window.open(this.getHrefAttribute().value);
		};

		this.onmousemove = function () {
			svg.ctx.canvas.style.cursor = 'pointer';
		};
	};
	svg.Element.a.prototype = new svg.Element.TextElementBase();

	// image element
	svg.Element.image = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		var href = this.getHrefAttribute().value;
		if (href == '') {
			return;
		}
		var isSvg = href.match(/\.svg$/);

		svg.Images.push(this);
		this.loaded = false;
		if (!isSvg) {
			this.img = document.createElement('img');
			if (svg.opts['useCORS'] == true) {
				this.img.crossOrigin = 'Anonymous';
			}
			var self = this;
			this.img.onload = function () {
				self.loaded = true;
			};
			this.img.onerror = function () {
				svg.log('ERROR: image "' + href + '" not found');self.loaded = true;
			};
			this.img.src = href;
		} else {
			this.img = svg.ajax(href);
			this.loaded = true;
		}

		this.renderChildren = function (ctx) {
			var x = this.attribute('x').toPixels('x');
			var y = this.attribute('y').toPixels('y');

			var width = this.attribute('width').toPixels('x');
			var height = this.attribute('height').toPixels('y');
			if (width == 0 || height == 0) return;

			ctx.save();
			if (isSvg) {
				ctx.drawSvg(this.img, x, y, width, height);
			} else {
				ctx.translate(x, y);
				svg.AspectRatio(ctx, this.attribute('preserveAspectRatio').value, width, this.img.width, height, this.img.height, 0, 0);
				ctx.drawImage(this.img, 0, 0);
			}
			ctx.restore();
		};

		this.getBoundingBox = function () {
			var x = this.attribute('x').toPixels('x');
			var y = this.attribute('y').toPixels('y');
			var width = this.attribute('width').toPixels('x');
			var height = this.attribute('height').toPixels('y');
			return new svg.BoundingBox(x, y, x + width, y + height);
		};
	};
	svg.Element.image.prototype = new svg.Element.RenderedElementBase();

	// group element
	svg.Element.g = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.getBoundingBox = function () {
			var bb = new svg.BoundingBox();
			for (var i = 0; i < this.children.length; i++) {
				bb.addBoundingBox(this.children[i].getBoundingBox());
			}
			return bb;
		};
	};
	svg.Element.g.prototype = new svg.Element.RenderedElementBase();

	// symbol element
	svg.Element.symbol = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.render = function (ctx) {
			// NO RENDER
		};
	};
	svg.Element.symbol.prototype = new svg.Element.RenderedElementBase();

	// style element
	svg.Element.style = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		// text, or spaces then CDATA
		var css = '';
		for (var i = 0; i < node.childNodes.length; i++) {
			css += node.childNodes[i].data;
		}
		css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments
		css = svg.compressSpaces(css); // replace whitespace
		var cssDefs = css.split('}');
		for (var i = 0; i < cssDefs.length; i++) {
			if (svg.trim(cssDefs[i]) != '') {
				var cssDef = cssDefs[i].split('{');
				var cssClasses = cssDef[0].split(',');
				var cssProps = cssDef[1].split(';');
				for (var j = 0; j < cssClasses.length; j++) {
					var cssClass = svg.trim(cssClasses[j]);
					if (cssClass != '') {
						var props = svg.Styles[cssClass] || {};
						for (var k = 0; k < cssProps.length; k++) {
							var prop = cssProps[k].indexOf(':');
							var name = cssProps[k].substr(0, prop);
							var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);
							if (name != null && value != null) {
								props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
							}
						}
						svg.Styles[cssClass] = props;
						svg.StylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
						if (cssClass == '@font-face') {
							var fontFamily = props['font-family'].value.replace(/"/g, '');
							var srcs = props['src'].value.split(',');
							for (var s = 0; s < srcs.length; s++) {
								if (srcs[s].indexOf('format("svg")') > 0) {
									var urlStart = srcs[s].indexOf('url');
									var urlEnd = srcs[s].indexOf(')', urlStart);
									var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
									var doc = svg.parseXml(svg.ajax(url));
									var fonts = doc.getElementsByTagName('font');
									for (var f = 0; f < fonts.length; f++) {
										var font = svg.CreateElement(fonts[f]);
										svg.Definitions[fontFamily] = font;
									}
								}
							}
						}
					}
				}
			}
		}
	};
	svg.Element.style.prototype = new svg.Element.ElementBase();

	// use element
	svg.Element.use = function (node) {
		this.base = svg.Element.RenderedElementBase;
		this.base(node);

		this.baseSetContext = this.setContext;
		this.setContext = function (ctx) {
			this.baseSetContext(ctx);
			if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').toPixels('x'), 0);
			if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').toPixels('y'));
		};

		var element = this.getHrefAttribute().getDefinition();

		this.path = function (ctx) {
			if (element != null) element.path(ctx);
		};

		this.getBoundingBox = function () {
			if (element != null) return element.getBoundingBox();
		};

		this.renderChildren = function (ctx) {
			if (element != null) {
				var tempSvg = element;
				if (element.type == 'symbol') {
					// render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
					tempSvg = new svg.Element.svg();
					tempSvg.type = 'svg';
					tempSvg.attributes['viewBox'] = new svg.Property('viewBox', element.attribute('viewBox').value);
					tempSvg.attributes['preserveAspectRatio'] = new svg.Property('preserveAspectRatio', element.attribute('preserveAspectRatio').value);
					tempSvg.attributes['overflow'] = new svg.Property('overflow', element.attribute('overflow').value);
					tempSvg.children = element.children;
				}
				if (tempSvg.type == 'svg') {
					// if symbol or svg, inherit width/height from me
					if (this.attribute('width').hasValue()) tempSvg.attributes['width'] = new svg.Property('width', this.attribute('width').value);
					if (this.attribute('height').hasValue()) tempSvg.attributes['height'] = new svg.Property('height', this.attribute('height').value);
				}
				var oldParent = tempSvg.parent;
				tempSvg.parent = null;
				tempSvg.render(ctx);
				tempSvg.parent = oldParent;
			}
		};
	};
	svg.Element.use.prototype = new svg.Element.RenderedElementBase();

	// mask element
	svg.Element.mask = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.apply = function (ctx, element) {
			// render as temp svg
			var x = this.attribute('x').toPixels('x');
			var y = this.attribute('y').toPixels('y');
			var width = this.attribute('width').toPixels('x');
			var height = this.attribute('height').toPixels('y');

			if (width == 0 && height == 0) {
				var bb = new svg.BoundingBox();
				for (var i = 0; i < this.children.length; i++) {
					bb.addBoundingBox(this.children[i].getBoundingBox());
				}
				var x = Math.floor(bb.x1);
				var y = Math.floor(bb.y1);
				var width = Math.floor(bb.width());
				var height = Math.floor(bb.height());
			}

			// temporarily remove mask to avoid recursion
			var mask = element.attribute('mask').value;
			element.attribute('mask').value = '';

			var cMask = document.createElement('canvas');
			cMask.width = x + width;
			cMask.height = y + height;
			var maskCtx = cMask.getContext('2d');
			this.renderChildren(maskCtx);

			var c = document.createElement('canvas');
			c.width = x + width;
			c.height = y + height;
			var tempCtx = c.getContext('2d');
			element.render(tempCtx);
			tempCtx.globalCompositeOperation = 'destination-in';
			tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
			tempCtx.fillRect(0, 0, x + width, y + height);

			ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
			ctx.fillRect(0, 0, x + width, y + height);

			// reassign mask
			element.attribute('mask').value = mask;
		};

		this.render = function (ctx) {
			// NO RENDER
		};
	};
	svg.Element.mask.prototype = new svg.Element.ElementBase();

	// clip element
	svg.Element.clipPath = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.apply = function (ctx) {
			var oldBeginPath = CanvasRenderingContext2D.prototype.beginPath;
			CanvasRenderingContext2D.prototype.beginPath = function () {};

			var oldClosePath = CanvasRenderingContext2D.prototype.closePath;
			CanvasRenderingContext2D.prototype.closePath = function () {};

			oldBeginPath.call(ctx);
			for (var i = 0; i < this.children.length; i++) {
				var child = this.children[i];
				if (typeof child.path != 'undefined') {
					var transform = null;
					if (child.style('transform', false, true).hasValue()) {
						transform = new svg.Transform(child.style('transform', false, true).value);
						transform.apply(ctx);
					}
					child.path(ctx);
					CanvasRenderingContext2D.prototype.closePath = oldClosePath;
					if (transform) {
						transform.unapply(ctx);
					}
				}
			}
			oldClosePath.call(ctx);
			ctx.clip();

			CanvasRenderingContext2D.prototype.beginPath = oldBeginPath;
			CanvasRenderingContext2D.prototype.closePath = oldClosePath;
		};

		this.render = function (ctx) {
			// NO RENDER
		};
	};
	svg.Element.clipPath.prototype = new svg.Element.ElementBase();

	// filters
	svg.Element.filter = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.apply = function (ctx, element) {
			// render as temp svg
			var bb = element.getBoundingBox();
			var x = Math.floor(bb.x1);
			var y = Math.floor(bb.y1);
			var width = Math.floor(bb.width());
			var height = Math.floor(bb.height());

			// temporarily remove filter to avoid recursion
			var filter = element.style('filter').value;
			element.style('filter').value = '';

			var px = 0,
			    py = 0;
			for (var i = 0; i < this.children.length; i++) {
				var efd = this.children[i].extraFilterDistance || 0;
				px = Math.max(px, efd);
				py = Math.max(py, efd);
			}

			var c = document.createElement('canvas');
			c.width = width + 2 * px;
			c.height = height + 2 * py;
			var tempCtx = c.getContext('2d');
			tempCtx.translate(-x + px, -y + py);
			element.render(tempCtx);

			// apply filters
			for (var i = 0; i < this.children.length; i++) {
				if (typeof this.children[i].apply == 'function') {
					this.children[i].apply(tempCtx, 0, 0, width + 2 * px, height + 2 * py);
				}
			}

			// render on me
			ctx.drawImage(c, 0, 0, width + 2 * px, height + 2 * py, x - px, y - py, width + 2 * px, height + 2 * py);

			// reassign filter
			element.style('filter', true).value = filter;
		};

		this.render = function (ctx) {
			// NO RENDER
		};
	};
	svg.Element.filter.prototype = new svg.Element.ElementBase();

	svg.Element.feMorphology = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.apply = function (ctx, x, y, width, height) {
			// TODO: implement
		};
	};
	svg.Element.feMorphology.prototype = new svg.Element.ElementBase();

	svg.Element.feComposite = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.apply = function (ctx, x, y, width, height) {
			// TODO: implement
		};
	};
	svg.Element.feComposite.prototype = new svg.Element.ElementBase();

	svg.Element.feColorMatrix = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		var matrix = svg.ToNumberArray(this.attribute('values').value);
		switch (this.attribute('type').valueOrDefault('matrix')) {// http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
			case 'saturate':
				var s = matrix[0];
				matrix = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
				break;
			case 'hueRotate':
				var a = matrix[0] * Math.PI / 180.0;
				var c = function c(m1, m2, m3) {
					return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
				};
				matrix = [c(0.213, 0.787, -0.213), c(0.715, -0.715, -0.715), c(0.072, -0.072, 0.928), 0, 0, c(0.213, -0.213, 0.143), c(0.715, 0.285, 0.140), c(0.072, -0.072, -0.283), 0, 0, c(0.213, -0.213, -0.787), c(0.715, -0.715, 0.715), c(0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
				break;
			case 'luminanceToAlpha':
				matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
				break;
		}

		function imGet(img, x, y, width, height, rgba) {
			return img[y * width * 4 + x * 4 + rgba];
		}

		function imSet(img, x, y, width, height, rgba, val) {
			img[y * width * 4 + x * 4 + rgba] = val;
		}

		function m(i, v) {
			var mi = matrix[i];
			return mi * (mi < 0 ? v - 255 : v);
		}

		this.apply = function (ctx, x, y, width, height) {
			// assuming x==0 && y==0 for now
			var srcData = ctx.getImageData(0, 0, width, height);
			for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					var r = imGet(srcData.data, x, y, width, height, 0);
					var g = imGet(srcData.data, x, y, width, height, 1);
					var b = imGet(srcData.data, x, y, width, height, 2);
					var a = imGet(srcData.data, x, y, width, height, 3);
					imSet(srcData.data, x, y, width, height, 0, m(0, r) + m(1, g) + m(2, b) + m(3, a) + m(4, 1));
					imSet(srcData.data, x, y, width, height, 1, m(5, r) + m(6, g) + m(7, b) + m(8, a) + m(9, 1));
					imSet(srcData.data, x, y, width, height, 2, m(10, r) + m(11, g) + m(12, b) + m(13, a) + m(14, 1));
					imSet(srcData.data, x, y, width, height, 3, m(15, r) + m(16, g) + m(17, b) + m(18, a) + m(19, 1));
				}
			}
			ctx.clearRect(0, 0, width, height);
			ctx.putImageData(srcData, 0, 0);
		};
	};
	svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase();

	svg.Element.feGaussianBlur = function (node) {
		this.base = svg.Element.ElementBase;
		this.base(node);

		this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
		this.extraFilterDistance = this.blurRadius;

		this.apply = function (ctx, x, y, width, height) {
			if (typeof stackblur.canvasRGBA == 'undefined') {
				svg.log('ERROR: StackBlur.js must be included for blur to work');
				return;
			}

			// StackBlur requires canvas be on document
			ctx.canvas.id = svg.UniqueId();
			ctx.canvas.style.display = 'none';
			document.body.appendChild(ctx.canvas);
			stackblur.canvasRGBA(ctx.canvas.id, x, y, width, height, this.blurRadius);
			document.body.removeChild(ctx.canvas);
		};
	};
	svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase();

	// title element, do nothing
	svg.Element.title = function (node) {};
	svg.Element.title.prototype = new svg.Element.ElementBase();

	// desc element, do nothing
	svg.Element.desc = function (node) {};
	svg.Element.desc.prototype = new svg.Element.ElementBase();

	svg.Element.MISSING = function (node) {
		svg.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
	};
	svg.Element.MISSING.prototype = new svg.Element.ElementBase();

	// element factory
	svg.CreateElement = function (node) {
		var className = node.nodeName.replace(/^[^:]+:/, ''); // remove namespace
		className = className.replace(/\-/g, ''); // remove dashes
		var e = null;
		if (typeof svg.Element[className] != 'undefined') {
			e = new svg.Element[className](node);
		} else {
			e = new svg.Element.MISSING(node);
		}

		e.type = node.nodeName;
		return e;
	};

	// load from url
	svg.load = function (ctx, url) {
		svg.loadXml(ctx, svg.ajax(url));
	};

	// load from xml
	svg.loadXml = function (ctx, xml) {
		svg.loadXmlDoc(ctx, svg.parseXml(xml));
	};

	svg.loadXmlDoc = function (ctx, dom) {
		svg.init(ctx);

		var mapXY = function mapXY(p) {
			var e = ctx.canvas;
			while (e) {
				p.x -= e.offsetLeft;
				p.y -= e.offsetTop;
				e = e.offsetParent;
			}
			if (window.scrollX) p.x += window.scrollX;
			if (window.scrollY) p.y += window.scrollY;
			return p;
		};

		// bind mouse
		if (svg.opts['ignoreMouse'] != true) {
			ctx.canvas.onclick = function (e) {
				var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
				svg.Mouse.onclick(p.x, p.y);
			};
			ctx.canvas.onmousemove = function (e) {
				var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
				svg.Mouse.onmousemove(p.x, p.y);
			};
		}

		var e = svg.CreateElement(dom.documentElement);
		e.root = true;
		e.addStylesFromStyleDefinition();

		// render loop
		var isFirstRender = true;
		var draw = function draw() {
			svg.ViewPort.Clear();
			if (ctx.canvas.parentNode) svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);

			if (svg.opts['ignoreDimensions'] != true) {
				// set canvas size
				if (e.style('width').hasValue()) {
					ctx.canvas.width = e.style('width').toPixels('x');
					ctx.canvas.style.width = ctx.canvas.width + 'px';
				}
				if (e.style('height').hasValue()) {
					ctx.canvas.height = e.style('height').toPixels('y');
					ctx.canvas.style.height = ctx.canvas.height + 'px';
				}
			}
			var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
			var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
			if (svg.opts['ignoreDimensions'] == true && e.style('width').hasValue() && e.style('height').hasValue()) {
				cWidth = e.style('width').toPixels('x');
				cHeight = e.style('height').toPixels('y');
			}
			svg.ViewPort.SetCurrent(cWidth, cHeight);

			if (svg.opts['offsetX'] != null) e.attribute('x', true).value = svg.opts['offsetX'];
			if (svg.opts['offsetY'] != null) e.attribute('y', true).value = svg.opts['offsetY'];
			if (svg.opts['scaleWidth'] != null || svg.opts['scaleHeight'] != null) {
				var xRatio = null,
				    yRatio = null,
				    viewBox = svg.ToNumberArray(e.attribute('viewBox').value);

				if (svg.opts['scaleWidth'] != null) {
					if (e.attribute('width').hasValue()) xRatio = e.attribute('width').toPixels('x') / svg.opts['scaleWidth'];else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / svg.opts['scaleWidth'];
				}

				if (svg.opts['scaleHeight'] != null) {
					if (e.attribute('height').hasValue()) yRatio = e.attribute('height').toPixels('y') / svg.opts['scaleHeight'];else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / svg.opts['scaleHeight'];
				}

				if (xRatio == null) {
					xRatio = yRatio;
				}
				if (yRatio == null) {
					yRatio = xRatio;
				}

				e.attribute('width', true).value = svg.opts['scaleWidth'];
				e.attribute('height', true).value = svg.opts['scaleHeight'];
				e.style('transform', true, true).value += ' scale(' + 1.0 / xRatio + ',' + 1.0 / yRatio + ')';
			}

			// clear and render
			if (svg.opts['ignoreClear'] != true) {
				ctx.clearRect(0, 0, cWidth, cHeight);
			}
			e.render(ctx);
			if (isFirstRender) {
				isFirstRender = false;
				if (typeof svg.opts['renderCallback'] == 'function') svg.opts['renderCallback'](dom);
			}
		};

		var waitingForImages = true;
		if (svg.ImagesLoaded()) {
			waitingForImages = false;
			draw();
		}
		svg.intervalID = setInterval(function () {
			var needUpdate = false;

			if (waitingForImages && svg.ImagesLoaded()) {
				waitingForImages = false;
				needUpdate = true;
			}

			// need update from mouse events?
			if (svg.opts['ignoreMouse'] != true) {
				needUpdate = needUpdate | svg.Mouse.hasEvents();
			}

			// need update from animations?
			if (svg.opts['ignoreAnimation'] != true) {
				for (var i = 0; i < svg.Animations.length; i++) {
					needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
				}
			}

			// need update from redraw?
			if (typeof svg.opts['forceRedraw'] == 'function') {
				if (svg.opts['forceRedraw']() == true) needUpdate = true;
			}

			// render if needed
			if (needUpdate) {
				draw();
				svg.Mouse.runEvents(); // run and clear our events
			}
		}, 1000 / svg.FRAMERATE);
	};

	svg.stop = function () {
		if (svg.intervalID) {
			clearInterval(svg.intervalID);
		}
	};

	svg.Mouse = new function () {
		this.events = [];
		this.hasEvents = function () {
			return this.events.length != 0;
		};

		this.onclick = function (x, y) {
			this.events.push({ type: 'onclick', x: x, y: y,
				run: function run(e) {
					if (e.onclick) e.onclick();
				}
			});
		};

		this.onmousemove = function (x, y) {
			this.events.push({ type: 'onmousemove', x: x, y: y,
				run: function run(e) {
					if (e.onmousemove) e.onmousemove();
				}
			});
		};

		this.eventElements = [];

		this.checkPath = function (element, ctx) {
			for (var i = 0; i < this.events.length; i++) {
				var e = this.events[i];
				if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) this.eventElements[i] = element;
			}
		};

		this.checkBoundingBox = function (element, bb) {
			for (var i = 0; i < this.events.length; i++) {
				var e = this.events[i];
				if (bb.isPointInBox(e.x, e.y)) this.eventElements[i] = element;
			}
		};

		this.runEvents = function () {
			svg.ctx.canvas.style.cursor = '';

			for (var i = 0; i < this.events.length; i++) {
				var e = this.events[i];
				var element = this.eventElements[i];
				while (element) {
					e.run(element);
					element = element.parent;
				}
			}

			// done running, clear
			this.events = [];
			this.eventElements = [];
		};
	}();

	return svg;
};

module.exports = canvg;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src, dest) {
	for (var p in src) {
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class, Super) {
	var pt = Class.prototype;
	if (Object.create) {
		var ppt = Object.create(Super.prototype);
		pt.__proto__ = ppt;
	}
	if (!(pt instanceof Super)) {
		var t = function t() {};

		;
		t.prototype = Super.prototype;
		t = new t();
		copy(pt, t);
		Class.prototype = pt = t;
	}
	if (pt.constructor != Class) {
		if (typeof Class != 'function') {
			console.error("unknow Class:" + Class);
		}
		pt.constructor = Class;
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml';
// Node Types
var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
//level2
var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);

function DOMException(code, message) {
	if (message instanceof Error) {
		var error = message;
	} else {
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if (message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {};
NodeList.prototype = {
	/**
  * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
  * @standard level1
  */
	length: 0,
	/**
  * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
  * @standard level1
  * @param index  unsigned long 
  *   Index into the collection.
  * @return Node
  * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
  */
	item: function item(index) {
		return this[index] || null;
	},
	toString: function toString(isHTML, nodeFilter) {
		for (var buf = [], i = 0; i < this.length; i++) {
			serializeToString(this[i], buf, isHTML, nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node, refresh) {
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}
function _updateLiveList(list) {
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if (list._inc != inc) {
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list, 'length', ls.length);
		copy(ls, list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function (i) {
	_updateLiveList(this);
	return this[i];
};

_extends(LiveNodeList, NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {};

function _findNodeIndex(list, node) {
	var i = list.length;
	while (i--) {
		if (list[i] === node) {
			return i;
		}
	}
}

function _addNamedNode(el, list, newAttr, oldAttr) {
	if (oldAttr) {
		list[_findNodeIndex(list, oldAttr)] = newAttr;
	} else {
		list[list.length++] = newAttr;
	}
	if (el) {
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if (doc) {
			oldAttr && _onRemoveAttribute(doc, el, oldAttr);
			_onAddAttribute(doc, el, newAttr);
		}
	}
}
function _removeNamedNode(el, list, attr) {
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list, attr);
	if (i >= 0) {
		var lastIndex = list.length - 1;
		while (i < lastIndex) {
			list[i] = list[++i];
		}
		list.length = lastIndex;
		if (el) {
			var doc = el.ownerDocument;
			if (doc) {
				_onRemoveAttribute(doc, el, attr);
				attr.ownerElement = null;
			}
		}
	} else {
		throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr));
	}
}
NamedNodeMap.prototype = {
	length: 0,
	item: NodeList.prototype.item,
	getNamedItem: function getNamedItem(key) {
		//		if(key.indexOf(':')>0 || key == 'xmlns'){
		//			return null;
		//		}
		//console.log()
		var i = this.length;
		while (i--) {
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if (attr.nodeName == key) {
				return attr;
			}
		}
	},
	setNamedItem: function setNamedItem(attr) {
		var el = attr.ownerElement;
		if (el && el != this._ownerElement) {
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement, this, attr, oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function setNamedItemNS(attr) {
		// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement,
		    oldAttr;
		if (el && el != this._ownerElement) {
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
		_addNamedNode(this._ownerElement, this, attr, oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function removeNamedItem(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement, this, attr);
		return attr;
	}, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

	//for level2
	removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
		var attr = this.getNamedItemNS(namespaceURI, localName);
		_removeNamedNode(this._ownerElement, this, attr);
		return attr;
	},
	getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
		var i = this.length;
		while (i--) {
			var node = this[i];
			if (node.localName == localName && node.namespaceURI == namespaceURI) {
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation( /* Object */features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function hasFeature( /* string */feature, /* string */version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {
		// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if (doctype) {
			doc.appendChild(doctype);
		}
		if (qualifiedName) {
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
		// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;

		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {};

Node.prototype = {
	firstChild: null,
	lastChild: null,
	previousSibling: null,
	nextSibling: null,
	attributes: null,
	parentNode: null,
	childNodes: null,
	ownerDocument: null,
	nodeValue: null,
	namespaceURI: null,
	prefix: null,
	localName: null,
	// Modified in DOM Level 2:
	insertBefore: function insertBefore(newChild, refChild) {
		//raises 
		return _insertBefore(this, newChild, refChild);
	},
	replaceChild: function replaceChild(newChild, oldChild) {
		//raises 
		this.insertBefore(newChild, oldChild);
		if (oldChild) {
			this.removeChild(oldChild);
		}
	},
	removeChild: function removeChild(oldChild) {
		return _removeChild(this, oldChild);
	},
	appendChild: function appendChild(newChild) {
		return this.insertBefore(newChild, null);
	},
	hasChildNodes: function hasChildNodes() {
		return this.firstChild != null;
	},
	cloneNode: function cloneNode(deep) {
		return _cloneNode(this.ownerDocument || this, this, deep);
	},
	// Modified in DOM Level 2:
	normalize: function normalize() {
		var child = this.firstChild;
		while (child) {
			var next = child.nextSibling;
			if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
				this.removeChild(next);
				child.appendData(next.data);
			} else {
				child.normalize();
				child = next;
			}
		}
	},
	// Introduced in DOM Level 2:
	isSupported: function isSupported(feature, version) {
		return this.ownerDocument.implementation.hasFeature(feature, version);
	},
	// Introduced in DOM Level 2:
	hasAttributes: function hasAttributes() {
		return this.attributes.length > 0;
	},
	lookupPrefix: function lookupPrefix(namespaceURI) {
		var el = this;
		while (el) {
			var map = el._nsMap;
			//console.dir(map)
			if (map) {
				for (var n in map) {
					if (map[n] == namespaceURI) {
						return n;
					}
				}
			}
			el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
		}
		return null;
	},
	// Introduced in DOM Level 3:
	lookupNamespaceURI: function lookupNamespaceURI(prefix) {
		var el = this;
		while (el) {
			var map = el._nsMap;
			//console.dir(map)
			if (map) {
				if (prefix in map) {
					return map[prefix];
				}
			}
			el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
		}
		return null;
	},
	// Introduced in DOM Level 3:
	isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
		var prefix = this.lookupPrefix(namespaceURI);
		return prefix == null;
	}
};

function _xmlEncoder(c) {
	return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + c.charCodeAt() + ';';
}

copy(NodeType, Node);
copy(NodeType, Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
	if (callback(node)) {
		return true;
	}
	if (node = node.firstChild) {
		do {
			if (_visitNode(node, callback)) {
				return true;
			}
		} while (node = node.nextSibling);
	}
}

function Document() {}
function _onAddAttribute(doc, el, newAttr) {
	doc && doc._inc++;
	var ns = newAttr.namespaceURI;
	if (ns == 'http://www.w3.org/2000/xmlns/') {
		//update namespace
		el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
	}
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
	doc && doc._inc++;
	var ns = newAttr.namespaceURI;
	if (ns == 'http://www.w3.org/2000/xmlns/') {
		//update namespace
		delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
	}
}
function _onUpdateChild(doc, el, newChild) {
	if (doc && doc._inc) {
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if (newChild) {
			cs[cs.length++] = newChild;
		} else {
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while (child) {
				cs[i++] = child;
				child = child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode, child) {
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if (previous) {
		previous.nextSibling = next;
	} else {
		parentNode.firstChild = next;
	}
	if (next) {
		next.previousSibling = previous;
	} else {
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument, parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
	var cp = newChild.parentNode;
	if (cp) {
		cp.removeChild(newChild); //remove and update
	}
	if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	} else {
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;

	if (pre) {
		pre.nextSibling = newFirst;
	} else {
		parentNode.firstChild = newFirst;
	}
	if (nextChild == null) {
		parentNode.lastChild = newLast;
	} else {
		nextChild.previousSibling = newLast;
	}
	do {
		newFirst.parentNode = parentNode;
	} while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
	_onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode, newChild) {
	var cp = newChild.parentNode;
	if (cp) {
		var pre = parentNode.lastChild;
		cp.removeChild(newChild); //remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if (pre) {
		pre.nextSibling = newChild;
	} else {
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName: '#document',
	nodeType: DOCUMENT_NODE,
	doctype: null,
	documentElement: null,
	_inc: 1,

	insertBefore: function insertBefore(newChild, refChild) {
		//raises 
		if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
			var child = newChild.firstChild;
			while (child) {
				var next = child.nextSibling;
				this.insertBefore(child, refChild);
				child = next;
			}
			return newChild;
		}
		if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
			this.documentElement = newChild;
		}

		return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
	},
	removeChild: function removeChild(oldChild) {
		if (this.documentElement == oldChild) {
			this.documentElement = null;
		}
		return _removeChild(this, oldChild);
	},
	// Introduced in DOM Level 2:
	importNode: function importNode(importedNode, deep) {
		return _importNode(this, importedNode, deep);
	},
	// Introduced in DOM Level 2:
	getElementById: function getElementById(id) {
		var rtv = null;
		_visitNode(this.documentElement, function (node) {
			if (node.nodeType == ELEMENT_NODE) {
				if (node.getAttribute('id') == id) {
					rtv = node;
					return true;
				}
			}
		});
		return rtv;
	},

	//document factory method:
	createElement: function createElement(tagName) {
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs = node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment: function createDocumentFragment() {
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode: function createTextNode(data) {
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createComment: function createComment(data) {
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createCDATASection: function createCDATASection(data) {
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createProcessingInstruction: function createProcessingInstruction(target, data) {
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue = node.data = data;
		return node;
	},
	createAttribute: function createAttribute(name) {
		var node = new Attr();
		node.ownerDocument = this;
		node.name = name;
		node.nodeName = name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference: function createEntityReference(name) {
		var node = new EntityReference();
		node.ownerDocument = this;
		node.nodeName = name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS: function createElementNS(namespaceURI, qualifiedName) {
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs = node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if (pl.length == 2) {
			node.prefix = pl[0];
			node.localName = pl[1];
		} else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if (pl.length == 2) {
			node.prefix = pl[0];
			node.localName = pl[1];
		} else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document, Node);

function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType: ELEMENT_NODE,
	hasAttribute: function hasAttribute(name) {
		return this.getAttributeNode(name) != null;
	},
	getAttribute: function getAttribute(name) {
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode: function getAttributeNode(name) {
		return this.attributes.getNamedItem(name);
	},
	setAttribute: function setAttribute(name, value) {
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	removeAttribute: function removeAttribute(name) {
		var attr = this.getAttributeNode(name);
		attr && this.removeAttributeNode(attr);
	},

	//four real opeartion method
	appendChild: function appendChild(newChild) {
		if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
			return this.insertBefore(newChild, null);
		} else {
			return _appendSingleChild(this, newChild);
		}
	},
	setAttributeNode: function setAttributeNode(newAttr) {
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode: function removeAttributeNode(oldAttr) {
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
		return this.getAttributeNodeNS(namespaceURI, localName) != null;
	},
	getAttributeNS: function getAttributeNS(namespaceURI, localName) {
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	getElementsByTagName: function getElementsByTagName(tagName) {
		return new LiveNodeList(this, function (base) {
			var ls = [];
			_visitNode(base, function (node) {
				if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
		return new LiveNodeList(this, function (base) {
			var ls = [];
			_visitNode(base, function (node) {
				if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
					ls.push(node);
				}
			});
			return ls;
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

_extends(Element, Node);
function Attr() {};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node);

function CharacterData() {};
CharacterData.prototype = {
	data: '',
	substringData: function substringData(offset, count) {
		return this.data.substring(offset, offset + count);
	},
	appendData: function appendData(text) {
		text = this.data + text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function insertData(offset, text) {
		this.replaceData(offset, 0, text);
	},
	appendChild: function appendChild(newChild) {
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
	},
	deleteData: function deleteData(offset, count) {
		this.replaceData(offset, count, "");
	},
	replaceData: function replaceData(offset, count, text) {
		var start = this.data.substring(0, offset);
		var end = this.data.substring(offset + count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
};
_extends(CharacterData, Node);
function Text() {};
Text.prototype = {
	nodeName: "#text",
	nodeType: TEXT_NODE,
	splitText: function splitText(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if (this.parentNode) {
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
};
_extends(Text, CharacterData);
function Comment() {};
Comment.prototype = {
	nodeName: "#comment",
	nodeType: COMMENT_NODE
};
_extends(Comment, CharacterData);

function CDATASection() {};
CDATASection.prototype = {
	nodeName: "#cdata-section",
	nodeType: CDATA_SECTION_NODE
};
_extends(CDATASection, CharacterData);

function DocumentType() {};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node);

function Notation() {};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node);

function Entity() {};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node);

function EntityReference() {};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node);

function DocumentFragment() {};
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node);

function ProcessingInstruction() {}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, Node);
function XMLSerializer() {}
XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
	return nodeSerializeToString.call(node, isHtml, nodeFilter);
};
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml, nodeFilter) {
	var buf = [];
	var refNode = this.nodeType == 9 ? this.documentElement : this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;

	if (uri && prefix == null) {
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if (prefix == null) {
			//isHTML = true;
			var visibleNamespaces = [{ namespace: uri, prefix: null
				//{namespace:uri,prefix:''}
			}];
		}
	}
	serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	if (!prefix && !uri) {
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == 'http://www.w3.org/2000/xmlns/') {
		return false;
	}

	var i = visibleNamespaces.length;
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix) {
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
	if (nodeFilter) {
		node = nodeFilter(node);
		if (node) {
			if (typeof node == 'string') {
				buf.push(node);
				return;
			}
		} else {
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch (node.nodeType) {
		case ELEMENT_NODE:
			if (!visibleNamespaces) visibleNamespaces = [];
			var startVisibleNamespaces = visibleNamespaces.length;
			var attrs = node.attributes;
			var len = attrs.length;
			var child = node.firstChild;
			var nodeName = node.tagName;

			isHTML = htmlns === node.namespaceURI || isHTML;
			buf.push('<', nodeName);

			for (var i = 0; i < len; i++) {
				// add namespaces for attributes
				var attr = attrs.item(i);
				if (attr.prefix == 'xmlns') {
					visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
				} else if (attr.nodeName == 'xmlns') {
					visibleNamespaces.push({ prefix: '', namespace: attr.value });
				}
			}
			for (var i = 0; i < len; i++) {
				var attr = attrs.item(i);
				if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
					var prefix = attr.prefix || '';
					var uri = attr.namespaceURI;
					var ns = prefix ? ' xmlns:' + prefix : " xmlns";
					buf.push(ns, '="', uri, '"');
					visibleNamespaces.push({ prefix: prefix, namespace: uri });
				}
				serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
			}
			// add namespace for current node		
			if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
				var prefix = node.prefix || '';
				var uri = node.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="', uri, '"');
				visibleNamespaces.push({ prefix: prefix, namespace: uri });
			}

			if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
				buf.push('>');
				//if is cdata child node
				if (isHTML && /^script$/i.test(nodeName)) {
					while (child) {
						if (child.data) {
							buf.push(child.data);
						} else {
							serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
						}
						child = child.nextSibling;
					}
				} else {
					while (child) {
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
						child = child.nextSibling;
					}
				}
				buf.push('</', nodeName, '>');
			} else {
				buf.push('/>');
			}
			// remove added visible namespaces
			//visibleNamespaces.length = startVisibleNamespaces;
			return;
		case DOCUMENT_NODE:
		case DOCUMENT_FRAGMENT_NODE:
			var child = node.firstChild;
			while (child) {
				serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
				child = child.nextSibling;
			}
			return;
		case ATTRIBUTE_NODE:
			return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
		case TEXT_NODE:
			return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
		case CDATA_SECTION_NODE:
			return buf.push('<![CDATA[', node.data, ']]>');
		case COMMENT_NODE:
			return buf.push("<!--", node.data, "-->");
		case DOCUMENT_TYPE_NODE:
			var pubid = node.publicId;
			var sysid = node.systemId;
			buf.push('<!DOCTYPE ', node.name);
			if (pubid) {
				buf.push(' PUBLIC "', pubid);
				if (sysid && sysid != '.') {
					buf.push('" "', sysid);
				}
				buf.push('">');
			} else if (sysid && sysid != '.') {
				buf.push(' SYSTEM "', sysid, '">');
			} else {
				var sub = node.internalSubset;
				if (sub) {
					buf.push(" [", sub, "]");
				}
				buf.push(">");
			}
			return;
		case PROCESSING_INSTRUCTION_NODE:
			return buf.push("<?", node.target, " ", node.data, "?>");
		case ENTITY_REFERENCE_NODE:
			return buf.push('&', node.nodeName, ';');
		//case ENTITY_NODE:
		//case NOTATION_NODE:
		default:
			buf.push('??', node.nodeName);
	}
}
function _importNode(doc, node, deep) {
	var node2;
	switch (node.nodeType) {
		case ELEMENT_NODE:
			node2 = node.cloneNode(false);
			node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
		//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
		case DOCUMENT_FRAGMENT_NODE:
			break;
		case ATTRIBUTE_NODE:
			deep = true;
			break;
		//case ENTITY_REFERENCE_NODE:
		//case PROCESSING_INSTRUCTION_NODE:
		////case TEXT_NODE:
		//case CDATA_SECTION_NODE:
		//case COMMENT_NODE:
		//	deep = false;
		//	break;
		//case DOCUMENT_NODE:
		//case DOCUMENT_TYPE_NODE:
		//cannot be imported.
		//case ENTITY_NODE:
		//case NOTATION_NODE：
		//can not hit in level3
		//default:throw e;
	}
	if (!node2) {
		node2 = node.cloneNode(false); //false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if (deep) {
		var child = node.firstChild;
		while (child) {
			node2.appendChild(_importNode(doc, child, deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function _cloneNode(doc, node, deep) {
	var node2 = new node.constructor();
	for (var n in node) {
		var v = node[n];
		if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) != 'object') {
			if (v != node2[n]) {
				node2[n] = v;
			}
		}
	}
	if (node.childNodes) {
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
		case ELEMENT_NODE:
			var attrs = node.attributes;
			var attrs2 = node2.attributes = new NamedNodeMap();
			var len = attrs.length;
			attrs2._ownerElement = node2;
			for (var i = 0; i < len; i++) {
				node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
			}
			break;;
		case ATTRIBUTE_NODE:
			deep = true;
	}
	if (deep) {
		var child = node.firstChild;
		while (child) {
			node2.appendChild(_cloneNode(doc, child, deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object, key, value) {
	object[key] = value;
}
//do dynamic
try {
	if (Object.defineProperty) {
		var getTextContent = function getTextContent(node) {
			switch (node.nodeType) {
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					var buf = [];
					node = node.firstChild;
					while (node) {
						if (node.nodeType !== 7 && node.nodeType !== 8) {
							buf.push(getTextContent(node));
						}
						node = node.nextSibling;
					}
					return buf.join('');
				default:
					return node.nodeValue;
			}
		};

		Object.defineProperty(LiveNodeList.prototype, 'length', {
			get: function get() {
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype, 'textContent', {
			get: function get() {
				return getTextContent(this);
			},
			set: function set(data) {
				switch (this.nodeType) {
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						while (this.firstChild) {
							this.removeChild(this.firstChild);
						}
						if (data || String(data)) {
							this.appendChild(this.ownerDocument.createTextNode(data));
						}
						break;
					default:
						//TODO:
						this.data = data;
						this.value = data;
						this.nodeValue = data;
				}
			}
		});

		__set__ = function __set__(object, key, value) {
			//console.log(value)
			object['$$' + key] = value;
		};
	}
} catch (e) {} //ie8


//if(typeof require == 'function'){
exports.DOMImplementation = DOMImplementation;
exports.XMLSerializer = XMLSerializer;
//}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Download;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(12);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Download(_ref) {
  var link = _ref.link,
      title = _ref.title,
      icon = _ref.icon;

  var iconSection = (0, _preact.h)(
    'span',
    { className: 'Download-icon' },
    (0, _preact.h)(_index2.default, { type: 'download', size: 'small' })
  );

  return (0, _preact.h)(
    'a',
    { href: link, className: 'Download', target: '_blank' },
    icon ? iconSection : null,
    (0, _preact.h)(
      'span',
      null,
      title
    )
  );
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(50);

__webpack_require__(51);

__webpack_require__(52);

__webpack_require__(53);

__webpack_require__(54);

__webpack_require__(57);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(82);

__webpack_require__(96);

__webpack_require__(106);

__webpack_require__(140);

__webpack_require__(143);

__webpack_require__(149);

__webpack_require__(157);

__webpack_require__(158);

__webpack_require__(160);

__webpack_require__(162);

__webpack_require__(168);

__webpack_require__(170);

__webpack_require__(176);

__webpack_require__(177);

__webpack_require__(185);

__webpack_require__(189);

__webpack_require__(200);

__webpack_require__(202);

__webpack_require__(204);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var classListProp = "classList",
			    protoProp = "prototype",
			    elemCtrProto = view.Element[protoProp],
			    objCtr = Object,
			    strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			    arrIndexOf = Array[protoProp].indexOf || function (item) {
				var i = 0,
				    len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			,
			    DOMEx = function DOMEx(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			},
			    ClassList = function ClassList(elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				    i = 0,
				    len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			    classListProto = ClassList[protoProp] = [],
			    classListGetter = function classListGetter() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false,
				    index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var result = this.contains(token),
				    method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(window.self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function () {
		"use strict";

		var testElement = document.createElement("_");

		testElement.classList.add("c1", "c2");

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains("c2")) {
			var createMethod = function createMethod(method) {
				var original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function (token) {
					var i,
					    len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle("c3", false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function (token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}

		testElement = null;
	})();
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = __webpack_require__(11);

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadStringQueries() {
  var object = _queryString2.default.parse(location.search);
  window.vulekamali = {};
  window.vulekamali.qs = object;
}

exports.default = loadStringQueries();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createComponentInterfaces() {
  window.componentInterfaces = {};
}

exports.default = createComponentInterfaces();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadGoogleAnalytics() {
  var _window$vulekamali$qs = window.vulekamali.qs,
      searchType = _window$vulekamali$qs.search_type,
      searchString = _window$vulekamali$qs.search_string;


  (0, _analyticsEvent2.default)('create', 'UA-93649482-8', 'auto');
  (0, _analyticsEvent2.default)('send', 'pageview');

  if (searchType && searchString) {
    (0, _analyticsEvent2.default)('send', 'event', 'search', searchType, searchString);
  }
}

exports.default = loadGoogleAnalytics();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _array = __webpack_require__(60);

var _array2 = _interopRequireDefault(_array);

var _promisePolyfill = __webpack_require__(74);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _arrayPrototype = __webpack_require__(77);

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _arrayPrototype3 = __webpack_require__(80);

var _arrayPrototype4 = _interopRequireDefault(_arrayPrototype3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function polyfillOldFeatures() {
  if (!window.Array.findIndex) {
    _arrayPrototype4.default.shim();
  }

  if (!window.Array.from) {
    window.Array.from = _array2.default;
  }

  if (!window.Promise) {
    window.Promise = _promisePolyfill2.default;
  }

  if (!Array.prototype.every) {
    Array.prototype = _extends({}, Array.protoype, {
      every: _arrayPrototype2.default
    });
  }

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }
}

exports.default = polyfillOldFeatures();

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);

var implementation = __webpack_require__(27);
var getPolyfill = __webpack_require__(34);
var shim = __webpack_require__(73);

// eslint-disable-next-line no-unused-vars
var boundFromShim = function from(array) {
	// eslint-disable-next-line no-invalid-this
	return implementation.apply(this || Array, arguments);
};

define(boundFromShim, {
	'getPolyfill': getPolyfill,
	'implementation': implementation,
	'shim': shim
});

module.exports = boundFromShim;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(62);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = function () {
	/* global window */
	if (typeof window === 'undefined') {
		return false;
	}
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}();
var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2);
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' && value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach(obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = __webpack_require__(15);
var toPrimitive = __webpack_require__(66);

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';

var $isNaN = __webpack_require__(29);
var $isFinite = __webpack_require__(30);
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = __webpack_require__(69);
var sign = __webpack_require__(31);
var mod = __webpack_require__(32);
var isPrimitive = __webpack_require__(70);
var parseInteger = parseInt;
var bind = __webpack_require__(16);
var arraySlice = bind.call(Function.call, Array.prototype.slice);
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, RegExp.prototype.exec);
var nonWS = ['\x85', '\u200B', '\uFFFE'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = ['\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003', '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028', '\u2029\uFEFF'].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function trim(value) {
	return replace(value, trimRegex, '');
};

var ES5 = __webpack_require__(33);

var hasRegExpMatcher = __webpack_require__(72);

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, Number);
		if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) {
			return 0;
		}
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) {
			return 0;
		}
		if (number >= 0xFF) {
			return 0xFF;
		}
		var f = Math.floor(argument);
		if (f + 0.5 < number) {
			return f + 1;
		}
		if (number < f + 0.5) {
			return f;
		}
		if (f % 2 !== 0) {
			return f + 1;
		}
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if ((typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) {
			return 0;
		} // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) {
			return MAX_SAFE_INTEGER;
		}
		return len;
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') {
			return -0;
		}
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) {
			return n;
		}
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) {
			return true;
		}
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || (typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || (typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return x === y || $isNaN(x) && $isNaN(y);
	},

	/**
  * 7.3.2 GetV (V, P)
  * 1. Assert: IsPropertyKey(P) is true.
  * 2. Let O be ToObject(V).
  * 3. ReturnIfAbrupt(O).
  * 4. Return O.[[Get]](P, V).
  */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
  * 7.3.9 - http://www.ecma-international.org/ecma-262/6.0/#sec-getmethod
  * 1. Assert: IsPropertyKey(P) is true.
  * 2. Let func be GetV(O, P).
  * 3. ReturnIfAbrupt(func).
  * 4. If func is either undefined or null, return undefined.
  * 5. If IsCallable(func) is false, throw a TypeError exception.
  * 6. Return func.
  */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
  * 7.3.1 Get (O, P) - http://www.ecma-international.org/ecma-262/6.0/#sec-get-o-p
  * 1. Assert: Type(O) is Object.
  * 2. Assert: IsPropertyKey(P) is true.
  * 3. Return O.[[Get]](P, O).
  */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && Symbol.species ? C[Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new TypeError('no constructor found');
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && _typeof(Symbol.isConcatSpreadable) === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && Symbol.species) {
				C = this.Get(C, Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = Object.getOwnPropertyDescriptor(O, P);
		var extensible = oldDesc || typeof Object.isExtensible !== 'function' || Object.isExtensible(O);
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new TypeError('unable to create data property');
		}
		return success;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new TypeError('Assertion failed: Type(S) is not String');
		}
		if (!this.IsInteger(index)) {
			throw new TypeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (index < 0 || index > MAX_SAFE_INTEGER) {
			throw new RangeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(unicode) is not Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if (index + 1 >= length) {
			return index + 1;
		}
		var first = S.charCodeAt(index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}
		var second = S.charCodeAt(index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}
		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function binder() {
        if (this instanceof bound) {
            var result = target.apply(this, args.concat(slice.call(arguments)));
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(that, args.concat(slice.call(arguments)));
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';

var isPrimitive = __webpack_require__(28);
var isCallable = __webpack_require__(17);
var isDate = __webpack_require__(67);
var isSymbol = __webpack_require__(68);

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || hint !== 'number' && hint !== 'string') {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

module.exports = function isDateObject(value) {
	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (_typeof(value.valueOf()) !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
module.exports = function assign(target, source) {
	if (Object.assign) {
		return Object.assign(target, source);
	}
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(28);

var isCallable = __webpack_require__(17);

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function DefaultValue(O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = __webpack_require__(15);
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

module.exports = function isRegex(value) {
	if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var getPolyfill = __webpack_require__(34);

module.exports = function shimArrayFrom() {
	var polyfill = getPolyfill();

	define(Array, { 'from': polyfill }, {
		'from': function from() {
			return Array.from !== polyfill;
		}
	});

	return polyfill;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }
})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(75).setImmediate))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(76);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(3)))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var ES = __webpack_require__(7);

var implementation = __webpack_require__(36);
var getPolyfill = __webpack_require__(37);
var polyfill = getPolyfill();
var shim = __webpack_require__(79);

var slice = Array.prototype.slice;

// eslint-disable-next-line no-unused-vars
var boundEveryShim = function every(array, callbackfn) {
	ES.RequireObjectCoercible(array);
	return polyfill.apply(array, slice.call(arguments, 1));
};
define(boundEveryShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundEveryShim;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') {
		return true;
	}
	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
		return false;
	}
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var getPolyfill = __webpack_require__(37);

module.exports = function shimArrayPrototypeEvery() {
	var polyfill = getPolyfill();
	define(Array.prototype, { every: polyfill }, { every: function every() {
			return Array.prototype.every !== polyfill;
		} });
	return polyfill;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var ES = __webpack_require__(7);

var implementation = __webpack_require__(38);
var getPolyfill = __webpack_require__(39);
var shim = __webpack_require__(81);

var slice = Array.prototype.slice;

var polyfill = getPolyfill();

var boundShim = function findIndex(array, predicate) {
	ES.RequireObjectCoercible(array);
	var args = slice.call(arguments, 1);
	return polyfill.apply(array, args);
};

define(boundShim, {
	implementation: implementation,
	getPolyfill: getPolyfill,
	shim: shim
});

module.exports = boundShim;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var getPolyfill = __webpack_require__(39);

module.exports = function shimArrayPrototypeFindIndex() {
	var polyfill = getPolyfill();

	define(Array.prototype, { findIndex: polyfill }, {
		findIndex: function findIndex() {
			return Array.prototype.findIndex !== polyfill;
		}
	});

	return polyfill;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _index = __webpack_require__(83);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function scripts() {
  var nodes = document.getElementsByClassName('js-initShare');
  var nodesArray = [].concat(_toConsumableArray(nodes));

  if (nodesArray.length > 0) {
    nodesArray.forEach(function (node) {
      (0, _preact.render)((0, _preact.h)(_index2.default, null), node);
    });
  }
}

exports.default = scripts();

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _ShareMarkup = __webpack_require__(84);

var _ShareMarkup2 = _interopRequireDefault(_ShareMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareContainer = function (_Component) {
  _inherits(ShareContainer, _Component);

  function ShareContainer(props) {
    _classCallCheck(this, ShareContainer);

    var _this = _possibleConstructorReturn(this, (ShareContainer.__proto__ || Object.getPrototypeOf(ShareContainer)).call(this, props));

    _this.state = {
      selected: 'copy',
      shareOpen: false,
      modal: false
    };

    _this.updateShare = _this.updateShare.bind(_this);
    _this.updateModal = _this.updateModal.bind(_this);
    return _this;
  }

  _createClass(ShareContainer, [{
    key: 'updateModal',
    value: function updateModal(state) {
      this.setState({ modal: state });
    }
  }, {
    key: 'updateShare',
    value: function updateShare(value) {
      if (this.state.shareOpen) {
        this.setState({ shareOpen: false });
        this.setState({ selected: value });
        return null;
      }

      return this.setState({ shareOpen: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_ShareMarkup2.default, _extends({}, this.state, { updateShare: this.updateShare, updateModal: this.updateModal }));
    }
  }]);

  return ShareContainer;
}(_preact.Component);

exports.default = ShareContainer;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShareMarkup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _Button = __webpack_require__(85);

var _Button2 = _interopRequireDefault(_Button);

var _index3 = __webpack_require__(18);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hardCoded = {
  'as Link': 'copy',
  'on Facebook': 'facebook',
  'on Twitter': 'twitter'
};

function ShareMarkup(_ref) {
  var selected = _ref.selected,
      updateShare = _ref.updateShare,
      modal = _ref.modal,
      shareOpen = _ref.shareOpen,
      updateModal = _ref.updateModal;

  var closeModal = function closeModal() {
    return updateModal(false);
  };

  return (0, _preact.h)(
    'div',
    { className: 'Share-wrap' },
    (0, _preact.h)(
      _index4.default,
      {
        title: 'Share this link:',
        open: modal,
        closeAction: closeModal
      },
      (0, _preact.h)(
        'a',
        { className: 'u-wordBreakBreakAll', href: window.location.href },
        window.location.href
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'Share-action' },
      (0, _preact.h)(
        'div',
        { className: 'Share-select' },
        (0, _preact.h)(_index2.default, {
          name: 'share',
          items: hardCoded,
          selected: selected,
          open: shareOpen,
          changeAction: function changeAction(value) {
            return updateShare(value);
          }
        })
      ),
      (0, _preact.h)(
        'div',
        { className: 'Share-button' },
        (0, _preact.h)(_Button2.default, { selected: selected, updateModal: updateModal })
      )
    )
  );
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _preact = __webpack_require__(0);

var _Icon = __webpack_require__(86);

var _Icon2 = _interopRequireDefault(_Icon);

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(_ref) {
  var selected = _ref.selected,
      updateModal = _ref.updateModal;

  var url = encodeURIComponent(window.location.href);
  var message = encodeURIComponent("SA Budget Data from vulekamali");

  var copyText = function copyText() {
    (0, _analyticsEvent2.default)('send', 'social', 'email', 'share', url);
    updateModal(true);
  };
  var fbDirect = function fbDirect() {
    (0, _analyticsEvent2.default)('send', 'social', 'facebook', 'share', url);
    var win = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
    win.focus();
  };
  var twDirect = function twDirect() {
    (0, _analyticsEvent2.default)('send', 'social', 'twitter', 'share', url);
    var win = window.open('https://twitter.com/home?status=' + message + '%20' + url, '_blank');
    win.focus();
  };

  var share = function share() {
    if (selected === 'copy') {
      return copyText();
    } else if (selected === 'facebook') {
      return fbDirect();
    } else if (selected === 'twitter') {
      return twDirect();
    }

    return null;
  };

  return (0, _preact.h)(
    'div',
    { className: 'Button has-icon', onClick: share },
    (0, _preact.h)(_Icon2.default, null)
  );
}

/***/ }),
/* 86 */
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
    { version: "1.2", width: "14", height: "14", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" },
    (0, _preact.h)("path", { d: "M93.3 25C88.8 17 82.8 11 75 6.6 67.5 2.2 59 0 50 0S32.6 2.2 25 6.7C17 11.2 11 17.2 6.6 25 2.2 32.5 0 41 0 50s2.2 17.4 6.7 25C11.2 83 17.2 89 25 93.4c7.6 4.5 16 6.7 25 6.7s17.4-2.2 25-6.7C83 88.8 89 82.8 93.4 75c4.5-7.6 6.7-16 6.7-25s-2.2-17.4-6.7-25zM82.5 53l-6 5.8L53 82.4c-.8.8-1.8 1.2-3 1.2-1 0-2-.4-2.8-1.2l-6-6c-.7-.7-1-1.7-1-2.8 0-1 .3-2 1-3l12.4-12.2H20.8c-1 0-2-.4-3-1.2-.7-.8-1-1.8-1-3V46c0-1 .3-2 1-3 1-.7 2-1 3-1h32.7L41.2 29.3c-.8-.8-1.2-1.8-1.2-3 0-1 .4-2 1.2-2.8l6-6c.7-.7 1.7-1 2.8-1 1.2 0 2 .3 3 1l23.5 23.7 6 6c.7.7 1 1.7 1 2.8.2 1.2-.2 2-1 3zm0 0" })
  );
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.PreactCSSTransitionGroup = factory(global.preact);
})(undefined, function (preact) {
	'use strict';

	function getKey(vnode) {
		return vnode.attributes && vnode.attributes.key;
	}

	function getComponentBase(component) {
		return component.base;
	}

	function onlyChild(children) {
		return children && children[0];
	}

	function filterNullChildren(children) {
		return children && children.filter(function (i) {
			return i !== null;
		});
	}

	function find(arr, iter) {
		for (var i = arr.length; i--;) {
			if (iter(arr[i])) return true;
		}
		return false;
	}

	function inChildrenByKey(children, key) {
		return find(children, function (c) {
			return getKey(c) === key;
		});
	}

	function inChildren(children, child) {
		return inChildrenByKey(children, getKey(child));
	}

	function isShownInChildrenByKey(children, key, showProp) {
		return find(children, function (c) {
			return getKey(c) === key && c.props[showProp];
		});
	}

	function isShownInChildren(children, child, showProp) {
		return isShownInChildrenByKey(children, getKey(child), showProp);
	}

	function mergeChildMappings(prev, next) {
		var ret = [];

		var nextChildrenPending = {},
		    pendingChildren = [];
		prev.forEach(function (c) {
			var key = getKey(c);
			if (inChildrenByKey(next, key)) {
				if (pendingChildren.length) {
					nextChildrenPending[key] = pendingChildren;
					pendingChildren = [];
				}
			} else {
				pendingChildren.push(c);
			}
		});

		next.forEach(function (c) {
			var key = getKey(c);
			if (nextChildrenPending.hasOwnProperty(key)) {
				ret = ret.concat(nextChildrenPending[key]);
			}
			ret.push(c);
		});

		return ret.concat(pendingChildren);
	}

	var SPACE = ' ';
	var RE_CLASS = /[\n\t\r]+/g;

	var norm = function norm(elemClass) {
		return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
	};

	function addClass(elem, className) {
		if (elem.classList) {
			var _elem$classList;

			(_elem$classList = elem.classList).add.apply(_elem$classList, className.split(' '));
		} else {
			elem.className += ' ' + className;
		}
	}

	function removeClass(elem, needle) {
		needle = needle.trim();
		if (elem.classList) {
			var _elem$classList2;

			(_elem$classList2 = elem.classList).remove.apply(_elem$classList2, needle.split(' '));
		} else {
			var elemClass = elem.className.trim();
			var className = norm(elemClass);
			needle = SPACE + needle + SPACE;
			while (className.indexOf(needle) >= 0) {
				className = className.replace(needle, SPACE);
			}
			elem.className = className.trim();
		}
	}

	var EVENT_NAME_MAP = {
		transitionend: {
			transition: 'transitionend',
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'mozTransitionEnd',
			OTransition: 'oTransitionEnd',
			msTransition: 'MSTransitionEnd'
		},

		animationend: {
			animation: 'animationend',
			WebkitAnimation: 'webkitAnimationEnd',
			MozAnimation: 'mozAnimationEnd',
			OAnimation: 'oAnimationEnd',
			msAnimation: 'MSAnimationEnd'
		}
	};

	var endEvents = [];

	function detectEvents() {
		var testEl = document.createElement('div'),
		    style = testEl.style;

		if (!('AnimationEvent' in window)) {
			delete EVENT_NAME_MAP.animationend.animation;
		}

		if (!('TransitionEvent' in window)) {
			delete EVENT_NAME_MAP.transitionend.transition;
		}

		for (var baseEventName in EVENT_NAME_MAP) {
			var baseEvents = EVENT_NAME_MAP[baseEventName];
			for (var styleName in baseEvents) {
				if (styleName in style) {
					endEvents.push(baseEvents[styleName]);
					break;
				}
			}
		}
	}

	if (typeof window !== 'undefined') {
		detectEvents();
	}

	function addEndEventListener(node, eventListener) {
		if (!endEvents.length) {
			return window.setTimeout(eventListener, 0);
		}
		endEvents.forEach(function (endEvent) {
			node.addEventListener(endEvent, eventListener, false);
		});
	}

	function removeEndEventListener(node, eventListener) {
		if (!endEvents.length) return;
		endEvents.forEach(function (endEvent) {
			node.removeEventListener(endEvent, eventListener, false);
		});
	}

	var classCallCheck = function classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	};

	var inherits = function inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	};

	var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	};

	var TICK = 17;

	var CSSTransitionGroupChild = function (_Component) {
		inherits(CSSTransitionGroupChild, _Component);

		function CSSTransitionGroupChild() {
			var _temp, _this, _ret;

			classCallCheck(this, CSSTransitionGroupChild);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.flushClassNameQueue = function () {
				if (getComponentBase(_this)) {
					addClass(getComponentBase(_this), _this.classNameQueue.join(' '));
				}
				_this.classNameQueue.length = 0;
				_this.timeout = null;
			}, _temp), possibleConstructorReturn(_this, _ret);
		}

		CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
			var _this2 = this;

			var node = getComponentBase(this);

			var className = this.props.name[animationType] || this.props.name + '-' + animationType;
			var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
			var timer = null;

			if (this.endListener) {
				this.endListener();
			}

			this.endListener = function (e) {
				if (e && e.target !== node) return;

				clearTimeout(timer);
				removeClass(node, className);
				removeClass(node, activeClassName);
				removeEndEventListener(node, _this2.endListener);
				_this2.endListener = null;

				if (finishCallback) {
					finishCallback();
				}
			};

			if (timeout) {
				timer = setTimeout(this.endListener, timeout);
				this.transitionTimeouts.push(timer);
			} else {
				addEndEventListener(node, this.endListener);
			}

			addClass(node, className);

			this.queueClass(activeClassName);
		};

		CSSTransitionGroupChild.prototype.queueClass = function queueClass(className) {
			this.classNameQueue.push(className);

			if (!this.timeout) {
				this.timeout = setTimeout(this.flushClassNameQueue, TICK);
			}
		};

		CSSTransitionGroupChild.prototype.stop = function stop() {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.classNameQueue.length = 0;
				this.timeout = null;
			}
			if (this.endListener) {
				this.endListener();
			}
		};

		CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
			this.classNameQueue = [];
			this.transitionTimeouts = [];
		};

		CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.transitionTimeouts.forEach(function (timeout) {
				clearTimeout(timeout);
			});
		};

		CSSTransitionGroupChild.prototype.componentWillEnter = function componentWillEnter(done) {
			if (this.props.enter) {
				this.transition('enter', done, this.props.enterTimeout);
			} else {
				done();
			}
		};

		CSSTransitionGroupChild.prototype.componentWillLeave = function componentWillLeave(done) {
			if (this.props.leave) {
				this.transition('leave', done, this.props.leaveTimeout);
			} else {
				done();
			}
		};

		CSSTransitionGroupChild.prototype.render = function render() {
			return onlyChild(this.props.children);
		};

		return CSSTransitionGroupChild;
	}(preact.Component);

	var CSSTransitionGroup = function (_Component) {
		inherits(CSSTransitionGroup, _Component);

		function CSSTransitionGroup(props) {
			classCallCheck(this, CSSTransitionGroup);

			var _this = possibleConstructorReturn(this, _Component.call(this));

			_this.renderChild = function (child) {
				var _this$props = _this.props;
				var transitionName = _this$props.transitionName;
				var transitionEnter = _this$props.transitionEnter;
				var transitionLeave = _this$props.transitionLeave;
				var transitionEnterTimeout = _this$props.transitionEnterTimeout;
				var transitionLeaveTimeout = _this$props.transitionLeaveTimeout;
				var key = getKey(child);
				return preact.h(CSSTransitionGroupChild, {
					key: key,
					ref: function ref(c) {
						if (!(_this.refs[key] = c)) child = null;
					},
					name: transitionName,
					enter: transitionEnter,
					leave: transitionLeave,
					enterTimeout: transitionEnterTimeout,
					leaveTimeout: transitionLeaveTimeout }, child);
			};

			_this.refs = {};
			_this.state = {
				children: (props.children || []).slice()
			};
			return _this;
		}

		CSSTransitionGroup.prototype.shouldComponentUpdate = function shouldComponentUpdate(_, _ref) {
			var children = _ref.children;

			return children !== this.state.children;
		};

		CSSTransitionGroup.prototype.componentWillMount = function componentWillMount() {
			this.currentlyTransitioningKeys = {};
			this.keysToEnter = [];
			this.keysToLeave = [];
		};

		CSSTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
			var _this2 = this;

			var children = _ref2.children;
			var exclusive = _ref2.exclusive;
			var showProp = _ref2.showProp;

			var nextChildMapping = filterNullChildren(children || []).slice();

			var prevChildMapping = filterNullChildren(exclusive ? this.props.children : this.state.children);

			var newChildren = mergeChildMappings(prevChildMapping, nextChildMapping);

			if (showProp) {
				newChildren = newChildren.map(function (c) {
					if (!c.props[showProp] && isShownInChildren(prevChildMapping, c, showProp)) {
						var _cloneElement;

						c = preact.cloneElement(c, (_cloneElement = {}, _cloneElement[showProp] = true, _cloneElement));
					}
					return c;
				});
			}

			if (exclusive) {
				newChildren.forEach(function (c) {
					return _this2.stop(getKey(c));
				});
			}

			this.setState({ children: newChildren });
			this.forceUpdate();

			nextChildMapping.forEach(function (c) {
				var key = c.key;
				var hasPrev = prevChildMapping && inChildren(prevChildMapping, c);
				if (showProp) {
					if (hasPrev) {
						var showInPrev = isShownInChildren(prevChildMapping, c, showProp),
						    showInNow = c.props[showProp];
						if (!showInPrev && showInNow && !_this2.currentlyTransitioningKeys[key]) {
							_this2.keysToEnter.push(key);
						}
					}
				} else if (!hasPrev && !_this2.currentlyTransitioningKeys[key]) {
					_this2.keysToEnter.push(key);
				}
			});

			prevChildMapping.forEach(function (c) {
				var key = c.key;
				var hasNext = nextChildMapping && inChildren(nextChildMapping, c);
				if (showProp) {
					if (hasNext) {
						var showInNext = isShownInChildren(nextChildMapping, c, showProp);
						var showInNow = c.props[showProp];
						if (!showInNext && showInNow && !_this2.currentlyTransitioningKeys[key]) {
							_this2.keysToLeave.push(key);
						}
					}
				} else if (!hasNext && !_this2.currentlyTransitioningKeys[key]) {
					_this2.keysToLeave.push(key);
				}
			});
		};

		CSSTransitionGroup.prototype.performEnter = function performEnter(key) {
			var _this3 = this;

			this.currentlyTransitioningKeys[key] = true;
			var component = this.refs[key];
			if (component.componentWillEnter) {
				component.componentWillEnter(function () {
					return _this3._handleDoneEntering(key);
				});
			} else {
				this._handleDoneEntering(key);
			}
		};

		CSSTransitionGroup.prototype._handleDoneEntering = function _handleDoneEntering(key) {
			delete this.currentlyTransitioningKeys[key];
			var currentChildMapping = filterNullChildren(this.props.children),
			    showProp = this.props.showProp;
			if (!currentChildMapping || !showProp && !inChildrenByKey(currentChildMapping, key) || showProp && !isShownInChildrenByKey(currentChildMapping, key, showProp)) {
				this.performLeave(key);
			} else {
				this.setState({ children: currentChildMapping });
			}
		};

		CSSTransitionGroup.prototype.stop = function stop(key) {
			delete this.currentlyTransitioningKeys[key];
			var component = this.refs[key];
			if (component) component.stop();
		};

		CSSTransitionGroup.prototype.performLeave = function performLeave(key) {
			var _this4 = this;

			this.currentlyTransitioningKeys[key] = true;
			var component = this.refs[key];
			if (component && component.componentWillLeave) {
				component.componentWillLeave(function () {
					return _this4._handleDoneLeaving(key);
				});
			} else {
				this._handleDoneLeaving(key);
			}
		};

		CSSTransitionGroup.prototype._handleDoneLeaving = function _handleDoneLeaving(key) {
			delete this.currentlyTransitioningKeys[key];
			var showProp = this.props.showProp,
			    currentChildMapping = filterNullChildren(this.props.children);
			if (showProp && currentChildMapping && isShownInChildrenByKey(currentChildMapping, key, showProp)) {
				this.performEnter(key);
			} else if (!showProp && currentChildMapping && inChildrenByKey(currentChildMapping, key)) {
				this.performEnter(key);
			} else {
				this.setState({ children: currentChildMapping });
			}
		};

		CSSTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
			var _this5 = this;

			var keysToEnter = this.keysToEnter;
			var keysToLeave = this.keysToLeave;

			this.keysToEnter = [];
			keysToEnter.forEach(function (k) {
				return _this5.performEnter(k);
			});
			this.keysToLeave = [];
			keysToLeave.forEach(function (k) {
				return _this5.performLeave(k);
			});
		};

		CSSTransitionGroup.prototype.render = function render(_ref3, _ref4) {
			var Component = _ref3.component;
			var transitionName = _ref3.transitionName;
			var transitionEnter = _ref3.transitionEnter;
			var transitionLeave = _ref3.transitionLeave;
			var transitionEnterTimeout = _ref3.transitionEnterTimeout;
			var transitionLeaveTimeout = _ref3.transitionLeaveTimeout;
			var c = _ref3.children;
			var props = objectWithoutProperties(_ref3, ['component', 'transitionName', 'transitionEnter', 'transitionLeave', 'transitionEnterTimeout', 'transitionLeaveTimeout', 'children']);
			var children = _ref4.children;

			return preact.h(Component, props, filterNullChildren(children).map(this.renderChild));
		};

		return CSSTransitionGroup;
	}(preact.Component);
	CSSTransitionGroup.defaultProps = {
		component: 'span',
		transitionEnter: true,
		transitionLeave: true
	};

	return CSSTransitionGroup;
});
//# sourceMappingURL=preact-css-transition-group.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(19);
var invariant = __webpack_require__(20);
var warning = __webpack_require__(40);
var assign = __webpack_require__(26);

var ReactPropTypesSecret = __webpack_require__(21);
var checkPropTypes = __webpack_require__(89);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 89 */
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
  var invariant = __webpack_require__(20);
  var warning = __webpack_require__(40);
  var ReactPropTypesSecret = __webpack_require__(21);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(19);
var invariant = __webpack_require__(20);
var ReactPropTypesSecret = __webpack_require__(21);

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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Download;

var _preact = __webpack_require__(0);

var _createSizeModifier = __webpack_require__(8);

var _createSizeModifier2 = _interopRequireDefault(_createSizeModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Download(_ref) {
  var size = _ref.size;

  return (0, _preact.h)(
    'svg',
    { className: 'Icon' + (0, _createSizeModifier2.default)(size), version: '1.2', baseProfile: 'tiny', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 100 100' },
    (0, _preact.h)('path', { d: 'M68.8 50l28.1-28.1a10.7 10.7 0 0 0 0-15l-3.7-3.7a10.7 10.7 0 0 0-15.1-.1L50 31.2 21.9 3.1a10.8 10.8 0 0 0-15.1 0L3.1 6.8a10.7 10.7 0 0 0 0 15L31.2 50 3.1 78.1a10.7 10.7 0 0 0 0 15l3.7 3.7a10.7 10.7 0 0 0 15 0l28.2-28 28.1 28.1a10.7 10.7 0 0 0 15 0l3.7-3.7a10.7 10.7 0 0 0 0-15L68.8 50zm0 0' })
  );
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Download;

var _preact = __webpack_require__(0);

var _createSizeModifier = __webpack_require__(8);

var _createSizeModifier2 = _interopRequireDefault(_createSizeModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Download(_ref) {
  var size = _ref.size;

  return (0, _preact.h)(
    'svg',
    { className: 'Icon' + (0, _createSizeModifier2.default)(size), width: '0', height: '0', xmlns: 'http://www.w3.org/2000/svg', viewBox: '157 347 100 100' },
    (0, _preact.h)('path', { d: 'M250.5 402.4a2 2 0 0 0-1.9-1.3h-22.8v-52c0-1.2-1-2.1-2.1-2.1h-33.3a2 2 0 0 0-2.1 2v52.1h-23a2 2 0 0 0-1.4 3.6l41.6 41.7c.4.4.9.6 1.4.6.6 0 1.1-.2 1.5-.6l41.7-41.7a2 2 0 0 0 .4-2.3z' })
  );
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Facebook;

var _preact = __webpack_require__(0);

var _createSizeModifier = __webpack_require__(8);

var _createSizeModifier2 = _interopRequireDefault(_createSizeModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Facebook(_ref) {
  var size = _ref.size;

  return (0, _preact.h)(
    'svg',
    { className: 'Icon' + (0, _createSizeModifier2.default)(size), version: '1.2', baseProfile: 'tiny', xmlns: 'http://www.w3.org/2000/svg', width: '0', height: '0', viewBox: '0 0 100 100' },
    (0, _preact.h)(
      'title',
      null,
      'Facebook Link'
    ),
    (0, _preact.h)('path', { d: 'M24.7 56.3h13v41.5c0 1.1.9 2 2 2h17a2 2 0 0 0 2-2V56.3h15.2a2 2 0 0 0 2-2V37.9c0-.5-.2-1.1-.6-1.4a2 2 0 0 0-1.4-.6h-15v-9.6c0-4.6 1.1-7 7.1-7h8.7a2 2 0 0 0 2-2V1.9A2 2 0 0 0 75.3 0H59C46 1.2 37.8 10.5 37.8 24.5v11.3h-13a2 2 0 0 0-2 2v16.4c-.1 1.2.8 2.1 1.9 2.1z' })
  );
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Facebook;

var _preact = __webpack_require__(0);

var _createSizeModifier = __webpack_require__(8);

var _createSizeModifier2 = _interopRequireDefault(_createSizeModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Facebook(_ref) {
  var size = _ref.size;

  return (0, _preact.h)(
    'svg',
    { className: 'Icon' + (0, _createSizeModifier2.default)(size), width: '0', height: '0', version: '1.2', baseProfile: 'tiny', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 100 100' },
    (0, _preact.h)(
      'title',
      null,
      'Search'
    ),
    (0, _preact.h)('path', { d: 'M97.2 85.4L75.5 63.8l-.4-.3C79.5 57 82 49.3 82 41c0-22.6-18.3-41-41-41S0 18.3 0 41c0 22.6 18.3 41 41 41 8.3 0 16-2.5 22.5-6.7l.3.4 21.6 21.6c3.3 3.3 8.5 3.3 11.8 0 3.2-3.4 3.2-8.6 0-12zM41 67.7c-14.8 0-26.8-12-26.8-26.8 0-15 12-27 26.8-27s26.8 12 26.8 27c0 14.7-12 26.7-26.8 26.7z' })
  );
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Facebook;

var _preact = __webpack_require__(0);

var _createSizeModifier = __webpack_require__(8);

var _createSizeModifier2 = _interopRequireDefault(_createSizeModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Facebook(_ref) {
  var size = _ref.size;

  return (0, _preact.h)(
    'svg',
    { className: 'Icon' + (0, _createSizeModifier2.default)(size), version: '1.2', baseProfile: 'tiny', width: '0', height: '0', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 100 100' },
    (0, _preact.h)(
      'title',
      null,
      'Twitter Link'
    ),
    (0, _preact.h)('path', { d: 'M100 19a42 42 0 0 1-11.8 3.2c4.2-2.5 7.5-6.6 9-11.4a40 40 0 0 1-13.1 5 20.5 20.5 0 0 0-35 18.7c-17.1-.9-32.2-9-42.3-21.4a20.6 20.6 0 0 0 6.3 27.4c-3.4-.1-6.5-1-9.3-2.6v.3c0 9.9 7.1 18.2 16.4 20.1a19 19 0 0 1-9.3.3 20.5 20.5 0 0 0 19.2 14.2A41.2 41.2 0 0 1-.3 81.3a58.4 58.4 0 0 0 31.5 9.2 57.9 57.9 0 0 0 58.3-58.3l-.1-2.7c4.4-2.8 7.9-6.4 10.6-10.5zm0 0' })
  );
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _camelcase = __webpack_require__(97);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _glossary = __webpack_require__(41);

var _glossary2 = _interopRequireDefault(_glossary);

var _createComponent = __webpack_require__(98);

var _createComponent2 = _interopRequireDefault(_createComponent);

var _escapeRegex = __webpack_require__(100);

var _escapeRegex2 = _interopRequireDefault(_escapeRegex);

var _walkTheDom = __webpack_require__(101);

var _walkTheDom2 = _interopRequireDefault(_walkTheDom);

var _findReactInstances = __webpack_require__(102);

var _findReactInstances2 = _interopRequireDefault(_findReactInstances);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scripts() {
  (0, _findReactInstances2.default)();

  var convertToCamelCase = function convertToCamelCase() {
    return Object.keys(_glossary2.default).reduce(function (result, key) {
      return _extends({}, result, _defineProperty({}, (0, _camelcase2.default)(key), _glossary2.default[key]));
    }, {});
  };

  var normalisedGlossaryObject = convertToCamelCase(_glossary2.default);

  var regExpTermsWithOrOperators = Object.keys(_glossary2.default).sort(function (a, b) {
    return b.length - a.length;
  }).join('|');

  var parentNodes = document.getElementsByClassName('js-tooltips');

  var regExpression = new RegExp('(?:^|\\b)' + (0, _escapeRegex2.default)(regExpTermsWithOrOperators) + '(?!\\w)', 'gi');

  var attachEventListeners = function attachEventListeners(tooltipNode) {
    var openTrigger = tooltipNode.getElementsByClassName('js-trigger')[0];
    var closeTrigger = tooltipNode.getElementsByClassName('js-closeTrigger')[0];
    var alertNode = tooltipNode.getElementsByClassName('js-box')[0];
    var modalCover = tooltipNode.getElementsByClassName('js-modalCover')[0];

    var openTooltip = function openTooltip() {
      return alertNode.classList.add('is-open');
    };
    var closeTooltip = function closeTooltip() {
      return alertNode.classList.remove('is-open');
    };

    openTrigger.addEventListener('click', openTooltip);
    closeTrigger.addEventListener('click', closeTooltip);
    modalCover.addEventListener('click', closeTooltip);
  };

  var replaceText = function replaceText(node, year, source) {
    if (node.nodeType === 3) {
      var text = node.data.trim();
      if (text.length > 0) {
        var currentText = node.nodeValue;
        var span = document.createElement('span');

        var newText = currentText.replace(regExpression, function (match) {
          return (0, _createComponent2.default)(year, match, source[(0, _camelcase2.default)(match)], '<span class="Tooltip-underline">' + match + '</span>');
        });

        span.innerHTML = newText;
        node.parentNode.replaceChild(span, node);
      }
    }
  };

  for (var i = 0; i < parentNodes.length; i++) {
    var parentNode = parentNodes[i];
    var year = parentNode.getAttribute('data-year');

    (0, _walkTheDom2.default)(parentNode, replaceText, year, normalisedGlossaryObject);

    var newNodes = document.getElementsByClassName('Tooltip js-hook');

    for (var ii = 0; ii < newNodes.length; ii++) {
      attachEventListeners(newNodes[ii]);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function preserveCamelCase(str) {
	var isLastCharLower = false;
	var isLastCharUpper = false;
	var isLastLastCharUpper = false;

	for (var i = 0; i < str.length; i++) {
		var c = str[i];

		if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
			str = str.substr(0, i) + '-' + str.substr(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
			str = str.substr(0, i - 1) + '-' + str.substr(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = c.toLowerCase() === c;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = c.toUpperCase() === c;
		}
	}

	return str;
}

module.exports = function (str) {
	if (arguments.length > 1) {
		str = Array.from(arguments).map(function (x) {
			return x.trim();
		}).filter(function (x) {
			return x.length;
		}).join('-');
	} else {
		str = str.trim();
	}

	if (str.length === 0) {
		return '';
	}

	if (str.length === 1) {
		return str.toLowerCase();
	}

	if (/^[a-z0-9]+$/.test(str)) {
		return str;
	}

	var hasUpperCase = str !== str.toLowerCase();

	if (hasUpperCase) {
		str = preserveCamelCase(str);
	}

	return str.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createComponent;

var _closeIcon = __webpack_require__(99);

var _closeIcon2 = _interopRequireDefault(_closeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createComponent(year, title, description, content) {
  return '<span class="Tooltip js-hook">\n    <div class="Tooltip-trigger js-trigger">\n      ' + content + '\n    </div>\n    <div class="Tooltip-boxWrap js-box">\n      <div class="Tooltip-modalCover js-modalCover"></div>\n      <div class="Tooltip-box">\n        <div class="Tooltip-content">\n          <div class="Tooltip-contentWrap">\n            <div class="Tooltip-shadowBox">\n              <div class="Tooltip-infoBox">\n                <div class="Tooltip-title">' + title + '</div>\n                <div class="Tooltip-text">' + description + '</div>\n              </div>\n              <div class="Tooltip-links">\n                <span class="Tooltip-linkWrap is-close js-closeTrigger">\n                  <span class="Tooltip-closeIcon">\n                    ' + _closeIcon2.default + '\n                  </span>\n                  <span class="Tooltip-link">\n                    Close\n                  </span>\n                </span>\n\n                <a class="Tooltip-linkWrap" href="/glossary">\n                  <div class="Tooltip-link">View glossary</div>\n                </a>\n              </div>\n              <div class="Tooltip-triangle"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </span>';
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '<svg version="1.2" width="10" height="10" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M58.3 50.4L96.7 12c2.4-2.4 2.4-6.2 0-8.6C94.3 1 90.5 1 88 3.4L49.8 41.8 11.3 3.4C9 1 5 1 2.7 3.4.3 5.8.3 9.6 2.7 12L41 50.4 2.8 88.8C.3 91.2.3 95 2.7 97.4 4 98.6 5.5 99.2 7 99.2c1.6 0 3-.6 4.3-1.8L49.7 59 88 97.4c1.3 1.2 3 1.8 4.4 1.8 1.6 0 3-.6 4.3-1.8 2.4-2.4 2.4-6.2 0-8.6L58.3 50.4zm0 0"></path></svg>';

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeRegExp;
function escapeRegExp(text) {
  return text.replace(/[\/\-\[\\\]\{\}\(\)\*\+\?\.\,\^\$\#\s]/gi, '\\$&');
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walkTheDom;
function walkTheDom(node, func, source, regExpression) {
  var children = node.childNodes;

  for (var i = 0; i < children.length; i++) {
    var childNode = children[i];

    if (childNode.tagName !== 'A') {
      walkTheDom(childNode, func, source, regExpression);
    }
  }

  func(node, source, regExpression);
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findReactInstances;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(42);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findReactInstances() {
  var patternId = document.getElementById('pattern-id-4368');
  if (patternId) {
    var component = (0, _preact.h)(
      _index2.default,
      {
        title: 'Content Unavailable',
        description: 'There is no exact match for this department in',
        year: '2017-18',
        openAction: function openAction() {
          return console.log('open');
        },
        closeAction: function closeAction() {
          return console.log('close');
        },
        down: true,
        actions: [{
          url: '#',
          title: 'Test 1'
        }, {
          url: '#',
          title: 'Test 2'
        }, {
          url: '#',
          title: 'Test 3'
        }]
      },
      (0, _preact.h)(
        'div',
        null,
        'Test'
      )
    );

    (0, _preact.render)(component, patternId);
  }
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Box;

var _preact = __webpack_require__(0);

var _Links = __webpack_require__(104);

var _Links2 = _interopRequireDefault(_Links);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Box(_ref) {
  var title = _ref.title,
      description = _ref.description,
      actions = _ref.actions,
      down = _ref.down,
      closeAction = _ref.closeAction;

  return (0, _preact.h)(
    'div',
    { className: 'Tooltip-box' },
    (0, _preact.h)(
      'div',
      { className: 'Tooltip-content' + (down ? ' is-down' : '') },
      (0, _preact.h)(
        'div',
        { className: 'Tooltip-contentWrap' },
        (0, _preact.h)(
          'div',
          { className: 'Tooltip-shadowBox' },
          (0, _preact.h)(
            'div',
            { className: 'Tooltip-infoBox' },
            (0, _preact.h)(
              'div',
              { className: 'Tooltip-title' },
              title
            ),
            (0, _preact.h)(
              'div',
              { className: 'Tooltip-text' },
              description
            ),
            (0, _preact.h)(_Links2.default, { actions: actions, closeAction: closeAction })
          ),
          (0, _preact.h)('div', { className: 'Tooltip-triangle' + (down ? ' is-down' : '') })
        )
      )
    )
  );
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Links;

var _preact = __webpack_require__(0);

var _CloseIcon = __webpack_require__(105);

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Links(_ref) {
  var actions = _ref.actions,
      closeAction = _ref.closeAction;

  return (0, _preact.h)(
    'div',
    { className: 'Tooltip-links' },
    (0, _preact.h)(
      'span',
      { className: 'Tooltip-linkWrap is-close', onClick: closeAction },
      (0, _preact.h)(
        'span',
        { className: 'Tooltip-closeIcon' },
        (0, _preact.h)(_CloseIcon2.default, null)
      ),
      (0, _preact.h)(
        'span',
        { className: 'Tooltip-link' },
        'Close'
      )
    ),
    actions.map(function (_ref2) {
      var url = _ref2.url,
          title = _ref2.title;

      return (0, _preact.h)(
        'a',
        { className: 'Tooltip-linkWrap', href: url },
        (0, _preact.h)(
          'div',
          { className: 'Tooltip-link' },
          title
        )
      );
    })
  );
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CloseIcon;

var _preact = __webpack_require__(0);

function CloseIcon() {
  return (0, _preact.h)(
    "svg",
    { version: "1.2", width: "10", height: "10", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" },
    (0, _preact.h)("path", { d: "M58.3 50.4L96.7 12c2.4-2.4 2.4-6.2 0-8.6C94.3 1 90.5 1 88 3.4L49.8 41.8 11.3 3.4C9 1 5 1 2.7 3.4.3 5.8.3 9.6 2.7 12L41 50.4 2.8 88.8C.3 91.2.3 95 2.7 97.4 4 98.6 5.5 99.2 7 99.2c1.6 0 3-.6 4.3-1.8L49.7 59 88 97.4c1.3 1.2 3 1.8 4.4 1.8 1.6 0 3-.6 4.3-1.8 2.4-2.4 2.4-6.2 0-8.6L58.3 50.4zm0 0" })
  );
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _index = __webpack_require__(22);

var _index2 = _interopRequireDefault(_index);

var _getProp = __webpack_require__(14);

var _getProp2 = _interopRequireDefault(_getProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scripts() {
  var nodesList = document.getElementsByClassName('js-initResponsiveChart');

  for (var i = 0; i < nodesList.length; i++) {
    var node = nodesList[i];
    var items = (0, _getProp2.default)('items', node, 'json');
    var type = (0, _getProp2.default)('type', node);
    var rawDownload = (0, _getProp2.default)('download', node, 'json');

    var downloadHasProps = !!(rawDownload && rawDownload.heading && rawDownload.subHeading && rawDownload.type);
    var download = downloadHasProps ? rawDownload : null;

    (0, _preact.render)((0, _preact.h)(_index2.default, { items: items, download: download, type: type }), node);
  }
}

exports.default = scripts();

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Markup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(123);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Markup(props) {
  var width = props.width,
      type = props.type,
      items = props.items;
  var parentAction = props.parentAction;


  if (type === 'bar') {
    return (0, _preact.h)(_index2.default, _extends({
      guides: true,
      hover: true,
      scale: 1
    }, { parentAction: parentAction, items: items, width: width }));
  }

  if (type === 'line') {
    return (0, _preact.h)(_index4.default, _extends({
      guides: true,
      hover: true
    }, { parentAction: parentAction, width: width, items: items }));
  }
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcMaxValue;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function calcMaxValue(items) {
  var labels = Object.keys(items);

  return labels.reduce(function (result, key) {
    var maxValue = Math.max.apply(Math, _toConsumableArray(items[key]));
    return maxValue > result ? maxValue : result;
  }, 0);
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildGroupSpaceArray;

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildGroupSpaceArray(items, styling) {
  var lineGutter = styling.lineGutter,
      barWidth = styling.barWidth,
      groupMargin = styling.groupMargin,
      charWrap = styling.charWrap,
      charLineHeight = styling.charLineHeight,
      titleSpace = styling.titleSpace;


  return Object.keys(items).map(function (key) {
    var value = items[key];
    var rawLines = (0, _breakIntoWrap2.default)(key, charWrap);

    var lines = rawLines.filter(function (val) {
      return val !== '';
    });

    var totalGutters = (value.length - 1) * lineGutter;
    var totalLineWidth = value.length * barWidth;
    var totalText = charLineHeight * lines.length;

    return totalGutters + totalLineWidth + totalText + groupMargin;
  });
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Breakpoints;

var _preact = __webpack_require__(0);

var _BreakpointItem = __webpack_require__(111);

var _BreakpointItem2 = _interopRequireDefault(_BreakpointItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Breakpoints(_ref) {
  var items = _ref.items,
      styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace;
  var valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints;

  var breakpointArray = [];

  for (var i = 0; i < labelBreakpoints; i++) {
    breakpointArray.push('');
  }

  return (0, _preact.h)(
    'g',
    { className: 'Graph-verticalLabelList' },
    breakpointArray.map(function (val, index) {
      return (0, _preact.h)(_BreakpointItem2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
    })
  );
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HorisontalBreakpoint;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalBreakpoint(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace,
      rank = _ref.rank;
  var maxValue = styling.maxValue,
      fontSize = styling.fontSize,
      valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints;

  var debugIteration = (valueSpace - buffer) / labelBreakpoints;
  var iterationValue = maxValue / (labelBreakpoints - 1);
  var iterationPosition = (valueSpace - buffer) / (labelBreakpoints - 1);

  return (0, _preact.h)(
    'g',
    null,
    (0, _preact.h)(
      'text',
      {
        className: 'Graph-label',
        x: padding[3] + buffer + rank * iterationPosition,
        y: padding[0] + totalGroupSpace + buffer * 2 + fontSize,
        'font-size': fontSize,
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'text-anchor': 'middle'
      },
      'R',
      (0, _trimValues2.default)(iterationValue * rank)
    )
  );
}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Grid;

var _preact = __webpack_require__(0);

function Grid(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace;
  var padding = styling.padding,
      valueSpace = styling.valueSpace,
      buffer = styling.buffer;


  return (0, _preact.h)(
    "g",
    { className: "Graph-grid" },
    (0, _preact.h)("line", {
      className: "Graph-outline",
      x1: padding[3],
      y1: padding[0],
      x2: padding[3],
      y2: padding[0] + totalGroupSpace,
      "stroke-width": "2",
      stroke: "#d2d2d2",
      fill: "none"
    }),
    (0, _preact.h)("path", {
      className: "Graph-outline",
      d: "\n          M" + padding[3] + " " + (padding[0] + totalGroupSpace) + " \n          Q " + padding[3] + " " + (padding[0] + buffer + totalGroupSpace) + ", \n          " + (padding[3] + buffer) + " " + (padding[0] + buffer + totalGroupSpace) + "\n        ",
      "stroke-width": "2",
      stroke: "#d2d2d2",
      fill: "none"
    }),
    (0, _preact.h)("line", {
      className: "Graph-outline",
      x1: padding[3] + buffer,
      y1: padding[0] + totalGroupSpace + buffer,
      x2: padding[3] + valueSpace,
      y2: padding[0] + totalGroupSpace + buffer,
      "stroke-width": "2",
      stroke: "#d2d2d2",
      fill: "none"
    })
  );
}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Guides;

var _preact = __webpack_require__(0);

var _GuideItem = __webpack_require__(114);

var _GuideItem2 = _interopRequireDefault(_GuideItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Guides(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace;
  var labelBreakpoints = styling.labelBreakpoints;


  var breakpointArray = [];

  for (var i = 0; i < labelBreakpoints; i++) {
    breakpointArray.push('');
  }

  // const { buffer, padding } = styling;

  return (0, _preact.h)(
    'g',
    { className: 'Graph-verticalLabelList' },
    breakpointArray.map(function (val, index) {
      if (index !== breakpointArray.length - 1) {
        return (0, _preact.h)(_GuideItem2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
      }

      return null;
    })
  );
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HorisontalGuide;

var _preact = __webpack_require__(0);

function HorisontalGuide(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace,
      rank = _ref.rank;
  var valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      fontSize = styling.fontSize,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints;

  var iteration = valueSpace / (labelBreakpoints - 1);

  // const debugIteration = totalGroupSpace / labelBreakpoints;

  return (0, _preact.h)(
    "g",
    null,
    (0, _preact.h)("line", {
      x1: padding[3] + iteration * rank + iteration,
      y1: padding[0],
      x2: padding[3] + iteration * rank + iteration,
      y2: padding[0] + totalGroupSpace + buffer,
      className: "Graph-guide",
      stroke: "#e6e6e6"
    })
  );
}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = LineGroups;

var _preact = __webpack_require__(0);

var _LineGroupItem = __webpack_require__(116);

var _LineGroupItem2 = _interopRequireDefault(_LineGroupItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LineGroups(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      items = _ref.items,
      styling = _ref.styling;

  var titles = Object.keys(items);
  var padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace;


  return (0, _preact.h)(
    'g',
    { className: 'LineGroupList' },
    titles.map(function (key, index) {
      return (0, _preact.h)(_LineGroupItem2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LineGroupItem;

var _preact = __webpack_require__(0);

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colours = ['#79b43c', '#4a4a4a', '#ad3c64'];

function LineGroupItem(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      lines = _ref.lines,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace,
      lineGutter = styling.lineGutter,
      maxValue = styling.maxValue,
      groupMargin = styling.groupMargin,
      fontSize = styling.fontSize,
      charWrap = styling.charWrap,
      charLineHeight = styling.charLineHeight,
      titleSpace = styling.titleSpace;


  var groupSpace = groupSpaceArray[rank];

  var previousSpace = groupSpaceArray.reduce(function (result, val, index) {
    if (index < rank) {
      return result + val;
    }

    return result;
  }, 0);

  var startPoint = padding[0] + previousSpace;
  var rawCharArray = (0, _breakIntoWrap2.default)(title, charWrap);
  var charArray = rawCharArray.filter(function (val) {
    return val !== '';
  });

  return (0, _preact.h)(
    'g',
    { className: 'Graph-group' },
    charArray.map(function (val, index) {
      return (0, _preact.h)(
        'text',
        {
          className: 'Graph-label Graph-label--leftAlign',
          y: padding[0] + previousSpace + groupMargin / 2 + charLineHeight * index,
          x: padding[3] + buffer,
          'font-family': 'sans-serif',
          'font-weight': 'bold'
        },
        val
      );
    }),
    lines.map(function (amount, index) {
      var relativeAmount = amount / maxValue * valueSpace - barWidth;
      var displayAmount = relativeAmount < barWidth * 2 ? barWidth * 2 : relativeAmount;

      return (0, _preact.h)('line', {
        'stroke-linecap': 'round',
        'stroke-width': barWidth,
        y1: groupMargin / 2 + startPoint + index * (barWidth + lineGutter) + barWidth / 2 + charLineHeight * charArray.length,
        x1: padding[3] + buffer + barWidth / 2,
        y2: groupMargin / 2 + startPoint + index * (barWidth + lineGutter) + barWidth / 2 + charLineHeight * charArray.length,
        x2: padding[3] + buffer + displayAmount - barWidth,
        className: 'Graph-line',
        stroke: colours[index]
      });
    })
  );
}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Tooltips;

var _preact = __webpack_require__(0);

var _TooltipGroup = __webpack_require__(118);

var _TooltipGroup2 = _interopRequireDefault(_TooltipGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tooltips(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      items = _ref.items,
      styling = _ref.styling;

  var titles = Object.keys(items);
  var padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace;


  return (0, _preact.h)(
    'g',
    { className: 'LineGroupList' },
    titles.map(function (key, index) {
      return (0, _preact.h)(_TooltipGroup2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling, items: items }));
    })
  );
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = TooltipGroup;

var _preact = __webpack_require__(0);

var _TooltipItem = __webpack_require__(119);

var _TooltipItem2 = _interopRequireDefault(_TooltipItem);

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colours = ['#79b43c', '#4a4a4a', '#ad3c64'];

function TooltipGroup(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      items = _ref.items,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      lines = _ref.lines,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace,
      lineGutter = styling.lineGutter,
      maxValue = styling.maxValue,
      groupMargin = styling.groupMargin,
      charLineHeight = styling.charLineHeight,
      titleSpace = styling.titleSpace,
      charWrap = styling.charWrap;


  var groupSpace = groupSpaceArray[rank];

  var previousSpace = groupSpaceArray.reduce(function (result, val, index) {
    if (index < rank) {
      return result + val;
    }

    return result;
  }, 0);

  var startPoint = padding[0] + previousSpace;

  var breakIntoArray = function breakIntoArray(string) {
    var result = [];

    for (var i = 0; i < string.length; i += charWrap) {
      result.push(string.substr(i, charWrap));
    }

    return result;
  };

  var titles = Object.keys(items);

  return (0, _preact.h)(
    'g',
    { className: 'Graph-group' },
    lines.map(function (amount, index) {
      var rawCharArray = (0, _breakIntoWrap2.default)(title, charWrap);
      var charArray = rawCharArray.filter(function (val) {
        return val !== '';
      });
      var relativeAmount = amount / maxValue * valueSpace - barWidth;
      var displayAmount = relativeAmount < barWidth * 2 ? barWidth * 2 : relativeAmount;

      return (0, _preact.h)(_TooltipItem2.default, _extends({ styling: styling }, {
        xPosition: padding[3] + buffer + displayAmount - barWidth / 2,
        yPosition: groupMargin / 2 + startPoint + index * (barWidth + lineGutter) + barWidth / 2 + charLineHeight * charArray.length
      }, { amount: amount, totalGroupSpace: totalGroupSpace }, {
        colour: colours[index]
      }));
    })
  );
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TooltipItem;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TooltipItem(_ref) {
  var styling = _ref.styling,
      xTriggerPosition = _ref.xTriggerPosition,
      xPosition = _ref.xPosition,
      yPosition = _ref.yPosition,
      amount = _ref.amount,
      colour = _ref.colour,
      totalGroupSpace = _ref.totalGroupSpace;
  var barWidth = styling.barWidth,
      popUpOffset = styling.popUpOffset,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace,
      lineGutter = styling.lineGutter,
      padding = styling.padding,
      popupWidth = styling.popupWidth,
      popupHeight = styling.popupHeight,
      popupFontSize = styling.popupFontSize,
      units = styling.units,
      popupCentre = styling.popupCentre;


  return (0, _preact.h)(
    'g',
    { className: 'BarChart-tooltip' },
    (0, _preact.h)('rect', {
      x: padding[3] + buffer,
      y: yPosition - (barWidth + lineGutter) / 2,
      width: valueSpace + padding[0] - buffer,
      height: barWidth + lineGutter,
      opacity: '0'
    }),
    (0, _preact.h)('polygon', {
      className: 'BarChart-triangle',
      points: '\n          ' + (xPosition + popUpOffset) + ',\n          ' + yPosition + '\n\n          ' + (xPosition + 6 + popUpOffset) + ',\n          ' + (yPosition - 6) + '\n\n          ' + (xPosition + barWidth + popUpOffset) + ',\n          ' + (yPosition - 6) + '\n\n          ' + (xPosition + barWidth + popUpOffset) + ',\n          ' + (yPosition + 6) + '\n          \n          ' + (xPosition + 6 + popUpOffset) + ',\n          ' + (yPosition + 6) + '\n        ',
      fill: colour
    }),
    (0, _preact.h)('rect', {
      rx: '10',
      ry: '10',
      className: 'BarChart-tooltipBase',
      x: xPosition + 6 + popUpOffset,
      y: yPosition - popupHeight / 2,
      width: popupWidth,
      height: popupHeight,
      fill: colour
    }),
    (0, _preact.h)(
      'text',
      {
        x: xPosition + popupWidth / 2 + popUpOffset + barWidth / 2,
        y: yPosition + popupCentre,
        'font-size': popupFontSize,
        className: 'BarChart-tooltipText',
        'font-family': 'sans-serif',
        'text-anchor': 'middle',
        fill: 'white'
      },
      (0, _trimValues2.default)(amount)
    )
  );
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Attribution;

var _preact = __webpack_require__(0);

function Attribution(_ref) {
  var top = _ref.top,
      left = _ref.left;

  return (0, _preact.h)(
    "g",
    null,
    (0, _preact.h)(
      "text",
      {
        "font-size": "14",
        x: left,
        y: top,
        "font-weight": "bold",
        "text-anchor": "end",
        fill: "#ed9e31",
        "font-family": "sans-serif"
      },
      "Downloaded from www.vulekamali.gov.za"
    )
  );
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Heading;

var _preact = __webpack_require__(0);

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Heading(_ref) {
  var heading = _ref.heading,
      subHeading = _ref.subHeading,
      type = _ref.type,
      left = _ref.left;

  var titleArray = (0, _breakIntoWrap2.default)(heading, 33);

  return (0, _preact.h)(
    'g',
    null,
    (0, _preact.h)(
      'text',
      { y: '49', x: left, 'font-size': '28', 'font-weight': 'bold', fill: '#3f3f3f', 'font-family': 'sans-serif' },
      titleArray.map(function (text, index) {
        return (0, _preact.h)(
          'tspan',
          { x: left, y: 49 + 30 * index },
          text.trim()
        );
      })
    ),
    (0, _preact.h)(
      'text',
      { y: 42 + 30 * titleArray.length, x: left, 'font-size': '14', 'font-weight': 'bold', fill: '#808080', 'font-family': 'sans-serif' },
      subHeading
    ),
    (0, _preact.h)(
      'text',
      { y: 62 + 30 * titleArray.length, x: left, 'font-size': '14', 'font-weight': 'bold', fill: '#79b43c', 'font-family': 'sans-serif' },
      type
    )
  );
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Logo;

var _preact = __webpack_require__(0);

function Logo(_ref) {
  var top = _ref.top,
      left = _ref.left;

  return (0, _preact.h)(
    "svg",
    { version: "1.2", width: "145", y: top, x: left, baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 991.4 301.6" },
    (0, _preact.h)("path", { fill: "#3f3f3f", d: "M543 246a9 9 0 0 0 8.9 9 9 9 0 0 0 6.8-3v2.6h4v-17.4h-4v2.6c-1.1-1.3-3-3-6.8-3a9 9 0 0 0-9 9.3m9.6 5.3a5.3 5.3 0 0 1-5.5-5.5c0-3.3 2.3-5.6 5.5-5.6s5.6 2.3 5.6 5.6c0 3.2-2.4 5.5-5.6 5.5m-26-10.6v13.8h4v-13.8h4.1v-3.6h-4v-7.6h-4.1v7.6h-2.4v3.6h2.4zm-33.5 5.3a9 9 0 0 0 9 8.9 9 9 0 0 0 6.7-3v2.6h4v-17.4h-4v2.6c-1-1.3-3-3-6.7-3a9 9 0 0 0-9 9.3m9.6 5.3a5.3 5.3 0 0 1-5.5-5.5c0-3.3 2.3-5.6 5.5-5.6s5.5 2.3 5.5 5.6c0 3.2-2.3 5.5-5.5 5.5m-38.3-1.1v-21.4h4.9c6 0 10 4.6 10 10.6 0 6.1-4 10.8-10 10.8h-4.9zm19.1-10.8c0-8.3-5.6-14.9-14.2-14.9H460v30h9.2c8.6 0 14.2-6.7 14.2-15m-55.8 1.3v13.7h4v-13.8h4v-3.6h-4v-7.6h-4v7.6h-2.4v3.6h2.4zm-30.4 5c0 5.1 3.7 9 9 9 3.9 0 6.2-2.1 7-3.6l-2.8-2c-.7.8-2.1 2-4 2-3.5 0-5.1-2.3-5.1-5.1H415c0-5.7-3.9-9.3-9-9.3a9 9 0 0 0-9 9m13.6-2.3h-9a4.6 4.6 0 0 1 4.4-3.2c2.5 0 4 1.4 4.6 3.2m-35.2 7.8a5.3 5.3 0 0 1-5.5-5.5c0-3.3 2.3-5.6 5.5-5.6s5.6 2.3 5.6 5.6c0 3.2-2.4 5.5-5.6 5.5m6.1.7v2.5c0 3-1.8 4.8-5.7 4.8-3 0-4.4-1.3-4.7-2.3h-4.7c.8 3 3.9 6 9.3 6 5.8 0 10-3.2 10-8.5v-17.4h-4.2v2.6c-1-1.3-3-3-6.7-3a9 9 0 0 0-9 9.3 9 9 0 0 0 9 8.9 9 9 0 0 0 6.8-3m-37.7-.6a5.3 5.3 0 0 1-5.5-5.5c0-3.3 2.3-5.6 5.5-5.6s5.5 2.3 5.5 5.6c0 3.2-2.3 5.5-5.5 5.5m10.2-27.1h-4v15.5a9 9 0 0 0-15.7 6.3 9 9 0 0 0 8.9 8.8 9 9 0 0 0 6.7-2.9v2.6h4.1v-30.3zm-42.2 13h-4V248c0 3.9 2.7 7 7.4 7s7.5-3.1 7.5-7v-10.9h-4V248c0 2.3-1.4 3.5-3.5 3.5-2 0-3.4-1.2-3.4-3.5v-10.7zm-30.5 13V241h4.6c3 0 5.5 1.5 5.5 4.6 0 3.2-2.6 4.6-5.5 4.6h-4.6zm0-13.5v-8h2c2.3 0 4.2 1.3 4.2 3.8a4 4 0 0 1-4.1 4.2h-2.1zm10.7-4.6c0-5-4.3-8-8.7-8h-6.3v30.4h9.6c4.7 0 9.2-2.5 9.2-8.7 0-4.9-4-7.6-7-8 1.8-1 3.2-2.3 3.2-5.7m-56.9 13.7c0 5.1 3.7 9 9 9 4 0 6.2-2.1 7.1-3.6l-2.9-2c-.6.8-2.1 2-4 2-3.4 0-5-2.3-5-5.1h13.7c0-5.7-3.8-9.3-9-9.3a9 9 0 0 0-8.9 9m13.5-2.3h-9a4.6 4.6 0 0 1 4.5-3.2c2.4 0 3.9 1.4 4.5 3.2m-39.9 11h4.1V245c0-1.7 1.2-4.1 4-4.1 2.3 0 3.2 1.6 3.2 4v9.7h4V244c0-4-1.8-7.2-6.4-7.2-3.3 0-4.3 1.7-4.8 2.8v-2.5h-4v17.4zm-12.3-23c0-1.5-1.1-2.6-2.6-2.6s-2.5 1.1-2.5 2.6 1.1 2.5 2.5 2.5 2.6-1.1 2.6-2.5m-.5 5.6h-4v17.4h4v-17.4zm-17.8-13h-4v30.4h4v-30.3zm-31.9 30.4h4.1V245c0-1.7 1.2-4.1 4-4.1 2.3 0 3.2 1.6 3.2 4v9.7h4V244c0-4-1.8-7.2-6.4-7.2-3.3 0-4.3 1.7-4.8 2.8v-2.5h-4v17.4zm-27.1-3.9c-6.3 0-11-4.7-11-11 0-6.4 4.7-11.1 11-11.1s11.1 4.7 11.1 11c0 6.4-4.8 11.1-11.1 11.1m15.4-11c0-8.7-6.8-15.4-15.4-15.4-8.7 0-15.4 6.7-15.4 15.3 0 8.7 6.7 15.4 15.4 15.4 8.6 0 15.4-6.7 15.4-15.4m-66.9-7l4.5 12h-9l4.5-12zm-1.4-8l-11.2 30h4.3l2.3-6h12l2.1 6h4.5l-11.3-30h-2.7zm-26.3 5.8L43 227c-1.7-1.5-4-2.6-7.3-2.6-4.8 0-8.2 3.3-8.2 7.7 0 4.9 3.1 6.7 7 8.3 4 1.5 5.7 3.4 5.7 5.7 0 2.5-2.3 4.4-4.9 4.4a7 7 0 0 1-6.1-3.3l-3.1 3c1.4 2.1 4.4 4.5 9.4 4.5s9-3 9-8.6-4.7-8.2-8.4-9.6c-3-1.2-4.3-2.3-4.3-4.4 0-1.8 1.3-3.5 3.9-3.5 2 0 3.4.6 4.5 1.7" }),
    (0, _preact.h)("path", { fill: "#7bb344", d: "M559.7 155.3v-4.4c1-13.3 3.2-26.4 8-38.9 4-10.7 8.9-21.1 13.7-31.5 1.5-3.3 4-6 6-9l1 .4c-.8 5-1.4 10.2-2.5 15.2a289.6 289.6 0 0 1-15.8 47.6c-2.5 6-5.3 11.7-8 17.6a9 9 0 0 1-2.4 3m-46.5-4.2c-6.3 6.1-9.5 14.8-14.4 22.4a35 35 0 0 1-9.4 10.7l-1.9 1.1V178c1-10.5 4.1-20.3 11-28.7 1.9-2.3 4.3-4.4 6.7-6.3 2.8-2.1 5.6-.6 6.1 2.8.3 1.7 1.1 3.2 1.9 5.3m477-6.3a78.2 78.2 0 0 0-47.5-61.3 76.7 76.7 0 0 0-59.6-1.2c-1 .4-1.6.2-2.1-.8l-2.5-4.6A152 152 0 0 0 794 7.5 148.6 148.6 0 0 0 712.6 4 149.8 149.8 0 0 0 617 74.3l-2.3 4.2 2.5.1h18.2c5.5 0 5.6 0 7.6-5 3.4-9.1 9-15.7 18.7-18.6 12-3.7 23.8-8.2 35.9-11.2 19.4-4.9 39.2-7.4 59.2-5.9 8.4.7 16.8 1.7 25 2.8a168 168 0 0 1 30.1 7.5 709 709 0 0 1 25.3 9 18 18 0 0 1 9 7.2A60.4 60.4 0 0 1 854 82c3.1 11.3 5.8 22.7 8.6 34l.5 1.6.5.2.8-1.2a64.7 64.7 0 0 1 20-15.6 62 62 0 0 1 28.2-6c15.4.1 28.8 5.4 40.1 15.7a59.3 59.3 0 0 1 20.7 47 43 43 0 0 1-13.1 31.6c-7.5 7.1-16.4 8.3-25.9 5.7-6-1.6-9.3-6.6-11.6-12.2-1-2.3-1-2.4-3.3-1.4a22 22 0 0 1-12.2 1.5 26.3 26.3 0 1 1 10.3-51.5l3.2.8c0-1.9 1.1-1.7 2.2-1.7h11.8c2.6 0 2.6 0 2.6 2.6V168c0 3.2 1 6.2 2.5 8.9 1.3 2.3 3 2.8 5.3 1.5 1.3-.7 2.7-1.7 3.5-3a32.8 32.8 0 0 0 6-24.5 43.2 43.2 0 0 0-14.3-26.2 41.9 41.9 0 0 0-34-11 42.4 42.4 0 0 0-26.9 13.9 42.8 42.8 0 0 0-6.7 49.5 43.1 43.1 0 0 0 54.5 20.4c1.2-.4 1.9-.3 2.5.8l7.3 13.5c.6 1 .3 1.5-.8 2a62.3 62.3 0 0 1-39 3.7 57.3 57.3 0 0 1-31.4-18.7 73.4 73.4 0 0 1-18.2-34.4l-1.3-5.8c-.5-2-1.6-3.6-3.3-4.8-5.6-3.9-12-5.1-18.5-5.1-8.2 0-16.1 2.1-22.9 7-4 3-7.5 6.5-11.2 9.8l-3.5 3-2.4-11-6.4-31c-1-5.2-4-9-8.8-11.2a54.7 54.7 0 0 0-46-.5c-5.1 2.2-8.4 6.1-9.5 11.7l-8.4 40.4c0 .6-.3 1.2-.5 2-.8-.6-1.5-1-2-1.6l-10-8.5c-3.9-3-7.7-6-12.3-7.8a34.7 34.7 0 0 0-22-.1c-6 1.6-9.7 5-11 11.4a61 61 0 0 1-9.6 23c-2.5 3.6-5.5 6.8-9.7 8.6-5.6 2.2-9.9.3-11.7-5.5-2-6-1.6-12.3-1-18.4.9-7.3 2.4-14.4 3.6-21.7.2-1.4.1-2.9-.2-4.2-.4-2-2.2-2.9-3.8-1.8-1.7 1-3.7 2.4-4.3 4.1-3.4 8.4-6.3 16.9-9.5 25.3a10 10 0 0 1-1.8 3.2 78 78 0 0 1-17 13.3c-2.6 1.5-5.3 3-8.2 3.6-6.2 1.4-10.6.1-12.9-7.4l-.1-.5-1.8-13.2c0-.6.5-1.4.9-1.9 3.4-4 7-7.7 10-12 7-9.6 12.3-20.3 17-31.3a231.5 231.5 0 0 0 15-48.8c1.2-6.5 1.2-13-1.7-19.2a9.9 9.9 0 0 0-7-5.9c-3.6-.8-6.7.2-9.7 2A49.7 49.7 0 0 0 566.5 72c-7 12-11.8 25-15.3 38.6a220.9 220.9 0 0 0-5.8 33.8c-.8 8.6-1 17.1-.4 25.7.1 1.2-.1 2.7-.8 3.7-3.3 5-6.7 10-10.4 14.7a90.4 90.4 0 0 1-8.4 9.1c-1.3 1.3-3.2 1.9-5 .8-1.7-1-1.3-2.8-1-4.2.9-5.5 1.8-11 3.1-16.3 1.6-6.8 3.6-13.6 5.5-20.3 1.2-4.3-1.8-10.4-7-10-1.3.2-1.3-.6-1.2-1.5.6-9-6.7-15.6-15.6-14-5 1-9.1 3.7-12.7 7.1a63.4 63.4 0 0 0-17.8 32.8c-.7 3.3-2.2 6-4.3 8.6a83.7 83.7 0 0 1-5.9 6.3 21 21 0 0 1-9.2 5.4c-1.4.3-2.4 0-3-1.4-.8-1.7-1.3-3.3-1.6-5-1.2-6.2-.7-12.4-.2-18.5.2-4 .7-7.8.8-11.7a7 7 0 0 0-4.4-6.7c-2.7-1.3-5.2-.5-7.3 1.3-1.2 1-2.3 2.3-3.2 3.7-2 3-3.7 6-5.6 9l-5.8 9.4-.4-.1 1.8-9c.9-4 2-8 2.8-12.1.9-4.9 1-9.8-.8-14.6-2.2-5.9-9-8-13.8-4.1a30.4 30.4 0 0 0-7 7.7c-4.9 8.2-9.4 16.6-14 25l-1.3 2.2c-.2-.8 0-1.4.1-2.1 1.1-5 2.3-10.1 3.2-15.2.7-3.6.5-7.3-1-10.8-1-2.5-2.3-2.8-4-.6a35.7 35.7 0 0 0-4.2 7c-1.8 4.5-3.4 9-4.8 13.5-2.8 9-5.5 18.1-8 27.3-1 4.4-1.7 9-.8 13.7 1.2 6.6 6.8 9 12.3 5.2.8-.5 1.6-1 2.1-1.7 3-3.7 6.2-7.2 8.7-11.2 3.9-6.4 7.3-13.1 10.9-19.7.2-.6.5-1 .9-1.6 0 4.3-.2 8.3 0 12.4.2 2.7.7 5.5 1.6 8a8 8 0 0 0 7.9 6.1c3.3 0 6.7-.4 9.3-2.7 2.5-2.1 4.6-4.7 6.7-7.2 1.3-1.5 2.3-3.1 3.5-4.8l.4.4.2 1.2c.7 4.8 1.2 11.2 3.6 15.4 4.2 7.5 12.5 9.9 19.5 5.4 2.5-1.5 5.3-4.7 7.4-7l5.6-6.3.9 2.1c2.8 7.8 12.4 11.5 19.2 7.2 1.9-1.1 3.7-2.2 5.5-3.5 2.7-2 5.2-4 8.1-6.4.2 1.8.2 3.3.5 4.7.8 3.4 1.3 7 2.7 10.2 2 4.5 5.9 6.3 10.7 5.1a25 25 0 0 0 6.8-2.7c7-4 12-10.2 16.6-16.8l4.4-6.3 2 5.1c2 4 4.2 7.5 7.6 10.2 5.6 4.4 11.9 4.5 18.3 2.5a60.8 60.8 0 0 0 21.8-13l2-1.7.1 4.6c1 10.5 6.7 16.4 17.7 14.6a50 50 0 0 0 31.3-18.4c1.7-2 3.2-4.3 4.8-6.4-.2 2-.6 3.8-1.1 5.6-1 3.6-2.2 7.2-3 11-.6 2.4.5 3.8 3 4l2.6.1c2.7 0 4 1.1 4.5 3.7l1.1 5.5c2 8 3.7 9 11.7 7.5 2.3-.4 4-1.5 4.7-3.7a70 70 0 0 0 2.4-8.3c.7-3.6 1.7-4.6 5.3-4.7 4.9 0 5.7-1 4.7-5.7-1.7-7.5-3.6-15-5-22.5-.5-2.7 0-5.7 0-9 1.5.7 2.3 1 3 1.5l17.2 10.3c4.4 2.6 6.6 1.8 8.5-2.9l.3-.6 9.5-23.2c.3-1 .8-1.9 1.2-2.8.8 7 1.1 14 2 21 1.1 10 2.6 20.2 4.2 30.3.8 5 2.2 10 3.5 15a6 6 0 0 0 5.7 5l8.5.2c8.3 0 10.7-1.8 12.2-10 1.5-8.5 3-17 4.1-25.6 1.6-11.6 3-23.2 3.1-35l.1-1.6c1 1 1.5 2.2 2 3.4 3.3 8.3 6.5 16.6 10 24.8 1.5 3.6 3.7 4.2 7.2 2.3l1-.7 18.7-11.6c.3-.2.7-.2 1.3-.4l.8 9.8c1 9.2 2 18.3 3.2 27.4.5 4 1.1 8 2 12 .7 3.5 2.2 4.8 5.9 5.1 3.1.2 6.3.3 9.5 0 4.2-.5 5.5-1.8 6.5-6l.4-1.6 3.9-30.4.6-5.5c4 11 8.8 21.6 16 30.9.4.5.6 1.5.4 2.2-2 7.7-4.3 15.5-8 22.7-2.1 3.8-4.2 7.8-8.3 10a63.6 63.6 0 0 1-8.2 3.7c-20.4 7.4-41 14-62.7 16a203 203 0 0 1-80.2-7l-31.3-10.4c-5.2-1.8-9.1-5.2-11.6-10-1.7-3.3-3.3-6.6-4.6-10-.7-1.6-1.5-2-3-2H617l-2.2.1 1.3 2.5a151 151 0 0 0 235.4 33.7c9-8.6 16.9-18.3 23.4-28.9 1-1.5 1.7-1.7 3.3-1 14.4 6.8 29.5 9 45.2 6.5a77.8 77.8 0 0 0 55.6-36.7 75.5 75.5 0 0 0 11.2-54.5m-375.8-18.6c0 2.7 2.8 5.8 5.4 5.8 2.6 0 5-2.6 5-5.6 0-3.3-1.8-5.2-5-5.2-3 0-5.4 2.1-5.4 5m35.3-1.2c0 11 8.6 19.7 19.7 19.7 11 0 20-9 20-20.1a20 20 0 0 0-20-19.5c-10.9-.2-19.7 9-19.7 19.9m96.4-66.2c-13 0-23.2 10.1-23.2 23A23.2 23.2 0 0 0 746 105a23 23 0 1 0 .1-46.2m78.3 45.8a20 20 0 0 0-19.7 19.6c0 11.9 8.1 20.2 19.8 20.1a20 20 0 0 0 19.6-19.8c0-10.7-9-20-19.7-20m96.5 52.6c0-5-4.3-9.4-9.3-9.5-4.9 0-9.5 4.5-9.5 9.5s4.2 9.2 9.3 9.2c5.2 0 9.5-4.1 9.5-9.2" }),
    (0, _preact.h)("path", { fill: "#ed9e31", d: "M361.3 206v-57.4h-16.9v3.5a21.6 21.6 0 0 0-8.9-4.6 29.2 29.2 0 0 0-17 1.4c-3.2 1.5-6 3.6-8.4 6.5-2.4 2.8-4.2 6-5.4 9.7a40.6 40.6 0 0 0-1.8 12.2c0 4.7.6 8.9 1.8 12.5 1 3.7 2.8 7 5.2 9.9a22 22 0 0 0 8.5 6.3 27.9 27.9 0 0 0 22-.3 22 22 0 0 0 4-2.8v3.1h16.9zm-17.4-22.3c-.6 1.8-1.5 3.5-2.7 5a10.1 10.1 0 0 1-3.8 3c-1.5.7-3.1 1-5 1-2 0-3.7-.3-5.2-1a11.4 11.4 0 0 1-6-7.4c-.6-1.8-.9-4-.9-6.7 0-2.6.3-4.8 1-6.8a11.3 11.3 0 0 1 6.3-7.7c1.5-.5 3.2-.8 5-.8 2 0 3.8.3 5.2.9 1.4.6 2.7 1.6 3.7 2.7 1 1.3 1.9 2.8 2.4 4.7.6 1.9.9 4 .9 6.5 0 2.6-.3 4.8-1 6.6m-43.7 23.5l-18.8-29.3 16.6-27.6h-22l-13.6 24.2v-50.2h-20v82.9h20v-25.5l16 25.5H300zm-97.3-41.8c5.2 0 9.4 2.7 10.4 8.3h-20.4c1.4-5.3 5.2-8.3 10-8.3m27 20.3c.5-2.7.7-5.4.7-8.2 0-16.7-12-29-27.7-29-15.6 0-28.8 13.6-28.8 30.3s13.2 30.1 28.8 30.1a32 32 0 0 0 24.3-9.4l-7.7-10.8c-1.5 1.9-7.6 5.7-15.5 4.5-4-.6-7.9-3.2-9.8-7.5h35.8zm-85.3 21.5h20v-83h-20v83zm-48 1.8a23 23 0 0 0 16.2-7.4v5.6h20v-56.9h-20v34.3c-.3 6.4-5.9 8.6-9.5 8.6a8.5 8.5 0 0 1-8.5-9v-33.9h-20v36.5c0 13.9 7.3 22.2 21.8 22.2m-31.3-58.7h-22l-10.6 32.5L22 150.3H0l23 56.9h19.2l23-56.9z" }),
    (0, _preact.h)("path", { fill: "none", d: "M0 0h991.4v301.6H0z" })
  );
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = LineChart;

var _preact = __webpack_require__(0);

var _calcMaxValue = __webpack_require__(124);

var _calcMaxValue2 = _interopRequireDefault(_calcMaxValue);

var _buildGroupSpaceArray = __webpack_require__(125);

var _buildGroupSpaceArray2 = _interopRequireDefault(_buildGroupSpaceArray);

var _Breakpoints = __webpack_require__(127);

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _Grid = __webpack_require__(129);

var _Grid2 = _interopRequireDefault(_Grid);

var _Guides = __webpack_require__(130);

var _Guides2 = _interopRequireDefault(_Guides);

var _LineGroups = __webpack_require__(132);

var _LineGroups2 = _interopRequireDefault(_LineGroups);

var _Tooltips = __webpack_require__(135);

var _Tooltips2 = _interopRequireDefault(_Tooltips);

var _Labels = __webpack_require__(138);

var _Labels2 = _interopRequireDefault(_Labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LineChart(props) {
  var items = props.items,
      width = props.width,
      hover = props.hover;
  var parentAction = props.parentAction;


  var styling = {
    fontSize: 14,
    popupFontSize: 14,
    maxValue: (0, _calcMaxValue2.default)(items),
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    valueSpace: width - (0 + 100),
    padding: [50, 0, 30, 100],
    popupHeight: 30,
    popupCentre: 5,
    charWrap: width / 10,
    titleSpace: 0,
    labelBreakpoints: 4,
    showGuides: true,
    charLineHeight: 14,
    lineGutter: 8,
    barWidth: 12,
    groupMargin: 40,
    svgHeight: 300
  };

  if (hover) {
    styling = _extends({}, styling, {
      padding: [80, 30, 60, 130],
      valueSpace: width - (30 + 130)
    });
  }

  var _styling = styling,
      valueSpace = _styling.valueSpace,
      padding = _styling.padding,
      showGuides = _styling.showGuides,
      svgHeight = _styling.svgHeight,
      buffer = _styling.buffer;

  var groupSpaceArray = (0, _buildGroupSpaceArray2.default)(items, styling);
  var totalGroupSpace = groupSpaceArray.reduce(function (result, val) {
    return result + val;
  }, 0);
  var height = padding[0] + svgHeight + padding[2] + buffer * 2;
  var newWidth = padding[3] + valueSpace + padding[1];

  var content = (0, _preact.h)(
    'svg',
    {
      version: '1.1',
      className: 'ColumnChart-svg is-hoverable',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 ' + newWidth + ' ' + height,
      width: newWidth,
      height: height,
      style: { maxWidth: newWidth }
    },
    (0, _preact.h)(_Breakpoints2.default, { styling: styling, totalGroupSpace: totalGroupSpace }),
    (0, _preact.h)(_Grid2.default, { styling: styling, totalGroupSpace: totalGroupSpace }),
    (0, _preact.h)(_Guides2.default, { styling: styling, totalGroupSpace: totalGroupSpace }),
    (0, _preact.h)(_LineGroups2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling }),
    (0, _preact.h)(_Tooltips2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling }),
    (0, _preact.h)(_Labels2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling })
  );

  return (0, _preact.h)(
    'div',
    {
      className: 'LineChart',
      ref: function ref(node) {
        return parentAction && parentAction(node);
      }
    },
    content
  );
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcMaxValue;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function calcMaxValue(items) {
  var labels = Object.keys(items);

  return labels.reduce(function (result, key) {
    var maxValue = Math.max.apply(Math, _toConsumableArray(items[key]));
    return maxValue > result ? maxValue : result;
  }, 0);
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildGroupSpaceArray;

var _breakIntoWrap = __webpack_require__(126);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildGroupSpaceArray(items, styling) {
  var lineGutter = styling.lineGutter,
      barWidth = styling.barWidth,
      groupMargin = styling.groupMargin,
      charWrap = styling.charWrap,
      charLineHeight = styling.charLineHeight,
      titleSpace = styling.titleSpace;


  return Object.keys(items).map(function (key) {
    var value = items[key];
    var rawLines = (0, _breakIntoWrap2.default)(key, charWrap);

    var lines = rawLines.filter(function (val) {
      return val !== '';
    });

    var totalGutters = (value.length - 1) * lineGutter;
    var totalLineWidth = value.length * barWidth;
    var totalText = charLineHeight * lines.length;

    return totalGutters + totalLineWidth + totalText + groupMargin;
  });
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = breakIntoWrap;
function breakIntoWrap(string, wrap) {
  var splitter = string.split(' ');

  var count = 0;
  var word = '';
  var results = [];

  for (var i = 0; i < splitter.length; i++) {
    if (splitter[count].length >= wrap) {
      // for (let ii = 0; ii < splitter[count].length; ii += wrap) {
      //   results.push(splitter[count].substr(ii, wrap));
      // }

      results.push(splitter[count]);

      word = '';
      count++;
    } else {
      word = word + ' ' + splitter[count];
      count++;

      if (word.length >= wrap) {
        results.push(word);
        word = '';
      }

      if (i === splitter.length - 1) {
        results.push(word);
        word = '';
      }
    }
  }

  return results;
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Breakpoints;

var _preact = __webpack_require__(0);

var _BreakpointItem = __webpack_require__(128);

var _BreakpointItem2 = _interopRequireDefault(_BreakpointItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Breakpoints(_ref) {
  var items = _ref.items,
      styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace;
  var valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints;

  var breakpointArray = [];

  for (var i = 0; i < labelBreakpoints; i++) {
    breakpointArray.push('');
  }

  return (0, _preact.h)(
    'g',
    { className: 'Graph-verticalLabelList' },
    breakpointArray.map(function (val, index) {
      return (0, _preact.h)(_BreakpointItem2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
    })
  );
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BreakpointItem;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BreakpointItem(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace,
      rank = _ref.rank,
      fontSize = _ref.fontSize;
  var valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints,
      maxValue = styling.maxValue,
      svgHeight = styling.svgHeight;

  var iterationValue = maxValue / (labelBreakpoints - 1);
  var iterationPosition = svgHeight / (labelBreakpoints - 1);

  return (0, _preact.h)(
    'text',
    {
      x: padding[3] - buffer,
      y: padding[0] + 7 + iterationPosition * rank,
      fill: '#3f3f3f',
      'text-anchor': 'end',
      'font-size': fontSize,
      'font-weight': 'bold',
      'font-family': 'sans-serif'
    },
    'R',
    (0, _trimValues2.default)(iterationValue * (labelBreakpoints - (rank + 1)), true)
  );
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Grid;

var _preact = __webpack_require__(0);

function Grid(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace;
  var padding = styling.padding,
      valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      svgHeight = styling.svgHeight;


  return (0, _preact.h)(
    "g",
    { className: "Graph-grid" },
    (0, _preact.h)("line", {
      className: "Graph-outline",
      x1: padding[3],
      y1: padding[0],
      x2: padding[3],
      y2: padding[0] + svgHeight,
      "stroke-width": "2",
      stroke: "#d2d2d2",
      fill: "none"
    }),
    (0, _preact.h)("path", {
      className: "Graph-outline",
      d: "\n          M" + padding[3] + " " + (padding[0] + svgHeight) + " \n          Q " + padding[3] + " " + (padding[0] + buffer + svgHeight) + ", \n          " + (padding[3] + buffer) + " " + (padding[0] + buffer + svgHeight) + "\n        ",
      "stroke-width": "2",
      stroke: "#d2d2d2",
      fill: "none"
    }),
    (0, _preact.h)("line", {
      className: "Graph-outline",
      x1: padding[3] + buffer,
      y1: padding[0] + svgHeight + buffer,
      x2: padding[3] + valueSpace,
      y2: padding[0] + svgHeight + buffer,
      "stroke-width": "2",
      stroke: "#d2d2d2",
      fill: "none"
    })
  );
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Guides;

var _preact = __webpack_require__(0);

var _GuideItem = __webpack_require__(131);

var _GuideItem2 = _interopRequireDefault(_GuideItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Guides(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace;
  var labelBreakpoints = styling.labelBreakpoints;


  var breakpointArray = [];

  for (var i = 0; i < labelBreakpoints; i++) {
    breakpointArray.push('');
  }

  // const { buffer, padding } = styling;

  return (0, _preact.h)(
    'g',
    { className: 'Graph-verticalLabelList' },
    breakpointArray.map(function (val, index) {
      if (index !== breakpointArray.length - 1) {
        return (0, _preact.h)(_GuideItem2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
      }
      return null;
    })
  );
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GuideItem;

var _preact = __webpack_require__(0);

function GuideItem(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace,
      rank = _ref.rank;
  var valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      fontSize = styling.fontSize,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints,
      svgHeight = styling.svgHeight;

  var iteration = svgHeight / (labelBreakpoints - 1);

  // const debugIteration = totalGroupSpace / labelBreakpoints;

  return (0, _preact.h)(
    "g",
    null,
    (0, _preact.h)("line", {
      x1: padding[3],
      y1: padding[0] + iteration * rank,
      x2: padding[3] + valueSpace,
      y2: padding[0] + iteration * rank,
      className: "Graph-guide",
      stroke: "#e6e6e6"
    })
  );
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = LineGroups;

var _preact = __webpack_require__(0);

var _LineGroupItem = __webpack_require__(133);

var _LineGroupItem2 = _interopRequireDefault(_LineGroupItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LineGroups(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      items = _ref.items,
      styling = _ref.styling;

  var titles = Object.keys(items);
  // const { padding, buffer, valueSpace } = styling;

  return (0, _preact.h)(
    'g',
    { className: 'LineGroupList' },
    titles.map(function (key, index) {
      return (0, _preact.h)(_LineGroupItem2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LineGroupItem;

var _preact = __webpack_require__(0);

var _path = __webpack_require__(134);

var colours = ['#79b43c', '#4a4a4a', '#ad3c64'];

function LineGroupItem(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      lines = _ref.lines,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      lineGutter = styling.lineGutter,
      valueSpace = styling.valueSpace,
      maxValue = styling.maxValue,
      svgHeight = styling.svgHeight;


  var groupSpace = groupSpaceArray[rank];

  var generateToScale = function generateToScale(value) {
    return (valueSpace - buffer) / totalGroupSpace * value;
  };

  var previousSpace = groupSpaceArray.reduce(function (result, val, index) {
    if (index < rank) {
      return result + generateToScale(val);
    }

    return result;
  }, 0);

  var usedSpace = lines.length * (barWidth + lineGutter);
  var startPoint = padding[3] + buffer + previousSpace;
  var centeringSpace = (generateToScale(groupSpace) + barWidth - usedSpace) / 2;

  return (0, _preact.h)(
    'g',
    { className: 'Graph-group' },
    lines.map(function (amount, index) {
      var relativeAmount = amount / maxValue * svgHeight;
      var displayAmount = relativeAmount < barWidth + 1 ? barWidth + 1 : relativeAmount;
      return (0, _preact.h)('line', {
        'stroke-linecap': 'round',
        'stroke-width': barWidth,
        x1: startPoint + centeringSpace + index * (barWidth + lineGutter),
        y1: padding[0] + svgHeight - barWidth / 2,
        x2: startPoint + centeringSpace + index * (barWidth + lineGutter),
        y2: padding[0] + svgHeight + barWidth - barWidth / 2 - displayAmount,
        className: 'Graph-line',
        stroke: colours[index]
      });
    })
  );
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Tooltips;

var _preact = __webpack_require__(0);

var _TooltipGroup = __webpack_require__(136);

var _TooltipGroup2 = _interopRequireDefault(_TooltipGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tooltips(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      items = _ref.items,
      styling = _ref.styling;

  var titles = Object.keys(items);
  var padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace;


  return (0, _preact.h)(
    'g',
    { className: 'LineGroupList' },
    titles.map(function (key, index) {
      return (0, _preact.h)(_TooltipGroup2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = TooltipGroup;

var _preact = __webpack_require__(0);

var _TooltipItem = __webpack_require__(137);

var _TooltipItem2 = _interopRequireDefault(_TooltipItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colours = ['#79b43c', '#4a4a4a', '#ad3c64'];

function TooltipGroup(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      lines = _ref.lines,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      lineGutter = styling.lineGutter,
      valueSpace = styling.valueSpace,
      maxValue = styling.maxValue,
      popUpOffset = styling.popUpOffset,
      popupHeight = styling.popupHeight,
      svgHeight = styling.svgHeight;


  var groupSpace = groupSpaceArray[rank];

  var generateToScale = function generateToScale(value) {
    return (valueSpace - buffer) / totalGroupSpace * value;
  };

  var previousSpace = groupSpaceArray.reduce(function (result, val, index) {
    if (index < rank) {
      return result + generateToScale(val);
    }

    return result;
  }, 0);

  var usedSpace = lines.length * (barWidth + lineGutter);
  var startPoint = padding[3] + buffer + previousSpace;
  var centeringSpace = (generateToScale(groupSpace) + barWidth - usedSpace) / 2;

  return (0, _preact.h)(
    'g',
    { className: 'Graph-group' },
    lines.map(function (amount, index) {
      var relativeAmount = amount / maxValue * svgHeight;
      var displayAmount = relativeAmount < barWidth + 1 ? barWidth + 1 : relativeAmount;
      return (0, _preact.h)(_TooltipItem2.default, _extends({ styling: styling }, {
        xPosition: startPoint + centeringSpace + index * (barWidth + lineGutter),
        yPosition: padding[0] + svgHeight + barWidth - (barWidth * 2 + displayAmount + popUpOffset + popupHeight)
      }, { amount: amount, totalGroupSpace: totalGroupSpace }, {
        colour: colours[index]
      }));
    })
  );
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TooltipItem;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TooltipItem(_ref) {
  var styling = _ref.styling,
      xTriggerPosition = _ref.xTriggerPosition,
      xPosition = _ref.xPosition,
      yPosition = _ref.yPosition,
      amount = _ref.amount,
      colour = _ref.colour,
      totalGroupSpace = _ref.totalGroupSpace;
  var barWidth = styling.barWidth,
      lineGutter = styling.lineGutter,
      padding = styling.padding,
      popupWidth = styling.popupWidth,
      popupHeight = styling.popupHeight,
      buffer = styling.buffer,
      svgHeight = styling.svgHeight,
      popupFontSize = styling.popupFontSize;

  // const { popUpOffset } = styling;

  return (0, _preact.h)(
    'g',
    { className: 'ColumnChart-tooltip' },
    (0, _preact.h)('rect', {
      x: xPosition - (barWidth + lineGutter) / 2,
      x1: xTriggerPosition,
      y: 0,
      width: barWidth + lineGutter,
      height: svgHeight + padding[0] + buffer,
      opacity: '0'
    }),
    (0, _preact.h)('rect', {
      rx: '10',
      ry: '10',
      className: 'Graph-tooltipBase',
      x: xPosition - popupWidth / 2,
      y: yPosition,
      width: popupWidth,
      height: popupHeight,
      fill: colour
    }),
    (0, _preact.h)('polygon', {
      className: 'Graph-triangle',
      points: '\n          ' + xPosition + ',\n          ' + (yPosition + barWidth + popupHeight) + '\n          ' + (xPosition + barWidth / 2) + ',\n          ' + (yPosition + popupHeight) + '\n          \n          ' + (xPosition - barWidth / 2) + ',\n          ' + (yPosition + popupHeight) + '\n        ',
      fill: colour
    }),
    (0, _preact.h)(
      'text',
      {
        x: xPosition,
        y: yPosition + popupHeight / 2 + popupFontSize / 2 - 2,
        'font-size': popupFontSize,
        className: 'Graph-tooltipText',
        'font-family': 'sans-serif',
        'text-anchor': 'middle',
        fill: 'white'
      },
      (0, _trimValues2.default)(amount)
    )
  );
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Labels;

var _preact = __webpack_require__(0);

var _LabelItem = __webpack_require__(139);

var _LabelItem2 = _interopRequireDefault(_LabelItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Labels(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      items = _ref.items,
      styling = _ref.styling;

  var titles = Object.keys(items);
  var padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace,
      maxValue = styling.maxValue;


  return (0, _preact.h)(
    'g',
    { className: 'Graph-horisontalLabelList' },
    titles.map(function (title, index) {
      return (0, _preact.h)(_LabelItem2.default, _extends({
        rank: index
      }, { title: title, totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LabelItem;

var _preact = __webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function LabelItem(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace,
      fontSize = styling.fontSize,
      svgHeight = styling.svgHeight;


  var groupSpace = groupSpaceArray[rank];

  var generateToScale = function generateToScale(value) {
    return (valueSpace - buffer) / totalGroupSpace * value;
  };

  var previousSpace = groupSpaceArray.reduce(function (result, val, index) {
    if (index < rank) {
      return result + generateToScale(val);
    }

    return result;
  }, 0);

  return (0, _preact.h)(
    "g",
    { className: "Graph-horisontalLabel" },
    (0, _preact.h)(
      "text",
      _defineProperty({
        className: "Graph-label",
        y: svgHeight + padding[0] + buffer * 2,
        x: padding[3] + previousSpace + buffer + generateToScale(groupSpace) / 2,
        "font-size": fontSize,
        "text-anchor": "middle",
        "font-family": "sans-serif",
        "font-weight": "bold",
        fill: "#3f3f3f"
      }, "font-size", "14"),
      title
    )
  );
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _index = __webpack_require__(141);

var _index2 = _interopRequireDefault(_index);

var _global = __webpack_require__(43);

var _removePunctuation = __webpack_require__(44);

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResultContainer = function (_Component) {
  _inherits(SearchResultContainer, _Component);

  function SearchResultContainer(props) {
    _classCallCheck(this, SearchResultContainer);

    var _this = _possibleConstructorReturn(this, (SearchResultContainer.__proto__ || Object.getPrototypeOf(SearchResultContainer)).call(this, props));

    _this.state = {
      results: [],
      count: null,
      page: 1,
      province: 'all',
      open: null,
      error: false,
      loading: true
    };

    _this.updateItem = _this.updateItem.bind(_this);
    _this.updateFilter = _this.updateFilter.bind(_this);
    return _this;
  }

  _createClass(SearchResultContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var datasetPackagesQueryUrl = _global.apiBaseURL + '/api/3/action/package_search?q=' + (0, _removePunctuation2.default)(this.props.search) + '&start=0&rows=999&fq=+organization:national-treasury+vocab_financial_years:' + this.props.selectedYear + '+extras_department_name_slug:[* TO *]+extras_geographic_region_slug:[* TO *]';

      var request = new Promise(function (resolve, reject) {
        fetch(datasetPackagesQueryUrl).then(function (response) {
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
        _this2.setState({ loading: false });
        _this2.setState({ results: array });
      }).catch(function (err) {
        _this2.setState({ loading: false });
        _this2.setState({ error: true });
        console.warn(err);
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
      if (this.state.open === filter) {
        this.setState({ page: 1 });
        this.setState(_defineProperty({}, filter, value));
        this.setState({ open: null });
        return null;
      }

      return this.setState({ open: filter });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        results: this.state.results,
        search: this.props.search,
        selectedYear: this.props.selectedYear,
        updateFilter: this.updateFilter,
        shown: this.state.shown,
        changeShown: this.changeShown,
        page: this.state.page,
        province: this.state.province,
        state: this.state,
        updateItem: this.updateItem,
        error: this.state.error,
        loading: this.state.loading
      });
    }
  }]);

  return SearchResultContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initSearchResult');
  var nodesArray = [].concat(_toConsumableArray(nodes));
  var search = window.vulekamali.qs.search;


  if (nodesArray.length > 0) {
    nodesArray.forEach(function (node) {
      var selectedYear = node.getAttribute('data-year');
      (0, _preact.render)((0, _preact.h)(SearchResultContainer, { selectedYear: selectedYear, search: search }), node);
    });
  }
}

exports.default = scripts();

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchResultMarkup;

var _preact = __webpack_require__(0);

var _Form = __webpack_require__(142);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchResultMarkup(_ref) {
  var loading = _ref.loading,
      error = _ref.error,
      state = _ref.state,
      updateItem = _ref.updateItem,
      page = _ref.page,
      province = _ref.province,
      results = _ref.results,
      search = _ref.search,
      selectedYear = _ref.selectedYear,
      updateFilter = _ref.updateFilter;

  if (error) {
    return (0, _preact.h)(
      'div',
      { className: 'SearchResult-wrap' },
      (0, _preact.h)(
        'span',
        null,
        'Something went wrong with the search. Please try again at a later point.'
      )
    );
  }

  var preDepartments = results.filter(function (item) {
    var provSlugIndex = item.extras.findIndex(function (data) {
      return data.key === 'geographic_region_slug';
    });

    var provSlug = item.extras[provSlugIndex].value;

    return province === 'all' || province === provSlug;
  });

  var departments = preDepartments.map(function (item) {
    var provSlugIndex = item.extras.findIndex(function (data) {
      return data.key === 'geographic_region_slug';
    });

    var provSlug = item.extras[provSlugIndex].value;

    var nameSlugIndex = item.extras.findIndex(function (data) {
      return data.key === 'department_name_slug';
    });

    var nameSlug = item.extras[nameSlugIndex].value;
    var departmentType = item.province.length > 0 ? item.province : 'National';

    var url = item.province.length > 0 ? '/' + selectedYear + '/provincial/' + provSlug + '/departments/' + nameSlug : '/' + selectedYear + '/national/departments/' + nameSlug;

    return (0, _preact.h)(
      'a',
      { href: url, className: 'SearchResult-link' },
      departmentType,
      ' Department: ',
      item.extras[0].value
    );
  });

  var pages = Math.ceil(departments.length / 10);

  var extra = preDepartments.length > 0 ? (0, _preact.h)(
    'span',
    { className: 'SearchResult-countWrap' },
    (0, _preact.h)(
      'span',
      null,
      'Page ',
      page,
      ' of ',
      pages
    )
  ) : null;

  return (0, _preact.h)(
    'div',
    { className: 'SearchResult-wrap' },
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-heading' },
      'Search result for "',
      search,
      '" in Department Budgets'
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
        'Suggested Department Budgets',
        departments ? extra : ''
      ),
      (0, _preact.h)(
        'div',
        { className: 'SearchResult-list' },
        loading ? (0, _preact.h)(
          'div',
          null,
          'Loading...'
        ) : null,
        !loading && preDepartments.length > 0 ? departments.splice(page * 10 - 10, 10) : null,
        !loading && preDepartments.length < 1 ? (0, _preact.h)(
          'div',
          { className: 'SearchResult-error' },
          (0, _preact.h)(
            'span',
            null,
            'We didn\u2019t find anything for \u2019',
            search,
            '\u2019. '
          ),
          (0, _preact.h)(
            'a',
            { href: '/' + selectedYear + '/departments' },
            'View a list of all departments'
          )
        ) : null
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-pageWrap' },
      page <= 1 ? null : (0, _preact.h)(
        'button',
        { onClick: function onClick() {
            return updateItem('page', page - 1);
          }, className: 'SearchResult-prev' },
        'Previous Page'
      ),
      page >= pages ? null : (0, _preact.h)(
        'button',
        { onClick: function onClick() {
            return updateItem('page', page + 1);
          }, className: 'SearchResult-next' },
        'Next Page'
      )
    )
  );
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(_ref) {
  var state = _ref.state,
      updateFilter = _ref.updateFilter;

  var items = {
    'All Provinces': 'all',
    'Free State': 'free-State',
    Gauteng: 'gauteng',
    'KwaZulu-Natal': 'kwazulu-natal',
    Limpopo: 'limpopo',
    Mpumalanga: 'mpumalanga',
    'North West': 'north-west',
    'Northern Cape': 'northern-cape',
    'Western Cape': 'western-cape'
  };

  return (0, _preact.h)(
    'div',
    { className: 'SearchResult-form' },
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-filter' },
      (0, _preact.h)(_index2.default, {
        name: 'province',
        items: items,
        selected: state.province,
        open: state.open === 'province',
        changeAction: function changeAction(value) {
          return updateFilter('province', value);
        }
      })
    )
  );
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fuse = __webpack_require__(24);

var _fuse2 = _interopRequireDefault(_fuse);

var _preact = __webpack_require__(0);

var _index = __webpack_require__(145);

var _index2 = _interopRequireDefault(_index);

var _glossary = __webpack_require__(41);

var _glossary2 = _interopRequireDefault(_glossary);

var _createGlossaryGroupedObject = __webpack_require__(148);

var _createGlossaryGroupedObject2 = _interopRequireDefault(_createGlossaryGroupedObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlossaryContainer = function (_Component) {
  _inherits(GlossaryContainer, _Component);

  function GlossaryContainer(props) {
    _classCallCheck(this, GlossaryContainer);

    var _this = _possibleConstructorReturn(this, (GlossaryContainer.__proto__ || Object.getPrototypeOf(GlossaryContainer)).call(this, props));

    _this.state = {
      currentPhrase: '',
      currentItems: _this.props.glossaryObject
    };

    _this.eventHandlers = {
      changePhrase: _this.changePhrase.bind(_this)
    };
    return _this;
  }

  _createClass(GlossaryContainer, [{
    key: 'changePhrase',
    value: function changePhrase(phrase) {
      var _this2 = this;

      this.setState({ currentPhrase: phrase });

      if (phrase.length > 2) {
        var options = {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['phrase']
        };

        var letters = Object.keys(this.props.glossaryObject);

        var filteredList = letters.reduce(function (result, letter) {
          var array = _this2.props.glossaryObject[letter];
          var items = new _fuse2.default(array, options);

          return _extends({}, result, _defineProperty({}, letter, items.search(phrase)));
        }, {});

        return this.setState({ currentItems: filteredList });
      }

      return this.setState({ currentItems: this.props.glossaryObject });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, _extends({}, this.state, this.eventHandlers));
    }
  }]);

  return GlossaryContainer;
}(_preact.Component);

function scripts() {
  var glossaryGroupedObject = (0, _createGlossaryGroupedObject2.default)(_glossary2.default);
  var nodes = document.getElementsByClassName('js-initGlossary');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i++) {
      (0, _preact.render)((0, _preact.h)(GlossaryContainer, { glossaryObject: glossaryGroupedObject }), nodes[i]);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 144 */
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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Markup;

var _preact = __webpack_require__(0);

var _Controls = __webpack_require__(146);

var _Controls2 = _interopRequireDefault(_Controls);

var _List = __webpack_require__(147);

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Markup(_ref) {
  var currentPhrase = _ref.currentPhrase,
      currentItems = _ref.currentItems,
      changePhrase = _ref.changePhrase;

  return (0, _preact.h)(
    'div',
    { className: 'Glossary-wrap' },
    (0, _preact.h)(_Controls2.default, { currentPhrase: currentPhrase, currentItems: currentItems, changePhrase: changePhrase }),
    (0, _preact.h)(_List2.default, { currentItems: currentItems })
  );
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controls;

var _preact = __webpack_require__(0);

function Controls(_ref) {
  var currentPhrase = _ref.currentPhrase,
      currentItems = _ref.currentItems,
      changePhrase = _ref.changePhrase;

  var buildLetters = function buildLetters() {
    return Object.keys(currentItems).map(function (letter) {
      var hasItems = currentItems[letter].length > 0;

      return (0, _preact.h)(
        'a',
        {
          href: '#glossary-item-' + letter,
          className: 'Glossary-letter' + (hasItems ? ' is-valid' : '')
        },
        letter.toUpperCase()
      );
    });
  };

  return (0, _preact.h)(
    'div',
    { className: 'Glossary-controls' },
    (0, _preact.h)('input', {
      className: 'Glossary-search',
      placeholder: 'Start typing to find a glossary term',
      value: currentPhrase,
      onInput: function onInput(event) {
        return changePhrase(event.target.value);
      }
    }),
    (0, _preact.h)(
      'div',
      { className: 'Glossary-lettersWrap' },
      (0, _preact.h)(
        'span',
        { className: 'Glossary-letterLabel' },
        'Jump to Letter:'
      ),
      buildLetters()
    )
  );
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = List;

var _preact = __webpack_require__(0);

function List(_ref) {
  var currentPhrase = _ref.currentPhrase,
      currentItems = _ref.currentItems;


  var buildItems = function buildItems(letterArrayFn) {
    return letterArrayFn.map(function (item) {
      return (0, _preact.h)(
        "div",
        { className: "Glossary-item" },
        (0, _preact.h)(
          "div",
          { className: "Glossary-title" },
          item.phrase
        ),
        (0, _preact.h)(
          "div",
          { className: "Glossary-text" },
          item.description
        )
      );
    });
  };

  var buildSections = function buildSections(currentItemsFn) {
    return Object.keys(currentItemsFn).map(function (letter) {
      var letterArray = currentItemsFn[letter];

      if (letterArray.length > 0) {
        return (0, _preact.h)(
          "div",
          { className: "Glossary-section", id: "glossary-item-" + letter },
          (0, _preact.h)(
            "div",
            { className: "Glossary-heading" },
            letter.toUpperCase()
          ),
          buildItems(letterArray)
        );
      }

      return null;
    });
  };

  return (0, _preact.h)(
    "div",
    { className: "Glossary-list" },
    buildSections(currentItems)
  );
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createGlossaryGroupedObject;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createGlossaryGroupedObject(rawObject) {
  var alphabetLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var objectSkeleton = alphabetLetters.reduce(function (result, letter) {
    return _extends({}, result, _defineProperty({}, letter, []));
  }, {});

  var populatedObject = Object.keys(rawObject).reduce(function (result, phrase) {
    var letter = phrase.match(/\w/i)[0].toLowerCase();

    return _extends({}, result, _defineProperty({}, letter, [].concat(_toConsumableArray(result[letter]), [{
      phrase: phrase,
      description: rawObject[phrase]
    }])));
  }, objectSkeleton);

  var sortedObject = Object.keys(populatedObject).reduce(function (result, letter) {
    var sortedArray = result[letter].sort(function (a, b) {
      return a.phrase.localeCompare(b.phrase);
    });

    return _extends({}, result, _defineProperty({}, letter, sortedArray));
  }, populatedObject);

  return sortedObject;
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _fuse = __webpack_require__(24);

var _fuse2 = _interopRequireDefault(_fuse);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

var _index = __webpack_require__(150);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideosContainer = function (_Component) {
  _inherits(VideosContainer, _Component);

  function VideosContainer(props) {
    _classCallCheck(this, VideosContainer);

    var _this = _possibleConstructorReturn(this, (VideosContainer.__proto__ || Object.getPrototypeOf(VideosContainer)).call(this, props));

    _this.state = {
      open: null,
      currentPhrase: '',
      currentItems: _this.props.items
    };

    _this.setModal = _this.setModal.bind(_this);
    _this.changePhrase = _this.changePhrase.bind(_this);
    _this.setLanguage = _this.setLanguage.bind(_this);
    return _this;
  }

  _createClass(VideosContainer, [{
    key: 'setLanguage',
    value: function setLanguage(language) {
      if (this.state.open.select === true) {
        this.setState({
          open: _extends({}, this.state.open, {
            language: language,
            select: false
          })
        });
      } else {
        this.setState({
          open: _extends({}, this.state.open, {
            select: true
          })
        });
      }
    }
  }, {
    key: 'setModal',
    value: function setModal(state, id, language) {
      if (state) {
        this.setState({
          open: {
            id: id,
            language: language,
            select: false
          }
        });
      } else {
        this.setState({ open: null });
      }
    }
  }, {
    key: 'changePhrase',
    value: function changePhrase(phrase) {
      this.setState({ currentPhrase: phrase });

      if (phrase.length > 2) {
        var options = {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['title']
        };

        var items = new _fuse2.default(this.props.items, options);
        var result = items.search(phrase);
        this.setState({ currentItems: result });
      } else {
        this.setState({ currentItems: this.props.items });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        open: this.state.open,
        items: this.state.currentItems,
        currentPhrase: this.state.currentPhrase,

        changePhrase: this.changePhrase,
        setModal: this.setModal,
        setLanguage: this.setLanguage
      });
    }
  }]);

  return VideosContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initVideos');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i++) {
      var items = JSON.parse((0, _decodeHtmlEntities2.default)(nodes[i].getAttribute('data-items'))).data;
      (0, _preact.render)((0, _preact.h)(VideosContainer, { items: items }), nodes[i]);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Markup;

var _preact = __webpack_require__(0);

var _Item = __webpack_require__(151);

var _Item2 = _interopRequireDefault(_Item);

var _Modal = __webpack_require__(154);

var _Modal2 = _interopRequireDefault(_Modal);

var _Controls = __webpack_require__(156);

var _Controls2 = _interopRequireDefault(_Controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Markup(props) {
  var items = props.items,
      open = props.open,
      currentPhrase = props.currentPhrase;
  var setLanguage = props.setLanguage,
      changePhrase = props.changePhrase,
      setModal = props.setModal;

  var keys = Object.keys(items);

  return (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(_Controls2.default, { currentPhrase: currentPhrase, changePhrase: changePhrase }),
    (0, _preact.h)(
      'ul',
      { className: 'u-listReset' },
      keys.map(function (key) {
        var _items$key = items[key],
            title = _items$key.title,
            description = _items$key.description,
            languages = _items$key.languages;

        var id = key;
        return (0, _preact.h)(_Item2.default, { key: key, id: id, title: title, description: description, languages: languages, setModal: setModal });
      })
    ),
    open ? (0, _preact.h)(_Modal2.default, _extends({
      open: open,
      title: items[open.id].title,
      description: items[open.id].description,
      languageOptions: items[open.id].languages
    }, { setModal: setModal, setLanguage: setLanguage })) : null
  );
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _preact = __webpack_require__(0);

var _PlayIcon = __webpack_require__(152);

var _PlayIcon2 = _interopRequireDefault(_PlayIcon);

var _trimString = __webpack_require__(153);

var _trimString2 = _interopRequireDefault(_trimString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Item(_ref) {
  var id = _ref.id,
      title = _ref.title,
      description = _ref.description,
      languages = _ref.languages,
      setModal = _ref.setModal;

  var languageKeys = Object.keys(languages);
  var setModalWrapper = function setModalWrapper() {
    return setModal(true, id, languages[languageKeys[0]]);
  };
  var languageButtons = Object.keys(languages).reduce(function (result, key) {
    return [].concat(_toConsumableArray(result), [{
      name: key,
      action: function action() {
        return setModal(true, id, languages[key]);
      }
    }]);
  }, []);

  return (0, _preact.h)(
    'li',
    { className: 'u-listItemReset' },
    (0, _preact.h)(
      'span',
      { className: 'Videos-item' },
      (0, _preact.h)(
        'a',
        { className: 'Videos-thumbnailWrap', onClick: setModalWrapper },
        (0, _preact.h)(
          'div',
          { className: 'Videos-iconWrap' },
          (0, _preact.h)(_PlayIcon2.default, null)
        ),
        (0, _preact.h)('img', { className: 'Videos-thumbnail', src: 'https://img.youtube.com/vi/' + languages[languageKeys[0]] + '/mqdefault.jpg', alt: '' })
      ),
      (0, _preact.h)(
        'ul',
        { className: 'Videos-info' },
        (0, _preact.h)(
          'li',
          { className: 'Videos-title' },
          title
        ),
        (0, _preact.h)(
          'li',
          { className: 'u-listItemReset' },
          (0, _preact.h)(
            'ul',
            { className: 'u-listReset' },
            languageButtons.map(function (_ref2) {
              var name = _ref2.name,
                  action = _ref2.action;
              return (0, _preact.h)(
                'li',
                { className: 'Videos-pillWrap' },
                (0, _preact.h)(
                  'a',
                  { onClick: action, className: 'Button is-small is-inline u-marginRight5 u-marginBottom5' },
                  name
                )
              );
            })
          )
        ),
        (0, _preact.h)(
          'li',
          { className: 'Videos-description' },
          description.length > 200 ? (0, _trimString2.default)(200, description) : description
        )
      )
    )
  );
}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlayIcon;

var _preact = __webpack_require__(0);

function PlayIcon() {
  return (0, _preact.h)(
    "svg",
    { version: "1.2", className: "Videos-icon", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" },
    (0, _preact.h)("path", { d: "M85.9 48L16.9.4c-.7-.5-1.7-.6-2.5-.1-.8.4-1.3 1.2-1.3 2.1v95.2c0 .9.5 1.7 1.3 2.1.3.2.7.3 1.1.3a2 2 0 0 0 1.3-.4l69-47.6c.7-.4 1-1.2 1-2 .1-.8-.3-1.5-.9-2zm0 0" })
  );
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trimString;
function trimString(length, string) {
  var initialTrim = string.substr(0, length);
  var characterToLastSpace = Math.min(initialTrim.length, initialTrim.lastIndexOf(' '));

  return initialTrim.substr(0, characterToLastSpace) + '...';
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _preact = __webpack_require__(0);

var _CloseIcon = __webpack_require__(155);

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Modal(props) {
  var open = props.open,
      title = props.title,
      description = props.description,
      languageOptions = props.languageOptions;
  var setModal = props.setModal,
      setLanguage = props.setLanguage;

  var closeModal = function closeModal() {
    return setModal(false);
  };

  return (0, _preact.h)(
    'div',
    { className: 'Videos-modalWrap' },
    (0, _preact.h)(
      'div',
      { className: 'Videos-modal' },
      (0, _preact.h)(
        'div',
        { className: 'Videos-modalBox' },
        (0, _preact.h)(
          'div',
          { className: 'Videos-modalClose', onClick: closeModal },
          (0, _preact.h)(_CloseIcon2.default, null)
        ),
        (0, _preact.h)(
          'div',
          { className: 'Videos-modalTitle' },
          title
        ),
        (0, _preact.h)(
          'div',
          { className: 'Videos-embed' },
          (0, _preact.h)('div', { className: 'Videos-loading' }),
          (0, _preact.h)('iframe', { className: 'Videos-iframe', width: '560', height: '315', src: 'https://www.youtube.com/embed/' + open.language + '?rel=0&amp;amp;showinfo=0', frameborder: '0', allow: 'autoplay; encrypted-media', allowfullscreen: 'allowfullscreen' })
        ),
        (0, _preact.h)(
          'span',
          { className: 'Videos-label' },
          'Change language:'
        ),
        (0, _preact.h)(
          'div',
          { className: 'Videos-selectWrap' },
          (0, _preact.h)(_index2.default, {
            name: 'language',
            open: open.select,
            items: languageOptions,
            selected: open.language,
            changeAction: function changeAction(value) {
              return setLanguage(value);
            }
          })
        )
      )
    )
  );
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CloseIcon;

var _preact = __webpack_require__(0);

function CloseIcon() {
  return (0, _preact.h)(
    "svg",
    { className: "Videos-closeIcon", version: "1.2", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", overflow: "scroll" },
    (0, _preact.h)("path", { d: "M56.8 50L98.6 8.2a4.8 4.8 0 0 0 0-6.8 4.8 4.8 0 0 0-6.8 0L50 43.2 8.2 1.4a4.8 4.8 0 0 0-6.8 0 4.8 4.8 0 0 0 0 6.8L43.2 50 1.4 91.8a4.8 4.8 0 0 0 0 6.8c.9.9 2.1 1.4 3.4 1.4 1.2 0 2.4-.5 3.4-1.4L50 56.8l41.8 41.8c1 .9 2.2 1.4 3.4 1.4a5 5 0 0 0 3.4-1.4 4.8 4.8 0 0 0 0-6.8L56.8 50zm0 0" })
  );
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CloseIcon;

var _preact = __webpack_require__(0);

function CloseIcon(_ref) {
  var currentPhrase = _ref.currentPhrase,
      changePhrase = _ref.changePhrase,
      languageOptions = _ref.languageOptions;

  return (0, _preact.h)(
    "div",
    null,
    (0, _preact.h)("input", {
      value: currentPhrase,
      className: "Videos-input",
      placeholder: "Start typing to find a video",
      onInput: function onInput(event) {
        return changePhrase(event.target.value);
      }
    })
  );
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _index = __webpack_require__(25);

var _index2 = _interopRequireDefault(_index);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scripts() {
  var componentList = document.getElementsByClassName('js-initValueBlocks');

  for (var i = 0; i < componentList.length; i++) {
    var component = componentList[i];
    var items = JSON.parse((0, _decodeHtmlEntities2.default)(component.getAttribute('data-values')));

    (0, _preact.render)((0, _preact.h)(_index2.default, { items: items }), component);
  }
}

exports.default = scripts();

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _index = __webpack_require__(159);

var _index2 = _interopRequireDefault(_index);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scripts() {
  var componentList = document.getElementsByClassName('js-initRevenue');

  for (var i = 0; i < componentList.length; i++) {
    var component = componentList[i];

    var values = JSON.parse((0, _decodeHtmlEntities2.default)(component.getAttribute('data-values')));
    var year = component.getAttribute('data-year');

    (0, _preact.render)((0, _preact.h)(_index2.default, { values: values, year: year }), component);
  }
}

exports.default = scripts();

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Revenue;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(25);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Revenue(_ref) {
  var values = _ref.values;

  var items = values.data.reduce(function (result, val) {
    return _extends({}, result, _defineProperty({}, val.category, {
      value: val.amount
    }));
  }, {});

  return (0, _preact.h)(_index2.default, { items: items });
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _DebounceFunction = __webpack_require__(23);

var _DebounceFunction2 = _interopRequireDefault(_DebounceFunction);

var _getProp = __webpack_require__(14);

var _getProp2 = _interopRequireDefault(_getProp);

var _index = __webpack_require__(161);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeChartContainer = function (_Component) {
  _inherits(HomeChartContainer, _Component);

  function HomeChartContainer(props) {
    _classCallCheck(this, HomeChartContainer);

    var _this = _possibleConstructorReturn(this, (HomeChartContainer.__proto__ || Object.getPrototypeOf(HomeChartContainer)).call(this, props));

    _this.state = {
      width: 200,
      mobile: true
    };

    _this.updateWidth = function () {
      if (_this.state.mobile && window.innerWidth >= 600) {
        _this.setState({ mobile: false });
      } else if (!_this.state.mobile && window.innerWidth < 600) {
        _this.setState({ mobile: true });
      }

      if (_this.node && _this.node.offsetWidth !== _this.state.width) {
        if (_this.node.offsetWidth <= 200 && _this.state.width !== 200) {
          return _this.setState({ width: 200 });
        }

        return _this.setState({ width: parseInt(_this.node.offsetWidth, 10) });
      }

      return null;
    };

    var viewportDebounce = new _DebounceFunction2.default(300);
    var updateViewport = function updateViewport() {
      return viewportDebounce.update(_this.updateWidth);
    };

    window.addEventListener('resize', updateViewport);

    _this.node = null;
    _this.parentAction = _this.parentAction.bind(_this);
    return _this;
  }

  _createClass(HomeChartContainer, [{
    key: 'parentAction',
    value: function parentAction(node) {
      this.node = node;
      this.updateWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        items: this.props.items,
        width: this.state.width,
        parentAction: this.parentAction,
        mobile: this.state.mobile,
        hasNull: this.props.hasNull
      });
    }
  }]);

  return HomeChartContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initHomeChart');

  var buildRevenueData = function buildRevenueData(array) {
    return array.map(function (object) {
      return _defineProperty({}, object.category, [object.amount]);
    });
  };

  var buildExpenditureData = function buildExpenditureData(array) {
    return array.map(function (object) {
      return _defineProperty({}, object.name, [parseInt(object.total_budget, 10)]);
    });
  };

  var buildExpenditureDataWithNull = function buildExpenditureDataWithNull(array, yearString) {
    return array.map(function (object) {
      return _defineProperty({}, object.name, {
        link: '/' + yearString + '/search-result?search_type=full-search&search=' + object.name
      });
    });
  };

  var normaliseData = function normaliseData(array, hasNull, type, yearString) {
    if (type === 'expenditure' && hasNull) {
      return buildExpenditureDataWithNull(array, yearString);
    } else if (type === 'expenditure') {
      return buildExpenditureData(array);
    } else if (type === 'revenue') {
      return buildRevenueData(array);
    }

    return {};
  };

  var calcIfHasNullTotalBudget = function calcIfHasNullTotalBudget(array) {
    return !array.every(function (object) {
      return object.total_budget !== null;
    });
  };

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var rawValues = (0, _getProp2.default)('values', node, 'json');
    var type = (0, _getProp2.default)('type', node);
    var yearString = (0, _getProp2.default)('year', node);

    var hasNull = type === 'revenue' ? false : calcIfHasNullTotalBudget(rawValues.data);
    var items = Object.assign.apply(Object, _toConsumableArray(normaliseData(rawValues.data, hasNull, type, yearString)));

    (0, _preact.render)((0, _preact.h)(HomeChartContainer, { hasNull: hasNull, items: items }), node);
  }
}

exports.default = scripts();

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HomeChart;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(25);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HomeChart(props) {
  var items = props.items,
      width = props.width,
      mobile = props.mobile,
      hasNull = props.hasNull;
  var parentAction = props.parentAction;


  var withValues = (0, _preact.h)(
    'div',
    { className: 'Section-card' },
    (0, _preact.h)(_index2.default, _extends({
      name: 'programmes-chart',
      guides: !mobile,
      hover: !mobile
    }, { width: width, parentAction: parentAction, items: items }))
  );

  return hasNull ? (0, _preact.h)(_index4.default, { items: items }) : withValues;
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _queryString = __webpack_require__(11);

var _queryString2 = _interopRequireDefault(_queryString);

var _index = __webpack_require__(163);

var _index2 = _interopRequireDefault(_index);

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

var _global = __webpack_require__(43);

var _removePunctuation = __webpack_require__(44);

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchContainer = function (_Component) {
  _inherits(SearchContainer, _Component);

  function SearchContainer(props) {
    _classCallCheck(this, SearchContainer);

    // 'currentKeywords' indicates the current text the user typed in the search box
    // The second block contains factors that influence the UI state (searching means that UI is awaiting HTTP reponse for search suggestions)
    // The third block contains timeout specific variables (used when there is a delay/throttling in the UI)
    // The last block contains data that is retrieved from the HTTP request for search suggestions
    var _this = _possibleConstructorReturn(this, (SearchContainer.__proto__ || Object.getPrototypeOf(SearchContainer)).call(this, props));

    _this.state = {
      currentKeywords: _this.props.searchParam,

      focus: false,
      loading: false,
      searching: false,
      error: false,

      timeoutFocus: null,
      timeoutId: null,

      itemsArray: [],
      count: null
    };

    _this.findSuggestions = _this.findSuggestions.bind(_this);
    _this.setFocus = _this.setFocus.bind(_this);
    return _this;
  }

  _createClass(SearchContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.searchParam) {
        this.findSuggestions(this.state.currentKeywords);
      }
    }

    /**
     * Debounces setting the focus state of the search input (and subsequently the dropdown) by 500 miliseconds. This means that the search only closes if the mouse has left it for a minimum of 500 miliseconds.
     *
     * @param {boolean} value - Whether you want to set the focus on the search input to `true` or `false`.
     */

  }, {
    key: 'setFocus',
    value: function setFocus(value) {
      return this.setState({ focus: value });
    }

    /**
     * Sends a HTTP get request to CKAN that checks if request returns a 200 or whether CKAN returns an error, if so resolves an JavaScript object. It also then logs these events retrospectively to Google Analytics (note the body reponse in an error is maxed at 500 characters). Once fetch is resolved it return an object that contains all the items capped at 10 (under `itemsArray`) and the amount in the CKAN database (under `count`).
     *
     * @param {string} newKeywords - The keywords that should be used to find suggested items. If not included the `currentKeywords` value in the state object will be used.
     *
     * @returns {*} - Returns a promise.
     */

  }, {
    key: 'sendGetRequest',
    value: function sendGetRequest() {
      var newKeywords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.keywords;

      var datasetPackagesQueryUrl = _global.apiBaseURL + '/api/3/action/package_search?q=' + newKeywords + '&start=0&rows=10&fq=+organization:national-treasury+vocab_financial_years:' + this.props.selectedYear + '+extras_department_name_slug:[* TO *]+extras_geographic_region_slug:[* TO *]';
      var requestApi = this.props.requestOverride || datasetPackagesQueryUrl;

      return new Promise(function (resolve, reject) {
        fetch(requestApi).then(function (response) {
          if (!response.ok) {
            response.text().then(function (data) {
              (0, _analyticsEvent2.default)('send', 'event', 'search-error', 'error-response', JSON.stringify({ url: response.url, body: data.slice(0, 500) }));
            });

            reject(response);
          }

          response.json().then(function (data) {
            if (!data.success) {
              (0, _analyticsEvent2.default)('send', 'event', 'search-error', 'ckan-200-error', JSON.stringify({ url: response.url, error: data.error }));
            }

            resolve({ itemsArray: data.result.results, count: data.result.count });
          }).catch(function (err) {
            return reject(err);
          });
        }).catch(function (err) {
          return reject(err);
        });
      });
    }

    /**
     * The wrapper method that executes the HTTP get request (via `this.sendGetRequest`) and sets the UI state accordingly. Note that method logs to the console an error under `console.warn` instead of throwing a traditional error. This is gracefully fail the request in the UI and to prevent an error from unwinding the stack should the HTTP request fail.
     *
     * @param {string} newKeywords - The keywords that should be used to find suggested items. If not included the `currentKeywords` value in the state object will be used.
     */

  }, {
    key: 'findSuggestions',
    value: function findSuggestions(newKeywords) {
      var _this2 = this;

      this.setState({ currentKeywords: newKeywords });

      if (newKeywords.length >= 2) {
        clearTimeout(this.state.timeoutId);
        this.setState({ searching: true });
        this.setState({ count: null });

        var request = function request() {
          return _this2.sendGetRequest((0, _removePunctuation2.default)(newKeywords)).then(function (_ref) {
            var itemsArray = _ref.itemsArray,
                count = _ref.count;

            _this2.setState({ count: count });
            _this2.setState({ timeoutId: null });
            _this2.setState({ itemsArray: itemsArray });
            _this2.setState({ searching: false });
          }).catch(function (err) {
            _this2.setState({ searching: false });
            _this2.setState({ error: true });
            console.warn(err); // eslint-disable-line no-console
          });
        };

        var newTimeoutId = setTimeout(request, 1000);
        this.setState({ timeoutId: newTimeoutId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        currentKeywords: this.state.currentKeywords,

        focus: this.state.focus,
        loading: this.state.loading,
        searching: this.state.searching,
        error: this.state.error,

        itemsArray: this.state.itemsArray,
        count: this.state.count,

        findSuggestions: this.findSuggestions,
        setFocus: this.setFocus,

        selectedYear: this.props.selectedYear
      });
    }
  }]);

  return SearchContainer;
}(_preact.Component);

SearchContainer.propTypes = {
  searchParam: _propTypes2.default.string,
  selectedYear: _propTypes2.default.string.isRequired,
  requestOverride: _propTypes2.default.string
};

SearchContainer.defaultProps = {
  searchParam: '',
  requestOverride: null
};

function scripts() {
  // Find all instances of a specific UI component on a page by parent class name.
  var componentsList = document.getElementsByClassName('js-initSearch');

  // Destructure needed query strings from URL

  var _ref2 = _queryString2.default.parse(location.search) || {},
      searchParam = _ref2.search,
      noJs = _ref2.no_js;

  if (componentsList.length > 0 && !noJs) {
    for (var i = 0; i < componentsList.length; i++) {
      // Find DOM node that will house the Preact app and get associated data attributes that are passed via HTML
      var component = componentsList[i];
      var requestOverride = component.getAttribute('data-request-override');
      var selectedYear = component.getAttribute('data-year') || '2018-19';

      // Initialise Search Preact App
      (0, _preact.render)((0, _preact.h)(SearchContainer, { requestOverride: requestOverride, selectedYear: selectedYear, searchParam: searchParam }), component);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchMarkup;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormArea = __webpack_require__(164);

var _FormArea2 = _interopRequireDefault(_FormArea);

var _ResultsArea = __webpack_require__(166);

var _ResultsArea2 = _interopRequireDefault(_ResultsArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchMarkup(props) {
  var count = props.count,
      currentKeywords = props.currentKeywords,
      error = props.error,
      findSuggestions = props.findSuggestions,
      focus = props.focus,
      itemsArray = props.itemsArray,
      loading = props.loading,
      searching = props.searching,
      selectedYear = props.selectedYear,
      setFocus = props.setFocus;


  if (loading) {
    return (0, _preact.h)(
      'div',
      { className: 'Search-wrap' },
      (0, _preact.h)('div', { className: 'Search-form is-loading' })
    );
  }

  var addFocus = function addFocus() {
    return setFocus(true);
  };
  var removeFocus = function removeFocus() {
    return setFocus(false);
  };

  return (0, _preact.h)(
    'div',
    { className: 'Search' },
    (0, _preact.h)(
      'div',
      { className: 'Search-mobile', onClick: addFocus },
      (0, _preact.h)(
        'svg',
        { className: 'Icon', width: '0', height: '0', version: '1.2', baseProfile: 'tiny', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 100 100' },
        (0, _preact.h)(
          'title',
          null,
          'Search'
        ),
        (0, _preact.h)('path', { d: 'M97.2 85.4L75.5 63.8l-.4-.3C79.5 57 82 49.3 82 41c0-22.6-18.3-41-41-41S0 18.3 0 41c0 22.6 18.3 41 41 41 8.3 0 16-2.5 22.5-6.7l.3.4 21.6 21.6c3.3 3.3 8.5 3.3 11.8 0 3.2-3.4 3.2-8.6 0-12zM41 67.7c-14.8 0-26.8-12-26.8-26.8 0-15 12-27 26.8-27s26.8 12 26.8 27c0 14.7-12 26.7-26.8 26.7z' })
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'Search-float' + (focus ? ' is-focused' : '') },
      (0, _preact.h)('div', {
        className: 'Search-modalCover' + (focus ? ' is-focused' : ''),
        onClick: removeFocus
      }),
      (0, _preact.h)(
        'div',
        { className: 'Search-wrap' + (focus ? ' is-focused' : '') },
        (0, _preact.h)(
          'div',
          { className: 'Search-formWrap' },
          (0, _preact.h)(_FormArea2.default, {
            currentKeywords: currentKeywords,
            findSuggestions: findSuggestions,
            selectedYear: selectedYear,
            setFocus: setFocus,
            focus: focus
          })
        ),
        (0, _preact.h)(_ResultsArea2.default, {
          count: count,
          currentKeywords: currentKeywords,
          error: error,
          focus: focus,
          itemsArray: itemsArray,
          searching: searching,
          selectedYear: selectedYear
        })
      )
    )
  );
}

SearchMarkup.propTypes = {
  count: _propTypes2.default.string.isRequired,
  currentKeywords: _propTypes2.default.string.isRequired,
  error: _propTypes2.default.bool.isRequired,
  findSuggestions: _propTypes2.default.func.isRequired,
  focus: _propTypes2.default.bool.isRequired,

  itemsArray: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    sphere: _propTypes2.default.arrayOf(_propTypes2.default.string),
    financial_year: _propTypes2.default.arrayOf(_propTypes2.default.string),
    extras: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      key: _propTypes2.default.string,
      value: _propTypes2.default.string
    }))
  })),

  loading: _propTypes2.default.bool.isRequired,
  searching: _propTypes2.default.bool.isRequired,
  selectedYear: _propTypes2.default.string.isRequired,
  setFocus: _propTypes2.default.func.isRequired
};

SearchMarkup.defaultProps = {
  itemsArray: []
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormArea;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(165);

var _Icon2 = _interopRequireDefault(_Icon);

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormArea(_ref) {
  var focus = _ref.focus,
      setFocus = _ref.setFocus,
      findSuggestions = _ref.findSuggestions,
      currentKeywords = _ref.currentKeywords,
      selectedYear = _ref.selectedYear;

  // ...
  var searchUrl = '/' + selectedYear + '/search-result';
  var updateKeyword = function updateKeyword(event) {
    return findSuggestions(event.target.value);
  };
  var addFocus = function addFocus() {
    return setFocus(true);
  };

  var removeFocus = function removeFocus() {
    (0, _analyticsEvent2.default)('send', 'event', 'search', 'unfocus', selectedYear + ': ' + currentKeywords);

    return setFocus(false);
  };

  // ...
  return (0, _preact.h)(
    'form',
    { className: 'Search-form', action: searchUrl, method: 'GET' },
    (0, _preact.h)('input', { type: 'hidden', name: 'search_type', value: 'full-search' }),
    (0, _preact.h)('input', { type: 'hidden', name: 'search_string', value: currentKeywords }),
    (0, _preact.h)('input', {
      autoComplete: 'off',
      className: 'Search-keywords',
      name: 'search',
      onFocus: addFocus,
      onInput: updateKeyword,
      placeholder: 'Find department budgets',
      value: currentKeywords
    }),
    (0, _preact.h)(
      'div',
      { className: 'Search-action' },
      (0, _preact.h)(
        'button',
        { className: 'Search-button', type: 'submit' },
        (0, _preact.h)(_Icon2.default, null)
      )
    )
  );
}

FormArea.propTypes = {
  currentKeywords: _propTypes2.default.string.isRequired,
  findSuggestions: _propTypes2.default.func.isRequired,
  selectedYear: _propTypes2.default.string.isRequired,
  setFocus: _propTypes2.default.func.isRequired
};

/***/ }),
/* 165 */
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
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResultsArea;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = __webpack_require__(167);

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ...
function ResultsArea(props) {
  var count = props.count,
      currentKeywords = props.currentKeywords,
      error = props.error,
      findSuggestions = props.findSuggestions,
      focus = props.focus,
      itemsArray = props.itemsArray,
      searching = props.searching,
      selectedYear = props.selectedYear;

  // ...

  var resultsClass = 'Search-results' + (currentKeywords.length >= 2 && focus ? ' is-open' : '');

  // ...
  return (0, _preact.h)(
    'div',
    { className: resultsClass },
    (0, _preact.h)(_List2.default, {
      count: count,
      currentKeywords: currentKeywords,
      error: error,
      findSuggestions: findSuggestions,
      itemsArray: itemsArray,
      searching: searching,
      selectedYear: selectedYear
    })
  );
}

ResultsArea.propTypes = {
  count: _propTypes2.default.string.isRequired,
  currentKeywords: _propTypes2.default.string.isRequired,
  error: _propTypes2.default.bool.isRequired,
  findSuggestions: _propTypes2.default.func.isRequired,
  focus: _propTypes2.default.bool.isRequired,

  itemsArray: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    sphere: _propTypes2.default.arrayOf(_propTypes2.default.string),
    financial_year: _propTypes2.default.arrayOf(_propTypes2.default.string),
    extras: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      key: _propTypes2.default.string,
      value: _propTypes2.default.string
    }))
  })),

  searching: _propTypes2.default.bool.isRequired,
  selectedYear: _propTypes2.default.string.isRequired
};

ResultsArea.defaultProps = {
  itemsArray: []
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = List;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function List(props) {
  var count = props.count,
      currentKeywords = props.currentKeywords,
      error = props.error,
      itemsArray = props.itemsArray,
      searching = props.searching,
      selectedYear = props.selectedYear;

  // ...

  var getExtraValue = function getExtraValue(extras, key) {
    var index = extras.findIndex(function (data) {
      return data.key === key;
    });
    return extras[index].value;
  };

  // ...
  var buildGaQuery = function buildGaQuery() {
    return '?search_type=suggestion-click&search_string=' + selectedYear + '%3A%20' + currentKeywords;
  };

  // ...
  var generateDeptName = function generateDeptName(item) {
    var isNational = item.province.length > 0;
    return isNational ? item.province : 'National';
  };

  // ...
  var generateUrl = function generateUrl(item) {
    var provSlug = getExtraValue(item.extras, 'geographic_region_slug');
    var nameSlug = getExtraValue(item.extras, 'department_name_slug');

    var baseUrl = provSlug === 'south-africa' ? '/' + selectedYear + '/national/departments/' + nameSlug : '/' + selectedYear + '/provincial/' + provSlug + '/departments/' + nameSlug;

    return baseUrl + buildGaQuery(selectedYear, currentKeywords);
  };

  // ...
  var searchingMarkup = (0, _preact.h)(
    'div',
    { className: 'Search-list' },
    (0, _preact.h)(
      'div',
      { className: 'Search-loading' },
      'Searching...'
    )
  );

  // ...
  var errorMarkup = (0, _preact.h)(
    'div',
    { className: 'Search-list' },
    (0, _preact.h)(
      'div',
      { className: 'Search-error' },
      (0, _preact.h)(
        'span',
        null,
        'Something went wrong with the search. Please try again at a later point.'
      )
    )
  );

  // ...
  var emptyMarkup = (0, _preact.h)(
    'div',
    { className: 'Search-list' },
    (0, _preact.h)(
      'div',
      { className: 'Search-error' },
      (0, _preact.h)(
        'span',
        null,
        'We didn\u2019t find anything for \u2019',
        currentKeywords,
        '\u2019. '
      ),
      (0, _preact.h)(
        'a',
        { href: '/' + selectedYear + '/departments' + buildGaQuery(selectedYear, currentKeywords) },
        'View a list of all departments'
      )
    )
  );

  // ...
  var itemMarkup = function itemMarkup() {
    var result = itemsArray.map(function (item) {
      return (0, _preact.h)(
        'li',
        null,
        (0, _preact.h)(
          'a',
          { href: generateUrl(item), className: 'Search-link' },
          generateDeptName(item),
          ' Department: ',
          getExtraValue(item.extras, 'Department Name')
        )
      );
    });

    return (0, _preact.h)(
      'ul',
      { className: 'Search-list' },
      result
    );
  };

  // ...
  var buildList = function buildList() {
    if (searching) {
      return searchingMarkup;
    }

    if (error) {
      return errorMarkup;
    }

    if (itemsArray.length < 1) {
      return emptyMarkup;
    }

    return itemMarkup();
  };

  // ...
  var formatCount = function formatCount(fnCount) {
    if (!fnCount) {
      return null;
    }

    return ' (Showing ' + (fnCount < 10 ? fnCount : 10) + ' of ' + fnCount + ')';
  };

  return (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
      'span',
      { className: 'Search-title' },
      (0, _preact.h)(
        'span',
        null,
        'Suggested Department Budgets'
      ),
      (0, _preact.h)(
        'span',
        { className: 'Search-showing' },
        formatCount(count)
      )
    ),
    buildList()
  );
}

List.propTypes = {
  count: _propTypes2.default.string.isRequired,
  currentKeywords: _propTypes2.default.string.isRequired,
  error: _propTypes2.default.bool.isRequired,

  itemsArray: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    sphere: _propTypes2.default.arrayOf(_propTypes2.default.string),
    financial_year: _propTypes2.default.arrayOf(_propTypes2.default.string),
    extras: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      key: _propTypes2.default.string,
      value: _propTypes2.default.string
    }))
  })),

  searching: _propTypes2.default.bool.isRequired,
  selectedYear: _propTypes2.default.string.isRequired
};

List.defaultProps = {
  itemsArray: []
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _index = __webpack_require__(169);

var _index2 = _interopRequireDefault(_index);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

var _DebounceFunction = __webpack_require__(23);

var _DebounceFunction2 = _interopRequireDefault(_DebounceFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearSelectContainer = function (_Component) {
  _inherits(YearSelectContainer, _Component);

  function YearSelectContainer(props) {
    _classCallCheck(this, YearSelectContainer);

    var _this = _possibleConstructorReturn(this, (YearSelectContainer.__proto__ || Object.getPrototypeOf(YearSelectContainer)).call(this, props));

    _this.state = {
      loading: false,
      open: false,
      tooltip: null,
      sticky: false
    };

    _this.node = null;
    _this.updateNode = _this.updateNode.bind(_this);
    _this.updateItem = _this.updateItem.bind(_this);
    _this.data = _this.normaliseData();

    _this.updateSticky = function () {
      if (_this.node) {
        var top = _this.node.getBoundingClientRect().top;

        if (top + 300 > 0 && _this.state.sticky) {
          _this.setState({ sticky: false });
        } else if (top + 300 < 0 && !_this.state.sticky) {
          _this.setState({ sticky: true });
        }
      }

      return null;
    };

    var viewportDebounce = new _DebounceFunction2.default(50);
    var updateViewport = function updateViewport() {
      return viewportDebounce.update(_this.updateSticky);
    };

    window.addEventListener('resize', updateViewport);

    window.addEventListener('scroll', updateViewport);
    return _this;
  }

  _createClass(YearSelectContainer, [{
    key: 'normaliseData',
    value: function normaliseData() {
      return this.props.jsonData.reduce(function (result, val) {
        return [].concat(_toConsumableArray(result), [{
          direct: val.closest_match.is_exact_match,
          url: val.closest_match.url_path,
          name: val.id,
          active: val.is_selected
        }]);
      }, []);
    }
  }, {
    key: 'updateItem',
    value: function updateItem(key, value) {
      return this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: 'updateNode',
    value: function updateNode(node) {
      this.node = node;
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        jsonData: this.data,
        search: this.props.search,
        loading: this.state.loading,
        open: this.state.open,
        updateItem: this.updateItem,
        tooltip: this.state.tooltip,
        updateNode: this.updateNode,
        sticky: this.state.sticky
      });
    }
  }]);

  return YearSelectContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initYearSelect');
  var nodesArray = [].concat(_toConsumableArray(nodes));
  var noJs = window.vulekamali.qs.no_js;


  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach(function (node, i) {
      var jsonData = JSON.parse((0, _decodeHtmlEntities2.default)(nodes[i].getAttribute('data-json'))).data;

      (0, _preact.render)((0, _preact.h)(YearSelectContainer, { jsonData: jsonData }), nodes[i].parentNode, nodes[i]);
    });
  }
}

exports.default = scripts();

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = YearSelectMarkup;

var _preact = __webpack_require__(0);

var _queryString = __webpack_require__(11);

var _queryString2 = _interopRequireDefault(_queryString);

var _index = __webpack_require__(42);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navToYearPage = function navToYearPage(event, page) {
  event.preventDefault();
  window.location.href = page + '?' + _queryString2.default.stringify(window.vulekamali.qs);
};

function YearSelectMarkup(_ref) {
  var sticky = _ref.sticky,
      jsonData = _ref.jsonData,
      updateNode = _ref.updateNode,
      tooltip = _ref.tooltip,
      open = _ref.open,
      updateItem = _ref.updateItem,
      search = _ref.search,
      loading = _ref.loading,
      year = _ref.year,
      newYear = _ref.newYear;


  var items = jsonData.map(function (data) {
    var Tag = data.active || data.direct === false ? 'span' : 'a';
    var toggleOpen = function toggleOpen() {
      return updateItem('open', !open);
    };

    if (!data.direct) {
      return (0, _preact.h)(
        'li',
        {
          className: 'YearSelect-item' + (data.active ? ' is-active' : ''),
          onClick: data.active ? toggleOpen : null
        },
        (0, _preact.h)(
          _index2.default,
          {
            block: true,
            title: 'Content Unavailable',
            description: 'There is no exact match for this department in ' + data.name + '.',
            year: year,
            openAction: function openAction() {
              return updateItem('tooltip', data.name);
            },
            closeAction: function closeAction() {
              return updateItem('tooltip', null);
            },
            open: data.name === tooltip,
            down: true,
            actions: [{
              url: '/' + data.name + '/departments',
              title: 'View ' + data.name + ' Departments'
            }]
          },
          (0, _preact.h)(
            Tag,
            {
              href: data.active || data.direct === false ? null : data.url,
              className: 'YearSelect-link',
              onClick: function onClick(event) {
                return navToYearPage(event, data.url);
              }
            },
            data.name
          )
        )
      );
    }

    return (0, _preact.h)(
      'li',
      {
        className: 'YearSelect-item' + (data.active ? ' is-active' : ''),
        onClick: data.active ? toggleOpen : null
      },
      (0, _preact.h)(
        Tag,
        {
          href: data.active || data.direct === false ? null : data.url,
          className: 'YearSelect-link',
          onClick: function onClick(event) {
            return navToYearPage(event, data.url);
          }
        },
        data.name
      )
    );
  });

  var placeholder = (0, _preact.h)('div', { className: 'YearSelect-bar is-loading' + (open ? ' is-open' : '') });

  var realData = (0, _preact.h)(
    'ul',
    { className: 'YearSelect-bar' + (open ? ' is-open' : '') },
    items
  );

  var instance = (0, _preact.h)(
    'div',
    { className: 'YearSelect-instance' },
    (0, _preact.h)(
      'div',
      { className: 'YearSelect-wrap' },
      (0, _preact.h)(
        'h2',
        { className: 'YearSelect-title' },
        (0, _preact.h)(
          'span',
          { className: 'YearSelect-titleExtra' },
          'Show data for a '
        ),
        (0, _preact.h)(
          'span',
          null,
          'financial year'
        )
      ),
      (0, _preact.h)(
        'div',
        { className: 'YearSelect-content' },
        loading ? placeholder : realData
      )
    )
  );

  return (0, _preact.h)(
    'div',
    { className: 'YearSelect' },
    (0, _preact.h)(
      'div',
      { className: 'YearSelect-static', ref: function ref(node) {
          return updateNode(node);
        } },
      instance
    ),
    (0, _preact.h)(
      'div',
      { 'aria-hidden': true, className: 'YearSelect-fixed' + (sticky ? ' is-active' : '') },
      instance
    )
  );
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FixedNodeBox = __webpack_require__(171);

var _FixedNodeBox2 = _interopRequireDefault(_FixedNodeBox);

var _HighlightLinks = __webpack_require__(172);

var _HighlightLinks2 = _interopRequireDefault(_HighlightLinks);

var _forceClose = __webpack_require__(175);

var _forceClose2 = _interopRequireDefault(_forceClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scripts() {
  var nodes = document.getElementsByClassName('SubLinks is-currentPage');

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    if (node) {
      (function () {
        var fixedListener = new _FixedNodeBox2.default(node);
        var fixedWrapper = function fixedWrapper() {
          return fixedListener.updateStateDebounce();
        };
        window.addEventListener('scroll', fixedWrapper);

        var linksList = node.getElementsByClassName('js-link');

        if (linksList.length > 0) {
          var highlightListener = new _HighlightLinks2.default(linksList);
          var highlightWrapper = function highlightWrapper() {
            return highlightListener.updateStateDebounce();
          };
          window.addEventListener('scroll', highlightWrapper); //
        }

        (0, _forceClose2.default)(linksList);
      })();
    }
  }
}

exports.default = scripts();

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedNodeBox = function () {
  function FixedNodeBox(boxNode) {
    _classCallCheck(this, FixedNodeBox);

    // static values
    this.boxNode = boxNode;
    this.boxPosition = boxNode.offsetTop;

    // stateful values
    this.boxNodeFixed = {
      value: false,
      changed: false
    };

    this.scrollTimeout = {
      value: null
    };

    this.updateStateDebounce();
  }

  _createClass(FixedNodeBox, [{
    key: 'updatePresentation',
    value: function updatePresentation() {
      if (this.boxNodeFixed.changed === true) {

        if (this.boxNodeFixed.value === true) {
          this.boxNode.classList.add('is-fixed');
          this.boxNodeFixed.changed = false;
        } else {
          this.boxNode.classList.remove('is-fixed');
          this.boxNodeFixed.changed = false;
        }
      }
    }
  }, {
    key: 'calcNewStateValuesIfNeeded',
    value: function calcNewStateValuesIfNeeded() {
      var _this = this;

      var scrollPosition = document.body.scrollTop;

      var changeFixedValue = function changeFixedValue(active) {
        _this.boxNodeFixed = _extends({}, _this.boxNodeFixed, {
          changed: true,
          value: active
        });
      };

      if (this.boxNodeFixed.value === true && scrollPosition - this.boxPosition < -50) {
        changeFixedValue(false);
      } else if (this.boxNodeFixed.value === false && scrollPosition - this.boxPosition > -50) {
        changeFixedValue(true);
      }

      this.updatePresentation();
    }
  }, {
    key: 'updateState',
    value: function updateState() {
      this.calcNewStateValuesIfNeeded();
    }
  }, {
    key: 'updateStateDebounce',
    value: function updateStateDebounce() {
      var _this2 = this;

      if (this.scrollTimeout.value) {
        clearTimeout(this.scrollTimeout.value);
      }

      var updateStateWrap = function updateStateWrap() {
        return _this2.updateState();
      };
      this.scrollTimeout.value = setTimeout(updateStateWrap, 5);
    }
  }]);

  return FixedNodeBox;
}();

exports.default = FixedNodeBox;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buildLinksObject = __webpack_require__(173);

var _buildLinksObject2 = _interopRequireDefault(_buildLinksObject);

var _calcViewportPosition = __webpack_require__(174);

var _calcViewportPosition2 = _interopRequireDefault(_calcViewportPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighlightLinks = function () {
  // ...
  function HighlightLinks(nodes) {
    _classCallCheck(this, HighlightLinks);

    // static values
    this.connectItemsObject = (0, _buildLinksObject2.default)(nodes);

    // stateful values
    this.selectedLink = {
      value: null,
      changed: false
    };
    this.previousSelectedLink = {
      value: null,
      changed: false
    };
    this.scrollTimeout = {
      value: null
    };

    this.updateStateDebounce();
  }

  _createClass(HighlightLinks, [{
    key: 'findCurrentViewedSection',
    value: function findCurrentViewedSection() {
      var pageMiddle = window.innerHeight / 3;

      for (var i = this.connectItemsObject.length - 1; i >= 0; i--) {
        var link = this.connectItemsObject[i];
        var nodePositionFromTop = (0, _calcViewportPosition2.default)(link.target);
        var nodeFromMiddle = nodePositionFromTop + pageMiddle;

        if (nodeFromMiddle >= 0) {
          return i;
        }
      }

      return 0;
    }

    // ...

  }, {
    key: 'updateState',
    value: function updateState() {
      var currentScrolledSection = this.findCurrentViewedSection();

      if (currentScrolledSection !== this.selectedLink.value) {
        this.previousSelectedLink = _extends({}, this.previousSelectedLink, {
          value: this.selectedLink.value || 0,
          changed: true
        });

        this.selectedLink = _extends({}, this.selectedLink, {
          value: currentScrolledSection,
          changed: true
        });
      }

      this.updatePresentation();
    }
  }, {
    key: 'updatePresentation',
    value: function updatePresentation() {
      if (this.selectedLink.changed) {
        this.connectItemsObject[this.selectedLink.value].link.classList.add('is-active');
        this.selectedLink.changed = false;
      }

      if (this.previousSelectedLink.changed) {
        if (this.selectedLink.value > 0) {
          this.connectItemsObject[0].link.classList.remove('is-active');
        }

        if (this.previousSelectedLink.value) {
          this.connectItemsObject[this.previousSelectedLink.value].link.classList.remove('is-active');
        }
        this.previousSelectedLink.changed = false;
      }
    }
  }, {
    key: 'updateStateDebounce',
    value: function updateStateDebounce() {
      var _this = this;

      if (this.scrollTimeout.value) {
        clearTimeout(this.scrollTimeout.value);
      }

      var updateStateWrap = function updateStateWrap() {
        return _this.updateState();
      };
      this.scrollTimeout.value = setTimeout(updateStateWrap, 5);
    }
  }]);

  return HighlightLinks;
}();

exports.default = HighlightLinks;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLinksObject;
function buildLinksObject(nodeList) {
  var result = [];

  for (var i = 0; i < nodeList.length; i++) {
    var node = nodeList[i];
    var connectedId = node.getAttribute('data-connected-id');
    if (connectedId) {
      result.push({
        target: document.getElementById(connectedId),
        link: node
      });
    }
  }

  return result;
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcViewportPosition;
function calcViewportPosition(node) {
  var scrollPosition = document.body.scrollTop;
  var nodeAbsolutePostion = node.offsetTop;
  return scrollPosition - nodeAbsolutePostion;
}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = forceClose;
function forceClose(nodes) {

  var closeAllMenus = function closeAllMenus() {
    window.componentInterfaces.NavBar.forEach(function (instance) {
      instance.methods.closeMobile();
    });
  };

  if (nodes.length > 0) {
    for (var i = 0; nodes.length > i; i++) {
      var link = nodes[i];

      if (link.classList.contains('js-link')) {
        link.addEventListener('click', closeAllMenus);
      }
    }
  }
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function scripts() {
  var componentList = document.getElementsByClassName('NavBar');

  if (componentList.length > 0) {
    var _loop = function _loop(i) {
      var component = componentList[i];
      var mobileTrigger = component.getElementsByClassName('js-mobileTrigger')[0];
      var closeTrigger = component.getElementsByClassName('js-closeIcon')[0];
      var mobileShow = component.getElementsByClassName('js-mobileShow')[0];
      var modalCover = component.getElementsByClassName('js-modalCover')[0];

      var openMobile = function openMobile() {
        mobileShow.classList.add('is-active');
        modalCover.classList.add('is-active');
        document.body.classList.add('has-overlay');
      };

      var closeMobile = function closeMobile() {
        mobileShow.classList.remove('is-active');
        modalCover.classList.remove('is-active');
        document.body.classList.remove('has-overlay');
      };

      mobileTrigger.addEventListener('click', openMobile);
      closeTrigger.addEventListener('click', closeMobile);
      modalCover.addEventListener('click', closeMobile);

      window.componentInterfaces.NavBar = [].concat(_toConsumableArray(window.componentInterfaces.NavBar || []), [{
        methods: {
          closeMobile: closeMobile
        },
        node: component
      }]);
    };

    for (var i = 0; i < componentList.length; i++) {
      _loop(i);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preactRenderToString = __webpack_require__(45);

var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

var _canvgBrowser = __webpack_require__(46);

var _canvgBrowser2 = _interopRequireDefault(_canvgBrowser);

var _preact = __webpack_require__(0);

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(182);

var _index4 = _interopRequireDefault(_index3);

var _calcShareAction = __webpack_require__(184);

var _calcShareAction2 = _interopRequireDefault(_calcShareAction);

var _getProp = __webpack_require__(14);

var _getProp2 = _interopRequireDefault(_getProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgrammesChartContainer = function (_Component) {
  _inherits(ProgrammesChartContainer, _Component);

  function ProgrammesChartContainer(props) {
    _classCallCheck(this, ProgrammesChartContainer);

    var _this = _possibleConstructorReturn(this, (ProgrammesChartContainer.__proto__ || Object.getPrototypeOf(ProgrammesChartContainer)).call(this, props));

    _this.state = {
      selected: 'link',
      open: false,
      modal: false
    };

    _this.hasNull = Object.keys(_this.props.items).reduce(function (result, key) {
      return !_this.props.items[key] ? true : result;
    }, false);

    _this.changeAction = _this.changeAction.bind(_this);
    _this.shareAction = _this.shareAction.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.downloadAction = _this.downloadAction.bind(_this);
    _this.canvasAction = _this.canvasAction.bind(_this);
    return _this;
  }

  _createClass(ProgrammesChartContainer, [{
    key: 'shareAction',
    value: function shareAction() {
      var _this2 = this;

      (0, _calcShareAction2.default)(this.state.selected, 'programmes-chart', function () {
        return _this2.setState({ modal: true });
      });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({ modal: false });
    }
  }, {
    key: 'downloadAction',
    value: function downloadAction() {
      (0, _canvgBrowser2.default)(this.canvas, (0, _preactRenderToString2.default)((0, _preact.h)(_index2.default, {
        scale: 1.5,
        downloadable: {
          heading: this.props.dept,
          subHeading: this.props.deptLocation + ' Department Budget for ' + this.props.year,
          type: 'Programme budgets'
        },
        items: this.props.items,
        guides: true,
        width: 900
      })));

      if (this.canvas.msToBlob) {
        var blob = this.canvas.msToBlob();
        return window.navigator.msSaveBlob(blob, 'chart.png', { scaleWidth: 10, scaleHeight: 10 });
      }

      var link = document.createElement('a');
      link.download = 'chart.png';
      link.href = this.canvas.toDataURL();
      return link.click();
    }
  }, {
    key: 'canvasAction',
    value: function canvasAction(node) {
      this.canvas = node;
    }
  }, {
    key: 'changeAction',
    value: function changeAction(value) {
      if (this.state.open) {
        return this.setState(_extends({}, this.state, {
          selected: value,
          open: false
        }));
      }

      return this.setState({ open: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index4.default, {
        items: this.props.items,
        width: this.state.width,
        parentAction: this.parentAction,
        mobile: this.state.mobile,
        hasNull: this.hasNull,
        year: this.props.year,
        files: this.props.files,

        open: this.state.open,
        selected: this.state.selected,
        changeAction: this.changeAction,
        shareAction: this.shareAction,
        closeModal: this.closeModal,
        modal: this.state.modal,

        downloadAction: this.downloadAction,
        canvasAction: this.canvasAction
      });
    }
  }]);

  return ProgrammesChartContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initProgrammesChart');

  var _loop = function _loop(i) {
    var node = nodes[i];

    var rawValues = (0, _getProp2.default)('values', node, 'json').data;
    var rawFiles = (0, _getProp2.default)('files', node, 'json');
    var year = (0, _getProp2.default)('year', node);
    var dept = (0, _getProp2.default)('dept', node);
    var deptLocation = (0, _getProp2.default)('dept-location', node);

    var items = rawValues.reduce(function (results, val) {
      return _extends({}, results, _defineProperty({}, val.name, [val.total_budget]));
    }, {});

    var files = Object.keys(rawFiles).reduce(function (results, key) {
      var object = rawFiles[key].formats.reduce(function (innerResults, val) {
        return _extends({}, innerResults, _defineProperty({}, key + ' (' + val.format.replace(/^xls.+/i, 'Excel') + ')', val.url));
      }, {});

      return _extends({}, results, object);
    }, {});

    (0, _preact.render)((0, _preact.h)(ProgrammesChartContainer, { items: items, year: year, files: files, dept: dept, deptLocation: deptLocation }), node);
  };

  for (var i = 0; i < nodes.length; i++) {
    _loop(i);
  }
}

exports.default = scripts();

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
	http://www.phpied.com/rgb-color-parser-in-javascript/
*/

module.exports = function (color_string) {
    this.ok = false;
    this.alpha = 1.0;

    // strip any leading #
    if (color_string.charAt(0) == '#') {
        // remove # if any
        color_string = color_string.substr(1, 6);
    }

    color_string = color_string.replace(/ /g, '');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    color_string = simple_colors[color_string] || color_string;
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [{
        re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
        example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
        process: function process(bits) {
            return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
        }
    }, {
        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
        process: function process(bits) {
            return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
        }
    }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ['#00ff00', '336699'],
        process: function process(bits) {
            return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
        }
    }, {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: ['#fb0', 'f0f'],
        process: function process(bits) {
            return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
        }
    }];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            var channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            if (channels.length > 3) {
                this.alpha = channels[3];
            }
            this.ok = true;
        }
    }

    // validate/cleanup values
    this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
    this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
    this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
    this.alpha = this.alpha < 0 ? 0 : this.alpha > 1.0 || isNaN(this.alpha) ? 1.0 : this.alpha;

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
    this.toRGBA = function () {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
    };
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    };

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText = 'margin: 3px; ' + 'border: 1px solid black; ' + 'background:' + list_color.toHex() + '; ' + 'color:' + list_color.toHex();
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex());
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);
            } catch (e) {}
        }
        return xml;
    };
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*

StackBlur - a fast almost Gaussian Blur For Canvas

Version: 	0.5
Author:		Mario Klingemann
Contact: 	mario@quasimondo.com
Website:	http://www.quasimondo.com/StackBlurForCanvas
Twitter:	@quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr: 
https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

function blur(pixels, width, height, radius) {
	if (isNaN(radius) || radius < 1) return;
	radius |= 0;

	var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

	var div = radius + radius + 1;
	var w4 = width << 2;
	var widthMinus1 = width - 1;
	var heightMinus1 = height - 1;
	var radiusPlus1 = radius + 1;
	var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

	var stackStart = new BlurStack();
	var stack = stackStart;
	for (i = 1; i < div; i++) {
		stack = stack.next = new BlurStack();
		if (i == radiusPlus1) var stackEnd = stack;
	}
	stack.next = stackStart;
	var stackIn = null;
	var stackOut = null;

	yw = yi = 0;

	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];

	for (y = 0; y < height; y++) {
		r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

		r_out_sum = radiusPlus1 * (pr = pixels[yi]);
		g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
		b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
		a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		a_sum += sumFactor * pa;

		stack = stackStart;

		for (i = 0; i < radiusPlus1; i++) {
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack.a = pa;
			stack = stack.next;
		}

		for (i = 1; i < radiusPlus1; i++) {
			p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
			r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
			g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
			b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
			a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			a_in_sum += pa;

			stack = stack.next;
		}

		stackIn = stackStart;
		stackOut = stackEnd;
		for (x = 0; x < width; x++) {
			pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
			if (pa != 0) {
				pa = 255 / pa;
				pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
				pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
				pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
			} else {
				pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
			}

			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			a_sum -= a_out_sum;

			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			a_out_sum -= stackIn.a;

			p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

			r_in_sum += stackIn.r = pixels[p];
			g_in_sum += stackIn.g = pixels[p + 1];
			b_in_sum += stackIn.b = pixels[p + 2];
			a_in_sum += stackIn.a = pixels[p + 3];

			r_sum += r_in_sum;
			g_sum += g_in_sum;
			b_sum += b_in_sum;
			a_sum += a_in_sum;

			stackIn = stackIn.next;

			r_out_sum += pr = stackOut.r;
			g_out_sum += pg = stackOut.g;
			b_out_sum += pb = stackOut.b;
			a_out_sum += pa = stackOut.a;

			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			a_in_sum -= pa;

			stackOut = stackOut.next;

			yi += 4;
		}
		yw += width;
	}

	for (x = 0; x < width; x++) {
		g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

		yi = x << 2;
		r_out_sum = radiusPlus1 * (pr = pixels[yi]);
		g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
		b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
		a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		a_sum += sumFactor * pa;

		stack = stackStart;

		for (i = 0; i < radiusPlus1; i++) {
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack.a = pa;
			stack = stack.next;
		}

		yp = width;

		for (i = 1; i <= radius; i++) {
			yi = yp + x << 2;

			r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
			g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
			b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
			a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			a_in_sum += pa;

			stack = stack.next;

			if (i < heightMinus1) {
				yp += width;
			}
		}

		yi = x;
		stackIn = stackStart;
		stackOut = stackEnd;
		for (y = 0; y < height; y++) {
			p = yi << 2;
			pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
			if (pa > 0) {
				pa = 255 / pa;
				pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
				pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
				pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
			} else {
				pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
			}

			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			a_sum -= a_out_sum;

			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			a_out_sum -= stackIn.a;

			p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

			r_sum += r_in_sum += stackIn.r = pixels[p];
			g_sum += g_in_sum += stackIn.g = pixels[p + 1];
			b_sum += b_in_sum += stackIn.b = pixels[p + 2];
			a_sum += a_in_sum += stackIn.a = pixels[p + 3];

			stackIn = stackIn.next;

			r_out_sum += pr = stackOut.r;
			g_out_sum += pg = stackOut.g;
			b_out_sum += pb = stackOut.b;
			a_out_sum += pa = stackOut.a;

			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			a_in_sum -= pa;

			stackOut = stackOut.next;

			yi += width;
		}
	}
}

function BlurStack() {
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 0;
	this.next = null;
}

module.exports = blur;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function DOMParser(options) {
	this.options = options || { locator: {} };
}
DOMParser.prototype.parseFromString = function (source, mimeType) {
	var options = this.options;
	var sax = new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns || {};
	var entityMap = { 'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"', 'apos': "'" };
	if (locator) {
		domBuilder.setDocumentLocator(locator);
	}

	sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if (/\/x?html?$/.test(mimeType)) {
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if (source) {
		sax.parse(source, defaultNSMap, entityMap);
	} else {
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
};
function buildErrorHandler(errorImpl, domBuilder, locator) {
	if (!errorImpl) {
		if (domBuilder instanceof DOMHandler) {
			return domBuilder;
		}
		errorImpl = domBuilder;
	}
	var errorHandler = {};
	var isCallback = errorImpl instanceof Function;
	locator = locator || {};
	function build(key) {
		var fn = errorImpl[key];
		if (!fn && isCallback) {
			fn = errorImpl.length == 2 ? function (msg) {
				errorImpl(key, msg);
			} : errorImpl;
		}
		errorHandler[key] = fn && function (msg) {
			fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
		} || function () {};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
	this.cdata = false;
}
function position(locator, node) {
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument: function startDocument() {
		this.doc = new DOMImplementation().createDocument(null, null, null);
		if (this.locator) {
			this.doc.documentURI = this.locator.systemId;
		}
	},
	startElement: function startElement(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
		var el = doc.createElementNS(namespaceURI, qName || localName);
		var len = attrs.length;
		appendElement(this, el);
		this.currentElement = el;

		this.locator && position(this.locator, el);
		for (var i = 0; i < len; i++) {
			var namespaceURI = attrs.getURI(i);
			var value = attrs.getValue(i);
			var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator && position(attrs.getLocator(i), attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr);
		}
	},
	endElement: function endElement(namespaceURI, localName, qName) {
		var current = this.currentElement;
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping: function startPrefixMapping(prefix, uri) {},
	endPrefixMapping: function endPrefixMapping(prefix) {},
	processingInstruction: function processingInstruction(target, data) {
		var ins = this.doc.createProcessingInstruction(target, data);
		this.locator && position(this.locator, ins);
		appendElement(this, ins);
	},
	ignorableWhitespace: function ignorableWhitespace(ch, start, length) {},
	characters: function characters(chars, start, length) {
		chars = _toString.apply(this, arguments);
		//console.log(chars)
		if (chars) {
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if (this.currentElement) {
				this.currentElement.appendChild(charNode);
			} else if (/^\s*$/.test(chars)) {
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator, charNode);
		}
	},
	skippedEntity: function skippedEntity(name) {},
	endDocument: function endDocument() {
		this.doc.normalize();
	},
	setDocumentLocator: function setDocumentLocator(locator) {
		if (this.locator = locator) {
			// && !('lineNumber' in locator)){
			locator.lineNumber = 0;
		}
	},
	//LexicalHandler
	comment: function comment(chars, start, length) {
		chars = _toString.apply(this, arguments);
		var comm = this.doc.createComment(chars);
		this.locator && position(this.locator, comm);
		appendElement(this, comm);
	},

	startCDATA: function startCDATA() {
		//used in characters() methods
		this.cdata = true;
	},
	endCDATA: function endCDATA() {
		this.cdata = false;
	},

	startDTD: function startDTD(name, publicId, systemId) {
		var impl = this.doc.implementation;
		if (impl && impl.createDocumentType) {
			var dt = impl.createDocumentType(name, publicId, systemId);
			this.locator && position(this.locator, dt);
			appendElement(this, dt);
		}
	},
	/**
  * @see org.xml.sax.ErrorHandler
  * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
  */
	warning: function warning(error) {
		console.warn('[xmldom warning]\t' + error, _locator(this.locator));
	},
	error: function error(_error) {
		console.error('[xmldom error]\t' + _error, _locator(this.locator));
	},
	fatalError: function fatalError(error) {
		console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
		throw error;
	}
};
function _locator(l) {
	if (l) {
		return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
	}
}
function _toString(chars, start, length) {
	if (typeof chars == 'string') {
		return chars.substr(start, length);
	} else {
		//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if (chars.length >= start + length || start) {
			return new java.lang.String(chars, start, length) + '';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
	DOMHandler.prototype[key] = function () {
		return null;
	};
});

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(hander, node) {
	if (!hander.currentElement) {
		hander.doc.appendChild(node);
	} else {
		hander.currentElement.appendChild(node);
	}
} //appendChild and setAttributeNS are preformance key

//if(typeof require == 'function'){
var XMLReader = __webpack_require__(181).XMLReader;
var DOMImplementation = exports.DOMImplementation = __webpack_require__(47).DOMImplementation;
exports.XMLSerializer = __webpack_require__(47).XMLSerializer;
exports.DOMParser = DOMParser;
//}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0; //tag name offerring
var S_ATTR = 1; //attr name offerring 
var S_ATTR_SPACE = 2; //attr name end and space offer
var S_EQ = 3; //=space?
var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)
var S_ATTR_END = 5; //attr value end and no space(quot end)
var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7; //closed el<el />

function XMLReader() {}

XMLReader.prototype = {
	parse: function parse(source, defaultNSMap, entityMap) {
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap, defaultNSMap = {});
		_parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
		domBuilder.endDocument();
	}
};
function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10),
			    surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a) {
		var k = a.slice(1, -1);
		if (k in entityMap) {
			return entityMap[k];
		} else if (k.charAt(0) === '#') {
			return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
		} else {
			errorHandler.error('entity not found:' + a);
			return a;
		}
	}
	function appendText(end) {
		//has some bugs
		if (end > start) {
			var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
			locator && position(start);
			domBuilder.characters(xt, 0, end - start);
			start = end;
		}
	}
	function position(p, m) {
		while (p >= lineEnd && (m = linePattern.exec(source))) {
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p - lineStart + 1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g;
	var locator = domBuilder.locator;

	var parseStack = [{ currentNSMap: defaultNSMapCopy }];
	var closeMap = {};
	var start = 0;
	while (true) {
		try {
			var tagStart = source.indexOf('<', start);
			if (tagStart < 0) {
				if (!source.substr(start).match(/^\s*$/)) {
					var doc = domBuilder.doc;
					var text = doc.createTextNode(source.substr(start));
					doc.appendChild(text);
					domBuilder.currentElement = text;
				}
				return;
			}
			if (tagStart > start) {
				appendText(tagStart);
			}
			switch (source.charAt(tagStart + 1)) {
				case '/':
					var end = source.indexOf('>', tagStart + 3);
					var tagName = source.substring(tagStart + 2, end);
					var config = parseStack.pop();
					if (end < 0) {

						tagName = source.substring(tagStart + 2).replace(/[\s<].*/, '');
						//console.error('#@@@@@@'+tagName)
						errorHandler.error("end tag name: " + tagName + ' is not complete:' + config.tagName);
						end = tagStart + 1 + tagName.length;
					} else if (tagName.match(/\s</)) {
						tagName = tagName.replace(/[\s<].*/, '');
						errorHandler.error("end tag name: " + tagName + ' maybe not complete');
						end = tagStart + 1 + tagName.length;
					}
					//console.error(parseStack.length,parseStack)
					//console.error(config);
					var localNSMap = config.localNSMap;
					var endMatch = config.tagName == tagName;
					var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
					if (endIgnoreCaseMach) {
						domBuilder.endElement(config.uri, config.localName, tagName);
						if (localNSMap) {
							for (var prefix in localNSMap) {
								domBuilder.endPrefixMapping(prefix);
							}
						}
						if (!endMatch) {
							errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
						}
					} else {
						parseStack.push(config);
					}

					end++;
					break;
				// end elment
				case '?':
					// <?...?>
					locator && position(tagStart);
					end = parseInstruction(source, tagStart, domBuilder);
					break;
				case '!':
					// <!doctype,<![CDATA,<!--
					locator && position(tagStart);
					end = parseDCC(source, tagStart, domBuilder, errorHandler);
					break;
				default:
					locator && position(tagStart);
					var el = new ElementAttributes();
					var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
					//elStartEnd
					var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
					var len = el.length;

					if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
						el.closed = true;
						if (!entityMap.nbsp) {
							errorHandler.warning('unclosed xml attribute');
						}
					}
					if (locator && len) {
						var locator2 = copyLocator(locator, {});
						//try{//attribute position fixed
						for (var i = 0; i < len; i++) {
							var a = el[i];
							position(a.offset);
							a.locator = copyLocator(locator, {});
						}
						//}catch(e){console.error('@@@@@'+e)}
						domBuilder.locator = locator2;
						if (appendElement(el, domBuilder, currentNSMap)) {
							parseStack.push(el);
						}
						domBuilder.locator = locator;
					} else {
						if (appendElement(el, domBuilder, currentNSMap)) {
							parseStack.push(el);
						}
					}

					if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
						end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
					} else {
						end++;
					}
			}
		} catch (e) {
			errorHandler.error('element parse error: ' + e);
			//errorHandler.error('element parse error: '+e);
			end = -1;
			//throw e;
		}
		if (end > start) {
			start = end;
		} else {
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart, start) + 1);
		}
	}
}
function copyLocator(f, t) {
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG; //status
	while (true) {
		var c = source.charAt(p);
		switch (c) {
			case '=':
				if (s === S_ATTR) {
					//attrName
					attrName = source.slice(start, p);
					s = S_EQ;
				} else if (s === S_ATTR_SPACE) {
					s = S_EQ;
				} else {
					//fatalError: equal must after attrName or space after attrName
					throw new Error('attribute equal must after attrName');
				}
				break;
			case '\'':
			case '"':
				if (s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				) {
						//equal
						if (s === S_ATTR) {
							errorHandler.warning('attribute value must after "="');
							attrName = source.slice(start, p);
						}
						start = p + 1;
						p = source.indexOf(c, start);
						if (p > 0) {
							value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
							el.add(attrName, value, start - 1);
							s = S_ATTR_END;
						} else {
							//fatalError: no end quot match
							throw new Error('attribute value no end \'' + c + '\' match');
						}
					} else if (s == S_ATTR_NOQUOT_VALUE) {
					value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
					//console.log(attrName,value,start,p)
					el.add(attrName, value, start);
					//console.dir(el)
					errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
					start = p + 1;
					s = S_ATTR_END;
				} else {
					//fatalError: no equal before
					throw new Error('attribute value must after "="');
				}
				break;
			case '/':
				switch (s) {
					case S_TAG:
						el.setTagName(source.slice(start, p));
					case S_ATTR_END:
					case S_TAG_SPACE:
					case S_TAG_CLOSE:
						s = S_TAG_CLOSE;
						el.closed = true;
					case S_ATTR_NOQUOT_VALUE:
					case S_ATTR:
					case S_ATTR_SPACE:
						break;
					//case S_EQ:
					default:
						throw new Error("attribute invalid close char('/')");
				}
				break;
			case '':
				//end document
				//throw new Error('unexpected end of input')
				errorHandler.error('unexpected end of input');
				if (s == S_TAG) {
					el.setTagName(source.slice(start, p));
				}
				return p;
			case '>':
				switch (s) {
					case S_TAG:
						el.setTagName(source.slice(start, p));
					case S_ATTR_END:
					case S_TAG_SPACE:
					case S_TAG_CLOSE:
						break; //normal
					case S_ATTR_NOQUOT_VALUE: //Compatible state
					case S_ATTR:
						value = source.slice(start, p);
						if (value.slice(-1) === '/') {
							el.closed = true;
							value = value.slice(0, -1);
						}
					case S_ATTR_SPACE:
						if (s === S_ATTR_SPACE) {
							value = attrName;
						}
						if (s == S_ATTR_NOQUOT_VALUE) {
							errorHandler.warning('attribute "' + value + '" missed quot(")!!');
							el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
						} else {
							if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
								errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
							}
							el.add(value, value, start);
						}
						break;
					case S_EQ:
						throw new Error('attribute value missed!!');
				}
				//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
				return p;
			/*xml space '\x20' | #x9 | #xD | #xA; */
			case "\x80":
				c = ' ';
			default:
				if (c <= ' ') {
					//space
					switch (s) {
						case S_TAG:
							el.setTagName(source.slice(start, p)); //tagName
							s = S_TAG_SPACE;
							break;
						case S_ATTR:
							attrName = source.slice(start, p);
							s = S_ATTR_SPACE;
							break;
						case S_ATTR_NOQUOT_VALUE:
							var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
							errorHandler.warning('attribute "' + value + '" missed quot(")!!');
							el.add(attrName, value, start);
						case S_ATTR_END:
							s = S_TAG_SPACE;
							break;
						//case S_TAG_SPACE:
						//case S_EQ:
						//case S_ATTR_SPACE:
						//	void();break;
						//case S_TAG_CLOSE:
						//ignore warning
					}
				} else {
					//not space
					//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
					//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
					switch (s) {
						//case S_TAG:void();break;
						//case S_ATTR:void();break;
						//case S_ATTR_NOQUOT_VALUE:void();break;
						case S_ATTR_SPACE:
							var tagName = el.tagName;
							if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
								errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
							}
							el.add(attrName, attrName, start);
							start = p;
							s = S_ATTR;
							break;
						case S_ATTR_END:
							errorHandler.warning('attribute space is required"' + attrName + '"!!');
						case S_TAG_SPACE:
							s = S_ATTR;
							start = p;
							break;
						case S_EQ:
							s = S_ATTR_NOQUOT_VALUE;
							start = p;
							break;
						case S_TAG_CLOSE:
							throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
		} //end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el, domBuilder, currentNSMap) {
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while (i--) {
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if (nsp > 0) {
			var prefix = a.prefix = qName.slice(0, nsp);
			var localName = qName.slice(nsp + 1);
			var nsPrefix = prefix === 'xmlns' && localName;
		} else {
			localName = qName;
			prefix = null;
			nsPrefix = qName === 'xmlns' && '';
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName;
		//prefix == null for no ns prefix attribute 
		if (nsPrefix !== false) {
			//hack!!
			if (localNSMap == null) {
				localNSMap = {};
				//console.log(currentNSMap,0)
				_copy(currentNSMap, currentNSMap = {});
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/';
			domBuilder.startPrefixMapping(nsPrefix, value);
		}
	}
	var i = el.length;
	while (i--) {
		a = el[i];
		var prefix = a.prefix;
		if (prefix) {
			//no prefix attribute has no namespace
			if (prefix === 'xml') {
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if (prefix !== 'xmlns') {
				a.uri = currentNSMap[prefix || ''];

				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if (nsp > 0) {
		prefix = el.prefix = tagName.slice(0, nsp);
		localName = el.localName = tagName.slice(nsp + 1);
	} else {
		prefix = null; //important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns, localName, tagName, el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if (el.closed) {
		domBuilder.endElement(ns, localName, tagName);
		if (localNSMap) {
			for (prefix in localNSMap) {
				domBuilder.endPrefixMapping(prefix);
			}
		}
	} else {
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
	if (/^(?:script|textarea)$/i.test(tagName)) {
		var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
		var text = source.substring(elStartEnd + 1, elEndStart);
		if (/[&<]/.test(text)) {
			if (/^script$/i.test(tagName)) {
				//if(!/\]\]>/.test(text)){
				//lexHandler.startCDATA();
				domBuilder.characters(text, 0, text.length);
				//lexHandler.endCDATA();
				return elEndStart;
				//}
			} //}else{//text area
			text = text.replace(/&#?\w+;/g, entityReplacer);
			domBuilder.characters(text, 0, text.length);
			return elEndStart;
			//}
		}
	}
	return elStartEnd + 1;
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if (pos == null) {
		//console.log(tagName)
		pos = source.lastIndexOf('</' + tagName + '>');
		if (pos < elStartEnd) {
			//忘记闭合
			pos = source.lastIndexOf('</' + tagName);
		}
		closeMap[tagName] = pos;
	}
	return pos < elStartEnd;
	//} 
}
function _copy(source, target) {
	for (var n in source) {
		target[n] = source[n];
	}
}
function parseDCC(source, start, domBuilder, errorHandler) {
	//sure start with '<!'
	var next = source.charAt(start + 2);
	switch (next) {
		case '-':
			if (source.charAt(start + 3) === '-') {
				var end = source.indexOf('-->', start + 4);
				//append comment source.substring(4,end)//<!--
				if (end > start) {
					domBuilder.comment(source, start + 4, end - start - 4);
					return end + 3;
				} else {
					errorHandler.error("Unclosed comment");
					return -1;
				}
			} else {
				//error
				return -1;
			}
		default:
			if (source.substr(start + 3, 6) == 'CDATA[') {
				var end = source.indexOf(']]>', start + 9);
				domBuilder.startCDATA();
				domBuilder.characters(source, start + 9, end - start - 9);
				domBuilder.endCDATA();
				return end + 3;
			}
			//<!DOCTYPE
			//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
			var matchs = split(source, start);
			var len = matchs.length;
			if (len > 1 && /!doctype/i.test(matchs[0][0])) {
				var name = matchs[1][0];
				var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
				var sysid = len > 4 && matchs[4][0];
				var lastMatch = matchs[len - 1];
				domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'), sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
				domBuilder.endDTD();

				return lastMatch.index + lastMatch[0].length;
			}
	}
	return -1;
}

function parseInstruction(source, start, domBuilder) {
	var end = source.indexOf('?>', start);
	if (end) {
		var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if (match) {
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]);
			return end + 2;
		} else {
			//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source) {}
ElementAttributes.prototype = {
	setTagName: function setTagName(tagName) {
		if (!tagNamePattern.test(tagName)) {
			throw new Error('invalid tagName:' + tagName);
		}
		this.tagName = tagName;
	},
	add: function add(qName, value, offset) {
		if (!tagNamePattern.test(qName)) {
			throw new Error('invalid attribute:' + qName);
		}
		this[this.length++] = { qName: qName, value: value, offset: offset };
	},
	length: 0,
	getLocalName: function getLocalName(i) {
		return this[i].localName;
	},
	getLocator: function getLocator(i) {
		return this[i].locator;
	},
	getQName: function getQName(i) {
		return this[i].qName;
	},
	getURI: function getURI(i) {
		return this[i].uri;
	},
	getValue: function getValue(i) {
		return this[i].value;
	}
	//	,getIndex:function(uri, localName)){
	//		if(localName){
	//			
	//		}else{
	//			var qName = uri
	//		}
	//	},
	//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
	//	getType:function(uri,localName){}
	//	getType:function(i){},
};

function _set_proto_(thiz, parent) {
	thiz.__proto__ = parent;
	return thiz;
}
if (!(_set_proto_({}, _set_proto_.prototype) instanceof _set_proto_)) {
	_set_proto_ = function _set_proto_(thiz, parent) {
		function p() {};
		p.prototype = parent;
		p = new p();
		for (parent in thiz) {
			p[parent] = thiz[parent];
		}
		return p;
	};
}

function split(source, start) {
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source); //skip <
	while (match = reg.exec(source)) {
		buf.push(match);
		if (match[1]) return buf;
	}
}

exports.XMLReader = XMLReader;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ProgrammesChart;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(22);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(48);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(4);

var _index6 = _interopRequireDefault(_index5);

var _shareSelections = __webpack_require__(183);

var _shareSelections2 = _interopRequireDefault(_shareSelections);

var _index7 = __webpack_require__(12);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(18);

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProgrammesChart(props) {
  var items = props.items,
      hasNull = props.hasNull,
      year = props.year,
      files = props.files,
      open = props.open,
      selected = props.selected,
      modal = props.modal;
  var changeAction = props.changeAction,
      downloadAction = props.downloadAction,
      shareAction = props.shareAction,
      closeModal = props.closeModal,
      canvasAction = props.canvasAction;


  var noValues = (0, _preact.h)(
    'ul',
    { className: 'u-margin0 u-paddingLeft20' },
    Object.keys(items).map(function (val) {
      return (0, _preact.h)(
        'li',
        null,
        val
      );
    })
  );

  var withValues = (0, _preact.h)(_index2.default, _extends({
    type: 'bar'
  }, { items: items }));

  var downloadButton = (0, _preact.h)(
    'button',
    { className: 'Button is-inline', onClick: downloadAction },
    'Download chart as image'
  );

  var buildDownloadLinks = function buildDownloadLinks() {
    Object.keys(files).map(function (key) {
      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(_index4.default, { title: key, link: files[key], icon: true })
      );
    });
  };

  return (0, _preact.h)(
    'div',
    { className: 'Section is-bevel', id: 'programmes-chart' },
    (0, _preact.h)('canvas', { ref: function ref(node) {
        return canvasAction(node);
      }, style: { display: 'none' } }),
    (0, _preact.h)(
      _index10.default,
      {
        title: 'Share this link:',
        closeAction: closeModal,
        open: modal
      },
      (0, _preact.h)(
        'a',
        { className: 'u-wordBreak u-wordBreak--breakAll', href: window.location.href + '#programmes-chart' },
        window.location.href + '#programmes-chart'
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'ProgrammesChart' },
      (0, _preact.h)(
        'div',
        { className: 'ProgrammesChart-info' },
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible' },
          (0, _preact.h)(
            'div',
            { className: 'Page-subHeading' },
            'Programme budgets for ',
            year
          ),
          (0, _preact.h)(
            'p',
            null,
            'A department\'s programmes are the activities that it spends money on during the financial year. Different programmes have different expenditure budgets, depending on their requirements and available finances. More detail on the programmes is available in the department\'s Estimates of National Expenditure (ENE) documents.'
          )
        ),
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible' },
          (0, _preact.h)(
            'div',
            { className: 'u-fontWeightBold' },
            'Sources'
          ),
          (0, _preact.h)(
            'p',
            null,
            'The Estimates of National Expenditure (ENE) sets out the detailed spending plans of each government department for the coming year.'
          ),
          files ? buildDownloadLinks : null
        ),
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible' },
          (0, _preact.h)(
            'div',
            { className: 'u-fontWeightBold u-marginBottom10' },
            'Share this chart:'
          ),
          (0, _preact.h)(
            'div',
            { className: 'ProgrammesChart-share' },
            (0, _preact.h)(
              'div',
              { className: 'ProgrammesChart-shareDropdown' },
              (0, _preact.h)(_index6.default, _extends({
                name: name + '-share-selection',
                items: _shareSelections2.default
              }, { open: open, selected: selected, changeAction: changeAction }))
            ),
            (0, _preact.h)(
              'div',
              { className: 'ProgrammesChart-shareButton u-marginLeft5' },
              (0, _preact.h)(
                'button',
                { onClick: shareAction, className: 'Button is-inline has-icon u-transformRotate270' },
                (0, _preact.h)(_index8.default, { type: 'download', size: 'small' })
              )
            )
          )
        )
      ),
      (0, _preact.h)(
        'div',
        { className: 'ProgrammesChart-chart' },
        (0, _preact.h)(
          'div',
          { className: 'Section-card' },
          hasNull ? noValues : withValues
        ),
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible u-textAlignCenter' },
          hasNull ? null : downloadButton
        )
      )
    )
  );
}

/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports = {"As link":"link","On Facebook":"facebook","On Twitter":"twitter"}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcShareAction;

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calcShareAction(selected, anchorString, updateModal) {
  var url = encodeURIComponent(window.location.href);
  var anchor = anchorString ? '#' + anchorString : '';
  var message = encodeURIComponent('SA Budget Data from vulekamali');

  var copyText = function copyText() {
    (0, _analyticsEvent2.default)('send', 'social', 'email', 'share', url);
    updateModal();
  };

  var fbDirect = function fbDirect() {
    (0, _analyticsEvent2.default)('send', 'social', 'facebook', 'share', url);
    var win = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + anchor, '_blank');
    win.focus();
  };

  var twDirect = function twDirect() {
    (0, _analyticsEvent2.default)('send', 'social', 'twitter', 'share', url);
    var win = window.open('https://twitter.com/home?status=' + message + '%20' + url + anchor, '_blank');
    win.focus();
  };

  if (selected === 'link') {
    return copyText();
  } else if (selected === 'facebook') {
    return fbDirect();
  } else if (selected === 'twitter') {
    return twDirect();
  }

  return null;
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preactRenderToString = __webpack_require__(45);

var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

var _preact = __webpack_require__(0);

var _canvgBrowser = __webpack_require__(46);

var _canvgBrowser2 = _interopRequireDefault(_canvgBrowser);

var _index = __webpack_require__(186);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(13);

var _index4 = _interopRequireDefault(_index3);

var _calcShareAction = __webpack_require__(188);

var _calcShareAction2 = _interopRequireDefault(_calcShareAction);

var _getProp = __webpack_require__(14);

var _getProp2 = _interopRequireDefault(_getProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpenditureChartContainer = function (_Component) {
  _inherits(ExpenditureChartContainer, _Component);

  function ExpenditureChartContainer(props) {
    _classCallCheck(this, ExpenditureChartContainer);

    var _this = _possibleConstructorReturn(this, (ExpenditureChartContainer.__proto__ || Object.getPrototypeOf(ExpenditureChartContainer)).call(this, props));

    _this.state = {
      selected: 'link',
      open: false,
      modal: false,
      source: 'notAdjusted',
      type: 'bar'
    };

    _this.changeAction = _this.changeAction.bind(_this);
    _this.shareAction = _this.shareAction.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.downloadAction = _this.downloadAction.bind(_this);
    _this.canvasAction = _this.canvasAction.bind(_this);
    _this.widthAction = _this.widthAction.bind(_this);
    return _this;
  }

  _createClass(ExpenditureChartContainer, [{
    key: 'shareAction',
    value: function shareAction() {
      var _this2 = this;

      (0, _calcShareAction2.default)(this.state.selected, 'programmes-chart', function () {
        return _this2.setState({ modal: true });
      });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({ modal: false });
    }
  }, {
    key: 'widthAction',
    value: function widthAction(val) {
      if (val > 600 && this.state.type !== 'line') {
        return this.setState({ type: 'line' });
      }

      if (val <= 600 && this.state.type !== 'bar') {
        return this.setState({ type: 'bar' });
      }

      return null;
    }
  }, {
    key: 'downloadAction',
    value: function downloadAction() {
      (0, _canvgBrowser2.default)(this.canvas, (0, _preactRenderToString2.default)((0, _preact.h)(_index4.default, {
        scale: 1.5,
        downloadable: {
          heading: this.props.department,
          subHeading: this.props.location + ' Department Budget for ' + this.props.year,
          type: 'Programme budgets'
        },
        items: this.props.items,
        guides: true,
        width: 900
      })));

      if (this.canvas.msToBlob) {
        var blob = this.canvas.msToBlob();
        return window.navigator.msSaveBlob(blob, 'chart.png', { scaleWidth: 10, scaleHeight: 10 });
      }

      var link = document.createElement('a');
      link.download = 'chart.png';
      link.href = this.canvas.toDataURL();
      return link.click();
    }
  }, {
    key: 'canvasAction',
    value: function canvasAction(node) {
      this.canvas = node;
    }
  }, {
    key: 'changeAction',
    value: function changeAction(value) {
      if (this.state.open) {
        return this.setState(_extends({}, this.state, {
          selected: value,
          open: false
        }));
      }

      return this.setState({ open: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        items: this.props.items[this.state.source],
        width: this.state.width,
        parentAction: this.parentAction,
        mobile: this.state.mobile,
        year: this.props.year,
        files: this.props.files,

        open: this.state.open,
        selected: this.state.selected,
        changeAction: this.changeAction,
        shareAction: this.shareAction,
        closeModal: this.closeModal,
        modal: this.state.modal,

        downloadAction: this.downloadAction,
        canvasAction: this.canvasAction,
        phaseTable: this.props.phaseTable,
        widthAction: this.widthAction,
        type: this.state.type
      });
    }
  }]);

  return ExpenditureChartContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initExpenditureChart');

  var normaliseObject = function normaliseObject(result, val) {
    if (val.amount !== null) {
      return _extends({}, result, _defineProperty({}, val.financial_year, [val.amount]));
    }

    return null;
  };

  var normaliseFormats = function normaliseFormats(key) {
    return function (innerResults, val) {
      return _extends({}, innerResults, _defineProperty({}, key + ' (' + val.format.replace(/^xls.+/i, 'Excel') + ')', val.url));
    };
  };

  var normaliseFiles = function normaliseFiles(rawFiles) {
    return function (result, key) {
      var object = rawFiles[key].formats.reduce(normaliseFormats(key), {});

      return _extends({}, result, object);
    };
  };

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    var rawAdjusted = (0, _getProp2.default)('adjusted', node, 'json').data;
    var rawNotAdjusted = (0, _getProp2.default)('not-adjusted', node, 'json').data;
    var year = (0, _getProp2.default)('year', node);
    var deptartment = (0, _getProp2.default)('department', node);
    var location = (0, _getProp2.default)('location', node);
    var rawFiles = (0, _getProp2.default)('files', node, 'json');

    var removeNulls = function removeNulls(val) {
      return val.amount !== null;
    };
    var normalisePhaseTable = function normalisePhaseTable(val) {
      return [val.financial_year, val.phase];
    };

    var adjusted = rawAdjusted.filter(removeNulls).reduce(normaliseObject, {});
    var notAdjusted = rawNotAdjusted.filter(removeNulls).reduce(normaliseObject, {});
    var phaseTable = rawAdjusted.filter(removeNulls).map(normalisePhaseTable);
    var files = Object.keys(rawFiles).reduce(normaliseFiles(rawFiles), {});
    var items = { adjusted: adjusted, notAdjusted: notAdjusted };

    (0, _preact.render)((0, _preact.h)(ExpenditureChartContainer, { items: items, year: year, deptartment: deptartment, location: location, phaseTable: phaseTable, files: files }), node);
  }
}

exports.default = scripts();

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ExpenditureChart;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(22);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(48);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(4);

var _index6 = _interopRequireDefault(_index5);

var _shareSelections = __webpack_require__(187);

var _shareSelections2 = _interopRequireDefault(_shareSelections);

var _index7 = __webpack_require__(12);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(18);

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ExpenditureChart(props) {
  var items = props.items,
      hasNull = props.hasNull,
      year = props.year,
      files = props.files,
      phaseTable = props.phaseTable,
      type = props.type,
      open = props.open,
      selected = props.selected,
      modal = props.modal;
  var changeAction = props.changeAction,
      downloadAction = props.downloadAction,
      shareAction = props.shareAction,
      closeModal = props.closeModal,
      canvasAction = props.canvasAction,
      widthAction = props.widthAction;


  return (0, _preact.h)(
    'div',
    { className: 'Section is-bevel', id: 'line-chart' },
    (0, _preact.h)('canvas', { ref: function ref(node) {
        return canvasAction(node);
      }, style: { display: 'none' } }),
    (0, _preact.h)(
      _index10.default,
      {
        title: 'Share this link:',
        closeAction: closeModal,
        open: modal
      },
      (0, _preact.h)(
        'a',
        { className: 'u-wordBreak u-wordBreak--breakAll', href: window.location.href + '#programmes-chart' },
        window.location.href + '#line-chart'
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'ProgrammesChart' },
      (0, _preact.h)(
        'div',
        { className: 'ProgrammesChart-info' },
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible' },
          (0, _preact.h)(
            'div',
            { className: 'Page-subHeading' },
            'Expenditure changes over time'
          ),
          (0, _preact.h)(
            'p',
            null,
            'Budgeted expenditure for a department can increase or decrease from year to year. The official budget shows the nominal value of spendiing - the real value is calculated by adjusting for inflation, since most expenditure items are subject to inflation. By stripping out the inflation (GDP or CPI inflation) it is possible to show if a departmental budget is increasing or decreasing in real terms'
          ),
          (0, _preact.h)(
            'div',
            null,
            (0, _preact.h)(
              'span',
              null,
              'Previous financial years indicate actual expenditure while upcoming financial years indicate estimated expenditure:'
            ),
            (0, _preact.h)(
              'table',
              { className: 'Expenditure-table' },
              (0, _preact.h)(
                'tr',
                null,
                (0, _preact.h)(
                  'th',
                  { className: 'Expenditure-heading' },
                  'Financial year'
                ),
                (0, _preact.h)(
                  'th',
                  { className: 'Expenditure-heading' },
                  'Budget phase'
                )
              ),
              phaseTable.map(function (val) {
                return (0, _preact.h)(
                  'tr',
                  null,
                  (0, _preact.h)(
                    'td',
                    { className: 'Expenditure-cell' },
                    val[0]
                  ),
                  (0, _preact.h)(
                    'td',
                    { className: 'Expenditure-cell' },
                    val[1]
                  )
                );
              })
            )
          )
        ),
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible' },
          (0, _preact.h)(
            'div',
            { className: 'u-fontWeightBold' },
            'Sources'
          ),
          (0, _preact.h)(
            'p',
            null,
            'The Estimates of National Expenditure (ENE) sets out the detailed spending plans of each government department for the coming year.'
          ),
          Object.keys(files).map(function (key) {
            return (0, _preact.h)(
              'div',
              null,
              (0, _preact.h)(_index4.default, { title: key, link: files[key], icon: true })
            );
          })
        ),
        (0, _preact.h)(
          'div',
          { className: 'Section-card is-invisible' },
          (0, _preact.h)(
            'div',
            { className: 'u-fontWeightBold u-marginBottom10' },
            'Share this chart:'
          ),
          (0, _preact.h)(
            'div',
            { className: 'ProgrammesChart-share' },
            (0, _preact.h)(
              'div',
              { className: 'ProgrammesChart-shareDropdown' },
              (0, _preact.h)(_index6.default, _extends({
                name: name + '-share-selection',
                items: _shareSelections2.default
              }, { open: open, selected: selected, changeAction: changeAction }))
            ),
            (0, _preact.h)(
              'div',
              { className: 'ProgrammesChart-shareButton u-marginLeft5' },
              (0, _preact.h)(
                'button',
                { onClick: shareAction, className: 'Button is-inline has-icon u-transformRotate270' },
                (0, _preact.h)(_index8.default, { type: 'download', size: 'small' })
              )
            )
          )
        )
      ),
      (0, _preact.h)(
        'div',
        { className: 'ProgrammesChart-chart' },
        (0, _preact.h)(
          'div',
          { className: 'Section-card' },
          (0, _preact.h)(_index2.default, { items: items, widthAction: widthAction, type: type })
        )
      )
    )
  );
}

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = {"As link":"link","On Facebook":"facebook","On Twitter":"twitter"}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcShareAction;

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calcShareAction(selected, anchorString, updateModal) {
  var url = encodeURIComponent(window.location.href);
  var anchor = anchorString ? '#' + anchorString : '';
  var message = encodeURIComponent('SA Budget Data from vulekamali');

  var copyText = function copyText() {
    (0, _analyticsEvent2.default)('send', 'social', 'email', 'share', url);
    updateModal();
  };

  var fbDirect = function fbDirect() {
    (0, _analyticsEvent2.default)('send', 'social', 'facebook', 'share', url);
    var win = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + anchor, '_blank');
    win.focus();
  };

  var twDirect = function twDirect() {
    (0, _analyticsEvent2.default)('send', 'social', 'twitter', 'share', url);
    var win = window.open('https://twitter.com/home?status=' + message + '%20' + url + anchor, '_blank');
    win.focus();
  };

  if (selected === 'link') {
    return copyText();
  } else if (selected === 'facebook') {
    return fbDirect();
  } else if (selected === 'twitter') {
    return twDirect();
  }

  return null;
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

var _updateQs = __webpack_require__(190);

var _updateQs2 = _interopRequireDefault(_updateQs);

var _index = __webpack_require__(191);

var _index2 = _interopRequireDefault(_index);

var _filterResults = __webpack_require__(197);

var _filterResults2 = _interopRequireDefault(_filterResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeptSearchContainer = function (_Component) {
  _inherits(DeptSearchContainer, _Component);

  function DeptSearchContainer(props) {
    _classCallCheck(this, DeptSearchContainer);

    var _this = _possibleConstructorReturn(this, (DeptSearchContainer.__proto__ || Object.getPrototypeOf(DeptSearchContainer)).call(this, props));

    var filters = {
      keywords: _this.props.phrase || '',
      sphere: _this.props.sphere || 'all',
      province: _this.props.province || 'all'
    };

    var getEmptyGroups = function getEmptyGroups(data) {
      return data.reduce(function (results, val) {
        if (val.departments.length <= 0) {

          return [].concat(_toConsumableArray(results), [val.slug]);
        }

        return results;
      }, []);
    };

    _this.state = {
      loading: false,
      open: null,
      results: (0, _filterResults2.default)(filters, _this.props.jsonData),
      emptyGroups: getEmptyGroups(_this.props.jsonData),
      filters: filters
    };

    _this.eventHandlers = {
      updateDropdown: _this.updateDropdown.bind(_this),
      updateKeywords: _this.updateKeywords.bind(_this)
    };
    return _this;
  }

  _createClass(DeptSearchContainer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      (0, _updateQs2.default)(_extends({}, window.vulekamali.qs, {
        phrase: nextState.filters.keywords,
        sphere: nextState.filters.sphere,
        province: nextState.filters.province
      }));
    }
  }, {
    key: 'updateKeywords',
    value: function updateKeywords(keywords) {
      var filters = _extends({}, this.state.filters, {
        keywords: keywords
      });

      this.setState({ filters: filters });
      this.setState({ results: (0, _filterResults2.default)(filters, this.props.jsonData) });
    }
  }, {
    key: 'updateDropdown',
    value: function updateDropdown(filter, value) {
      if (this.state.open === filter) {
        this.setState({ open: null });
      } else {
        return this.setState({ open: filter });
      }

      var filters = _extends({}, this.state.filters, _defineProperty({
        province: 'all'
      }, filter, value));

      this.setState({ filters: filters });
      return this.setState({ results: (0, _filterResults2.default)(filters, this.props.jsonData) });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, { state: this.state, eventHandlers: this.eventHandlers, epresData: this.props.epresData });
    }
  }]);

  return DeptSearchContainer;
}(_preact.Component);

function scripts() {
  var componentsList = document.getElementsByClassName('js-initDeptSearch');

  if (componentsList.length > 0) {
    for (var i = 0; i < componentsList.length; i++) {
      var component = componentsList[i];
      var nationalData = JSON.parse((0, _decodeHtmlEntities2.default)(component.getAttribute('data-national-json'))).data;
      var rawProvincialData = JSON.parse((0, _decodeHtmlEntities2.default)(component.getAttribute('data-provincial-json'))).data;
      var epresData = JSON.parse((0, _decodeHtmlEntities2.default)(component.getAttribute('data-epres-json'))).data;

      var provincialData = rawProvincialData.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      var jsonData = [_extends({}, nationalData, {
        name: 'National'
      })].concat(_toConsumableArray(provincialData));

      var _window$vulekamali$qs = window.vulekamali.qs,
          sphere = _window$vulekamali$qs.sphere,
          province = _window$vulekamali$qs.province,
          phrase = _window$vulekamali$qs.phrase;


      (0, _preact.render)((0, _preact.h)(DeptSearchContainer, { jsonData: jsonData, sphere: sphere, province: province, phrase: phrase, epresData: epresData }), component);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateQs;

var _queryString = __webpack_require__(11);

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateQs(object) {
  window.vulekamali.qs = object;

  window.history.replaceState(null, document.title, window.location.href.split('?')[0] + '?' + _queryString2.default.stringify(object));
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptSearchMarkup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(192);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(195);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeptSearchMarkup(_ref) {
  var state = _ref.state,
      eventHandlers = _ref.eventHandlers,
      epresData = _ref.epresData;

  return (0, _preact.h)(
    'div',
    { className: 'DeptSearch' },
    (0, _preact.h)(
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
          (0, _preact.h)(_index2.default, {
            open: state.open,

            keywords: state.filters.keywords,
            sphere: state.filters.sphere,
            province: state.filters.province,

            updateFilter: eventHandlers.updateDropdown,
            changeKeywords: eventHandlers.updateKeywords
          })
        )
      ),
      (0, _preact.h)(
        'h3',
        { className: 'u-sReadOnly' },
        'Results'
      ),
      (0, _preact.h)(
        'div',
        { className: 'DeptSearch-results' },
        state.results.map(function (_ref2) {
          var name = _ref2.name,
              slug = _ref2.slug,
              departments = _ref2.departments;

          if (state.emptyGroups.indexOf(slug) > -1) {
            return (0, _preact.h)(
              'div',
              { className: 'DeptSearch-groupWrap' },
              (0, _preact.h)(_index4.default, {
                empty: true,
                map: slug,
                name: name,
                epre: epresData[slug] || null
              })
            );
          } else if (departments.length > 0) {
            return (0, _preact.h)(
              'div',
              { className: 'DeptSearch-groupWrap' },
              (0, _preact.h)(_index4.default, {
                map: slug,
                linksArray: departments,
                name: name,
                doubleRow: slug === 'south-africa'
              })
            );
          }

          return null;
        })
      )
    )
  );
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptGroup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _provinces = __webpack_require__(193);

var _provinces2 = _interopRequireDefault(_provinces);

var _spheres = __webpack_require__(194);

var _spheres2 = _interopRequireDefault(_spheres);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeptGroup(_ref) {
  var changeKeywords = _ref.changeKeywords,
      updateFilter = _ref.updateFilter,
      keywords = _ref.keywords,
      open = _ref.open,
      sphere = _ref.sphere,
      province = _ref.province;

  var triggerKeyword = function triggerKeyword(event) {
    return changeKeywords(event.target.value);
  };
  var updateProvince = function updateProvince(value) {
    return updateFilter('province', value);
  };
  var updateSphere = function updateSphere(value) {
    return updateFilter('sphere', value);
  };

  return (0, _preact.h)(
    'div',
    { className: 'DeptControls' },
    (0, _preact.h)(
      'div',
      { className: 'DeptControls-itemWrap' },
      (0, _preact.h)(
        'div',
        { className: 'DeptControls-keywords' },
        (0, _preact.h)('input', {
          className: 'Input',
          placeholder: 'Start typing to find a department budget',
          value: keywords,
          onInput: triggerKeyword
        })
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'DeptControls-itemWrap' },
      (0, _preact.h)(
        'div',
        { className: 'DeptControls-in' },
        'in'
      ),
      (0, _preact.h)(
        'div',
        { className: 'DeptControls-dropdown' },
        (0, _preact.h)(_index2.default, {
          name: 'sphere',
          open: open === 'sphere',
          items: _spheres2.default,
          changeAction: updateSphere,
          selected: sphere
        })
      )
    ),
    sphere === 'provincial' ? (0, _preact.h)(
      'div',
      { className: 'DeptControls-itemWrap' },
      (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'div',
          { className: 'DeptControls-in' },
          'in'
        ),
        (0, _preact.h)(
          'div',
          { className: 'DeptControls-dropdown' },
          (0, _preact.h)(_index2.default, {
            name: 'province',
            open: open === 'province',
            items: _provinces2.default,
            changeAction: updateProvince,
            selected: province
          })
        )
      )
    ) : null
  );
}

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = {"All Provinces":"all","Eastern Cape":"eastern-cape","Free State":"free-state","Gauteng":"gauteng","KwaZulu-Natal":"kwazulu-natal","Limpopo":"limpopo","Mpumalanga":"mpumalanga","North West":"north-west","Northern Cape":"northern-cape","Western Cape":"western-cape"}

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports = {"All spheres of government":"all","National":"national","Provincial":"provincial"}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptGroup;

var _preact = __webpack_require__(0);

var _Map = __webpack_require__(196);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeptGroup(_ref) {
  var map = _ref.map,
      linksArray = _ref.linksArray,
      title = _ref.name,
      doubleRow = _ref.doubleRow,
      empty = _ref.empty,
      epre = _ref.epre;


  if (empty) {
    return (0, _preact.h)(
      'div',
      { className: 'DeptGroup' },
      (0, _preact.h)(
        'div',
        { className: 'DeptGroup-wrap' },
        (0, _preact.h)(
          'h3',
          { className: 'DeptGroup-title' },
          title,
          ' Department Budgets'
        ),
        (0, _preact.h)(
          'p',
          { className: 'u-fontStyle u-fontStyle--italic' },
          'This data is not yet available. Provincial budgets are tabled after the national budget has been announced. This is because the national budget determines the amount of money each province receives. We expect to be able make provincial budget data available by 29 March 2018.'
        ),
        epre ? (0, _preact.h)(
          'a',
          { target: '_blank', className: 'Button is-inline', href: epre },
          'Download the full EPRE PDF'
        ) : null
      ),
      (0, _preact.h)(
        'div',
        { className: 'DeptGroup-map' },
        (0, _Map2.default)(map)
      )
    );
  }

  return (0, _preact.h)(
    'div',
    { className: 'DeptGroup' },
    (0, _preact.h)(
      'div',
      { className: 'DeptGroup-wrap' },
      (0, _preact.h)(
        'h3',
        { className: 'DeptGroup-title' },
        title,
        ' Department Budgets'
      ),
      (0, _preact.h)(
        'ul',
        { className: 'DeptGroup-list' + (doubleRow ? ' DeptGroup-list--doubleRow' : '') },
        linksArray.map(function (_ref2) {
          var name = _ref2.name,
              url = _ref2.url_path;

          return (0, _preact.h)(
            'li',
            { className: 'DeptGroup-item' },
            (0, _preact.h)(
              'a',
              { className: 'DeptGroup-link', href: url },
              name
            )
          );
        })
      )
    ),
    (0, _preact.h)(
      'div',
      { className: 'DeptGroup-map' },
      (0, _Map2.default)(map)
    )
  );
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Map;

var _preact = __webpack_require__(0);

var southAfrica = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "592 306.5 100 87.8" },
  (0, _preact.h)("path", { d: "M691.1 338H688.7l-.3-.1-.4-.1H687.2l-.1-.2h-.5v.2l-.1.6-.1.6-.1.6V341.1h-2.7l-.4-.1-.6-.2-.5-.2-.2-.1-.5-.2-.1-.1-.1-.1-.3-.4-.6-.6-.1-.2v-.2l.1-.3V338.1l-.1-.1h-.2l-.1-.1-.1-.3v-.1l-.1.1-.1.1-.1.1h-.2v-.2l-.1-.5v-1.6l.1-.5.6-.7.4-.6.4-.7.3-.8.1-.4.1-.1.5-.5.6-.5.2-.1.2-.1h.2l.2.1.6.4.6.4.6.4.1.1.5.3.2.1h.2l.3-.2-.2-.8v-.4l.3-.7v-.1l.1-.1h.1v-.2l-.1-.4v-.1l-.1-.1V328.6l.1-.3v-6.4l-.2-.5-.2-.5-.3-.7V318.6l-.1-.1-.4-.3-.1-.1-.1-.1-.2-.6-.2-.8-.1-.2-.6-.6-.1-.2v-.3l.1-1.5v-.2l-.4-1.3-.3-.8-.3-1-.3-1-.3-.8.1-.1-.1-.2H682l-.1-.1-.1-.2h-.2l-.2.1h-.2l-.2-.1-.7-.2H679.7l-.2.1-.7.1h-.1l-.2.1h-.1l-.1-.1h-.9l-.2.1h-.5l-.2-.1-.2-.1-.1-.1-.1-.1H675.4l-.1-.1-.2-.1H674.8l-.1-.1H674.4l-.2-.1H673.9l-.1-.1h-.2l-.4-.2h-.6l-.1-.1h-.1l-.2.1H671.9l-.1.1-.1.1h-.2l-.3-.1h-.1l-.2.1-.1.1h-.4l-.3-.1h-.2l-.1.1-.1.1H668.8l-.1.2-.1.1-.1.1-.1.2v.6l-.1.1-.1.3-.1.1h-.4l-.1.1v.1l-.1.1h-.2l-.3.1-.4.2-.2.1h-.4l-.1.1h-.1l-.4-.1h-.5l-.2.1-.2.1-.1.1-.2.3h-.4l-.2.2v.6l-.1.1h-.2v.1h-.2l-.1.1v.1l.1.1v.1l-.1.1-.1.1-.1.1-.1.1h-.2l-.1.1v.5l-.1.2-.2.1-.3.1-.2.1v.1H661.3v.2l-.1.3v.1h-.2l-.2-.2-.2.2h-.4l-.1.2-.1.1V314.7l-.1.1-.1.1h-.5l-.1.1v.1h-.2v-.1h-.2l-.1.1h-.1l-.1-.2-.1.1-.1.2-.1.1-.1.1-.2.1-.2.1-.1.1.1.1h-.2v-.1.1-.1h-.2v.2h.1v.1H657.1v.1l-.1.1v.4l-.1.1h-.1v-.2h-.2l-.1.3-.1.2V317.3l-.2.3V317.9l-.4 1.8v.3l-.1.6-.1.1-.1.1-.1.1-.5.2-.1.1-.1.1-.4.4-.4.3-.2.1-.2.2-.2.5v.1l-.4.4h-.7l-.7.2-.9.3-.2.1h-.4l-.2.1v.2l.1.5v.3l-.1.2-.2.4v.2l-.2.3-.1.4-.5 1.2-.2.9-.1.2-.3.6-.1.4-.8.6-.4.2-1.3.1h-.3l-.3-.1h-.4l-.3.1-.4.3-.1.1-.4.1H642.8l-.4.1h-.2l-.3-.2-.5-.2-.3-.1h-.1l-.1.1h-.2l-.3-.1-.3-.2-.4-.5-.3-.2h-.3l-.6.2h-.1v-.2l-.1-.1h-.2l-.3.1-.1-.1-.1-.1-.3-.2-.2-.3H636.8v-.1l-.1-.1-.1-.1-.3-.1-.1-.1v-.1l-.6-.5-.2-.1-.2-.1h-.1l-.1-.1-.1-.1-.1-.1h-.2l-.2.1h-.2l-.3-.1-.3-.1h-.3l-.3.1-.5.2h-.2v-.2h-.1l-.1.1-.2.2V328.2H631.6l-.1.1-.1.1-.1.3-.1.1-.2.1v.1l-.1.4v.4l.1.1v.1l-.1.1-.1.1v.6l-.3.3-.1.1v.4l-.1.1-.1.1-.1.1-.1.1.1.1v.6l-.1.1h-.1l-.2.1-.1.1V333.3l-.3.4-.1.1-.1.1-.1.1-.1.2-.1.2h-.1l-.3-.1h-.2l-.1.1-.2.3-.3.3-.1.1h-.5l-.1.1-.2.3-.1.2-.2.5-.2.4-.3.3-.4.2-.4.1h-.8l-.2.1-.1.1v.1l.1.3v.2l-.1.1-.1.1-.3.2-.1.1h-.1l-.4-.1h-.5l-.3-.1h-.4l-.5.1h-.4l-.5.2h-.2l-.8-.2-.2-.2-.3-.1h-.3l-.2.1-.3.2-.4.2-.1.1v-.1l-.1-.2-.1-.1-.1-.1v-.1l-.1-.2-.1-.2v-.5l.1-.5V336.4l-.1-.1v-.5l.1-.4v-.1l.2-.1.1-.1.2-.3.4-.4.1-.2.1-.3.3-.4v-.1l-.2-.4v-.6l-.1-.6-.2-.4-.1-.1h-.2v-.1l.1-.1-.1-.4-.1-.1-.1-.1-.2-.1v-.2l.1-.1v-.1h-.2v-.1l.1-.1V329.5l-.3-.2V329l.2-.1-.1-.1h-.4V328.5h-.1v-.2l-.2-.1-.1-.1v-.4l-.1-.1v-.2l-.1-.1v-.2h-.1l-.1-.1-.1-.1.1-.1v-.1l-.1-.1-.2-.3-.2-.4-.1-.1-.8-.6-.5-.3h-.4l-.2-.2-.3-.2-.1-.2-.1-.1v-.1V349.2h-.6l-.2.1-.3.2-.2.1h-.4l-.1.1-.1.1H610.3v.1l-.1.1v.1l-.1.1h-.1v.1l-.2.6-.1.1-.1.1-.1.1-.5.1h-.2l-.1-.1h-.1l-.1.1.5-.3-.1.2V351.5l.2.4v.1H608.8l-.1.1v.1l-.3.2-.3.1h-.2l-.1-.1H607.5l-.1-.1-.2-.2-.1-.1-1.3-.2-1.2.2-.2.1h-.1l-.1-.1H603.9l-.1.1h-.1l-.3-.1h-.1l-.5.1-.2.1h-.1l-.5-.2-.2-.1-.4-.3-.2-.1-.2-.1-1-.2H599.7l-.1.1h-.2l-.2-.1-.1-.1v-.4l-.1-.1h-.1l-.1.1h-.4l-.3.1h-.2v-.2l.1-.3v-.3l-.1-.2-.2-.1V349.4l-.2-.2v-.2l.1-.1.1-.1h.1l.1-.1.1-.2v-.4l-.1-.1v-.4l-.1-.1V347.2H597.5l-.4.1h-.2l-.1-.2v-.7l-.1-.1h-.2l-.1-.1-.1-.1-.1-.1-.1-.1h-.4l-.2.2H595.2l-.1.1h-.2l-.1-.1-.1.1v.6h-.1l.1.1h-.2v.4h-.4l-.1.1V347.7l.1.2v.1l-.1.1-.1.1v.4l-.1.1-.1.1-.1.1h-.1V348.6h-.2l-.5.5-.2.1-.2.1-.2.1-.1.1V349.8h-.1l.2.2.1.1.1.3h.2v.1l.1.1V350.9l.1.2.1.1.4.4.3.4v.1l.1.3.1.1.4.3.1.2V353.3l.1.2.1.1v.4l.1.1v.1l.1.4.1.1v.1l.1.1.2.7v.1l.2.5v.5l.1.1v.1l.2.4v.4l.2.6v.4l.4.9.1.6v.3l.1.2.3.6V361.6l.1.2V362.1l.4.7.1.1.1.2.3.6.1.2v.3l.2.3.4.5.1.2.1.3v.1l.3.7.4.6.1.1.1.3.1.1.1.2.1.2.2.4v.1l.1.1.2.2.1.1.1.3.1.2.2.1.2.4.2.2.1.1v.2l.3.3.3.4v.2l.3.4.1.2.1.2.1.5v.4l.1.1.1.1.1.1v.7l.1.3.1.8.2.9v.3l-.1.2v.1l.1.2V377.5l-.1.6-.1.3-.1.3-.7.7-.2.2-.2.1-.3-.1-.3-.3-.1-.1v-.1h-.2l-.1.1-.1.1v.4l-.1.1v.1l.1.2v.2l-.1.1v.4l.1.2V381.8l.1.1.1-.1h.2l-.1-.1h.4l.1.1.1.1v.5l.1.1.1.1h.1v.2l.1.1v.1l-.1.1h-.1l-.1-.1-.1-.2-.2-.1v-.2h-.1V382.2h-.2l-.2.1.1.1.1.1.1.1.1.1.1.1.3.3.1.1v.1l.1.2.1.2.2.3v.1l-.1.1.7.5.2.2.2.2V385.8l.1.1.3.3h.1v.1l.2.3.2.6v.2l.1.2v.1l-.1.3h-.4l-.2.2-.1.2-.1.3-.1.1-.1.1-.1.1v.1l.1.1h.1v.5h-.1V390l.1.1.2.1v.1l.1.2V390.8l.1.3.1.1.1.1.2.1h.1l-.1-.1v-.1l.1-.5v-.2l-.1-.3V389.9l.1-.1.1-.1.1-.1.1-.1.2-.1h.8l.6.1.4.1.1.1.3.4-.1.1-.1.1-.1.1v.2l.1.2v.1l-.1.1v.5l-.1.1v.1l.1.1H606.8v-.1l.1-.1.6-.1.2-.1h.6l.1-.1.1-.2.1-.1-.1.2v.2l-.1.1h-.2v.1l.1.1.1.2.1.1h.5l.4-.1h.1l.1.1.1.2.1.2.1.2V392.9l-.4.5v.1h.4l.1-.1h.2l.1.1.1.1.1.1.3.2.5.5.3.2v.1h.2l.1-.1h1.1l.1.1.1.1.4.3h.4l.2-.1h.1l-.1-.2.2-.2.5-.3.2-.1h.2v-.1l.1-.1.1-.1.1-.1.2-.1h.1l.1-.1v-.1h.2l.1-.1.3-.5.2-.2.3-.1.9-.1 1.1.2h.1l.1-.2-.1-.2-.1-.1h-.2l.1-.1.3-.1.2-.1h.3l.6.1.2.1 1 .4h.6l.4-.2h.2l.3-.1h.2l.2.1.6.1h.3l.3-.1.2-.1.4-.2.1-.2.1-.1V391.4l.2-.2.2-.1.8-.1h.1l.1-.1-.1-.1-.1-.1v-.1l.1-.2.2-.2.1-.1.1-.1.5-.1h.3l.6.1.3-.1.2-.1.3-.3h.5l.7.2h.2-.1l-.1-.1-.1-.1-.1-.1h.4l.1.1h-.1V389.8h.2l.2.1.5.2H632.4v-.1l-.1-.1-.1-.1h-.1v-.1l.1.1H632.5v.2l2.1.2V389h-.1l-.1-.1v-.1l.1-.2.1-.1.1-.1.1-.1 1-.2h.3l1.1.2.6.1.3.1h.1l1.1.1.4.2.1.1.1.1.7.1h.1l.2.2.3.1.5.1h.1l.4-.1h.1l.3.1h.5l.1.1v-.1l.1-.1v-.2h-.2v-.2l.3-.3h.1l.1-.1.1-.1-.1-.3.1-.1.1-.1.4-.1.5-.1h.6l.5.1.2.1.2.2h.2l.2.1h.7l.3.1h.4l.1-.1h.1l.2.1v-.1l-.1-.1-.1-.2-.2-.1v-.1l-.1-.1V387.4l.1-.4.1-.2.2-.2.2-.2.5-.2.5-.2.5-.1h.8l.8.2.2.1.1.1h.1l.1-.1h.2l.5.1h.3l.2-.1.6-.3h.1v-.1h.1l.6-.3.2-.1h.4l.3-.3H655.9l.5-.3h.2V384.5l.1-.1.5-.2.1-.1.6-.4v-.1l.1-.1.3-.3.1-.2v-.2h.2l.1-.2.1-.1.4-.2.2-.2.5-.6.1-.1.3-.1h.2l.1-.1.3-.1h.1l.1-.1.1-.1.2-.1.6-.5.1-.2.1-.2v-.2l.1-.2.2-.1.3-.1.2-.1.3-.2.3-.2.1-.1v-.1l.1-.1.2-.2.2-.1.7-.5v-.2l.1-.1.2-.2H665.5l.1-.2.8-.8.1-.1.3-.2.6-.9.7-.8.2-.3.1-.1v-.1l.1-.1.4-.2v-.1h.1l.1-.2v-.2l.1-.1.2-.2.2-.1.1-.1v-.2l.2-.1.1-.3h.4l.2-.1.2-.1.1-.1.2-.2.1-.1h.1v-.2h.1l.1-.1.4-.5.1-.1.1-.1.1-.1.4-.1.1-.1.9-.8.3-.4.2-.4.2-.1.4-.6.6-.8.2-.4.1-.1h.1l.1-.1.2-.2 1-1.9.3-.3v-.2l.1-.3.9-1.6.3-.8.3-.5.2-.2.6-.6.2-.2.1-.1v-.1l-.1.1-.2.1-.1.1v-.2l.1-.1h.2l-.1-.3.1-.3.8-1.6.8-1.1v-.2h.1v-.2l.1-.1.2-.1.1-.1.2-.3.1-.1v-.1h.1l.3-.3 1.2-1.4.2-.1v-.1l.3.1h.4l.8-.4.2-.2.1-.2h-.1l-.1.1-.1.1v.1l-.1-.2.1-.1h.2l.2.1.7-.6.1-.1.1-.2.1-.1.1-.1.2-.1.1-.1.5-.5.1-.1.1-.2.1-.2.1-.3V349.3h.1l.1-.1.1-.1V348.8l.5-.8v-.1l.3-1.7v-.4l.1-.2V345.3l.4-2 .6-1.8v-.2l.1-.1v-.4l.2-.3v-.2l.1-.4.1-.9.1-.3v-.7zm-25 22.6h-.2l-.3-.1h-.2l-.3.2-.2.1h-.4l-.1.1-.1.1-.1.2-.1.1h-.1l-.1.1h-.4l-.1.1-.1.1v.1l.1.1h.1l.1.1v.4l-.1.1-.5.4v.2l.1.1v.2l-.1.3v.1h-.2v.5l-.1-.1-.7-.1h-.1l-.1-.1h-.4l-.1.1h-.4l-.2-.1-.2-.1-.3-.4-.4-.3v-.4l-.1-.2-.2-.2v-.2l-.2-.1-.1-.1-.1-.1v-.2h-.1l-.1.1H658.6v-.1l-.1-.4v-.2l.1-.3.1-.1v-.1h-.5l-.1-.1v-.1l-.1-.3-.1-.1-.3-.2-.1-.1-.2-.4-.5-1.2-.1-.1-.2-.3-.1-.1h-.1l-.1-.1.1-.2v-.2h.1l.1.1v-.2h.1l.2-.2.2-.1H657.3l.1-.1h.2l.1-.1.2-.1V356h.1v-.1l.1-.1.3-.3v-.2H658.7l.1-.1v-.4l.1-.1.2-.1h.1l.1-.1v-.5h.2l.3-.4.1-.3v-.1h.1l-.1-.1.1-.1v-.1h.2l.1-.1.1-.2v-.4h.1l.1-.1v-.1h.7l.2-.1.1-.1v-.2l.1-.1h.1l.1.1.1.1h.4v-.2l.2-.3.3-.3.2-.2.1-.1.1-.1h.5l.1.1H664.2l.1-.1.2-.3.1-.1.1-.1.8-.1h.1l.3-.2h.1l.1.1.1.1.1.1v.4l.1.1h.3l.1.1.2.3h.4l.1.1.1.1.1.1.2.4.3.3h.2l.1.1.1.1v.2l.1.1h.1l.2.1.5.5.2.1h.2l.2.1v.4l.1.1.1.1.1.1v.1l.1.2.2.2.1.2v.2l.1.1v.1l-.1.2V355.5l-.1.1-.1.1-.2.1-.2.1-.2.1-.1.1v.5l.1.1-.1.1v.2l-.1.1-.5.1-.2.1-.1.2-.1.2-.1.2V358.5l.1.1.1.1v.2l.1.1v.2h-.4l-.5.3-.2.1-.7.5-.4.2-.4.1-.4.2z" })
);

var westernCape = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 80.2", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M99.9 26.4l-.4-.5-.4-.2.1-.6.2-.2.1-.4.1-.1-.1-.5-1.3-.3-.7-1h-.4l-.5.2-.5.6-.5.4-.6.3-.7-.6v-.4l-.1-.3-.4-.4-1.3-.7-1.1-.2-.6.1-.6.3h-2.4l-.7.7-1 .6-1 1.5-.4.7-.3.3-1.7 1.6-.5-.8-.1-.2-.1-.6-.6-.3-.7-.3h-1.1l-.7-.3-1.1-.1-1-.6-1.4-.4-.7-1.1-.7-.7-.6-.5-2.9-1.5-.4.6-1.9 4.6-.6.1-.1.4-.1.2-.1.3V27l-.1.7v.2l.1.2.3.7-.4.7-.3.1-.9 1.1-.5.6-.9.7-.9.2-1-.2-.5-.2-.6-.2-.7.2-.6-.1-.5.1-.8.4-.4.8-.9.6-.7.5-.6.2-1.2.4-.6.7-.2.3-.3.2-.7.3-.3 1-.9 1.7-1.2.6-.7.1-.9.2-1.1.4-.7.7-.1.7-.1 1-.4 1-1.2 1-1.5.1-.6-.3-.4-.1-.9.5-1 .2-.7-.7-.3-.1-.4-.6-.4-.4-.4-.6-.4-.3-.3-.2-.4-.3-.4-.5-.2-1-.8-1.6-.4-1.4-.3-1.1.1-.9.4-.3.5-.5 1.1-1.6v-.7l-.2-.4-.2-.4-.3-.2H37l-1 1-.4.3-.5.6-1.5 1.2-.8.2-1.1.1-.4.3-.7.3-.4.6-.5.2-.3.1-.4-.2-.3.2-.2.7-.3.7-.1.6.3.5v.1l.1.1-.1.2-.9.5-.9-1 .2-1.8v-.4l-.6-1.2-.1-.3-.1-.4-.2-1 .4-.5.6-.7.1-.2-.1-1-.2-.4v-.1l.1-.3v-.1l-.1-.2v-.2l.1-.4-.1-.1h-.4l-.1-.1-.1-.1-.1-.3-.1-.1h-.1v-.1h-.5v.1H24.9l-.1-.2h-.4l-.1-.1-.1-.1-.3-.6-.1-.2-.2-.2-.4-.2-.1-.1v-.3l.3-.9-.1-.1-.2.1-.6.5-.2.1H22v-.1H21.7l-.2.1H21.2l-.1-.2-.2-.1-.2-.1-.2-.1h-.8l.2-1.2.4-.6v-.9l-.2-1.5.1-.5v-.7l.1-.4-.1-.4-.2-.3-.1-.4-.4-.4-.1-.4v-.7l-.3-1.8.1-.5v-.3l-.2-.2-.4-.6-.4-.9-.5-3.4.4-1.2-.3-1.1.5-.7V4.6L16.8 4l-.7-.7-.4-.7-.6-.7-.7-.5-.9-.5-1.1-.9-.9.1-.4.4-.2.5-.9-.5-.2.6-.5.8-.4 1.4-.7 1.2-.7 1.1-.7.4-.7.3-.6-.2-.4-.3-.3-.2-.3-.1H4l-.3.3-.5.4-.3 1.3-1 .9-.2 1.3-.7 1-.2 1.9-.8-.2.6.9.1.3.1.2.6.5.2.2.2.9.2.4.4.4.6.9.5.5.3.2.1.4.1.3.7.7.8 1.1v.1l.1.3.7.9.4.6.3.6.3 1.3v.5l.1.2.2.4.2.2.1.4.1.4-.1.8.1.4.3.8.2 1.9.6 2.4-.1.8-.4.4-.1.3.2.5.1.3.1 1.2-.1.8-.3 1.5-.2.6-.4.7L6 41.5l-.5.5-.6.1-.7-.3-.8-.7-.2-.3.2-.1h-.3l-.4.1-.3.1-.2.2-.1.2V42.2l-.1.1h-.1l-.1.1-.2.2-.1.1H1.2v.2l.1.1.4.5.1.2-.1.2-.2.2V44.4l.1.4.2.6v.1l-.1.3.1.2.1.2.1.1V46.6l.1.2.2.2.3-.2.1-.1h.2l-.1-.1-.1-.3.5-.1h.4l.4.2.2.4.1.2-.1.8.1.2.1.2.3.4H5l.1.1v.4l.1.1.4.4v.2l-.2.1h-.2l-.2-.2-.3-.5-.4-.3-.2-.1.1-.2-.2-.2-.1-.1-.1-.2-.1-.3h-.4l-.4.2.2.3.2.3.2.3.3.2.3.1.7.7.2.2v.2l.4.5.2.5.4.8.1.3-.2.3 1.7 1.2.4.5.4.6.1.4.1.3v1l.1.1.3.2.7.8.2.1.1.4.4.8.4 1.6v.4l.1.2.3.5.1.4-.3.7-.5.1-.6-.1-.5.5-.1.4-.2.6-.2.4-.2.2-.2.3.1.3.2.3.1-.1H9.2l-.1.2-.1.2v.7l-.2.1h-.1l-.1.2-.1.3.1.2.1.2.5.1.1.2.1.5.1.1.1.1v.4l-.1.1.1.3.4.7.2.3.4.4.4.2.3-.1-.3-.2-.1-.4.2-1.3v-.1L11 69l-.2-.8-.1-.1-.1-.1-.1-.1v-.4l.1-.2.2-.2.2-.2.1-.1.3-.2.5-.3.2-.1.2-.1h1.4l1.5.1.9.2.3.2.6 1-.2.3-.2.1-.1.2v.4l.2.6v.3l-.1.4-.1.1-.1.1-.1.1v.4l.1.6-.2.2v.2l.2.2.1.1.2.1.1-.1.1-.1.3-.3 1.6-.2.4-.2h.2l1.2.1.2-.2.3-.6.3-.1-.2.4-.1.4-.1.3h-.5v.2l.3.1.3.6.2.2h.2l1 .1 1-.2h.2l.3.2.3.4.3.5.2.6.1.6-.1.2-.9 1.2-.1.3.2-.1.1-.1.2.1.1.1.3-.3.4-.1.3.1.3.2.3.3.2.2.8.4 1.2 1.2.8.5.1.1v.2l.1.1h.2l.2-.1.3-.2.2-.1 2.5-.1.3.2.2.2 1 .8.2.1.3.1h.5l.4-.3.2-.1v-.1l-.2-.5.4-.6 1.2-.8.6-.3.4-.1h.2l.1-.3.2-.3.3-.3.2-.1.5-.2.2-.1.1-.2.1-.2.1-.1h.3l.2-.1.3-.3.9-1.2.5-.4.7-.3 2.2-.3 2.7.5.3-.1.1-.4-.1-.4-.4-.3-.4-.1.3-.1.8-.3h-.1l.7-.3.7-.1 1.5.2.6.1 2.6 1h.7l.6-.1 1.1-.4.1-.1.1-.1v-.2l.1-.1.6-.1.6-.2.4-.1.3.1.6.3 1.7.4.6-.1.7-.1.6-.2 1-.6.4-.6.1-.2-.1-.6.1-.3.4-.5.5-.2 2.1-.3.3-.1.2-.2-.3-.2-.2-.2-.1-.3.2-.4.5-.5.2-.2.3-.1 1.4-.4h.6l1.5.2.7-.2.6-.3.8-.7.3-.1.3-.1h.4l.3.1 1.8.6.3.1.3-.1-.2-.1-.3-.3-.2-.2-.1-.3h.7l.3.2.3.2h-.4V65.1l.2.3.1.1.2.1.5.3 1.3.4h.4l.1-.1h.7l.2.1.1.1.1-.2v-.1l-.2-.3-.1-.1h-.2l-.1-.2-.1-.2.2.1.2.1h.4l.1.1.1.6.1.1 5.3.5v-.1l-.3-.1-.3-.2-.1-.4.2-.4.2-.3.3-.2.3-.1 2.6-.6H91.6l-.1-.6.1-.3.7-1.1-1.9-1-.3-.5-.6-.2-.4-.1-.4.2-1.4-.1.6-.7.2-.2.3-.4 2.8-1.3.2-.4-.7-1.1-.3-1.3-.8-.6-1.2-.5-2.7-.7-3.7-.1-1.9.3-2.4-.1-.2-.7.1-.7 2.7-4.3.2-.7-.2-.8.5-.7.1-.6.7-1 .3-.2.6-.2.2-.4v-.7l-.1-.4.1-.1.1.1.1.1v.1l.2.3.1.1.2.3h.1l.3-.2.8-.3 1.1-.1 1 .1.7-.7-.7-.7-.3-.6-.5-.6.1-.9-.1-.6-.2-.8-.4-.7v-.8l.1-.7.7-.6.6-.7 1.1.2.7-.4 2.5-.3.5-.3.6-1.3.7-.5.6-.3 1.3.5.7.1 2.2-1 .4-.5.6-.4.1-.4v-.7l.2-.3.1-.3-.1-.2.2-.3.3-.1.2-.3.4-.5z" })
);

var easternCape = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 66.6", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M100 16.9l-.2-.1h-.1v-.1l-.1-.3v-.2h-.1l-.2-.1-.1-.1V15.4l-.1-.1-.1-.2V15l.1-.1v-.1l-.1-.1v-.2l-.2-.2-.3-.2h-.1l-.1-.1v-.2l-.1-.1v-.2h-.1l-.4-.1h-.1l-.1-.2h-.2l-.1.1-.1-.1H97v-.1l-.1-.1v-.1l-.1-.1h-.1l-.1-.2v-.2l-.1-.1-.1.1H96l-.2-.2-.3-.2-.5-.3-.2-.2v-.1h-.1l-.1-.1h-.4v.1h-.1v.1l-.2-.2h-.2l-.3-.2h-.2L93 11l-.1-.1h-.1l-.4.1H92l-.3-.3-.4-.1-1-.7H90l-.3.2h-.1v.1H88.7l-.1.2-.1.1h-.2l-.4-.2-.4-.3-2.1-.5-.2-.1-.1-.1v-.6l-.1-.1-.1-.1-.9-.4h-.2v.1l-.1.1V9l-.1.1v.1h-.2L82.2 9l-.1-.1H82l-.1-.2-.3-.5-.1-.1h-.4L81 8h-.1v-.1l-.1-.3v-.2l.1-.5V6.6l-.2-.4v-.4l.4-.9h.1l.9.4h.1l.1-.1.1-.1.3-.5.1-.1.1-.1.2.1h.1l.1-.1.1-.3.1-.1.1-.1.2-.1h.1V3.5l-.1-.1v-.1l.1-.1.2-.1.2-.1.1-.1.1-.1h.1l.2.1h.1l.1-.1.2-.3v-.1l.3-.2v-.1l.1-.1V1.7l-.1-.2L85 1l-.7-.8-.1-.2-.6.3-1.5 1.1-.9.3-.9.2-1.2.5h-.4l-.7-.3h-.4l-.6.4-.3.1-.7-.1-.3.1-.3.2-.1.2-.2.4-.2.2-.1.1-.2.3-.1.1h-.1l-.4.1-.3.1-.2.2-.2.2-.1.3.2.2.2.1.1.1.1.4-.1.3-.2.2-1.2.9-.1.2.1.1.1.3.1.1v.2l-.3.7v.1l-.1.1-.1.1-.1.1-.2.1v.1l-.1.3v.8l-.3-.1-1.6-.2-.3-.1-.2-.1-.2-.1-.1-.1-.1-.1H68.5l-.2.1h-.1l-.6-.1-.5-.1-.4-.3-.7-.8-.8-.6-.1-.1V7.5l-.1-.1-.3-.5-.4-.3v-.4l-.5-.2-.2-.2-.2-.2-.1-.4-.1-.1H63l-.3.1h-.2l-.3-.1v.1H62l-.2.1.2.3.1.3.2-.1h.1l.1.1.1.1-.2.3h-.6l-.3.1v.2l.3.2.1.2-.3.2-.1-.1-.3-.1h-.1l-.1.1v.2l.2.1h.1l.1.1-.1.1-.2.3H60.5v-.1l-.1-.1h-.1v.1H60l-.1.1-.2.2-.6-.1-.2.1v.1l.1.1v.1l-.3.2h-.2l-.3-.1-.3-.1-.6.2h-.2l.1.2.3.3.1.3-.1.1-.5-.1-.3.1-.3.2-.1.3.1.3-.1.1-.2.1H55.5l-.2.2-.1.1-.3-.1-.1-.2-.2-.2h-.5l-.3.2-.1.1h-.4l-.1.2H52.9l-.1-.1h-.2l-.3.1h-.1l.1-.1v-.1l-.3-.1-.3-.1-.6.1-.2-.1-.6-.3-.1-.2-.1-.1v-.4l-.2-.3-.1-.1h-.1l-1.8.3h-.4l-.2-.3-.1-.3-.2-.1h-.2l-.3-.2-.2-.1-.1-.2-.1-.2-.4-.1-.1.2v.5l-.4-.1-.5-.1h-.1l-.8.2-.2.1-.2.2-.2.1-.3.2-.4-.4h-.2l-.2.1v.1H42v.2l.1.2v.1l-.2.2-.3.3-.9.6-.4.2-.2.1h-.4l-.2-.1-.2-.1-.1-.1h-.4v-.1h-.1v-.2l-.1-.3v-.1l-.1-.1-.4-.1-.8.1h-.2l-.5.1.2 2.2.3.3.2.4v.4l-.4.4v.3l.1.4.1.6-.1.4-.3.5v.6l-.1.3-.2.3-.1.4-.3.5-.5.5-.1.8-.4.3-1.8-.4-2 .9-1.1.3h-.2l-.7.6-.6.2-.3.4-.5.2-.6.3-.9.1-1.9.1v.3l-.2.8-.2.4-.2.8-.2 2.4-2.2.2-1.2.5h-.8l-.4.2-.1.5.2.4-.2.1-.1.3-.1.2-.1.5.4.2.3.4.1.4-.4.5-.2.2-.2.1-.1.2v.2l-.1.3-.1.2V33l-.2.4-.5.3-.3.5-1.9.8h-.5l-1.2-.5-.5.2-.6.5-.5 1.1-.5.3-2.1.2-.6.3-1-.1-.5.6-.6.6-.1.5v.7l.3.6.2.7.1.5v.8l.4.5.2.6.6.5-.6.6H6.1l-.6.3-.3.1h-.1l-.2-.2-.1-.1-.1-.3-.1-.1-.1-.1-.1.1.1.4v.5l-.2.4-.5.1-.3.2-.6.9-.1.5-.4.6.2.7-.2.6-2.3 3.7-.1.6.2.6h2.1l1.6-.2 3.1.1 2.4.6 1 .4.7.6.2 1.1.7.9-.2.4-2.4 1.1-.3.3-.2.2-.5.6 1.3.1.3-.2.3.1.5.2.3.4 1.6.8-.6 1v.8l2.3.5 1.5.2.5.2h.3l2.4.3.9.3.2.2.2.1 1.6.2.3.1.5.4.6.3 1.1.3.3.1.8-.2h.3l.8.2.9.1.3.1.1.2h.1l.1-.1.2-.2.1-.1-.1-.2h-.1l-.1-.1-.1-.2.1-.3.7-.6.1-.1.2-.3.2-.3-.2-.6.2-.3.3-.2.8-.2 1.2-.2 1.2.1 1.2.3.4.2.5.3.5.1.3.2h.4l.6-.1.4.1.7.2.5.1.3-.1.3-.2.3-.1.4.1.1-.1v-.1l-.1-.1-.3-.4-.4-.3v-.1l-.1-.2-.3-.1v-.5l.2-.9.3-.6.3-.4.5-.4 1-.4 1.1-.4 1.1-.2 1.9.1 1.8.4.5.3.3.1h.2l.3-.1h.3l1.2.1h.5l.6-.2 1.2-.6h.3l.1-.1.1-.3.1-.1h.2l1.3-.6.4-.2.6-.1.3-.1.8-.6.3-.1.3-.1h.2l1.2-.7h.4l.1-.1.1-.2v-.1l.1-.1.1-.1.2-.2 1-.5.1-.1 1.4-1 .1-.2h.1l.1.1.4-.2.7-.6.3-.4.1-.4.1.1H63.8l.1-.1.3-.4v-.1l.2-.1.9-.3.5-.4L67 49l.2-.1.7-.3h.2l.2-.1.2-.3.7-.3v-.2h.1v-.1l.2-.1.1-.3.2-.1.4-.1 1.3-1.2.3-.3.1-.4.1-.4.3-.5.3-.3.8-.2.4-.2.6-.5.7-.3.3-.3v-.2l.2-.1.5-.4.3-.2 1.5-1.2.1-.2.1-.2.2-.4.5-.5.2-.1.2-.1.1-.1.3-.5 1.8-1.6.1-.2.7-.4 1.4-1.9 1.7-1.8.3-.6.2-.3v-.2l.1-.2.9-.4.1-.1v-.2l.1-.1.1-.1.2-.4.1-.1.1-.3.2-.3.4-.5.5-.3.1-.2.1-.4v-.1l.4-.2.3-.6v-.1h-.1v-.1l.1-.1h.4l.1-.1h.1l.4-.2.5-.2.2-.2.5-.4.2-.2.3-.1h.1l.1-.1.1-.2.1-.3h.1l.3-.2.8-1 .1-.3.3-.2.3-.1.8-.2.3-.2 1.9-1.8.7-.9.4-.9.4-.3 1-1.3z" })
);

var northernCape = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 97.2 100", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M97.2 73.4v-.3l-.2-.3-.2-.3-.1-1.7-.4-.3-.4-.3-.4-.3h-.7l-.2-.2v-.2l-.2-.2-.4-.2-.4-.3-.6-.7-.9-.8v-.1L92 67V66.7l-.5-.2-.1-.1-.1-.1v-.1l-.1-.1-.1-.3H90.8l-.1-.1h-.1l-1-2.2-.3-.5H89l-.2-.1H88.5l-.2-.1-.1-.1-.1-.1v-.2l-.1-.3v-.2l-.2-.1-.4-.1-.3-.2-.5-.6h-.5v-.1l-.1-.2v-.1h-.5l-.2-.2-.5-.7-.1-.2-.1-.4V58.7l.8-1.6 2.5-5.4 1.2-2.4 1.2-2.7v-.2h-.2l-.1-.2-.1-.4.1-.8.2-.6.2-.3.1-.3.2-.8v-.4l-.1-.1v-.2l-.1-.1.1-.2.2-.1.3-.3.2-.3.1-.3.3-.9.1-.2V39.6H91.5l-.3.2-.1.1h-.2l-1.1-2.3h.1l2-2.4-.1-.1-.1-.1h-.2l-.2-.1-1.7.1-.2-.1-.1-.2-.1-.2-.1-.2-.1-.4-.1-.2h-.7V34.6l-.1.2v.2l.1.2v.1l.2.1v.8l-.1.1v.5l-.1.1-.1.1h-.2v.1l-.1.3-.2.2-.1.3v.1l.1.3v.1l-.1.1v.2l-.5.4-.1.1V39.5l-.1.1-.3.3-.9-.7V39l.1-.2V38.5l-.3-.4-.2-.1-.2-.1-.1-.1-.1-.3.1-.3.1-.2.4-.3.1-.2v-.3l-.1-.8-.1-.3v-.2l-3.4.8-.2-.7-.1-.7-.2-.6-.1-.7-.1-.2v-.2l.1-.2v-1.2l-.3-.5-.2-.3v.2l-.1.1-.1.2v.4l.1.3-.1.1h-.3l-.4-.1-.2.1-.1.1-.1.2.1.1.2.2v.1l-.1.1-.1.1h-1v.1l-.1.2-.3.2H78l-.5-.1-.5-.2-.4-.3-.3-.1-1-.1V32l-.1-.1-.2-.2h-.4l-.1-.1-.6-.5-.2-.1-.3-.1h-.5l-.3-.1-.2-.1-.9-1.1-.5-.4h-.5l-.2-.2-.1-.1-.1-.4-.1-.3v-.3l.1-.3v-.3l.2-.2.4-.2.2-.1v-.2l-.3-.5-.4-1.2v-.1l.1-.3.1-.2.1-.3-.1-.4v-.2l.1-.5v-.1l-.7-.5H69.5v-.1l-.1-.1-.1-.1-.2-.1h-.4l-.1-.1-.2-.1-.1-.1h-1.2l-.1-.1-.1-.2-.1-.6-.1-.3.1-.3v-.3l.2-.1-.1-3.6h-.8l-.1.1-.2.1-.2.2-.1.4-.2.3-.2.1-.5-.1-.3.1-.3.1-.3.6-.6.5-.3.2h-.1l-.5.1-.1.1-.1.2-.5.5-.2.4-.3.9-.4.7-.6.5-.6.4-.7.2h-1.4l-.2.1-.2.2v.2l.1.5v.4l-.1.2-.2.2-.7.5-.2.1-.2-.1-.7-.1H54l-.5-.3h-.7l-.9.2h-.6l-1 .3H50l-1.4-.3-.5-.3-.4-.2-.6.1-.3.1-.5.4-.7.3-.2.2h-.1v-.1l-.1-.4-.1-.1-.2-.1v-.1l-.1-.1-.2-.3-.1-.5v-.8l.2-.8v-.4l-.2-.3-.1-.1v-.7l.2-.6v-.2l.3-.2.2-.2.3-.6.6-.8.3-.4.2-.4.4-.7.1-.2-.4-.7-.1-.2v-1.9l-.3-.7v-.1l-.2-.1-.1.1h-.2v-.1l.1-.2-.2-.8-.1-.2-.1-.1-.3-.2-.1-.1v-.1l.1-.3v-.1l-.1-.1h-.2v-.2l.3-.2v-.1l-.1-.3-.4-.4v-.4l.1-.2.3-.2-.2-.1h-.1l-.1.1h-.2v-.1l.1-.2V8h-.2v-.2l-.1-.1-.3-.2-.2-.1v-.1l-.1-.4v-.1l-.1-.1-.1-.1v-.1l.1-.1v-.1l-.1-.1-.2-.1-.1-.1v-.4h-.2l-.2-.2-.1-.1.1-.2v-.2l-.1-.3-.3-.4-.3-.7-.2-.2-1.3-1.1-.9-.5-.1-.1H39.2l-.1-.1-.3-.3-.6-.5-.2-.3-.2-.1V.2l-.1-.2V43.9h-.3l-.1.1-.4-.1h-.1l-.3.2-.5.4-.3.1-.5.1H35l-.2.2-.2.1-1.1.1h-.1l-.1.1-.1.1v.1l-.1.1-.1.1-.1.2-.1.1h-.1v.1l-.3 1-.1.2-.2.1-.3.1-.8.2-.2.1h-.1l-.2-.2h-.2l-.1.1-.2.2-.1.3-.1.3.1.2.4.7v.2l-.1.1h-.5l-.1.2-.1.1-.6.3-.4.2h-.4l-.2-.2-.1-.1h-.1l-.4-.1-.2-.1-.2-.5-.2-.1-2.3-.4-2 .3-.4.3H21.7l-.1-.1h-.2l-.1.1H21l-.1.1-.2.1-.3-.1-.4-.1-.2-.1-1 .2-.4.1h-.2l-.9-.3-.4-.2-.6-.6-.4-.2-.4-.2-1.8-.4-.3.1h-.2l-.2.2h-.2l-.4-.1-.2-.1v-.5l-.1-.3-.1-.1h-.2l-.2.1-.2.1h-.5l-.5.2-.4-.1v-.4l.1-.5.1-.5-.1-.2-.4-.2-.1-.2V45l-.3-.3-.1-.3v-.1l.2-.2.1-.1.2-.1.2-.1.1-.3v-.6l-.1-.1-.1-.2-.1-.1-.1-.2v-.2l-.1-.2V41.6l-.1-.1-.1-.1-.3.1-.7.1H8l-.2-.3-.1-.6v-.5l-.1-.3h-.2l-.2-.1-.2-.3-.1-.2-.2-.2h-.4l-.1.1-.4.2h-.4l-.1.2H5l-.1-.1-.1-.1v.1l-.2.2h-.1v1l-.1.1H4.1v-.1H4l-.1.1v.1H4l.1.3h.1l-.2.1H3.7v.2l.1.1V41.9l-.1.1h-.1l-.1-.1h-.1l-.2.1v.4l.1.2.2.4.1.2-.1.1-.2.1v.2l-.1.3v.2l-.1.2-.2.3-.2.2-.2-.1v-.1l-.1-.1v-.2h-.2l-.8.8-.4.2-.3.1-.3.2-.2.1V46l-.1.2-.1.1.3.3.2.2.2.5H1v.2l.1.2V48l.1.5.1.4.1.3.7.6.5.7.1.1.2.5.1.2.6.6.2.2v.5l.1.3.1.2v.4l.1.1.1.1v.1l.3.8.2.2v.2l.2.2.1.1.4 1.2.1.1.3.9v.5l.1.2.1.2v.1l.3.7v.5l.1.2h-.1l.3 1v.2l.1.1v.1l.1.5.7 1.5.2 1 .1.5.1.4.6 1v.3l.1.1v.4l.1.4v.1l.7 1.2.2.2.1.3.6 1.1.3.3-.1.5.3.5.7.9.1.4.1.5v.2l.6 1.2.8 1 .1.2.2.6.1.2.1.1.1.3h.1l.1.3.6.2.1-1.3.5-.7.2-.9.6-.6.3-.9.3-.3.2-.2h.4l.1.1.3.1.2.2.4.2.5-.2.5-.3.5-.8.4-.8.3-1 .4-.5.1-.4.6.3.2-.4.3-.2.6-.1.7.6.7.4.4.3.4.5.3.5.5.5 1 .4v1.4l-.3.5.2.8-.2.8.3 2.3.2.7.3.3.1.2V79.8l.2 1.2v.5l.1.3.2.2.1.3.1.2.1.3-.1.3v.8L28 85l-.1.5-.2.5-.2.8h.5l.2.1h.2l.1.1v.1h.1l.1.1.1-.1h.1V87l.1.1H29.3l.1-.1.4-.3h.2l-.1.7-.1.1.1.1.3.2.1.1.1.1.2.4.1.1.1.1h.2l.1.1h.2l.1-.1h.2v.1h.1l.1.1.1.2.1.1H32.3V90.1l.1.3.1.7-.1.1-.4.4-.3.4.1.7.1.3.1.2.4.8v.3l-.1 1.2.6.7.6-.3.1-.1v-.1h-.1v-.1l-.2-.4.1-.4.2-.5.1-.4.2-.2.3.2.2-.1.3-.1.3-.4.5-.3.3-.2h.7l.6-.2 1-.8.3-.4.4-.2.6-.7h.3l.2.1.2.3.1.3v.5l-.8 1.1-.3.3-.3.2v.6l.1.8.3 1 .6 1.1.1.7.3.3.2.2.3.2.2.1.3.5.3.2.2.4.3.1.4.5.8-.1.6-.3h.2l.5.2h1l.8-.8.3-.6v-.7l.2-.5.4-.5.8-.3.6-.1.5-.1.8-.4.6-1.2.2-.7.5-.2.2-.1.2-.2.3-.5.9-.3.4-.1.5-.4.6-.3.3-.6.5-.3.4-.1.4.1.5-.1.4.1.3.2.7.1.7-.2.6-.4.3-.5.6-.7.3-.1.2-.4-.2-.5-.1-.2v-.1l.1-.5V87l.1-.2v-.2l.1-.2.5-.1 1.2-3.1.3-.5 2 1.1.4.3.5.5.5.7 1 .3.6.4.8.1.5.2h.7l.5.2.4.2.1.5.1.1.3.5 1.2-1.1.2-.2.3-.5.7-1 .7-.4.5-.5h1.6l.4-.2.4-.1.8.1.9.6.2.2.2.2-.1.3.5.4.4-.2.4-.3.3-.4.3-.1h.3l.5.7.9.2.1-.4.2-.1h.7l1-.4 1.8-.2.1-1.9.1-.7.2-.3.2-.6v-.3h1.5l.7-.1.5-.3.4-.1.3-.3.4-.2.6-.5h.2l.8-.2 1.6-.8 1.5.3.3-.2.1-.6.4-.4.2-.4.1-.3.1-.3.2-.2-.1-.5.3-.4.1-.3-.1-.5-.1-.3v-.3z" })
);

var freeState = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 83.8", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M99.9 18.3v-.2l-.1-.2h-.1l-.6-.2-.1-.1-.1-.1v-.2l.1-.2V16.8l.1-.2.8-.4-.4-.2h-.3l-.1.1h-.2l-.1.1h-.1l-.1.1v.1l-.1.1v.5h-.6l-.1.1-.1.1-.1.1h-.1l-.1.1-.1-.1-.2-.1-1.3-1.6-.1-.1-.1-.1V15.1l.1-.1v-.1l-.1-.2-.3-.1-.1-.1-.5-.6-.1-.1.1-.1v-.2l-.1-.1-.1-.1-.1-.1-.1-.1-.1-.4v-.3l-.3-.4-.6-.3-.2-.1h-.4l-.3.1-.1.1H92l-.1-.1v-.6l-.1-.1h-.1l-.4-.1-.2-.1-.1-.1-.1-.1-.2-.1-.3-.1-.3-.2-.1-.1-.2-.2v-.1h-.2l-.2-.1h-.8l-.2.1h-.1l-.2.1v.1H87.8l-.1-.2-.1-.1-.2-.4-.1-.4-.1-.2-.1-.1v-.1l-.2-.1v-.1l-.1-.1v-.7l-.1-.1h-.1l-.2-.1-.8-.5-.4-.1H85l-.2.1-.2.2-.1.1h-.2l-.2.1-.1.1-.2.3-.2.1h-.2l-.1-.1-.1-.1H82.9l-.2.1h-.2l-.2-.1-.2-.1-.2-.1h-.1l-.2-.1-1.4-.9-.9-.4-.5.3-.1.2h.2l.2.1.3.3V7h-.7l-.2.1-.2.1-.9.8h-.2l.1-.4.2-.3-.1-.2-.5-.2-.1-.2-.2-.2-.2-.3-.1-.1h-.5l-.1.1-.2.2-.1.1h-.2l-.2-.2-.1-.1v-.1l-.1-.1-.1-.4-.1-.1h-.2l-.4-.1-.4.1-.3-.1-.6-.3-.4-.2v-.1l-.1-.1h-.4l-.3.1-.5.1-.2-.2-.1-.1-.1-.1v-.1l-.1-.4h-.3l-.3.3-.2-.1-.1-.1-.2-.3-.4-.3-.3-.2-.6-.2-.2-.3-.7-1.4-.2-.5.2-.2.1-.1-.2-.2-.3-.3-.2-.1h-.2l-.4.3-.3.3-.2.3-.3.3-.4.1-.9.1-.4.1-.3.2-.1.2V2.2l-.2.1-.2-.1-.1-.1-.1-.2-.1-.1-1.3.2h-.3l-.1-.2-.2-.3-.2-.3-.1.2H60l-.3.1-.3.1.1.4h-.4l-.2.1h-.2l-.2.2-.1.5v.4l-.1.2-.5.9-.2.1-1.2.3h-.2l-.2-.1-.6-.6-.3-.1-.5.1-.5.4-.7.9-.7.6-.4.1-.2-.1v-.2l.1-.2v-.2l-.2-.1h-.1l-.3.1-1.9.1-.8-.1-.6-.4-.4-.6-.2-.2-.3.2v1.6l-.4-.3-.6-.5h-.1l-.4.2-.2.2-.1.2-.2-.1-.3-.2H45l-.2.2-.4.1-.3.2-.5.5-.1.1-.1.2V7l-.1.2h-.1l-.2-.1V7h-.1l-.2-.1-.3-.1-.3.1-.2.2-.5.6-.2.2v.3l.1.3v.3L41 9l-.5-.1h-.2l-.5.6-.3.2-1 .3-.4.5.4.6.6.5.4.5v1.1l-.1.1-.1-.1-.1.1-.3.4-.1.4.1.3.5.1.2.1h.2l.1.1.1.2H38.1l-.4-.1h-.5l-.2.1-.2.1-.2.4v.1h-.1l-.1-.1-.2-.1-.1-.1-.5.1-.5.3-.3.4-.1.6v.4l-.1.2h-.1l-.3.1-.2.1-1.6 1.5-.2.3-.2.2v.1l-.4.8-.1.1v.2l.1.1.2.4V21.4l-.1.1v.1H31.4l-.1.1h-.2l-.1-.1-.1-.1-.1-.2v-.1l-.1-.3-.1-.3v-.5l-.1-.1-.1-.1h-.2l-1.2-.3H28.1l-.2-.2-.3-.2-.2-.3-.2-.1h-.4l-1.9 1.1-.5.4-.1.1-.1.2-.2.1h-.2l-.2-.1-.4-.2-.2-.1h-.2l-.1.1-.2.3-.1.1h-.1l-.3.2H21.7l-.2-.1h-.2l-.1.1-.1.2-1.2.3-.3.2-1.3 1.2-.2.1h-.2l-.2.1-.2-.1-.2.1-.2.1-.3.5h-.1l-.1.1v.2l.1.3-.2.3-.2.3-.3.4-.3.1-.1.1-.2.3-.1.1H14.7l-.2.1-.1.1-.5.9v.2l.1.1v.1l-.4.7-.2.4-.3.2H13l-.3-.1h-.1l-.2.3v.6l-.1.4-.5 1.5-.2.4-.4.6-.5.5-.4.2-.1.3.1.3.1.2.2.2v.2l-.1.4-.4 1.5-.2.5-.3.5-.3 1.1-.1 1.3.1.6.3.3.2.1.1.2-.1.2-2.1 4.5-1.9 4.3L1.4 59 .1 61.7l-.1.2.1.3.2.7.1.4.9 1.1.3.3.3.1h.6v.1l.1.4.1.1H3.3l.2.1.8 1 .6.4.7.1.2.1.1.4.1.5.1.3.1.2.3.2.2.1.4.1h.2l.3.1.6.1.4.7 1.8 3.8.2.1.1.1h.1l.1.1h.2l.3.5.1.2v.1l.2.1.1.1.1.1.8.3v.2l.1.4v.3l.1.1 1.6 1.5 1 1.2.6.5.8.4.3.3.1.4.2.3h1.3l.6.4.7.6.6.4.7-.1.3.1 1.1-.2.6.1.1.1v.1l.1.5V83.2h.1l.1.1.5.1h.1l.3.2.3.1.5.1.3-.2.6-.3 1.2-.9.4-.4.2-.3v-.1l-.1-.2v-.1l.1-.2.1-.1.2-.2.2.1h.1l.6.5.3-.2.1-.1.2-.2.3-.2.3-.2 1-.3h.3l.6.3h.5l.1-.3v-.4l.1-.2.5.1.2.2.2.3.2.3.4.1.3.1.3.2.1.4.3.3.6.1 2.4-.5.1.1.1.1.3.4.1.6.1.1.2.2.8.5h1.1l.4.1.3.1v.1l-.1.3.1-.1.4-.2h.3l.1.1.1.1h.4l.1-.2.2-.1H44.4l.4-.3.1-.1h.5l.3.3.2.3.3.1.2-.1.3-.3.3-.1h.7l.2-.2-.1-.4.2-.4.3-.3.4-.1.7.1.2-.1-.2-.4-.4-.4-.1-.2.2-.2.9-.1.4.1.4.1.3.1.3-.3V80l.2-.1.8.1.2-.3.2-.1h.4v-.1h.2l.1.1.1.1v.1h.7l.1-.1.3-.3.1-.3-.1-.1h-.2l-.2-.1-.1-.2.2-.2h.1l.5.2h.1l.4-.2-.2-.2-.4-.3v-.4l.4-.1.4.1.4-.1.3-.4-.1-.2-.2-.1-.2.1-.1.1-.2-.4-.2-.5.2-.1H55.9l-.2-.1v-.3l-.4-1.1v-.6l.4-1 .2-.3.1-.2-.2-.2-.3-.1h-.4l-.2.1-.2-.1-.2-.3-.2-.3-.2-1-.3-.5-.9-.7-.3-.4-.5-1.2-1.5-3.6-.2-.3-.5-.9-.3-.2-.2-.1-.3-.2-.1-.1.2-.5v-.4l.1-.2h.2l.2.3.1-.2.2-.3.1-.1h.2v.1l.1.1.1.1h.1l.6-.7h.1l.5-.3h.6l.1-.1.4-.2.5-.1.4-.1.6-.4.1-.1.1-.2.1-.2.1-.3h.5l.1-.1.1-.4.2-.3.7-.9h.1l.1-.2v-.4l-.1-.1-.1-.2.1-.1.1-.1.2-.1.2-.1.1-.2.1-.2v-.5l.1-.2.3-.2.7-.2.2-.1.2-.1-.1-.3-.1-.5v-.2l.2-.1.1-.2h.2l.2-.1 1-1.3.4-.8v-.1l-.1-.4.2-.1.1.1h.1l.2-.1h.1l-.2-.2-.2-.3-.1-.2h.3l.2-.1.2-.3.4-.5h.2l.1-.1V47.7l.1-.1v-.4l.1-.2.3-.1.2-.2-.1-.3 2.1.1.5-.2.1-.3.2-.3.1-.3.3-.2.3.1.2.2.2.2.2.1h.7V45.5l.1-.2.7-.9.8-.9.1-.1.5-.7.2-.4.2-.2.2.1 1-.1.2-.1.4.2h.8l.4-.2.3-.3.5-.8.4-.4.4-.2 2.5-.1.4-.1 1-.7.3-.1.4.3.2.3.2.3.1.4.1.9.2.3h.8l.3.2.5 1.1.2.1.6.1.3.1.2.2.2-.3.4-1 .1-.4v-.1l.1-.1.5-.5v-.1l.1-.1V40.3l.1-.2.4-.3.2-.4 1.3-.4 1-.2h.1l.4.1h.5l.3-.2h.2l.2-.1.1-.1.1-.2V38l-.1-.2v-.2l.1-.2.2-.3.4-.4.1-.1.3-.1.9-.2.7-.8.1-.1.1-.1.2-.1.5-.1.3-.2.3-.3 1.2-1.6.1-.1.3-.1h.2l1.1-.1h.2v-.1l.1-.1.1-.2.2-.5.2-.3.2-.2.6-.4.1-.3.1-.6-.1-.4-.1-.2h-.1v-.1l-.4-.3-.1-.1-.1-.1v-.1l-.1-.1v-.1l.1-.2V28l.3-.5.2-.4.1-.1v-.1l.1-.1v-1.2l.1-.2.2-.2.2-.3.3-.9.1-.1v-.1l.1-.1v-.4l-.3-.2v-.5l.1-.9v-.1l-.1-.1v-.1l-.1-.1-.2-.4v-.1l-.1-.1v-.2l.1-.2.1-.1.1-.1.1-.2h.1l1-.6.1-.1.1-.1v-.2z" })
);

var northWest = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100.3 68.3", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M99 11.8l-.3-.2-.3-.2-.6.1h-.4l-.2-.2-.2-.5-.2-.2-.4-.3v-.4l.1-.2.4-.2h.2l.4.2.3.2.3.1h.4l.2-.2.1-.4.1-.5-.3-.4-.5-.3-1.4-.6-.6-.2h-.9l-.9-.3-.3.1-.3.1-.1.1-.1.1h-.2l-2.6-.3h-.3l-.3.1-.1.1-.2.2-.7-.7h-.4l-.4.1-.4.1-.2.1V7.8l-.1.4-.7 1-.2.2H86.4l-.1-.1-.1-.1-.1-.5-.2-.2-.8.1h-1.3l-1.4-1.1-1.9-.3-.2-.1-.1-.3-.3-.6-.6-.6-.6-.4-.4-.7-.2-1.9-.2-.4-.2-.1-.2.1-.2.1-.2.5-.8.6-2 .8-1.1.6-.2.1-.5-.1h-.3l-.5-.3-.5-.3-.5-.1-3-.3-.2-.1-.1-.4-.5-.9-.1-.5V.3h-.4l-.3-.1h-.3l-.4-.1-.8.1-2 .7-2.7.8-.5.4-.3.2-.9-.1-.6.2-.1.1-.1.1-.1.4.2 1.4v.8l-.2.6-.5 1.2v.7l-.5 1-.4 1.3-1.6 3.4-.5 2.5-.2.5-.8 1.9-.4 1.1-2.3 1.8-1.2.6-3.7.4-.7-.1-.8-.3-.7-.1-.7.1-.8.4-1.1.8-.3.2-1.1.3h-.5l-.5-.1-.6-.1-1.2.1-.7-.1-.9-.7-1.3-.5-.8-.3-.4.1-.3.1-.5.2-.9-.2-.7-.5-1.2-1.5-.8-.4h-1l-1.8.5h-.4V20l.1-.1v-.2l-.2-.2-.2-.1H24l-.9.2-.3-.2-.3-.4-.8-.5-.7-.9-.1-.1-.4-.1-.1-.1-.2-.2-.1-.4-.2-.2-1-.3-.2-.2-.1-.2-1.9-1.5-.4-.2-.6-.3-.1-.1-.3-.2-.2-.5-.2-.1-.2-.1h-.3l-.6.3h-.3l-.2-.1-.8-.3-1-.2-.9.1-.8.2-1.3.7-.2.1-.2.1-.1-.1-.1-.2-.1-.1-.5-.1-.4.2-.7.7-.1.2v.2l-.1.1-.2.2-.2.1-.2.1-.1.2-.2.2-.3.7-.2.3-.4.2-.1.1-.4 1.2-.1.3-.1.2v.2l.1.2.2.2.1.2-.2.2-.2.1v1.1l-.1.1-.8 1-.3.4-.1.4v.3h.1l.1.1.1.2.2.2v.2l-.2.3-.3.3-.3.3-.2.3.2.4.1.2v.4l-.1.5v.3l-.2.3-.2.1-.5.2-.2.2.1.1v.4L.2 29H.1h.1l1.2.1.2 5.8-.3.3-.1.4v.5l.1.5.2 1 .1.3.2.1.4.1h.3l.2-.1h.5l.2.1h.3l.3.2.2.2.3.1H5l.4.2.1.1.2.2.1.2.1-.1h.3l1.2.8v.3l-.1.7v1.5l-.3.4-.1.4v.2l.6 2 .5.8.1.1v.1l-.1.1-.2.1-.8.3-.2.3-.2.6v1l.1.5.2.6.2.3.3.2.8.1.8.6 1.5 1.8.4.2.4.1.8.1.5.1.3.2 1.1.8.2.1h.5l.4.4.1.2.1.2v.2l1.6.2.5.2.7.4.7.4.8.2h.4l.4-.4.2-.3.1-.1.2-.1h1.4l.2-.1.1-.2v-.2l-.3-.2-.1-.3.1-.3.2-.2.4-.1.5.1.6.1.1-.2-.1-.5v-.7l.1-.3.1-.2.1-.2.4.5.4.7v2l-.1.4v.3l.1.3.1 1.2.5.9v1.2l.5 1.1 5.4-1.3.1.4.2.4.1 1.3-.1.5-.1.3-.6.6-.2.3-.2.5.1.4.2.2.5.1.2.2.5.7.1.4-.1.2-.1.3v.2l1.4 1.3.5-.5.1-.3.1-.2.1-.2.1-.2.7-.6.1-.4.1-.2v-.2l-.1-.5v-.1l.1-.5.3-.4.2-.4.1-.1h.1l.2-.1.1-.1.1-.2.1-.2.1-.2-.1-.3.1-.3.1-.4v-.7l-.1-.1v-.1l-.2-.1-.1-.1-.1-.4-.1-.2.1-.2.1-.4.1-.1-.1-.1V58.2l.1-.2.1-.1h.4l.4.1h.1l.3.3.1.6.2.4.1.3.1.3.5.1H41.9l.2.1.2.1.2.2-3.2 3.9-.3.1 1.9 3.7.1.1h.2l.2-.2.4-.4h.5l.2-.3h.2l.2.1h.1l.2-.3.3-.3.4-.6V66l-.1-.1v-.1l.5-.9v-.1l.2-.1H45.1l.1-.1.2-.3.1-.1.2-.1.3-.3.3-.4.1-.2-.1-.3v-.2l.2-.1.3-.5.2-.1h.4l.2-.1h.2l.1-.1 1.3-1.2.3-.1 1.1-.3.1-.2.1-.1h.2l.2.1H51.5l.3-.2h.1l.1-.1.2-.3h.5l.3.2.2.1H53.5l.1-.1.1-.1.1-.2.5-.3 1.8-1.1h.4l.2.1.2.2.3.3.1.1.2.1h.7l1.2.2.2.1.1.1.1.5.1.3v.4l.1.2.1.1h.6l.1-.1.1-.1V60.1l-.2-.4-.1-.1v-.2l.1-.1.4-.8.2-.2.2-.3 1.6-1.5h.1l.3-.1.2-.2v-.4l.1-.6.3-.4.4-.2.5-.1h.1l.2.2h.2l.2-.4.2-.2h.7l.3.1h1.8V54l-.1-.1-.2-.1h-.2l-.4-.1-.2-.3.1-.4.3-.3.1-.1h.1l.1-1.2-.4-.4-.6-.5-.4-.6.4-.4 1-.3.3-.3.5-.5h.2l.4.1.3-.2v-.2l-.1-.3v-.4l.2-.1.4-.6.3-.2.3-.1.2.1.2.1h.1l.1.1.1.1h.1l.1-.2v-.2l.1-.1v-.2l.1-.1.5-.4.3-.2.4-.2.2-.1.1-.1.2.2.2.1.1-.2.2-.2.4-.2.1.1.5.5.5.3-.1-1.3.1-.3.2-.2.3.2.3.6.6.3.8.1h1.7l.3-.1h.4v.2l-.1.2-.1.2.2.2.4-.2.7-.5.7-.9.4-.4.5-.1.3.2.5.5.3.1h.2l1.1-.3.2-.1.5-.9.1-.2v-.4l.1-.4.2-.2h.2l.1-2.6v-.5l.2-.5.3-.3.1-1.1v-.2l.1-.1.1-.1.2-.1.1-.6h-1.6l-.2-.2-.2-.1-.1-.1v-.1l-.3-.3-2.2.7-.3.3-.8.4-.3.2-.2.1-.6.1-.1-.1h-.1v-.2l-.1-.3-.1-.3-.6-1.2.9-.8 1.5-1.1-.6-2.7 1.1-.1.3-.4.6-.3.4-.5.5-2 .4-2.2 1.2-.8 1.4-.6.3.4.5.3.4.3h.6l.3.3 1.4-.3 1.3-.2.2-.3.6-.2.3-.4.1-.4V22l.1-.1.2-.1v-.4l-.1-.2-.6-1.4 1.4-.3.4-.3.4-.4.5-.6.1-.6v-.3l-.1-.1v-.1l-.2-1.1v-.3l.1-.3.5-.2h.5v.2l-.2.3v.2l.1.2h.3l.2-.1.2-.1 1-.1.4-.1.7-.5.2-1.6z" })
);

var kwaZuluNatal = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 85.3 100", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M82.1 1h-2.9l-2.7.1-2.4.1L73 1 71.5.8l-.6-.1-1.1.2-.6-.2-.3-.1-.5-.5L68 0h-1.3v.7l-.3 2-.4 1.9-.3 2.1v1.9l.1 1.7.1.3.1.3.1.2.1.3v.3h-1.8l-2-.1h-5.3l-1.4-.3-2.1-.7L52 10l-.7-.2-1.2 1.4-.7.7h-1l-.6.1-.3.1-1.6.5-.6-.1-.5-.4-.2-.4-.3-.1-.8.1-.3.2-.2.1-.2.1-.3-.1-.4-.4-.8-.3-.1-.1-.3-.1-.3-.1-.7-.3h-.2l-.4.1-.6.2-.2.1-.2.1-.3.3-.5.1-1.4-.2-1.3.1-.3-.1v-.1l-.1-.2v-.4h-.1l-.1-.1-.4-.1h-.1l-.2.1-.2.1-.2.3h-.7l-.2.1-.2.1-.2.1-.3.1-.4.2-.6.5-.2.1-1.1.4-.1.1-.1.1v.1l-.1.2h-.5l-1.6-.4-.3.2-.4.3h-.2l-1.1-.2-.2-.1-.1-.1H24.2l-.8.2-.4.1h-.1l-.2.1-.1.1-.1.2-.1.2-.1.4-.2.4-.2.3-.2.2h-.2l-.5-.2-1 .5-.1.2V15.8l-.1.4v.1l.1.2h.1l.7.2.1.1.1.2.1.2V18.3l-.1.1-1.2.6h-.1l-.2.2-.1.1-.1.2v.2l-.1.1.1.1v.2l.1.1.2.3.1.2v.1l.1.1v.2l-.1.9v.6l.3.2v.1l.1.2-.1.1v.2l-.1.1-.1.1-.4 1-.1.3-.2.3-.2.2V26.8l-.1.1v.1l-.1.1-.3.4-.2.6-.1.3-.1.2.1.1v.2l.1.1v.1l.1.1.5.3v.1l.1.1.1.2.1.4-.1.7-.1.3-.6.4-.3.3-.2.4-.2.5-.1.2-.1.2h-.1l-.2.1h-1.2l-.3.1-.2.1-.2.1-1.3 1.8-.3.3-.4.2-.5.2-.3.1-.1.1-.1.1-.7.9-1.1.2-.4.1-.1.1-.4.5-.2.3-.1.2V39.1l.1.2V39.6l-.1.2-.1.2h-.2l-.2.1-.4.1-.2.1H7.7l-.5-.2H7l-1 .3-1.5.5-.2.4-.5.3-.1.2V42.7l-.1.1v.1l-.6.5-.1.1v.2l-.1.4-.5 1.1-.1.3.3.2.2.4.9 1.4 1.1 1.2H5l.5.1.4.2.2.2v.5l.1.3.3.2.5.1.7.3 1.7 1.8.7.2.8.1.6.2.1 1.4.2.2.4.3.3.3.1.4.2.8.6.8.2.5v.7l.1.1.3.3.1.1-.1.4-.4.5v.7l-.1.3-.2.2-.2.2-.6.2-.6.2-.6.3-.4.4-.1.5v.6l.1.6.3.3-.3.3-.1.3v.4l-.2.3L9 66l-.6.5-.3.6-.3.6-.4.7v.6l-.1.7v.5l.3.5.2.2.1.1V71.6l.2.4.1.3-.1.2-.3.1-.5.1-.3.1-1.6 1 .2.3 1 1.3.9.8.1.2V77l-.1.1-.1.1-.4.4-.1.1-.2.5-.2.1h-.1l-.4-.1h-.1l-.1.1-.3.2-.2.1-.3.1-.1.1-.1.1v.1l.1.1.1.2.1.1v.1l-.1.1h-.1l-.1.1-.3.2-.1.1-.1.2-.3.4-.1.1-.2.1-.2-.1h-.2l-.2.3-.4.6-.2.3-.2.1h-.1l-1.4-.6H.7l-.6 1.3-.1.3V83.3l.4.6v.5l-.2.8v.4l.1.3.1.2.1.1.1.1H1.3l.1.1.5.8.2.3.1.1h.1l2 .4h.1l.1-.1.1-.1v-.1l.1-.1v-1l.1-.2.1-.1H5.2l1.4.6.1.1.1.2v.7l.1.3.1.1.2.1 3.3.9.7.4.5.2h.5l.1-.1.1-.2.1-.1h1.2l.1-.1h.1l.4-.3h.1l.1-.1H14.8l.1.1 1.4 1 .7.2.5.4.2.1H18l.7-.2.1.1h.2l.3.2h.3l.4.3.3.1.3.1h.2l.1-.2h.5l.2.1.1.1v.2l.3.2.8.5.4.4.4.2.2.1h.2l.1-.1.2-.1h.1l.1.1v.2l.1.2v.1l.2.2.1.1.1.1.1.2.1.1.1.1h.2l.1-.1h.1l.1.1.2.2h.1l.1.1h.5l.2.1v.1l.1.1v.1l.1.1V95.3l.1.2h.2l.5.4.3.3v.2l.1.2v.1l-.1.2.1.2v.3l.1.2.1.1v.7l.1.1.1.1.2.1.2.1.1.1V99.5l.1.2h.1l.2.2.1.1 1.9-2.6.7-1.4.3-.2.3-.1.3-.4.6-.8 3.5-6.5.9-1.1.2-.3.1-.4.4-.9 3-5.3 1.1-2.7 1-1.8.6-.7 2.2-2 .5-.6.2-.3v-.2l.1-.1v-.2l-.3.2-.7.3-.3.1.1-.6.2-.2h.8l-.2-.9.2-.9 2.7-5.4 2.7-3.8.2-.4.2-.2.1-.1.3-.2.1-.5.1-.2.3-.2.7-.5.3-.2.8-1.1.2-.2.1-.1.1-.4v-.2l.2-.1.3-.1 1-.9 4-4.6.6-.4v-.1l-.1-.1-.1-.1-.1-.1V49l.9.2h.8l.8-.1 2.5-1.4.8-.7.4-.7H68l-.4.2-.2.2-.2.2-.5-.6.5-.5.8-.1.6.4 2.3-1.9.2-.4.4-.6.2-.3.3-.2.6-.3.3-.2 1.8-1.8.2-.4.2-.8.4-.9.2-.8-.2-.8-.1.1h-.1l-.1-.1-.1-.2.5-.1.3-.4.2-.5.1-.5.1-.4 1.8-2.7.1-.4 1-5.8v-.2l-.1-.5v-.5l.2-.6v-.2l.1-.5 1.4-6.8 2.2-6.1v-.6l.2-.4.1-.2.1-.6v-.2l.8-1.1.1-.4v-.5l.4-1.5.3-3 .3-.9z" })
);

var gauteng = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100.3 96.3", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M100.1 12.4l-.9-.4-1.6.2-1.7-.6-.8-.1-3.7 1-1.1.7-2.4-.7-1.2.3-1.8.2-1.1.9-2.1.6-2.8-1.1-.1-1 2-1.7.4-.5.3-.5.1-.6v-.7l-.4-1.1-.2-1.7.6-.4.4.3.6 1 .2.2.2-.1.3-.3.2-.5V5l-.1-.8v-.5l.2-.3.6-.7.2-.4.1-.5-.2-.3-.4-.1-.7.3-1.3.7-.4-.1-.3-.6L80.1.1l-3.8.3-1.9 1.3-4.2.6-.9.3.5 1.4.4.5.8 1.2.9.6.1.8.1.3-.1.2-.3.2-.6.4-1.5.5-1.6-.3-2.5.1-1.2.6-.8 1-2.5 1.2h-2.8l-.5-.6-3.4.4-.5 4.3-2 1.4-1.2.4-2.6.2-.6.2-.5.3h-.8l-.3-.4-.1-.7.6-.6v-.6l-.5-.2-1 .2-1.2.5-.4.8v.9l.7 3v.1l.2.4v.9l-.3 1.4-1.3 1.9-1.1 1.1-1.2.8-3.7.8 1.5 3.7.3.6.1.7v.4l-.5.3-.3.1v.1l-.1.3.1.6v1l-.2 1-.9 1.3-1.6.5-.7.7-3.4.7-3.8.7-.8-.8-1.8.1-1-.9-1.3-.7-.8-1.1-4 1.5-3.2 2.2-1.2 6.1-1.2 5.3-1.2 1.6-1.6.6-.8 1-3 .3 1.7 7.4-4.2 3-2.5 2.3 1.8 3.4.2.7.2.9V74.1l.2.1.4.3 1.6-.4.6-.2.6-.4 2.4-1 .9-1 5.8-1.8.8.7.2.2.2.5.6.2.5.4 4.3.1-.3 1.7-.5.3-.2.2h-.1l-.1.3-.2.6-.3 3-.7.8-.7 1.4.2 1.3-.5 7 .6-.2h1.1l-.3-1.1.6-.3.9-.1.5-.2.3-.3.6.7.6.9.1.4h.7l3.4-.4.3.2.3.4.4.4.5.1.4-.3.1-.3v-.5l.2-.4.8-.4 1.1-.4 2.2-.3 1.1-.3.7-.7.6-.9.7-.7 1.1-.6.6-.2.5.3.9.8.3.6-.2.2-.5.6.5 1.3 2 3.6.6.8 1.3.5 1 .6.9.7.6.8.4.3.2.2 1.1-.9.5.1.3 1.1.1.2.2.4.2.1.6.5 1.3-.2.9-.4h.6l.3.1.2.2.2.2.8.6.8-2.4-.2-.8.2-1.3.9-.8.6-1 1.3-.8.1-1-.1-.5-.2-.2h-.1V87l1-2.3 2.5-2 1.2-.6.6-1 .5-.5.8-.2.4-.1.2-.2.8-1.5 1-1 1.6-.6 1.9-.1.7-.7 4.7-1.1.7-.7.3-.2.5-.6 4.9-4-2-4.4-5.8.9-2-.7-3.2-.6-.1-1.7-.2-.5-.3-.3-2.5-1.7-.6-1.1-.5-1.9-.9-1.9-.6-.3-1.1-2.5 1.3-.9.5-.2.7-.2H66l.6-.2.6-1 .4-1.2 1.3-1.7.2-.2h5.2l.4.2 1.4.3.9.7 3.5.1.3-2 1.8-4.8 1.7-1.2.7-.9.3-.6.1-1.3.1-1.1.8-1.8.4-2.2-.2-1.3.6-1.4 2.7-2.6 1-3.5 1.3-1.5.3-1.1.2-.4-.1-.3.1-.1.3-.7 1.2-.4.6-1 .3-.8.9-1.1 2.8.1 1.1-2.3.3-1z" })
);

var mpumalanga = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 94.9 100.3", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M94.7 46.3l-.2-1.7-.2-.6-.2-.6-.1-.9v-.9l.1-.7.5-1.4-.1-6.1V20.9l-.1-3.9.2-1.9-.1-2.2-.6-2.1-.9-1.9-1.5-3.2-.2-1.2-.1-4.4-.1.1-.2.1h-1.1l-.3-.2h-.1l-.2.1-1.1 1-.1.1v.1l-.1.8-.1.1-.1.1-.1.1h-.1l-.2.1H87l-.5-.2-.2-.1-.1-.2v-.2l-.1-.1v-.1l-.1-.1-.2-.1H85.5l-.2.2-.2.1-.1.1-.3.5-.1.1h-.4l-.1-.1-.2-.3H83.6l-.4.3h-.5l-.2-.1-.3-.2-.8-.2h-.1l-.3-.1H80.7l-.2.2-.4.5-.2.2h-.2l-.1.1-.3-.1h-.2l-.2-.1-.2.1-.3.2-.2.2-.2.2-.1.1h-.2l-1-.2-.3.1-.7.7 3.6.2 1.6.2.6 1-.6 1.2-.1 1.7-1.7 4.2.5.9-.7 1.2 1.9.1v.2l.2.1-.1.2V15.8l.2.5 2.9 1.9.4.6.2.5-.1.3-.3.2-.4.1h-.4l-.3.2-.3.4-.3.7-.7.3-1.1.2-1.1.3-1 .6-.2 1.6v.6l.3.2.4.1.5.2 1.4.3.2.4v.7l.1.6-1 1.4-.2-.1-.8-.2h-1.8l-.1.1-.2.1-.1.1H76.2l-.1.1-.2.1v.2l-.1.1v.1l-.1.1-.7.2-2.9.3.1-1.5.3-.7.9-.4 1.3-.3.2-.6-.5-.5-.5-1.1-.4-1.4-.3-.4-.5-.4-.9-.3-.2-.6.4-.4 1.3-.4.5-.7.2-.4-.2-.3-.2-.1h-1.3l-.5-.4-.4-.4-.7-1.7-1.8-.3-.4-.8-2.5-.6-.9-.4-1.9-1.9-.5 1-.2.4-.1 1.2-1.8.4-.4-.1-.5.3-.2.6-.3.7-.4.4-1.1.4-1.2-.6-3-.7-1.1.3-1.2.2h-.9l-.5.7-.2.1h-.3l-.6-.4-.5-.2-.4.1-1 .5-.1 2.3.6 1.1-.1.9-.4.9-1.3.8-3.3 2.5-2.8 2.3v.2l-.4.7-.8.3-.1.6.2.3.3.2.6.8-.2.7-.5.3-.3.7-2.1.7-1.7-.2-1.2-.4-.7-.6-.8-1-.4-.4-.3-.1-.2-.1-.2-.2-.4-.6-.3-.6-1.3-1.4h-.2l-.2.1h-.1l-.4.3-.1.1h-.1l-.1-.1-.1-.1V28.9l.1-.1.3-.3v-.1h.2l.1-.1v-.2l.1-.2v-.5l-.1-.3v-.2l-.5-1v-.2l.1-.3.3-.3.1-.2.2-.2h.1l.1.1.1.2H28.8l.1-.1.2-.1.1-.1.1-.2.1-.2v-.4l-.2-.8v-.8l-1.9.7-1.1.7-1.9.6-.7.6-.4.4-.1.7-.5 1.2-.2.2-2.2 1.1-1-1.9-.2-.1-.4-.7-.8-.1-1.1.1v1.7l-.7-.3-2 .2-1.4-.2-.5.1-.7.1-.5.3-.8.5-2.1.9-.1.5v.4l-.2.9-.4.4-1.1.4-.6.1-.7.3-.4.2-.3.5-1 .6-.9.3-.4.3-.1.3.1.4.3.5.6.1 1-.1.9-.3.5-.2.5-.3.3-.2 2.2-.7.5-.2 2.2-.3 1-.7 2-.2.6.9.2.3h.2l.7-.3.3-.2.3.1.1.1-.1.3-.1.2-.3.4-.1.1V35.2l-.1.2-.1.2h-.1l-.1-.1-.3-.5-.3-.2-.3.3.1.8.2.6v.7l-.2.3-.2.3-1.1.8.1.6 1.5.6 1.1-.4.6-.4 1-.1.6-.2 1.2.4.6-.4 2-.5h.4l.9.4.9-.2.4.3.1.4-.2.6-.6 1.2-1.5-.1-.5.6-.1.4-.3.6-.7.2-.1.3-.1.1v.1l-.1.3-.1.6-.7.8-.5 1.8-1.4 1.4-.4.7.1.7-.2 1.2-.4.9v.6l-.1.7-.2.3-.4.5-.8.6-1 2.6-.2 1.1-1.8-.1-.5-.4-.7-.1-.2-.1H8.1l-.1.1-.7.9-.2.6-.3.5-.4.1h-.9l-.3.1-.3.1-.6.5.5 1.3.4.2.4 1 .3 1 .3.6 1.3.9.2.2.1.2v.9l1.7.4 1.1.3 3-.4 1.2 2.3-2.7 2.1-.2.3-.2.1-.3.4-2.6.6-.3.4H7.4l-.8.3-.5.5-.4.8-.2.1-.2.1-.4.1-.2.3-.4.5-.6.3L2.4 77l-.6 1.2v.2h.1l.1.1.1.3-.1.5-.7.5-.3.4-.5.5-.1.7.1.4-.4 1.3.9.5h1.6l.3.1.1.2.1.4.1.2.1.1.1.2.2.2.2.1H4l.1-.1.3-.3.1-.1.2-.1H5l.2.1.1.1.3.3.3.3.1.3.7.3.1.3-.2.3-.2.7.3-.1L7.9 86l.3-.1.4-.1h.5l.4-.1v-.3L9 85l-.2-.1-.2.1v-.1l.1-.2.7-.4 1.1.4 2 1.3.3.2h.2l.2.1.3.2.3.2.2-.1.3-.1.2-.1.3.1.1.2.2.1h.2l.2-.1.3-.5.2-.2.3-.1h.2l.2-.1.3-.3.2-.1h.8l1.2.8.2.1h.2l.1.1v.4l.1.2V87.6l.1.1.2.2.1.1.1.1.1.3.2.6.2.4.2.2.2.2.1.1h.2l.1-.1.2-.2h.1l.3-.1h1.2l.3.1.2.1.1.1.2.3.2.1.3.3.5.1.3.2.1.1.1.1.2.2.6.1.2.1.1.1h.1l-.1.2v.4l.1.2.1.1H27.3l.2-.1.5-.1.1-.1h.4l.2.1.9.6.3.5.2.4.1.5.1.2.1.2.2.1.1.1v.2l-.1.2v.1l.9.9.1.1.3.2.2.2v.2l-.1.2V97.4l.1.1.1.1.1.1 1.7 2.2.3.2H34.6l.1-.1h.1l.2-.2.1-.1h.1l.1-.1h.6l.1-.1V98.9l.1-.1v-.1l.1-.1.1-.1.2-.1.3-.1H37.4l.6.1.6.3.3-.1.2-.2.2-.3.3-.6.1-.4.1-.2.1-.3.2-.2.2-.1h.2l.4-.1 1.1-.3.1.1h.4l.2.1 1.4.4.1-.1h.2l.4-.4.4-.2 2 .6.5-.1.2-.3v-.1l.1-.1.1-.1 1.4-.5.2-.1.8-.7.5-.2.3-.1.3-.1.3-.2h.2l.2-.1h.7l.3-.3.2-.2.2-.1h.2l.5.1.1.1.1.1v.5l.1.1v.2l.4.1 1.6-.1 1.8.2.5-.1.4-.4.2-.1.4-.1.7-.3h.7l.9.3.3.1.4.2.2.1.9.4.6.4.4.2.2-.1.2-.2.3-.2 1-.2.4.2.3.5.6.5.7.1 2.1-.6.4-.1.7-.2h1.2l.9-.8 1.5-1.8-2.3-.8-.4-.3-.3-.4-1.3-1.8-2.6-2.4-.6-1-.1-.7.3-1.1V83l-.1-.6-.3-.4-.7-.8-.4-.5-.4-1.3-.1-.3-.3.3-.4.3-.5.3-.4.1h-.4l-.2-.7-.2-1.9-.1-3.9v-3.1l.5-2.1 2.4-3 1.9-2.3 1.7-3.1 1.4-3.3.3-1.5.4-.6 2.2-2 2.6-2.3.7-.3.9-.3h.8l.6.2 2.7 1.8 2.7 1.7 2.4 1.5.4.3 2.2 1.5.8.2.7-.2 1.4-.7-1-3.3-.1-.8.2-.8 1.1-2.8.2-.4.3-.3.3-.1.1-.2.1-.4z" })
);

var limpopo = (0, _preact.h)(
  "svg",
  { version: "1.2", className: "DeptGroup-svg", baseProfile: "tiny", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100.3 63.9", overflow: "scroll" },
  (0, _preact.h)("path", { d: "M100.1 36.2l-.1-.3-.2-.3-1.2-.9-.3-.3-.3-.4-.7-1.7-.7-2.5-.4-.8-1.8-1.9-.3-.7-.1-.8.4-4.5-.1-.6-1.3-3.9-.8-2.4-.9-2.9-1-3-.8-2.5.2-.3-.4-.7-.2-.1h-.2l-.3.1H88.3l-.3-.2-.1-.1-.1-.1-.4-.4-.2-.1h-.3l-.6.3h-.1l-.2.1-.3-.1-.6-.3-2-.4-1.1-.2-.6-.1-.6.2-2 .2-.4.1-.4.4h-.5l-.2-.2h-.7l-1.2-.2H75l-.3.1-.7.4-.4.1-.7.1h-.7l-.6-.1-.6-.4-.2-.3-.3-.1-.4-.1-.4-.1-.8.1h-.3l-.5-.2-.5-.4-.3-.1-.5-.1h-.1v-.1l-.3-.4-.2-.1-.4-.1-.2-.1-.5-.3h-.3l-.6-.1-.5-.2-.6-.2L62 .3l-.3-.1-1.3.1-.2.1-.3-.3-.4.1-.7.3-.6-.1-.4.1-.1.3-.2.2H57l-.9-.2h-.4l-.6.4-.4.2h-.4l-.1-.1-.4.1h-.5l-1-.2h-.5l-.3.3-.3.2-.4.1-2.2.2h-.2l-.3.6v.1l-.3.1-.4.4-.4.5.1 1.4v.3l-.2.1-.4.8-.4.3-.8-.1h-.4l-.2.3-.1.3-.2.2-.4.2h-.4l-.8.3-1.3.7-.7.2h-1.1l-.4.4-.3.1-1.2-.3-1.5.1-.7.2-.7.3-.2.3-.7.8-.2.1h-.4l-.2.1-.2.1-.6.7-.1.2v.5l.1.1v.2l-.2.3-.1.1-.2.1h-.2l-.2.1v.1l-.1.3-.1.1-.3.2-.4.1-.3.1-.1.3.2.4-.1.4-.2.4-.3.3-.3.2-.3.2-.4.1-.3.1-.3.2.1.4.1.9-.3.5-.6.4-.8.4-.7.1.1.4-.3.1h-.5l-.1.1.1.2v.1l.1.1v.1h.1v.1l-.1.1-.1.1-.3.8-.1.2-.3.1-.2-.1-.5-.6-.8.6-.2.1-.2-.1-.3-.1h-.2l-.2.5-.3.4-.1.3v.2l-.1.1-.1.1v.1l.1.2v.1l-.1.5-.3.3-.3.3-.4.1h-.8l-.2.1-.2.2-.2.2-.1.2-.3-.2.1-.3h-.1l-.3.1-.2.1-.1.1-.1.2-.2.2-.2-.7-.3.3-.4.6-.3.3-.3.3-.7.3-.7.2-.2.3.2.4h-.5l-.1-.2v.1l-.2.2-.1.1-.1-.2h-.4l-.1.2.1.2.1.1.1.2v.2l-.3-.1h-.2l-.1.1-.2.3h.1l-.3.2-.1.1-.1.2-.1-.1h-.1v.4l.1.3v.3l-.2.2h-.4l-.1-.2-.1-.3h-.2l-.2.1-.3.8-.3.7-.1.3v.4l-.5.9.1.4v.6l-1.3 5.3v.9l-.4 1.7-.2.4-.3.2-.4.3-1.6.5-.4.2-.1.3-1.1 1.1L3 46l-.5.4-.5.6-.5 1.5-.2.2-1.2 1.2v1.7l.1.5.6.9.1.5h.2l3.1.3.4.2.6.3.5.2.4.1.4.1.3-.1 1.1-.6 2.1-.9.8-.6.2-.5.2-.2h.3l.2.1.1.4.3 2 .4.7.7.4.6.7.2.6.2.2.2.2 2 .3 1.4 1.1 1.4.1.8-.2.2.2.1.5v.1l.1.1.1.1h.2l.2-.1.2-.1.6-1.1.1-.4v-.5l.1-.1.2-.1.4-.2h.4l.4-.1.7.8.3-.2.1-.1.2-.1.3-.1 2.8.4h.2l.1-.1.1-.1.3-.1.4-.1.8.2 1 .1.6.2 1.4.6.6.4.3.4-.1.5-.1.4-.3.2h-.4l-.2-.1-.3-.2-.4-.2h-.3l-.4.1-.1.3v.4l.4.3.3.3.1.4.3.2.3.1.7-.1.3.2.3.2 1.2 1.8 1.3-.1.2.2h1l1-.5.3-.4.5-.2h.9l.6.1.6-.2.2-.1.1-.1.1-.1-.1-.1v-.3l-.3-.2-.4-.5-.1-.2-.2-.5-1.6.5-.2.1-.3.2-.4.2-.7.2-.7.1-.4-.1-.2-.4-.1-.2.1-.2.2-.2.7-.3.7-.4.2-.3.4-.2.4-.2.5-.1.7-.2.4-.4.1-.6v-.3l.1-.3 1.5-.7.5-.4.4-.1.5-.2h.4l1 .1 1.4-.1.5.2V55l.8-.1.6.1.3.5.1.1.7 1.3 1.6-.7.1-.2.4-.9.1-.5.3-.3.4-.4 1.4-.4.8-.5 1.4-.6v.6l.1.6v.5l-.1.1-.1.1h-.1l-.1.1h-.2l-.1-.2h-.2l-.1.1-.1.1-.2.3V55l.3.8.1.1V56.5l-.1.1v.2h-.1l-.1.1-.2.2-.1.1v.1l.1.1v.1l.1.1.1-.1.3-.2.1-.1H55.2l.9 1 .2.5.3.4.1.1.2.1.2.1.3.2.6.8.5.4.8.3 1.2.1 1.6-.5.2-.5.3-.2.2-.5-.5-.5-.2-.2-.1-.3.1-.3.5-.3.3-.5v-.1l2-1.7 2.4-1.8.9-.5.3-.7.1-.6-.4-.8v-1.7l.7-.3.3-.1.4.1.4.3h.2l.2-.1.3-.4.7-.1.9-.1.7-.2 2.2.5.9.4.7-.3.4-.3.2-.5.1-.4.4-.2.3.1 1.2-.4.1-.8.1-.3.4-.7 1.4 1.4.6.3 1.8.4.3.6 1.3.2.5 1.2.3.3.3.3h1.1l.1.3-.1.3-.3.4-1 .3-.3.3.2.4.7.3.3.3.2.3.3 1 .4.8.3.3-.1.4-1 .2-.6.4-.2.4-.1 1.1 2.1-.2.5-.1.1-.1v-.2l.1-.1.1-.1h.5l.2-.1h.1l.1-.1h.1l1.3-.1.5.2h.2l.7-1v-.9l-.2-.3-1-.2-.4-.1-.2-.1-.3-.1v-.5l.2-1.1.7-.5.8-.2.8-.1.5-.2.2-.6.2-.2.2-.2h.6l.2-.2.1-.2-.1-.3-.3-.5-2.1-1.4-.1-.3-.1-.3v-.2l.1-.1h-.1V47l-1.4-.1.5-.8-.3-.7 1.2-3 .1-1.2.4-.9-.5-.7-1.1-.2-2.6-.1.5-.5.3-.1.6.2.2-.1h.1l.1-.2.2-.1.2-.1.1-.1h.2l.1.1H91.9l.1-.1.1-.1.3-.3.2-.2h.2l.2.1h.1l.5.2.3.1.1.1h.3l.1-.1.3-.2h.1l.1.1.1.1.1.1.1.1h.1l.1-.1.1-.1.2-.3.1-.1.1-.1.1-.1H96.3l.1.1h.1v.2l.1.1v.2l.2.1.3.1h.4l.1-.1h.1V38l.1-.6.1-.1.8-.7.1-.1h.1l.2.1.1.1h.5l.2-.1h.2v-.1z" })
);

function Map(province) {
  switch (province) {
    case 'south-africa':
      return southAfrica;
    case 'western-cape':
      return westernCape;
    case 'eastern-cape':
      return easternCape;
    case 'northern-cape':
      return northernCape;
    case 'free-state':
      return freeState;
    case 'north-west':
      return northWest;
    case 'kwazulu-natal':
      return kwaZuluNatal;
    case 'gauteng':
      return gauteng;
    case 'limpopo':
      return limpopo;
    case 'mpumalanga':
      return mpumalanga;
    default:
      return null;
  }
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = filterResults;

var _filterKeywords = __webpack_require__(198);

var _filterKeywords2 = _interopRequireDefault(_filterKeywords);

var _filterGroups = __webpack_require__(199);

var _filterGroups2 = _interopRequireDefault(_filterGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterResults(filtersObject, rawItems) {
  var filtersKeys = Object.keys(filtersObject);

  return filtersKeys.reduce(function (results, key) {
    var value = filtersObject[key];

    if (key === 'keywords' && value.length > 2) {
      return (0, _filterKeywords2.default)(value, results);
    }

    if (key === 'sphere' && value === 'national') {
      return (0, _filterGroups2.default)(results, 'south-africa');
    }

    if (key === 'sphere' && value === 'provincial') {
      return (0, _filterGroups2.default)(results, 'south-africa', true);
    }

    if (key === 'province' && value !== 'all') {
      return (0, _filterGroups2.default)(results, value);
    }

    return results.map(function (item) {
      var newOrderDept = item.departments.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      return _extends({}, item, {
        departments: newOrderDept
      });
    });
  }, rawItems);
}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = filterKeywords;

var _fuse = __webpack_require__(24);

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterKeywords(keywords, results) {
  var options = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name']
  };

  return results.map(function (group) {
    var items = new _fuse2.default(group.departments, options);

    return _extends({}, group, {
      departments: items.search(keywords)
    });
  });
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterAccordingToSphere;
function filterAccordingToSphere(items, group, remove) {

  if (remove) {
    return items.filter(function (_ref) {
      var slug = _ref.slug;
      return slug !== group;
    });
  }

  return items.filter(function (_ref2) {
    var slug = _ref2.slug;
    return slug === group;
  });
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _index = __webpack_require__(201);

var _index2 = _interopRequireDefault(_index);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParticipateContainer = function (_Component) {
  _inherits(ParticipateContainer, _Component);

  function ParticipateContainer(props) {
    _classCallCheck(this, ParticipateContainer);

    var _this = _possibleConstructorReturn(this, (ParticipateContainer.__proto__ || Object.getPrototypeOf(ParticipateContainer)).call(this, props));

    _this.state = {
      selected: _this.props.currentMonth
    };
    _this.setMonth = _this.setMonth.bind(_this);
    return _this;
  }

  _createClass(ParticipateContainer, [{
    key: 'setMonth',
    value: function setMonth(selected) {
      this.setState({ selected: selected });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        selected: this.state.selected,
        items: this.props.items,
        setMonth: this.setMonth
      });
    }
  }]);

  return ParticipateContainer;
}(_preact.Component);

var nodes = document.getElementsByClassName('js-initParticipate');

for (var i = 0; i < nodes.length; i++) {
  var node = nodes[i];

  var currentMonthIndex = new Date().getMonth();
  var items = JSON.parse((0, _decodeHtmlEntities2.default)(node.getAttribute('data-items')));
  var currentMonth = Object.keys(items)[currentMonthIndex];

  (0, _preact.render)((0, _preact.h)(ParticipateContainer, { items: items, currentMonth: currentMonth }), node);
}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Participate;

var _preact = __webpack_require__(0);

function Participate(_ref) {
  var items = _ref.items,
      selected = _ref.selected,
      setMonth = _ref.setMonth;

  var months = Object.keys(items);

  var selectors = months.map(function (month) {
    var activeState = selected === month ? ' is-active' : '';

    return (0, _preact.h)(
      'button',
      {
        key: month,
        className: 'Button is-lightGrey is-inline u-marginRight10 u-marginBottom10' + activeState,
        onClick: function onClick() {
          return setMonth(month);
        }
      },
      month
    );
  });

  var CallToActions = Object.keys(items[selected].buttons) || [];
  var CallToActionsButtons = CallToActions.map(function (key) {
    return (0, _preact.h)(
      'a',
      {
        href: items[selected].buttons[key],
        className: 'Button is-inline u-marginRight10 u-marginBottom10',
        key: key
      },
      key
    );
  });

  return (0, _preact.h)(
    'div',
    { className: 'Participate' },
    selectors,
    (0, _preact.h)(
      'div',
      { className: 'Participate-info', key: selected },
      (0, _preact.h)(
        'h3',
        { className: 'Page-subHeading' },
        'What is happening in March with the department?'
      ),
      (0, _preact.h)(
        'p',
        null,
        items[selected].state
      ),
      (0, _preact.h)(
        'h3',
        { className: 'Page-subHeading' },
        'How can I participate?'
      ),
      (0, _preact.h)(
        'p',
        null,
        items[selected].participate
      ),
      CallToActionsButtons
    )
  );
}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _index = __webpack_require__(203);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntroSectionContainer = function (_Component) {
  _inherits(IntroSectionContainer, _Component);

  function IntroSectionContainer(props) {
    _classCallCheck(this, IntroSectionContainer);

    var _this = _possibleConstructorReturn(this, (IntroSectionContainer.__proto__ || Object.getPrototypeOf(IntroSectionContainer)).call(this, props));

    _this.state = {
      open: false,
      triggered: false
    };

    _this.parent = null;
    _this.setOpen = _this.setOpen.bind(_this);
    _this.parentAction = _this.parentAction.bind(_this);
    return _this;
  }

  _createClass(IntroSectionContainer, [{
    key: 'setOpen',
    value: function setOpen() {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'parentAction',
    value: function parentAction(node) {
      if (node && this.parent !== node.clientHeight) {
        this.parent = node.clientHeight;
        this.calcIfTriggered(node.clientHeight);
      }
    }
  }, {
    key: 'calcIfTriggered',
    value: function calcIfTriggered(value) {
      if (value > 190) {
        return this.setState({ triggered: true });
      }

      return this.setState({ triggered: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        triggered: this.state.triggered,
        innerHtml: this.props.innerHtml,
        setOpen: this.setOpen,
        open: this.state.open,
        parentAction: this.parentAction
      });
    }
  }]);

  return IntroSectionContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initIntroSection');

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var innerHtml = node.getElementsByClassName('js-content')[0].innerHTML;

    (0, _preact.render)((0, _preact.h)(IntroSectionContainer, { innerHtml: innerHtml }), node.parentNode, node);
  }
}

exports.default = scripts();

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IntroSection;

var _preact = __webpack_require__(0);

function IntroSection(_ref) {
  var innerHtml = _ref.innerHtml,
      open = _ref.open,
      setOpen = _ref.setOpen,
      parentAction = _ref.parentAction,
      triggered = _ref.triggered;

  var prompt = (0, _preact.h)(
    "div",
    null,
    (0, _preact.h)("div", { className: "IntroSection-fade" }),
    (0, _preact.h)(
      "div",
      { className: "IntroSection-button" },
      (0, _preact.h)(
        "button",
        { className: "Button is-secondary is-inline", onClick: setOpen },
        "Read More"
      )
    )
  );

  if (triggered) {
    return (0, _preact.h)(
      "div",
      { className: "IntroSection-text is-initialised " + (open ? ' is-open' : '') },
      (0, _preact.h)("div", {
        className: "IntroSection-content",
        dangerouslySetInnerHTML: { __html: innerHtml },
        ref: function ref(node) {
          return parentAction(node);
        }
      }),
      open ? null : prompt
    );
  }

  return (0, _preact.h)(
    "div",
    { className: "IntroSection-text" },
    (0, _preact.h)("div", {
      className: "IntroSection-content",
      dangerouslySetInnerHTML: { __html: innerHtml },
      ref: function ref(node) {
        return parentAction(node);
      }
    })
  );
}

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _decodeHtmlEntities = __webpack_require__(1);

var _decodeHtmlEntities2 = _interopRequireDefault(_decodeHtmlEntities);

var _index = __webpack_require__(205);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoContainer = function (_Component) {
  _inherits(VideoContainer, _Component);

  function VideoContainer(props) {
    _classCallCheck(this, VideoContainer);

    var _this = _possibleConstructorReturn(this, (VideoContainer.__proto__ || Object.getPrototypeOf(VideoContainer)).call(this, props));

    _this.state = {
      open: {
        language: _this.props.jsonData[Object.keys(_this.props.jsonData)[0]],
        select: false
      }
    };

    _this.setLanguage = _this.setLanguage.bind(_this);
    return _this;
  }

  _createClass(VideoContainer, [{
    key: 'setLanguage',
    value: function setLanguage(language) {
      if (this.state.open.select === true) {
        this.setState({
          open: _extends({}, this.state.open, {
            language: language,
            select: false
          })
        });
      } else {
        this.setState({
          open: _extends({}, this.state.open, {
            select: true
          })
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_index2.default, {
        open: this.state.open,
        setLanguage: this.setLanguage,
        languageOptions: this.props.jsonData
      });
    }
  }]);

  return VideoContainer;
}(_preact.Component);

function scripts() {
  var nodes = document.getElementsByClassName('js-initVideo');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i++) {
      var component = nodes[i];
      var jsonData = JSON.parse((0, _decodeHtmlEntities2.default)(component.getAttribute('data-json')));
      (0, _preact.render)((0, _preact.h)(VideoContainer, { jsonData: jsonData }), component);
    }
  }
}

exports.default = scripts();

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Modal(_ref) {
  var open = _ref.open,
      languageOptions = _ref.languageOptions,
      setLanguage = _ref.setLanguage;

  var toggle = (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
      'span',
      { className: 'Video-label' },
      'Change language:'
    ),
    (0, _preact.h)(
      'div',
      { className: 'Video-selectWrap' },
      (0, _preact.h)(_index2.default, {
        name: 'language',
        open: open.select,
        items: languageOptions,
        selected: open.language,
        changeAction: function changeAction(value) {
          return setLanguage(value);
        }
      })
    )
  );

  return (0, _preact.h)(
    'div',
    { className: 'Video' },
    (0, _preact.h)(
      'div',
      { className: 'Video-embed' },
      (0, _preact.h)('div', { className: 'Video-loading' }),
      (0, _preact.h)('iframe', { title: 'Video', className: 'Video-iframe', width: '560', height: '315', src: 'https://www.youtube.com/embed/' + open.language + '?rel=0&amp;amp;showinfo=0', frameBorder: '0', allow: 'autoplay; encrypted-media', allowfullscreen: 'allowfullscreen' })
    ),
    Object.keys(languageOptions).length > 1 ? toggle : null
  );
}

/***/ })
/******/ ]);
//# sourceMappingURL=scripts.1097b953dd9c0b9a3739.js.map