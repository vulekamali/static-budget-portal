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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var keys = __webpack_require__(48);
var foreach = __webpack_require__(50);
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PseudoSelect;

var _preact = __webpack_require__(0);

function PseudoSelect(_ref) {
  var open = _ref.open,
      items = _ref.items,
      loading = _ref.loading,
      changeAction = _ref.changeAction,
      name = _ref.name,
      property = _ref.property;

  var radioChange = function radioChange(event) {
    return changeAction(event.target.value);
  };

  var renderList = items.map(function (_ref2) {
    var itemValue = _ref2.value,
        title = _ref2.title;

    var id = 'pseudo-select-' + name + '-' + itemValue;

    return (0, _preact.h)(
      'li',
      { className: 'PseudoSelect-item' + (property === itemValue ? ' is-active' : '') },
      (0, _preact.h)(
        'label',
        { className: 'PseudoSelect-label', htmlFor: id },
        (0, _preact.h)('input', _extends({ id: id, name: name }, {
          value: itemValue,
          type: 'radio',
          checked: property === itemValue,
          onClick: radioChange,
          className: 'PseudoSelect-radio'
        })),
        (0, _preact.h)(
          'span',
          { className: 'PseudoSelect-text' },
          title
        )
      )
    );
  });

  if (loading) {
    return (0, _preact.h)(
      'div',
      { className: 'PseudoSelect' },
      (0, _preact.h)('div', { className: 'PseudoSelect-list is-loading' })
    );
  }

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
/* 4 */
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
  module.exports = __webpack_require__(126)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(128)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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


module.exports = __webpack_require__(51);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(19);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

/***/ }),
/* 8 */
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
function trimValues(value) {
  if (value > 1000000000000) {
    return Math.round(value / 1000000000000) + " Trillion";
  } else if (value > 1000000000) {
    return Math.round(value / 1000000000) + " Billion";
  } else if (value > 1000000) {
    return Math.round(value / 1000000) + " Million";
  }

  return value;
}

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var strictUriEncode = __webpack_require__(43);
var objectAssign = __webpack_require__(17);
var decodeComponent = __webpack_require__(44);

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
		query: this.parse(this.extract(str), opts)
	};
};

/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(6);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(52);

module.exports = Function.prototype.bind || implementation;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = Number.isNaN || function (a) {
  return a !== a;
};

module.exports = Number.isFinite || function (x) {
  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(6);
var implementation = __webpack_require__(18);

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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Array.prototype.findIndex - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
// For all details and docs: <https://github.com/paulmillr/Array.prototype.findIndex>


var ES = __webpack_require__(6);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getPolyfill() {
	// Detect if an implementation exists
	// Detect early implementations which skipped holes in sparse arrays
	var implemented = Array.prototype.findIndex && [, 1].findIndex(function (item, idx) {
		return idx === 0;
	}) === 0;

	return implemented ? Array.prototype.findIndex : __webpack_require__(27);
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {"Accounting officer":"The public servant in a department who is accountable to Parliament for financial management, usually the director-general or head of the department.","Accrual":"An accounting convention by which payments and receipts are recorded as they occur, even if no cash flow takes place.","Acquisition debt":"Debt used to purchase shares or assets.","Ad valorem duties":"Duties levied on commodities as a certain percentage of their value.","Adjustments estimate":"Presentation to Parliament of the amendments to be made to the appropriations voted in the main budget for the year.","Administered prices":"Prices set outside ordinary market processes through administrative decisions by government, a public entity or a regulator.","Agro-processing":"Manufacturing activities that transform raw materials and intermediary goods derived from agriculture into intermediate or final goods.","Allocated expenditure":"The part of the national budget that can be divided between the national, provincial and local spheres of government, after interest and the contingency reserve have been taken into account.","Amortisation":"The repayment of a loan by instalments over the duration of the loan.","Annuity":"A fixed amount of money paid over a period of time as a return on an investment.","Anti-avoidance rule":"A provision aimed at preventing tax avoidance. See principal purpose test.","Anti-fragmentation rule":"A rule that aims to prevent taxpayers from artificially avoiding permanent establishment status by breaking up a cohesive business into several small operations.","Appropriation":"The approval by Parliament of spending from the National Revenue Fund, or by a provincial legislature from a provincial revenue fund.","Artificial debt":"A \"loan\" that is presented as debt but is in effect equity. Often used in tax avoidance or evasion.","Asset price bubble":"A condition occurring when prices for a category of assets rise above the level justified by economic fundamentals.","Balance of payments":"A summary statement of all the international transactions of the residents of a country with the rest of the world over a particular period of time.","Base erosion and profit shifting":"Corporate tax-planning strategies that exploit the gaps and mismatches in tax laws between countries to artificially shift taxable income to lower or no-tax jurisdictions. See also tax evasion and profit shifting.","Basel III":"Reforms developed by the Basel Committee on Banking Supervision to strengthen the regulation, supervision and risk management of the banking sector.","Baseline":"The initial allocations used during the budget process, derived from the previous year's forward estimates.","Basis point":"One hundredth of one per cent.","Beneficiation":"Manufacturing activities that transform raw minerals into higher-value products.","Bond":"A certificate of debt issued by a government or corporation guaranteeing payment of the original investment plus interest by a specified future date.","Bond premium":"Amount by which the purchase price of a bond is greater than its par value.","Bond spread":"The difference in yield between two bonds.","Bond-switch programme":"An auction that aims to ease pressure on targeted areas of the redemption profile by exchanging shorter-dated debt for longer-term debt. See switch auction.","Bracket creep":"Increased real tax liability that arises when the personal income tax tables are not fully adjusted for inflation.","Budget balance":"The difference between budgeted expenditure and budgeted revenue. If expenditure exceeds revenue, the budget is in deficit. If the reverse is true, it is in surplus.","Capital adequacy":"A measure of a financial institution’s capital, expressed as a percentage of its credit exposure.","Capital asset":"Property of any kind, including assets that are movable or immovable, tangible or intangible, fixed or circulating, but excluding trading stock held for the purpose of realising a financial or economic return.","Capital expenditure":"Spending on assets such as buildings, land, infrastructure and equipment.","Capital flow":"A flow of investments in or out of the country.","Capital formation":"A measure of the net increase in the country’s total stock of capital goods, after allowing for depreciation.","Capital gains tax":"Tax levied on the income realised from the disposal of a capital asset by a taxpayer. A capital gain is the excess of the selling price over the purchase price of the capital asset.","Capital goods":"Durable goods used over a period of time for the production of other goods. See also intermediate goods.","Carbon tax":"An environmental tax on emissions of carbon dioxide (CO2).","Category A, B and C municipalities":"Municipal categories established by the Constitution: Category A, or metropolitan municipalities; Category B, or local municipalities; and Category C, or district municipalities.","Collateral":"An asset placed as a guarantee for the repayment of debt, to be recouped in the case of a default.","Commercial paper issuances":"Debt issued by companies through short-term promissory notes.","Conditional grants":"Allocations of money from one sphere of government to another, conditional on certain services being delivered or on compliance with specified requirements.","Connected person debt/credit":"Debt or credit granted by a person/entity to a connected person/entity. In the case of a holding company, for example, a subsidiary company would be a connected person.","Consolidated general government":"National, provincial and local government, as well as extra-budgetary government institutions and social security funds.","Consolidated government expenditure":"Total expenditure by national and provincial government, social security funds and selected public entities, including transfers and subsidies to municipalities, businesses and other entities.","Consumer price index (CPI)":"The measure of inflation based on prices in a basket of goods and services.","Consumption expenditure":"Expenditure on goods and services, including salaries, which are used up within a short period of time, usually a year.","Contingency reserve":"An amount set aside, but not allocated in advance, to accommodate changes to the economic environment and to meet unforeseeable spending pressures.","Contingent liability":"A government obligation, such as a guarantee, that will only result in expenditure upon the occurrence of a specific event. See government guarantee.","Controlled foreign entity":"A foreign business in which South Africans hold a greater than 50 per cent interest, usually of the share capital of a company.","Corporatisation":"The transformation of state-owned enterprises into commercial entities, subject to commercial legal requirements and governance structures, while the state retains ownership.","Cost-push inflation":"Inflation that is caused by an increase in production costs, such as wages or oil prices.","Countercyclical fiscal policy":"Policy that has the opposite effect on economic activity to that caused by the business cycle, such as slowing spending growth in a boom period and accelerating spending in a recession.","Coupon (bond)":"The periodic interest payment made to bondholders during the life of the bond. The interest is usually paid twice a year.","Credit rating":"An indicator of the risk of default by a borrower or the riskiness of a financial instrument. Credit ratings generally fit into three broad risk categories: minimal or low, moderate and high. These categories indicate the extent of a borrower’s capacity to meet their financial obligations or the probability that the value of a financial instrument will be realised. Investments rated as high risk are considered sub-investment grade (or “junk”).","Crowding-in":"An increase in private investment through the income-raising effect of government spending financed by deficits.","Crowding-out":"A fall in private investment or consumption as a result of increased government expenditure financed through borrowing, thereby competing for loanable funds and raising the interest rate, which curtails private investment and consumption spending.","Currency risk":"The potential for a change in the price of a currency that would affect investors with assets, liabilities or operations denominated in other currencies.","Current account (of the balance of payments)":"The difference between total imports and total exports, taking into account service payments and receipts, interest, dividends and transfers. The current account can be in deficit or surplus. See also trade balance.","Current balance":"The difference between revenue and current expenditure, which consists of compensation of employees, goods and services, and interest and rent on land.","Current expenditure":"Government expenditure on salaries and goods and services, such as rent, maintenance and interest payments. See also consumption expenditure.","Customs duties":"Tax levied on imported goods.","Debenture":"An unsecured loan backed by general credit rather than by specified assets.","Debt redemption profile":"The set of fixed repayment dates and amounts to which an issuer of debt, such as a preferred stock or bond, has committed to meeting.","Debt switching":"The exchange of bonds to manage refinancing risk or improve tradability.","Debt-service costs":"The cost of interest on government debt and other costs directly associated with borrowing.","Deflation":"A consistent decrease in the price of goods and services.","Deleveraging":"The reduction of debt previously used to increase the potential return of an investment.","Depreciation (capital)":"A reduction in the value of fixed capital as a result of wear and tear or redundancy.","Depreciation (exchange rate)":"A reduction in the external value of a currency.","Derivative financial instrument":"A financial asset that derives its value from an underlying asset, which may be a physical asset such as gold, or a financial asset such as a government bond.","Designated countries":"Foreign countries from which income may be exempt from South African tax under certain circumstances. See also double tax agreement.","Development finance institutions":"State agencies that aim to meet the credit needs of riskier but socially and economically desirable projects that are beyond the acceptance limits of commercial banks.","Direct taxes":"Taxes charged on taxable income or capital of individuals and legal entities.","Discretionary trust":"A trust where the executor has the choice of whether and how much of the trust’s income or capital is to be distributed to beneficiaries. The beneficiaries have only provisional rights to the income or capital of the trust.","Disposable income":"Total income by households less all taxes and employee contributions.","Dissaving":"An excess of current expenditure, including the depreciation of fixed capital, over current income.","Dividend":"The distribution of a portion of a company's earnings to a class of its shareholders.","Dividend withholding tax":"A tax on dividends that is subtracted and withheld by a company or intermediary before the net dividend is paid to the shareholder.","Division of revenue":"The allocation of funds between spheres of government, as required by the Constitution. See also equitable share.","Domestic demand":"The total level of spending in an economy, including imports but excluding exports.","Double tax agreement":"An agreement between two countries to prevent income that is taxed in one country from being taxed in the other as well. See also designated countries.","Economic cost":"The cost of an alternative that must be forgone to pursue a certain action. In other words, the benefits that could have been received by taking an alternative action.","Economic growth":"An increase in the total amount of output, income and spending in the economy.","Economic rent":"The difference between the return made by a factor of production (capital or labour) and the return necessary to keep the factor in its current occupation. For example, a firm making excess profits is earning economic rent.","Economically active population":"The part of the population that is of working age and is either employed or seeking work.","Effective tax rate":"Actual tax liability (or a reasonable estimate thereof) expressed as a percentage of a pre-tax income base rather than as a percentage of taxable income. In other words, tax rates that take into account not only the statutory or nominal tax rate, but also other aspects of the tax system (for example, allowable deductions), which determine the tax liability.","Embedded derivative":"A provision in a contract modifying its cash flows by making them dependent on an underlying measure – such as interest or exchange rates, or commodity prices – the value of which changes independently.","Emerging economies":"A name given by international investors to middle-income economies.","Employment coefficient":"The ratio of employment growth to economic growth.","Equitable share":"The allocation of revenue to the national, provincial and local spheres of government as required by the Constitution. See also division of revenue.","Equity finance":"Raising money by selling shares of stock to investors, who receive an ownership interest in return.","Exchange control":"Rules that regulate the flow of currency out of South Africa, or restrict the amount of foreign assets held by South African individuals and companies.","Exchange-traded funds":"Funds that track indexes, commodities or baskets of assets, and trade like stocks.","Excise duties":"Taxes on the manufacture or sale of certain domestic or imported products. Excise duties are usually charged on products such as alcoholic beverages, tobacco and petroleum.","Expenditure ceiling":"The maximum allowable level of expenditure to which government has committed itself.","Extra-budgetary institutions":"Public entities not directly funded from the fiscus.","Fair-value adjustment":"A change in the value of an asset or liability resulting from the periodic reassessment of its expected future economic in- or outflows.","Financial Services Board":"An independent institution established by statute that regulates insurers, intermediaries, retirement funds, friendly societies, unit trust schemes, management companies and financial markets.","Financial Stability Board":"An international body made up of representatives of financial authorities and institutions, and central banks. It proposes regulatory, supervisory and other policies in the interest of financial stability.","Financial account":"A statement of all financial transactions between the nation and the rest of the world, including portfolio and fixed investment flows and movements in foreign reserves.","Financial and Fiscal Commission (FFC)":"An independent body established by the Constitution to make recommendations to Parliament and provincial legislatures about financial issues affecting the three spheres of government.","Financial year":"The 12 months according to which companies and organisations budget and account. See also fiscal year.","Fiscal consolidation":"Policy aimed at reducing government deficits and debt accumulation.","Fiscal incidence":"The combined overall economic impact that fiscal policy has on the economy.","Fiscal leakage":"The outflow of revenue from an economy through tax evasion and avoidance.","Fiscal policy":"Policy on taxation, public spending and borrowing by the government.","Fiscal space":"The ability of government’s budget to provide additional resources for a desired programme without jeopardising fiscal or debt sustainability.","Fiscal year":"The 12 months on which government budgets are based, beginning 1 April and ending 31 March of the subsequent calendar year.","Fixed investment/capital formation":"Spending on buildings, machinery and equipment contributing to production capacity in the economy. See also gross fixed-capital formation.","Fixed-income bond":"A bond that pays a specific interest rate.","Floating rate notes":"A bond on which the interest rate is reset periodically in line with a money market reference rate.","Flow-through vehicles":"A vehicle, such as a trust, where income earned is treated as income of the vehicle’s beneficiaries.","Foreign currency swaps":"The exchange of principal and/or interest payments in one currency for those in another.","Foreign direct investment (FDI)":"The acquisition of a controlling interest by governments, institutions or individuals of a business in another country.","Forward book":"The total amount of contracts for the future exchange of foreign currency entered into by the Reserve Bank at any given point in time.","Forward cover":"Transactions involving an agreed exchange rate at which foreign currency will be purchased or sold at a future date.","Fringe benefit":"A benefit supplementing an employee’s wages or salary, such as medical insurance, company cars, housing allowances and pension schemes.","Fuel levy":"An excise tax on liquid fuels.","Function shift":"The movement of a function from one departmental vote or sphere of government to another.","Funded pension arrangements":"A pension scheme in which expected future benefits are funded in advance and as entitlement accrues.","Gold and foreign exchange reserves":"Reserves held by the Reserve Bank to meet foreign exchange obligations and to maintain liquidity in the presence of external shocks.","Government debt":"The total amount of money owed by the government as a consequence of its past borrowing.","Government guarantee":"An assurance made by government to a lender that a financial obligation will be honoured, even if the borrowing government institution is unable to repay the debt. See contingent liability.","Green paper":"A policy document intended for public discussion.","Gross borrowing requirement":"The sum of the main budget balance, extraordinary receipts and payments (referred to as National Revenue Fund receipts and payments), and maturing debt. The amount is funded through domestic short- and long- term loans, foreign loans and changes in cash balances.","Gross domestic product (GDP)":"A measure of the total national output, income and expenditure in the economy. GDP per head is the simplest overall measure of welfare, although it does not take account of the distribution of income, nor of goods and services that are produced outside the market economy, such as work within the household.","Gross domestic product inflation":"A measure of the total increase in prices in the whole economy. Unlike CPI inflation, GDP inflation includes price increases in goods that are exported and intermediate goods such as machines, but excludes imported goods.","Gross fixed-capital formation":"The addition to a country’s fixed-capital stock during a specific period, before provision for depreciation.","Gross value added":"The value of output less intermediate consumption. It is also a measure of the contribution to the economy made by an industry or sector.","Group of Twenty (G20)":"An international forum made up of finance ministers and central bank governors from 20 of the world’s largest economies.","Hedging":"An action taken by a buyer or seller to protect income against changes in prices, interest rates or exchange rates.","Horizontal equity":"A principle in taxation that holds that similarly situated taxpayers should face a similar tax treatment or tax burden. In other words, taxpayers with the same amount of income or capital should be accorded equal treatment.","Impaired advances":"Loans or advances that may not be collected in full.","Impairment":"A reduction in the recorded value of a long-lived asset arising from circumstances that prevent the asset from generating the future economic benefits previously expected and recorded.","Import parity pricing":"When a firm sells goods locally at the price customers would pay if they were to import the same goods from another country.","Inclusion rate":"The portion of the net capital gain derived from the disposal of an asset that will be taxed at the applicable rate.","Industrial development zone":"Designated sites linked to an international air or sea port, supported by incentives to encourage investment in export-orientated manufacturing and job creation.","Inflation":"An increase in the overall price level of goods and services in an economy over a specific period of time.","Inflation targeting":"A monetary policy framework intended to achieve price stability over a certain period of time.","Inter-state debt":"Money that different organs of state owe to each other.","Intergenerational equity":"A value based on ensuring that future generations do not have to repay debts taken on today, unless they also share in the benefits of assets.","Intermediate goods":"Goods produced to be used as inputs in the production of final goods.","Inventories":"Stocks of goods held by firms. An increase in inventories reflects an excess of output relative to spending over a period of time.","Labour intensity":"The relative amount of labour used to produce a unit of output.","Liquidity":"The ease with which assets can be bought and sold.","Liquidity requirements":"The amount of liquid or freely convertible assets that banks are required to hold relative to their liabilities for prudential and regulatory purposes.","Liquidity risk":"The risk that an asset might not easily and quickly be converted into cash through sale, or the risk to a debtor that it cannot meet its current debt obligations.","Lump-sum benefit":"A one-time payment for the total or partial value of an asset, usually received in place of recurring smaller payments.","M3":"The broadest definition of money supply in South Africa, including notes and coins, demand and fixed deposits, and credit.","Macroeconomics":"The branch of economics that deals with the whole economy – including issues such as growth, inflation, unemployment and the balance of payments.","Macroprudential regulation":"Rules that protect the stability of the financial sector and guard against systemic risk.","Marginal income tax rate":"The rate of tax on an incremental unit of income.","Marginal lending rate":"A penalty rate of interest charged by the Reserve Bank for lending to financial institutions in the money market in excess of the daily liquidity provided to the money market at the repurchase rate. See also repurchase agreements.","Marketable securities":"Tradable financial securities listed with a securities exchange.","Means test":"A method for determining whether someone qualifies for state assistance.","Medium Term Expenditure Committee (MTEC)":"The technical committee responsible for evaluating the medium-term expenditure framework budget submissions of national departments and making recommendations to the Minister of Finance regarding allocations to national departments.","Medium-term expenditure framework (MTEF)":"The three-year spending plans of national and provincial governments, published at the time of the Budget.","Microeconomics":"The branch of economics that deals with the behaviour of individual firms, consumers and sectors.","Ministers’ Committee on the Budget":"The political committee that considers key policy and budgetary issues that pertain to the budget process before they are tabled in Cabinet.","Monetary easing":"See quantitative easing.","Monetary policy":"Policy concerning total money supply, exchange rates and the general level of interest rates.","Money supply":"The total stock of money in an economy.","National Development Plan":"A planning framework prepared by the National Planning Commission that aims to eliminate poverty and reduce inequality by 2030.","National Revenue Fund":"The consolidated account of the national government into which all taxes, fees and charges collected by SARS and departmental revenue must be paid.","National budget":"The projected revenue and expenditures that flow through the National Revenue Fund. It does not include spending by provinces or local government from their own revenues.","Negotiable certificate of deposit":"Short-term deposit instruments issued by banks, at a variable interest rate, for a fixed period.","Net borrowing requirement":"The main budget balance.","Net exports":"Exports less imports.","Net open foreign currency position":"Gold and foreign exchange reserves minus the oversold forward book. The figure is expressed in dollars.","Net trade":"The difference between the value of exports and the value of imports.","New Development Bank":"A multilateral lending institution being established by Brazil, Russia, India, China and South Africa.","Nominal exchange rates":"The current rate of exchange between the rand and foreign currencies. The “effective” exchange rate is a trade-weighted average of the rates of exchange with other currencies.","Nominal wage":"The return, or wage, to employees at the current price level.","Non-competitive bid auction":"An auction in which an investor agrees to purchase a certain number of securities such as bonds at the average price of all competitive bids over a given period of time.","Non-financial public enterprises":"Government-owned or controlled organisations that deliver goods and non- financial services, trading as business enterprises, such as Eskom or Transnet.","Non-interest expenditure":"Total expenditure by government less debt-service costs.","Non-tax revenue":"Income received by government as a result of administrative charges, licences, fees, sales of goods and services, and so on.","Occupation-specific salary dispensation":"Revised salary structures unique to identified occupations in the public service, including doctors, nurses and teachers.","Opportunity cost":"The value of that which must be given up to achieve or acquire something. It is represented by the next highest valued alternative use of a resource.","Organisation for Economic Cooperation and Development (OECD)":"An organisation of 35 mainly industrialised member countries. South Africa is not a member.","PAYE":"The pay-as-you-earn (PAYE) system of income tax withholding requires employers to deduct income tax, and in some cases, the employees’ portion of social benefit taxes, from each paycheque delivered to employees.","Payroll tax":"Tax an employer withholds and/or pays on behalf of employees based on employee wages or salaries.","Permanent establishment":"A fixed place of business from which a company operates. When two countries have a tax treaty, the concept of “permanent establishment” is used to determine the right of one state to tax the profits of the business in the other state. See also anti-fragmentation.","Policy reserve":"Additional money in the fiscus to fund new and crucial priorities.","Portfolio investment":"Investment in financial assets such as stocks and bonds.","Potential growth":"The fastest growth an economy can sustain without increasing inflation.","Presidential Infrastructure Coordinating Commission (PICC)":"A commission established by Cabinet to develop, review and coordinate a 20-year infrastructure plan.","Price discovery":"The process of determining the price level of a commodity or asset, based on supply and demand factors.","Price sensitivity":"The extent to which changes in price affect consumer purchasing behaviour.","Primary deficit/surplus":"The difference between total revenue and non-interest expenditure. When revenue exceeds non-interest expenditure there is a surplus.","Primary sector":"The agricultural and mining sectors of the economy.","Principal purpose test":"A test where the benefits of a tax treaty are denied if it is reasonable to conclude that obtaining the benefit was one of the principal purposes behind the arrangement or transaction.","Private-sector credit extension":"Credit provided to the private sector. This includes all loans, credit cards and leases.","Privatisation":"The full or partial sale of state-owned enterprises to private individuals or companies.","Producer price index (PPI)":"Price increases measured by the producer price index – a measure of the prices paid based mainly on producers’ published price lists.","Productivity":"A measure of the amount of output generated from every unit of input. Typically used to measure changes in labour efficiency.","Profit shifting":"The allocation of income and expenses between related corporations or branches of the same legal entity to reduce overall tax liability.","Public Finance Management Act (PFMA)":"The act regulating financial management of national and provincial government, including the efficiency and effectiveness of public expenditure and the responsibilities of those engaging with government financial management.","Public Investment Corporation (PIC)":"A government-owned investment management company that invests funds on behalf of public-sector entities. Its largest client is the Government Employees Pension Fund.","Public entities":"Companies, agencies, funds and accounts that are fully or partly owned by government or public authorities and are regulated by law.","Public goods":"Goods and services that would not be fully provided in a pure free-market system and are largely provided by government.","Public sector":"National government, provincial government, local government, extra- budgetary governmental institutions, social security funds and non- financial public enterprises.","Public-benefit organisations (PBOs)":"Organisations that are mainly funded by donations from the public and other institutions, which engage in social activities to meet the needs of the general public.","Public-private partnerships (PPPs)":"A contractual arrangement whereby a private party performs a government function and assumes the associated risks. In return, the private party receives a fee according to predefined performance criteria. See unitary payment.","Public-sector borrowing requirement":"The consolidated cash borrowing requirement of general government and non-financial public enterprises.","Purchasing managers’ index (PMI)":"A composite index measuring the change in manufacturing activity compared with the previous month. An index value of 50 indicates no change in activity, a value above 50 indicates increased activity and a value below 50 indicates decreased activity.","Quantitative easing":"A measure used by central banks to stimulate economic growth when interest rates are near zero by increasing money supply. Also called monetary easing.","Quarterly Employment Survey":"An establishment-based survey conducted by Statistics South Africa to obtain information about the number of employees and gross salaries paid.","Quarterly Labour Force Survey":"A household-based survey conducted by Statistics South Africa to measure the dynamics of the labour market, producing indicators such as employment, unemployment and inactivity.","Rating agency":"A company that evaluates the ability of countries or other borrowers to honour their debt obligations. Credit ratings are used by international investors as indications of sovereign risk. See also credit rating.","Real effective exchange rate":"A measure of the rate of exchange of the rand relative to a trade-weighted average of South Africa’s trading partners’ currencies, adjusted for price trends in South Africa and the countries included.","Real exchange rate":"The level of the exchange rate taking account of inflation differences.","Real expenditure":"Expenditure measured in constant prices after taking account of inflation.","Real interest rate":"The level of interest after taking account of inflation.","Real wage":"The return, or wage, to employees, measured at a constant price level.","Recapitalisation":"Injection of funds into a company or entity to aid liquidity, either as a loan or in return for equity.","Recession":"A period in which national output and income decline. A recession is usually defined as two consecutive quarters of negative growth.","Redemption":"The return of an investor’s principal in a fixed-income security, such as a preferred stock or bond.","Refinancing":"The repayment of debt at a scheduled time with the proceeds of new loans.","Refinancing risk":"The risk that government will not be able to raise money to repay debt at any scheduled point, or that it will have to do so at a high cost.","Regional integration":"An economic policy intended to boost economic activity in a geographical area extending beyond one country.","Remuneration":"The costs of personnel, including salaries, housing allowances, car allowances and other benefits received by personnel.","Repurchase (repo) rate":"The rate at which the Reserve Bank lends to commercial banks.","Repurchase agreements":"Short-term contracts between the Reserve Bank and private banks in the money market to sell specified amounts of money at an interest rate determined by daily auction.","Reserves (foreign exchange)":"Holdings of foreign exchange, either by the Reserve Bank only or by the Reserve Bank and domestic banking institutions.","Residence-based income tax system":"A tax system in which the worldwide income accruing to a resident of a country is subject to the taxes of that country.","Reticulation scheme":"A piped water network that ensures that water is collected and treated before it reaches the consumer.","Revaluation gain/loss":"The difference between the value of a foreign currency deposit from the original (historical) rate to execution of a trade based on the spot rate.","Risk premium":"A return that compensates for uncertainty.","Saving":"The difference between income and spending.","Seasonally adjusted":"Removal of seasonal volatility (monthly or quarterly) from a time series. This provides a measure of the underlying trend in the data.","Secondary rebate":"A rebate from income tax, in addition to the primary rebate, that is available to taxpayers aged 65 years and older.","Secondary sector":"The part of the economy concerned with the manufacture of goods.","Secondary tax on companies (STC)":"Tax on dividends declared by a company, calculated at the rate of 10 per cent of the net amount of dividends declared. This was discontinued in 2012 and replaced with a 15 per cent dividend withholding tax.","Section 21 company":"Non-profit entities registered in terms of Section 21 of the Companies Act.","Sector education and training authorities":"Institutions funded through employer training levies, responsible for learnership programmes and implementing strategic sector skills plans.","Secured debt instruments":"Debt backed or secured by collateral to reduce the risk of lending.","Securitisation":"The pooling of assets into a financial instrument to sell to different types of investors.","Service and transfer payments":"Services involve transactions of non-tangible commodities, while transfers are unrequited transactions that do not generate a counter-economic value (for example, gifts and grants).","Skills development levy":"A payroll tax designed to finance training initiatives in terms of the skills development strategy.","Social infrastructure":"Infrastructure that supports social services.","Social wage":"Social benefits available to all individuals, funded wholly or partly by the state.","Source-based income tax system":"A system in which income is taxed in the country where the income originates.","Southern African Customs Union (SACU) agreement":"An agreement between South Africa, Botswana, Namibia, Lesotho and Swaziland that allows for the unrestricted flow of goods and services, and the sharing of customs and excise revenue.","Southern African Development Community (SADC)":"A regional intergovernmental organisation that promotes collaboration, economic integration and technical cooperation throughout southern Africa.","Sovereign debt":"Debt issued by a government.","Sovereign debt rating":"An assessment of the likelihood that a government will default on its debt obligations.","Spatial planning":"Planning to influence the geographic distribution of people and economic activity.","Special economic zones":"A designated zone where business and trade laws incentivise trade, investment and employment.","Specific excise duty":"A tax on each unit of output or sale of a good, unrelated to the value of a good.","Standing appropriations":"Government’s expenditure obligations that do not require a vote or statutory provision, including contractual guarantee commitments and international agreements.","Statutory appropriations":"Amounts appropriated to be spent in terms of statutes and not requiring appropriation by vote.","Sterilisation":"Action taken by the Reserve Bank to neutralise excess cash created in the money market when purchasing foreign currency.","Structural budget balance":"A representation of what government revenue and expenditure would be if output were at its potential level, with cyclical variations stripped out.","Structural constraints":"Imbalances in the structure of the economy that hinder growth and development.","Switch auction":"An auction to exchange bonds to manage refinancing risk or improve tradability.","Syndicated loan":"A large loan in which a group of banks work together to provide funds, which they solicit from their clients for the borrower.","Tax amnesty":"A period allowed by tax authorities during which taxpayers who are outside the tax net, but should be registered for tax purposes, can register for tax without incurring penalties.","Tax avoidance":"When individuals or businesses legitimately use provisions in the tax law to reduce their tax liability.","Tax base":"The aggregate value of income, sales or transactions on which particular taxes are levied.","Tax buoyancy":"Describes the relationship between total tax revenue collections and economic growth. This measure includes the effects of policy changes on revenue. A value above one means that revenues are growing faster than the economy and below one means they are growing below the rate of GDP growth.","Tax evasion":"When individuals or businesses illegally reduce their tax liability.","Tax expenditure":"Government revenue forgone due to provisions that allow deductions, exclusions, or exemptions from taxable income. The revenue can also be foregone through the deferral of tax liability or preferential tax rates.","Tax gap":"A measure of tax evasion that emerges from comparing the tax liability or tax base declared to the tax authorities with the tax liability or tax base calculated from other sources.","Tax incentives":"Specific provisions in the tax code that provide favourable tax treatment to individuals and businesses to encourage specific behaviour or activities.","Tax incidence":"The final distribution of the burden of tax. Statutory incidence defines where the law requires a tax to be levied. Economic incidence refers to those who experience a decrease in real income as a result of the imposition of a tax.","Tax loopholes":"Unintended weaknesses in the legal provisions of the tax system used by taxpayers to avoid paying tax liability.","Tax morality":"The willingness, or motivation, of citizens to pay tax. This is separate to the statutory obligation to pay taxes, but may have an influence on tax compliance.","Tax-to-GDP ratio":"For public finance comparison purposes, a country’s tax burden, or tax-to- GDP ratio, is calculated by taking the total tax payments for a particular fiscal year as a fraction or percentage of the GDP for that year.","Term-to-maturity":"The time between issuance and expiry.","Terms of trade":"An index measuring the ratio of a country’s export prices relative to its import prices.","Tertiary sector":"The part of the economy concerned with the provision of services.","Total factor productivity":"An index used to measure the efficiency of all inputs that contribute to the production process.","Trade balance":"The monetary record of a country’s net imports and exports of physical merchandise. See also current account.","Trade regime":"The system of tariffs, quotas and quantitative restrictions applied to protect domestic industries, together with subsidies and incentives used to promote international trade.","Trade-weighted rand":"The value of the rand pegged to or expressed relative to a market basket of selected foreign currencies.","Trademark":"A legal right pointing distinctly to the origin or ownership of merchandise to which it is applied and legally reserved for the exclusive use of the owner as maker or seller.","Treasury bills":"Short-term government debt instruments that yield no interest but are issued at a discount. Maturities vary from one day to 12 months.","Treasury committee":"The Cabinet committee that evaluates all requests for additional funds for unavoidable and unforeseen expenditure during a financial year.","Treaty shopping":"When related companies in different countries establish a third entity in another location to take advantage of a favourable tax arrangement.","Trend GDP growth":"The theoretical level of GDP growth determined by the full utilisation of all factors of production (land, labour and capital). Growth above the trend rate results in macroeconomic imbalances such as rising inflation or a weakening of the current account. Increases in trend GDP growth are achieved through capital formation, growth in employment and/or technological development.","Unallocated reserves":"Potential expenditure provision not allocated to a particular use. It mainly consists of the contingency reserve and amounts of money left unallocated by provinces.","Unemployment (broad definition)":"All those of working age who are unemployed, including those actively seeking employment and discouraged work seekers.","Unemployment (official definition)":"Those of working age, who are unemployed and actively seeking work (excludes discouraged work seekers).","Unit labour cost":"The cost of labour per unit of output, calculated by dividing average wages by productivity (output per worker per hour).","Unitary payment":"The payment made to the private party for meeting its obligations in the project deliverables in a public-private partnership.","Unqualified audit":"An assessment by a registered auditing firm or the Auditor-General of South Africa asserting that the financial statements of a department, entity or company are free of material misstatement.","Unsecured debt instruments":"Debt not backed or secured by collateral to reduce the risk of lending.","Unsecured lending":"A loan that is not backed or secured by any type of collateral to reduce the lender’s risk.","Vertical equity":"A doctrine in taxation that holds that differently situated taxpayers should be treated differently in terms of income tax provisions. In other words, taxpayers with more income and/or capital should pay more tax.","Vested right":"The right to ownership of an asset that cannot be arbitrarily taken away by a third party.","Virement":"The transfer of resources from one programme to another within the same department during a financial year.","Vote":"An appropriation voted by Parliament.","Water trading account":"A departmental account that ring-fences revenue from the sale of bulk water and related services to secure funding to manage the sustainability of water resources and infrastructure.","Weighted average cost of capital":"The average rate of return an organisation expects to pay to investors in its securities, such as bonds, debt and shares. Each category of security is accorded a proportionate weight in the calculation.","White paper":"A policy document used to present government policy preferences.","Withholding tax":"Tax on income deducted at source. Withholding taxes are widely used for dividends, interest and royalties.","Yield":"A financial return or interest paid to buyers of government bonds. The yield/rate of return on bonds takes into account the total annual interest payments, the purchase price, the redemption value and the amount of time remaining until maturity.","Yield curve":"A graph showing the relationship between the yield on bonds of the same credit quality but different maturity at a given point in time."}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tooltip;

var _preact = __webpack_require__(0);

var _Box = __webpack_require__(74);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _calcMaxValue = __webpack_require__(88);

var _calcMaxValue2 = _interopRequireDefault(_calcMaxValue);

var _BreakpointListener = __webpack_require__(89);

var _BreakpointListener2 = _interopRequireDefault(_BreakpointListener);

var _GraphMarkup = __webpack_require__(90);

var _GraphMarkup2 = _interopRequireDefault(_GraphMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphContainer = function (_Component) {
  _inherits(GraphContainer, _Component);

  function GraphContainer(props) {
    _classCallCheck(this, GraphContainer);

    var _this = _possibleConstructorReturn(this, (GraphContainer.__proto__ || Object.getPrototypeOf(GraphContainer)).call(this, props));

    _this.state = {
      fontSize: 14,
      popupFontSize: 14,
      barWidth: 12,
      lineGutter: 4,
      valueSpace: null,
      groupMargin: 40,
      maxValue: (0, _calcMaxValue2.default)(_this.props.items),
      popupWidth: 90,
      popupHeight: 30,
      popUpOffset: 6,
      popupCentre: 5,
      labelBreakpoints: 4,
      padding: [0, 80, 60, 0],
      buffer: 20,
      charWrap: 10,
      charLineHeight: 20,
      titleSpace: 40,
      showGuides: true
    };

    var breakpointsConfig = {
      490: function _() {
        return _this.setState({
          valueSpace: 200,
          padding: [0, 110, 80, 10],
          lineGutter: 25,
          popupHeight: 25,
          popupCentre: 5,
          barWidth: 15,
          groupMargin: 50,
          charWrap: 30,
          charLineHeight: 20,
          titleSpace: 25,
          buffer: 5,
          labelBreakpoints: 2,
          showGuides: false
        });
      },
      550: function _() {
        return _this.setState({
          valueSpace: 300,
          padding: [0, 110, 80, 0],
          lineGutter: 25,
          popupHeight: 25,
          popupCentre: 5,
          barWidth: 15,
          groupMargin: 50,
          charWrap: 50,
          charLineHeight: 20,
          titleSpace: 25,
          buffer: 10,
          labelBreakpoints: 3,
          showGuides: false
        });
      },
      700: function _() {
        return _this.setState({
          buffer: 20,
          valueSpace: 400,
          padding: [0, 110, 80, 0],
          lineGutter: 15,
          popupHeight: 25,
          popupCentre: 5,
          barWidth: 15,
          groupMargin: 60,
          charWrap: 50,
          charLineHeight: 20,
          titleSpace: 0,
          labelBreakpoints: 4,
          showGuides: false
        });
      },
      1080: function _() {
        return _this.setState({
          valueSpace: 500,
          padding: [0, 110, 60, 0],
          lineGutter: 8,
          popupHeight: 30,
          popupCentre: 5,
          barWidth: 12,
          groupMargin: 40,
          charWrap: 65,
          charLineHeight: 14,
          titleSpace: 0,
          labelBreakpoints: 4,
          showGuides: true
        });
      }
    };

    _this.breakpoints = new _BreakpointListener2.default(50, breakpointsConfig);
    _this.breakpoints.update();
    var breakpointsWrap = function breakpointsWrap() {
      return _this.breakpoints.updateDebounce();
    };

    window.addEventListener('resize', breakpointsWrap);
    return _this;
  }

  _createClass(GraphContainer, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_GraphMarkup2.default, {
        items: this.props.items,
        legend: this.props.legend,
        styling: this.state,
        year: this.props.year
      });
    }
  }]);

  return GraphContainer;
}(_preact.Component);

exports.default = GraphContainer;

/***/ }),
/* 32 */
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
        'font-size': fontSize
      },
      'R',
      (0, _trimValues2.default)(iterationValue * rank)
    )
  );
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(11);

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
/* 34 */
/***/ (function(module, exports) {

module.exports = {"apiBaseURL":"https://data.vulekamali.gov.za"}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = RevenueMarkup;

var _preact = __webpack_require__(0);

var _Item = __webpack_require__(169);

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icon = (0, _preact.h)(
  'svg',
  { className: 'Icon is-12', width: '0', height: '0', xmlns: 'http://www.w3.org/2000/svg', viewBox: '157 347 100 100' },
  (0, _preact.h)('path', { d: 'M250.5 402.4a2 2 0 0 0-1.9-1.3h-22.8v-52c0-1.2-1-2.1-2.1-2.1h-33.3a2 2 0 0 0-2.1 2v52.1h-23a2 2 0 0 0-1.4 3.6l41.6 41.7c.4.4.9.6 1.4.6.6 0 1.1-.2 1.5-.6l41.7-41.7a2 2 0 0 0 .4-2.3z' })
);

function RevenueMarkup(_ref) {
  var items = _ref.items,
      link = _ref.link,
      year = _ref.year,
      shortcuts = _ref.shortcuts;

  var keys = Object.keys(items);

  var linkMarkup = (0, _preact.h)(
    'div',
    { className: 'Revenue-linkWrap' },
    (0, _preact.h)(
      'a',
      { href: link, className: 'Revenue-link' },
      (0, _preact.h)(
        'span',
        { className: 'Revenue-icon' },
        icon
      ),
      (0, _preact.h)(
        'span',
        null,
        'Download Estimates of National Revenue (XLSX)'
      )
    )
  );

  return (0, _preact.h)(
    'div',
    { className: 'Revenue-box' },
    keys.map(function (key) {
      return (0, _preact.h)(_Item2.default, _extends({ title: key, value: items[key] }, { year: year, shortcuts: shortcuts }));
    }),
    link ? linkMarkup : null
  );
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(37);

__webpack_require__(38);

__webpack_require__(39);

__webpack_require__(40);

__webpack_require__(41);

__webpack_require__(42);

__webpack_require__(45);

__webpack_require__(46);

__webpack_require__(67);

__webpack_require__(77);

__webpack_require__(86);

__webpack_require__(114);

__webpack_require__(115);

__webpack_require__(121);

__webpack_require__(124);

__webpack_require__(134);

__webpack_require__(146);

__webpack_require__(150);

__webpack_require__(156);

__webpack_require__(165);

__webpack_require__(168);

__webpack_require__(171);

/***/ }),
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = __webpack_require__(16);

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadStringQueries() {
  window.budgetPortal = {
    stringQueries: _queryString2.default.parse(location.search) || {}
  };
}

exports.default = loadStringQueries();

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadGoogleAnalytics() {
  var _window$budgetPortal$ = window.budgetPortal.stringQueries,
      searchType = _window$budgetPortal$.search_type,
      searchString = _window$budgetPortal$.search_string;


  (0, _analyticsEvent2.default)('create', 'UA-93649482-8', 'auto');
  (0, _analyticsEvent2.default)('send', 'pageview');

  if (searchType && searchString) {
    (0, _analyticsEvent2.default)('send', 'event', 'search', searchType, searchString);
  }
}

exports.default = loadGoogleAnalytics();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = __webpack_require__(47);

var _array2 = _interopRequireDefault(_array);

var _promisePolyfill = __webpack_require__(62);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _arrayPrototype = __webpack_require__(65);

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function polyfillOldFeatures() {
  if (!window.Array.findIndex) {
    _arrayPrototype2.default.shim();
  }

  if (!window.Array.from) {
    window.Array.from = _array2.default;
  }

  if (!window.Promise) {
    window.Promise = _promisePolyfill2.default;
  }
}

exports.default = polyfillOldFeatures();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);

var implementation = __webpack_require__(18);
var getPolyfill = __webpack_require__(25);
var shim = __webpack_require__(61);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(49);
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = __webpack_require__(7);
var toPrimitive = __webpack_require__(53);

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';

var $isNaN = __webpack_require__(21);
var $isFinite = __webpack_require__(22);
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = __webpack_require__(56);
var sign = __webpack_require__(23);
var mod = __webpack_require__(24);
var isPrimitive = __webpack_require__(57);
var parseInteger = parseInt;
var bind = __webpack_require__(19);
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

var ES5 = __webpack_require__(58);

var hasRegExpMatcher = __webpack_require__(60);

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
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';

var isPrimitive = __webpack_require__(20);
var isCallable = __webpack_require__(8);
var isDate = __webpack_require__(54);
var isSymbol = __webpack_require__(55);

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
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var $isNaN = __webpack_require__(21);
var $isFinite = __webpack_require__(22);

var sign = __webpack_require__(23);
var mod = __webpack_require__(24);

var IsCallable = __webpack_require__(8);
var toPrimitive = __webpack_require__(59);

var has = __webpack_require__(7);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(20);

var isCallable = __webpack_require__(8);

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = __webpack_require__(7);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var getPolyfill = __webpack_require__(25);

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
/* 62 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63).setImmediate))

/***/ }),
/* 63 */
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
__webpack_require__(64);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 64 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26), __webpack_require__(1)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var ES = __webpack_require__(6);

var implementation = __webpack_require__(27);
var getPolyfill = __webpack_require__(28);
var shim = __webpack_require__(66);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(2);
var getPolyfill = __webpack_require__(28);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _camelcase = __webpack_require__(68);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _glossary = __webpack_require__(29);

var _glossary2 = _interopRequireDefault(_glossary);

var _createComponent = __webpack_require__(69);

var _createComponent2 = _interopRequireDefault(_createComponent);

var _escapeRegex = __webpack_require__(71);

var _escapeRegex2 = _interopRequireDefault(_escapeRegex);

var _walkTheDom = __webpack_require__(72);

var _walkTheDom2 = _interopRequireDefault(_walkTheDom);

var _findReactInstances = __webpack_require__(73);

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
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createComponent;

var _closeIcon = __webpack_require__(70);

var _closeIcon2 = _interopRequireDefault(_closeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createComponent(year, title, description, content) {
  return '<span class="Tooltip js-hook">\n    <div class="Tooltip-trigger js-trigger">\n      ' + content + '\n    </div>\n    <div class="Tooltip-boxWrap js-box">\n      <div class="Tooltip-modalCover js-modalCover"></div>\n      <div class="Tooltip-box">\n        <div class="Tooltip-content">\n          <div class="Tooltip-contentWrap">\n            <div class="Tooltip-shadowBox">\n              <div class="Tooltip-infoBox">\n                <div class="Tooltip-title">' + title + '</div>\n                <div class="Tooltip-text">' + description + '</div>\n              </div>\n              <div class="Tooltip-links">\n                <span class="Tooltip-linkWrap is-close js-closeTrigger">\n                  <span class="Tooltip-closeIcon">\n                    ' + _closeIcon2.default + '\n                  </span>\n                  <span class="Tooltip-link">\n                    Close\n                  </span>\n                </span>\n\n                <a class="Tooltip-linkWrap" href="/' + year + '/glossary">\n                  <div class="Tooltip-link">View glossary</div>\n                </a>\n              </div>\n              <div class="Tooltip-triangle"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </span>';
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '<svg version="1.2" width="10" height="10" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M58.3 50.4L96.7 12c2.4-2.4 2.4-6.2 0-8.6C94.3 1 90.5 1 88 3.4L49.8 41.8 11.3 3.4C9 1 5 1 2.7 3.4.3 5.8.3 9.6 2.7 12L41 50.4 2.8 88.8C.3 91.2.3 95 2.7 97.4 4 98.6 5.5 99.2 7 99.2c1.6 0 3-.6 4.3-1.8L49.7 59 88 97.4c1.3 1.2 3 1.8 4.4 1.8 1.6 0 3-.6 4.3-1.8 2.4-2.4 2.4-6.2 0-8.6L58.3 50.4zm0 0"></path></svg>';

/***/ }),
/* 71 */
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walkTheDom;
function walkTheDom(node, func, year, source, regExpression) {
  var children = node.childNodes;

  for (var i = 0; i < children.length; i++) {
    var childNode = children[i];

    if (childNode.tagName !== 'A') {
      walkTheDom(childNode, func, year, source, regExpression);
    }
  }

  func(node, year, source, regExpression);
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findReactInstances;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(30);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Box;

var _preact = __webpack_require__(0);

var _Links = __webpack_require__(75);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Links;

var _preact = __webpack_require__(0);

var _CloseIcon = __webpack_require__(76);

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
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _ShareContainer = __webpack_require__(78);

var _ShareContainer2 = _interopRequireDefault(_ShareContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Share() {
  var nodes = document.getElementsByClassName('Share');
  var nodesArray = [].concat(_toConsumableArray(nodes));

  if (nodesArray.length > 0) {
    nodesArray.forEach(function (node) {
      (0, _preact.render)((0, _preact.h)(_ShareContainer2.default, null), node);
    });
  }
}

exports.default = Share();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _ShareMarkup = __webpack_require__(79);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShareMarkup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

var _Button = __webpack_require__(80);

var _Button2 = _interopRequireDefault(_Button);

var _index3 = __webpack_require__(82);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hardCoded = [{
  value: 'copy',
  title: 'as Link'
}, {
  value: 'facebook',
  title: 'on Facebook'
}, {
  value: 'twitter',
  title: 'on Twitter'
}];

function ShareMarkup(_ref) {
  var selected = _ref.selected,
      updateShare = _ref.updateShare,
      modal = _ref.modal,
      shareOpen = _ref.shareOpen,
      updateModal = _ref.updateModal;

  var closeModal = function closeModal() {
    return updateModal(false);
  };
  var descriptionMarkup = (0, _preact.h)(
    'a',
    { className: 'u-wordBreak u-wordBreak--breakAll', href: window.location.href },
    window.location.href
  );

  return (0, _preact.h)(
    'div',
    { className: 'Share-wrap' },
    (0, _preact.h)(
      _index4.default,
      {
        title: 'Share this link:',
        description: descriptionMarkup,
        open: modal,
        block: true,
        forceWrap: true,
        openAction: null,
        closeAction: closeModal
      },
      (0, _preact.h)(
        'div',
        { className: 'Share-title' },
        'Share page'
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
            property: selected,
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
    )
  );
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _preact = __webpack_require__(0);

var _Icon = __webpack_require__(81);

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
/* 81 */
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _preact = __webpack_require__(0);

var _Box = __webpack_require__(83);

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Modal(_ref) {
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
    { className: 'Modal' + (block ? ' is-block' : '') },
    (0, _preact.h)(
      'div',
      { className: 'Modal-trigger', onClick: openAction },
      children
    ),
    (0, _preact.h)(
      'div',
      { className: 'Modal-boxWrap' + (open ? ' is-open' : '') },
      (0, _preact.h)('div', { className: 'Modal-modalCover', onClick: closeAction }),
      (0, _preact.h)(_Box2.default, { title: title, description: description, actions: actions, down: down, closeAction: closeAction })
    )
  );
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Box;

var _preact = __webpack_require__(0);

var _Links = __webpack_require__(84);

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
    { className: 'Modal-box' },
    (0, _preact.h)(
      'div',
      { className: 'Modal-content' + (down ? ' is-down' : '') },
      (0, _preact.h)(
        'div',
        { className: 'Modal-shadowBox' },
        (0, _preact.h)(
          'div',
          { className: 'Modal-infoBox' },
          (0, _preact.h)(
            'div',
            { className: 'Modal-title' },
            title
          ),
          (0, _preact.h)(
            'div',
            { className: 'Modal-text' },
            description
          ),
          (0, _preact.h)(_Links2.default, { actions: actions, closeAction: closeAction })
        ),
        (0, _preact.h)('div', { className: 'Modal-triangle' + (down ? ' is-down' : '') })
      )
    )
  );
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Links;

var _preact = __webpack_require__(0);

var _CloseIcon = __webpack_require__(85);

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Links(_ref) {
  var _ref$actions = _ref.actions,
      actions = _ref$actions === undefined ? [] : _ref$actions,
      closeAction = _ref.closeAction;

  return (0, _preact.h)(
    'div',
    { className: 'Modal-links' },
    (0, _preact.h)(
      'span',
      { className: 'Modal-linkWrap is-close', onClick: closeAction },
      (0, _preact.h)(
        'span',
        { className: 'Modal-closeIcon' },
        (0, _preact.h)(_CloseIcon2.default, null)
      ),
      (0, _preact.h)(
        'span',
        { className: 'Modal-link' },
        'Close'
      )
    ),
    actions.map(function (_ref2) {
      var url = _ref2.url,
          title = _ref2.title;

      return (0, _preact.h)(
        'a',
        { className: 'Modal-linkWrap', href: url },
        (0, _preact.h)(
          'div',
          { className: 'Modal-link' },
          title
        )
      );
    })
  );
}

/***/ }),
/* 85 */
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _Toggle = __webpack_require__(87);

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var componentList = document.getElementsByClassName('Graph-data');

for (var i = 0; i < componentList.length; i++) {
  var component = componentList[i];

  var _JSON$parse = JSON.parse(component.getAttribute('data-graph')),
      data = _JSON$parse.data;

  var legendAttribute = component.getAttribute('data-config') || '{ "legend": [] }';

  var _JSON$parse2 = JSON.parse(legendAttribute),
      legend = _JSON$parse2.legend;

  var year = component.getAttribute('data-year');

  var items = data.reduce(function (result, val) {
    return _extends({}, result, _defineProperty({}, val.name, [JSON.parse(val.total_budget)]));
  }, {});

  (0, _preact.render)((0, _preact.h)(_Toggle2.default, { items: items, year: year, legend: legend }), component);
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Toggle;

var _preact = __webpack_require__(0);

var _GraphContainer = __webpack_require__(31);

var _GraphContainer2 = _interopRequireDefault(_GraphContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Toggle(_ref) {
  var items = _ref.items,
      year = _ref.year,
      legend = _ref.legend;


  var hasNull = Object.keys(items).reduce(function (result, key) {
    var array = items[key];

    if (array[0] === null) {
      return true;
    }

    return result;
  }, false);

  if (hasNull) {
    return (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(
        'ul',
        null,
        Object.keys(items).map(function (name) {
          return (0, _preact.h)(
            'li',
            null,
            name
          );
        })
      )
    );
  }

  return (0, _preact.h)(_GraphContainer2.default, { items: items, year: year, legend: legend });
}

/***/ }),
/* 88 */
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreakpointListener = function () {
  function BreakpointListener(debounce, breakpointFunctions) {
    _classCallCheck(this, BreakpointListener);

    this.debounce = debounce;
    this.resizeTimeout = null;
    this.currentViewport = null;
    this.breakpointFunctions = breakpointFunctions;
  }

  _createClass(BreakpointListener, [{
    key: "update",
    value: function update() {
      var viewport = window.innerWidth;
      var breakpoints = Object.keys(this.breakpointFunctions);

      var calcViewport = function calcViewport() {
        for (var i = 0; i < breakpoints.length; i++) {
          if (viewport < parseInt(breakpoints[i], 10)) {
            return breakpoints[i];
          }
        }

        return breakpoints[breakpoints.length - 1];
      };

      var calcViewportValue = calcViewport();
      if (calcViewportValue !== this.currentViewport) {
        this.currentViewport = calcViewportValue;
        return this.breakpointFunctions[calcViewportValue]();
      }

      return null;
    }
  }, {
    key: "updateDebounce",
    value: function updateDebounce() {
      var _this = this;

      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      var updateWrap = function updateWrap() {
        return _this.update();
      };
      this.resizeTimeout = setTimeout(updateWrap, this.debounce);
    }
  }]);

  return BreakpointListener;
}();

exports.default = BreakpointListener;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = GraphMarkup;

var _preact = __webpack_require__(0);

var _buildGroupSpaceArray = __webpack_require__(91);

var _buildGroupSpaceArray2 = _interopRequireDefault(_buildGroupSpaceArray);

var _VerticalBreakpointsList = __webpack_require__(92);

var _VerticalBreakpointsList2 = _interopRequireDefault(_VerticalBreakpointsList);

var _HorisontalBreakpointsList = __webpack_require__(93);

var _HorisontalBreakpointsList2 = _interopRequireDefault(_HorisontalBreakpointsList);

var _HorisontalLabelList = __webpack_require__(94);

var _HorisontalLabelList2 = _interopRequireDefault(_HorisontalLabelList);

var _Grid = __webpack_require__(96);

var _Grid2 = _interopRequireDefault(_Grid);

var _VerticalLineGroupList = __webpack_require__(97);

var _VerticalLineGroupList2 = _interopRequireDefault(_VerticalLineGroupList);

var _VerticalGuidesList = __webpack_require__(100);

var _VerticalGuidesList2 = _interopRequireDefault(_VerticalGuidesList);

var _VerticalTooltipsList = __webpack_require__(102);

var _VerticalTooltipsList2 = _interopRequireDefault(_VerticalTooltipsList);

var _HorisontalGuidesList = __webpack_require__(105);

var _HorisontalGuidesList2 = _interopRequireDefault(_HorisontalGuidesList);

var _HorisontalLineGroupList = __webpack_require__(107);

var _HorisontalLineGroupList2 = _interopRequireDefault(_HorisontalLineGroupList);

var _VerticalLabelList = __webpack_require__(109);

var _VerticalLabelList2 = _interopRequireDefault(_VerticalLabelList);

var _HorisontalTooltipsList = __webpack_require__(111);

var _HorisontalTooltipsList2 = _interopRequireDefault(_HorisontalTooltipsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GraphMarkup(_ref) {
  var items = _ref.items,
      styling = _ref.styling,
      legend = _ref.legend,
      year = _ref.year;
  var valueSpace = styling.valueSpace,
      padding = styling.padding,
      showGuides = styling.showGuides;

  var groupSpaceArray = (0, _buildGroupSpaceArray2.default)(items, styling);
  var totalGroupSpace = groupSpaceArray.reduce(function (result, val) {
    return result + val;
  }, 0);
  var height = padding[0] + totalGroupSpace + padding[2];
  var width = padding[3] + valueSpace + padding[1];

  // const columnChart = (
  //   <g>
  //     <VerticalBreakpointsList {...{ styling, totalGroupSpace }} />
  //     <VerticalGuidesList {...{ styling, totalGroupSpace }} />

  //     <HorisontalLabelList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
  //     <Grid {...{ styling, totalGroupSpace }} />
  //     <VerticalLineGroupList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
  //     <VerticalTooltipsList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
  //   </g>
  // );

  return (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
      'svg',
      _extends({
        version: '1.1',
        className: 'Graph-svg',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 ' + width + ' ' + height
      }, { width: width, height: height }, {
        style: { maxWidth: width }
      }),
      (0, _preact.h)(_HorisontalBreakpointsList2.default, { styling: styling, totalGroupSpace: totalGroupSpace }),
      showGuides ? (0, _preact.h)(_HorisontalGuidesList2.default, { styling: styling, totalGroupSpace: totalGroupSpace }) : null,
      (0, _preact.h)(_Grid2.default, { styling: styling, totalGroupSpace: totalGroupSpace }),
      (0, _preact.h)(_HorisontalLineGroupList2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling }),
      (0, _preact.h)(_HorisontalTooltipsList2.default, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, items: items, styling: styling })
    )
  );
}

/***/ }),
/* 91 */
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VerticalBreakpointsList;

var _preact = __webpack_require__(0);

var _HorisontalBreakpoint = __webpack_require__(32);

var _HorisontalBreakpoint2 = _interopRequireDefault(_HorisontalBreakpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalBreakpointsList(_ref) {
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
    (0, _preact.h)('rect', {
      x: padding[3] + buffer,
      y: padding[0] + totalGroupSpace + buffer,
      height: padding[2] - buffer,
      width: padding[3] + valueSpace - (padding[2] + buffer),
      fill: 'red',
      opacity: '0.5'
    }),
    breakpointArray.map(function (val, index) {
      return (0, _preact.h)(_HorisontalBreakpoint2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
    })
  );
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HorisontalBreakpointsList;

var _preact = __webpack_require__(0);

var _HorisontalBreakpoint = __webpack_require__(32);

var _HorisontalBreakpoint2 = _interopRequireDefault(_HorisontalBreakpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalBreakpointsList(_ref) {
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
      return (0, _preact.h)(_HorisontalBreakpoint2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
    })
  );
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HorisontalLabelList;

var _preact = __webpack_require__(0);

var _HorisontalLabel = __webpack_require__(95);

var _HorisontalLabel2 = _interopRequireDefault(_HorisontalLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalLabelList(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      items = _ref.items,
      styling = _ref.styling;

  var titles = Object.keys(items);
  // const { padding, buffer, valueSpace } = styling;

  return (0, _preact.h)(
    'g',
    { className: 'Graph-horisontalLabelList' },
    titles.map(function (title, index) {
      return (0, _preact.h)(_HorisontalLabel2.default, _extends({
        rank: index
      }, { title: title, totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HorisontalLabel;

var _preact = __webpack_require__(0);

function HorisontalLabel(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace,
      fontSize = styling.fontSize;


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
      {
        className: "Graph-label",
        x: padding[3] + buffer + previousSpace + generateToScale(groupSpace / 2),
        y: padding[0] + totalGroupSpace + buffer * 2 + fontSize,
        "font-size": fontSize
      },
      title
    )
  );
}

/***/ }),
/* 96 */
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
      y2: padding[0] + totalGroupSpace
    }),
    (0, _preact.h)("path", {
      className: "Graph-outline",
      d: "\n          M" + padding[3] + " " + (padding[0] + totalGroupSpace) + " \n          Q " + padding[3] + " " + (padding[0] + buffer + totalGroupSpace) + ", \n          " + (padding[3] + buffer) + " " + (padding[0] + buffer + totalGroupSpace) + "\n        "
    }),
    (0, _preact.h)("line", {
      className: "Graph-outline",
      x1: padding[3] + buffer,
      y1: padding[0] + totalGroupSpace + buffer,
      x2: padding[3] + valueSpace,
      y2: padding[0] + totalGroupSpace + buffer
    })
  );
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VerticalLineGroupList;

var _preact = __webpack_require__(0);

var _VerticalLineGroup = __webpack_require__(98);

var _VerticalLineGroup2 = _interopRequireDefault(_VerticalLineGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalLineGroupList(_ref) {
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
      return (0, _preact.h)(_VerticalLineGroup2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VerticalLineGroup;

var _preact = __webpack_require__(0);

var _path = __webpack_require__(99);

function VerticalLineGroup(_ref) {
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
      maxValue = styling.maxValue;


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
      var relativeAmount = amount / maxValue * totalGroupSpace;
      var displayAmount = relativeAmount < barWidth + 1 ? barWidth + 1 : relativeAmount;

      return (0, _preact.h)('line', {
        'stroke-linecap': 'round',
        'stroke-width': barWidth,
        x1: startPoint + centeringSpace + index * (barWidth + lineGutter),
        y1: padding[0] + totalGroupSpace - barWidth / 2,
        x2: startPoint + centeringSpace + index * (barWidth + lineGutter),
        y2: padding[0] + totalGroupSpace + barWidth - barWidth / 2 - displayAmount,
        className: 'Graph-line'
      });
    })
  );
}

/***/ }),
/* 99 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VerticalGuidesList;

var _preact = __webpack_require__(0);

var _VerticalGuide = __webpack_require__(101);

var _VerticalGuide2 = _interopRequireDefault(_VerticalGuide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalGuidesList(_ref) {
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
        return (0, _preact.h)(_VerticalGuide2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
      }

      return null;
    })
  );
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VerticalGuide;

var _preact = __webpack_require__(0);

function VerticalGuide(_ref) {
  var styling = _ref.styling,
      totalGroupSpace = _ref.totalGroupSpace,
      rank = _ref.rank;
  var valueSpace = styling.valueSpace,
      buffer = styling.buffer,
      fontSize = styling.fontSize,
      padding = styling.padding,
      labelBreakpoints = styling.labelBreakpoints;

  var iteration = totalGroupSpace / (labelBreakpoints - 1);

  // const debugIteration = totalGroupSpace / labelBreakpoints;

  return (0, _preact.h)(
    "g",
    null,
    (0, _preact.h)("line", {
      x1: padding[3],
      y1: padding[0] + iteration * rank,
      x2: padding[3] + valueSpace,
      y2: padding[0] + iteration * rank,
      className: "Graph-guide"
    })
  );
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VerticalTooltipsList;

var _preact = __webpack_require__(0);

var _VerticalTooltips = __webpack_require__(103);

var _VerticalTooltips2 = _interopRequireDefault(_VerticalTooltips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalTooltipsList(_ref) {
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
      return (0, _preact.h)(_VerticalTooltips2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VerticalTooltips;

var _preact = __webpack_require__(0);

var _VerticalTooltip = __webpack_require__(104);

var _VerticalTooltip2 = _interopRequireDefault(_VerticalTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalTooltips(_ref) {
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
      popupHeight = styling.popupHeight;


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
      var relativeAmount = amount / maxValue * totalGroupSpace;
      var displayAmount = relativeAmount < barWidth + 1 ? barWidth + 1 : relativeAmount;

      return (0, _preact.h)(_VerticalTooltip2.default, _extends({ styling: styling }, {
        xPosition: startPoint + centeringSpace + index * (barWidth + lineGutter),
        yPosition: padding[0] + totalGroupSpace + barWidth - (barWidth * 2 + displayAmount + popUpOffset + popupHeight)
      }, { amount: amount, totalGroupSpace: totalGroupSpace }));
    })
  );
}

/*

              y2={}

              */

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VerticalTooltip;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalTooltip(_ref) {
  var styling = _ref.styling,
      xTriggerPosition = _ref.xTriggerPosition,
      xPosition = _ref.xPosition,
      yPosition = _ref.yPosition,
      amount = _ref.amount,
      totalGroupSpace = _ref.totalGroupSpace;
  var barWidth = styling.barWidth,
      lineGutter = styling.lineGutter,
      padding = styling.padding,
      popupWidth = styling.popupWidth,
      popupHeight = styling.popupHeight,
      popupFontSize = styling.popupFontSize;

  // const { popUpOffset } = styling;

  return (0, _preact.h)(
    'g',
    { className: 'Graph-tooltip' },
    (0, _preact.h)('rect', {
      x: xPosition - (barWidth + lineGutter) / 2,
      x1: xTriggerPosition,
      y: 0,
      width: barWidth + lineGutter,
      height: totalGroupSpace + padding[0],
      opacity: '0'
    }),
    (0, _preact.h)('rect', {
      rx: '10',
      ry: '10',
      className: 'Graph-tooltipBase',
      x: xPosition - popupWidth / 2,
      y: yPosition,
      width: popupWidth,
      height: popupHeight
    }),
    (0, _preact.h)('polygon', {
      className: 'Graph-triangle',
      points: '\n          ' + xPosition + ',\n          ' + (yPosition + barWidth + popupHeight) + '\n\n          ' + (xPosition + barWidth / 2) + ',\n          ' + (yPosition + popupHeight) + '\n          \n          ' + (xPosition - barWidth / 2) + ',\n          ' + (yPosition + popupHeight) + '\n        '
    }),
    (0, _preact.h)(
      'text',
      {
        x: xPosition,
        y: yPosition + popupHeight / 2 + popupFontSize / 2,
        'font-size': popupFontSize,
        className: 'Graph-tooltipText'
      },
      (0, _trimValues2.default)(amount)
    )
  );
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HorisontalGuideList;

var _preact = __webpack_require__(0);

var _HorisontalGuide = __webpack_require__(106);

var _HorisontalGuide2 = _interopRequireDefault(_HorisontalGuide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalGuideList(_ref) {
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
        return (0, _preact.h)(_HorisontalGuide2.default, _extends({ rank: index }, { styling: styling, totalGroupSpace: totalGroupSpace }));
      }

      return null;
    })
  );
}

/***/ }),
/* 106 */
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
      className: "Graph-guide"
    })
  );
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HorisontalLineGroupList;

var _preact = __webpack_require__(0);

var _HorisontalLineGroup = __webpack_require__(108);

var _HorisontalLineGroup2 = _interopRequireDefault(_HorisontalLineGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalLineGroupList(_ref) {
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
      return (0, _preact.h)(_HorisontalLineGroup2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HorisontalLineGroup;

var _preact = __webpack_require__(0);

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalLineGroup(_ref) {
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
          x: padding[3] + buffer
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
        className: 'Graph-line'
      });
    })
  );
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VerticalLabelList;

var _preact = __webpack_require__(0);

var _VerticalLabel = __webpack_require__(110);

var _VerticalLabel2 = _interopRequireDefault(_VerticalLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalLabelList(_ref) {
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
    { className: 'Graph-horisontalLabelList' },
    (0, _preact.h)('rect', {
      x: '0',
      y: padding[0],
      width: padding[3] - buffer,
      height: totalGroupSpace,
      fill: 'red',
      opacity: '0.5'
    }),
    titles.map(function (title, index) {
      return (0, _preact.h)(_VerticalLabel2.default, _extends({
        rank: index
      }, { title: title, totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling }));
    })
  );
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VerticalLabel;

var _preact = __webpack_require__(0);

function VerticalLabel(_ref) {
  var totalGroupSpace = _ref.totalGroupSpace,
      groupSpaceArray = _ref.groupSpaceArray,
      rank = _ref.rank,
      title = _ref.title,
      styling = _ref.styling;
  var barWidth = styling.barWidth,
      padding = styling.padding,
      buffer = styling.buffer,
      valueSpace = styling.valueSpace;


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
    (0, _preact.h)("rect", {
      x: "0",
      y: padding[0] + previousSpace,
      width: padding[3] - buffer,
      height: generateToScale(groupSpace),
      fill: "none",
      stroke: "red",
      opacity: "1"
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HorisontalTooltipsList;

var _preact = __webpack_require__(0);

var _HorisontalTooltips = __webpack_require__(112);

var _HorisontalTooltips2 = _interopRequireDefault(_HorisontalTooltips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalTooltipsList(_ref) {
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
      return (0, _preact.h)(_HorisontalTooltips2.default, _extends({
        rank: index,
        lines: items[key],
        title: key
      }, { totalGroupSpace: totalGroupSpace, groupSpaceArray: groupSpaceArray, styling: styling, items: items }));
    })
  );
}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HorisontalTooltips;

var _preact = __webpack_require__(0);

var _HorisontalTooltip = __webpack_require__(113);

var _HorisontalTooltip2 = _interopRequireDefault(_HorisontalTooltip);

var _breakIntoWrap = __webpack_require__(9);

var _breakIntoWrap2 = _interopRequireDefault(_breakIntoWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalTooltips(_ref) {
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

      return (0, _preact.h)(_HorisontalTooltip2.default, _extends({ styling: styling }, {
        xPosition: padding[3] + buffer + displayAmount - barWidth / 2,
        yPosition: groupMargin / 2 + startPoint + index * (barWidth + lineGutter) + barWidth / 2 + charLineHeight * charArray.length
      }, { amount: amount, totalGroupSpace: totalGroupSpace }));
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
exports.default = HorisontalTooltip;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(10);

var _trimValues2 = _interopRequireDefault(_trimValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorisontalTooltip(_ref) {
  var styling = _ref.styling,
      xTriggerPosition = _ref.xTriggerPosition,
      xPosition = _ref.xPosition,
      yPosition = _ref.yPosition,
      amount = _ref.amount,
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
    { className: 'Graph-tooltip' },
    (0, _preact.h)('rect', {
      x: padding[3] + buffer,
      y: yPosition - (barWidth + lineGutter) / 2,
      width: valueSpace + padding[0] - buffer,
      height: barWidth + lineGutter,
      opacity: '0'
    }),
    (0, _preact.h)('polygon', {
      className: 'Graph-triangle',
      points: '\n          ' + (xPosition + popUpOffset) + ',\n          ' + yPosition + '\n\n          ' + (xPosition + barWidth / 2 + popUpOffset) + ',\n          ' + (yPosition - barWidth / 2) + '\n\n          ' + (xPosition + barWidth + popUpOffset) + ',\n          ' + (yPosition - barWidth / 2) + '\n\n          ' + (xPosition + barWidth + popUpOffset) + ',\n          ' + (yPosition + barWidth / 2) + '\n          \n          ' + (xPosition + barWidth / 2 + popUpOffset) + ',\n          ' + (yPosition + barWidth / 2) + '\n        '
    }),
    (0, _preact.h)('rect', {
      rx: '10',
      ry: '10',
      className: 'Graph-tooltipBase',
      x: xPosition + barWidth / 2 + popUpOffset,
      y: yPosition - popupHeight / 2,
      width: popupWidth,
      height: popupHeight
    }),
    (0, _preact.h)(
      'text',
      {
        x: xPosition + popupWidth / 2 + popUpOffset + barWidth / 2,
        y: yPosition + popupCentre,
        'font-size': popupFontSize,
        className: 'Graph-tooltipText'
      },
      (0, _trimValues2.default)(amount)
    )
  );
}

/***/ }),
/* 114 */
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FixedNodeBox = __webpack_require__(116);

var _FixedNodeBox2 = _interopRequireDefault(_FixedNodeBox);

var _HighlightLinks = __webpack_require__(117);

var _HighlightLinks2 = _interopRequireDefault(_HighlightLinks);

var _forceClose = __webpack_require__(120);

var _forceClose2 = _interopRequireDefault(_forceClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scripts() {
  var nodes = document.getElementsByClassName('SubLinks js-box');

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    if (node && node.classList.contains('js-isScrollable')) {
      (function () {
        var fixedListener = new _FixedNodeBox2.default(node);
        var fixedWrapper = function fixedWrapper() {
          return fixedListener.updateStateDebounce();
        };
        window.addEventListener('scroll', fixedWrapper);

        var linksList = node.getElementsByClassName('js-link');
        var highlightListener = new _HighlightLinks2.default(linksList);
        var highlightWrapper = function highlightWrapper() {
          return highlightListener.updateStateDebounce();
        };
        window.addEventListener('scroll', highlightWrapper);

        (0, _forceClose2.default)(linksList);
      })();
    }
  }
}

exports.default = scripts();

/***/ }),
/* 116 */
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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buildLinksObject = __webpack_require__(118);

var _buildLinksObject2 = _interopRequireDefault(_buildLinksObject);

var _calcViewportPosition = __webpack_require__(119);

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
/* 118 */
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
/* 119 */
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
/* 120 */
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

      if (link.classList.contains('js-forceClose')) {
        link.addEventListener('click', closeAllMenus);
      }
    }
  }
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _YearSelectContainer = __webpack_require__(122);

var _YearSelectContainer2 = _interopRequireDefault(_YearSelectContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function YearSelect() {
  var nodes = document.getElementsByClassName('YearSelect');
  var nodesArray = [].concat(_toConsumableArray(nodes));
  var _window$budgetPortal$ = window.budgetPortal.stringQueries,
      search = _window$budgetPortal$.search,
      noJs = _window$budgetPortal$.no_js;


  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach(function (node, i) {
      var jsonData = JSON.parse(nodes[i].getAttribute('data-json')).data;
      var jsonDynamicRaw = JSON.parse(nodes[i].getAttribute('data-dynamic'));
      var jsonDynamic = jsonDynamicRaw ? jsonDynamicRaw.data : null;

      (0, _preact.render)((0, _preact.h)(_YearSelectContainer2.default, { jsonData: jsonData, search: search, jsonDynamic: jsonDynamic }), nodes[i].parentNode, nodes[i]);
    });
  }
}

exports.default = YearSelect();

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _YearSelectMarkup = __webpack_require__(123);

var _YearSelectMarkup2 = _interopRequireDefault(_YearSelectMarkup);

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
      tooltip: null
    };

    _this.updateItem = _this.updateItem.bind(_this);
    _this.data = _this.normaliseData();
    return _this;
  }

  _createClass(YearSelectContainer, [{
    key: 'normaliseData',
    value: function normaliseData() {
      if (!this.props.jsonDynamic) {
        return this.props.jsonData.reduce(function (result, val) {
          return [].concat(_toConsumableArray(result), [{
            direct: true,
            url: val[1],
            name: val[0],
            active: val[2] === 'active'
          }]);
        }, []);
      }

      return this.props.jsonDynamic.reduce(function (result, val) {
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
    key: 'render',
    value: function render() {
      return (0, _preact.h)(_YearSelectMarkup2.default, {
        jsonData: this.data,
        search: this.props.search,
        loading: this.state.loading,
        open: this.state.open,
        updateItem: this.updateItem,
        tooltip: this.state.tooltip
      });
    }
  }]);

  return YearSelectContainer;
}(_preact.Component);

exports.default = YearSelectContainer;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = YearSelectMarkup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(30);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function YearSelectMarkup(_ref) {
  var jsonData = _ref.jsonData,
      tooltip = _ref.tooltip,
      open = _ref.open,
      updateItem = _ref.updateItem,
      search = _ref.search,
      loading = _ref.loading,
      year = _ref.year;

  var items = jsonData.map(function (data) {
    var Tag = data.active || data.direct === false ? 'span' : 'a';
    var toggleOpen = function toggleOpen() {
      return updateItem('open', !open);
    };
    var linkWithQuery = search ? data.url + '?search=' + search : data.url;

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
            { href: data.active || data.direct === false ? null : linkWithQuery, className: 'YearSelect-link' },
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
        { href: data.active || data.direct === false ? null : linkWithQuery, className: 'YearSelect-link' },
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

  return (0, _preact.h)(
    'div',
    { className: 'YearSelect' },
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
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _queryString = __webpack_require__(16);

var _queryString2 = _interopRequireDefault(_queryString);

var _SearchContainer = __webpack_require__(125);

var _SearchContainer2 = _interopRequireDefault(_SearchContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Search() {
  // Find all instances of a specific UI component on a page by parent class name.
  var componentsList = document.getElementsByClassName('Search');

  // Destructure needed query strings from URL

  var _ref = _queryString2.default.parse(location.search) || {},
      searchParam = _ref.search,
      noJs = _ref.no_js;

  if (componentsList.length > 0 && !noJs) {
    for (var i = 0; i < componentsList.length; i++) {
      // Find DOM node that will house the Preact app and get associated data attributes that are passed via HTML
      var component = componentsList[i];
      var requestOverride = component.getAttribute('data-request-override');
      var selectedYear = component.getAttribute('data-year');

      // Initialise Search Preact App
      (0, _preact.render)((0, _preact.h)(_SearchContainer2.default, { requestOverride: requestOverride, selectedYear: selectedYear, searchParam: searchParam }), component.parentNode, component);
    }
  }
}

exports.default = Search();

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SearchMarkup = __webpack_require__(129);

var _SearchMarkup2 = _interopRequireDefault(_SearchMarkup);

var _analyticsEvent = __webpack_require__(5);

var _analyticsEvent2 = _interopRequireDefault(_analyticsEvent);

var _global = __webpack_require__(34);

var _removePunctuation = __webpack_require__(14);

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
      return (0, _preact.h)(_SearchMarkup2.default, {
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

exports.default = SearchContainer;


SearchContainer.propTypes = {
  searchParam: _propTypes2.default.string,
  selectedYear: _propTypes2.default.string.isRequired,
  requestOverride: _propTypes2.default.string
};

SearchContainer.defaultProps = {
  searchParam: '',
  requestOverride: null
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(11);
var invariant = __webpack_require__(12);
var warning = __webpack_require__(33);
var assign = __webpack_require__(17);

var ReactPropTypesSecret = __webpack_require__(13);
var checkPropTypes = __webpack_require__(127);

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
/* 127 */
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
  var invariant = __webpack_require__(12);
  var warning = __webpack_require__(33);
  var ReactPropTypesSecret = __webpack_require__(13);
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(11);
var invariant = __webpack_require__(12);
var ReactPropTypesSecret = __webpack_require__(13);

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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchMarkup;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormArea = __webpack_require__(130);

var _FormArea2 = _interopRequireDefault(_FormArea);

var _ResultsArea = __webpack_require__(132);

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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormArea;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(131);

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
/* 131 */
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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResultsArea;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = __webpack_require__(133);

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
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = List;

var _preact = __webpack_require__(0);

var _propTypes = __webpack_require__(4);

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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _DeptSearchContainer = __webpack_require__(135);

var _DeptSearchContainer2 = _interopRequireDefault(_DeptSearchContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function DeptSearch() {
  var componentsList = document.getElementsByClassName('DeptSearch');

  if (componentsList.length > 0) {
    for (var i = 0; i < componentsList.length; i++) {
      var component = componentsList[i];
      var _window$budgetPortal$ = window.budgetPortal.stringQueries,
          sphere = _window$budgetPortal$.sphere,
          noJs = _window$budgetPortal$.no_js;


      var nationalData = JSON.parse(component.getAttribute('data-national-json')).data;
      var rawProvincialData = JSON.parse(component.getAttribute('data-provincial-json')).data;

      var provincialData = rawProvincialData.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      var jsonData = [_extends({}, nationalData, {
        name: 'National'
      })].concat(_toConsumableArray(provincialData));

      if (!noJs) {
        (0, _preact.render)((0, _preact.h)(_DeptSearchContainer2.default, { jsonData: jsonData, sphere: sphere }), component.parentNode, component);
      }
    }
  }
}

exports.default = DeptSearch();

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _DeptSearchMarkup = __webpack_require__(136);

var _DeptSearchMarkup2 = _interopRequireDefault(_DeptSearchMarkup);

var _filterResults = __webpack_require__(142);

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
      keywords: '',
      sphere: _this.props.sphere || 'all',
      province: 'all'
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
    key: 'updateKeywords',
    value: function updateKeywords(keywords) {
      var filters = _extends({}, this.state.filters, {
        keywords: keywords
      });

      this.setState({ filters: filters });
      this.setState({ results: (0, _filterResults2.default)(filters, this.props.jsonData) });
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptSearchMarkup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(137);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(140);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeptSearchMarkup(_ref) {
  var state = _ref.state,
      eventHandlers = _ref.eventHandlers;

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
                name: name
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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptGroup;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

var _provinces = __webpack_require__(138);

var _spheres = __webpack_require__(139);

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
          items: _spheres.spheres,
          changeAction: updateSphere,
          property: sphere
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
            items: _provinces.provinces,
            changeAction: updateProvince,
            property: province
          })
        )
      )
    ) : null
  );
}

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = {"provinces":[{"title":"All Provinces","value":"all"},{"title":"Eastern Cape","value":"eastern-cape"},{"title":"Free State","value":"free-state"},{"title":"Gauteng","value":"gauteng"},{"title":"KwaZulu-Natal","value":"kwazulu-natal"},{"title":"Limpopo","value":"limpopo"},{"title":"Mpumalanga","value":"mpumalanga"},{"title":"North West","value":"north-west"},{"title":"Northern Cape","value":"northern-cape"},{"title":"Western Cape","value":"western-cape"}]}

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = {"spheres":[{"title":"All spheres of government","value":"all"},{"title":"National","value":"national"},{"title":"Provincial","value":"provincial"}]}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeptGroup;

var _preact = __webpack_require__(0);

var _Map = __webpack_require__(141);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeptGroup(_ref) {
  var map = _ref.map,
      linksArray = _ref.linksArray,
      title = _ref.name,
      doubleRow = _ref.doubleRow,
      empty = _ref.empty;


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
          'This data is not yet available. Provincial budgets are only available a few weeks after the national budget has been announced. This is because the national budget determines the amount of money each province receives.'
        )
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
/* 141 */
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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = filterResults;

var _filterKeywords = __webpack_require__(143);

var _filterKeywords2 = _interopRequireDefault(_filterKeywords);

var _filterGroups = __webpack_require__(145);

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
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = filterKeywords;

var _fuse = __webpack_require__(15);

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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _SearchResultContainer = __webpack_require__(147);

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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _SearchResultMarkup = __webpack_require__(148);

var _SearchResultMarkup2 = _interopRequireDefault(_SearchResultMarkup);

var _global = __webpack_require__(34);

var _removePunctuation = __webpack_require__(14);

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

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

  _createClass(SearchResultsContainer, [{
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
      return (0, _preact.h)(_SearchResultMarkup2.default, { results: this.state.results, search: this.props.search, selectedYear: this.props.selectedYear, updateFilter: this.updateFilter, shown: this.state.shown, changeShown: this.changeShown, page: this.state.page, province: this.state.province, state: this.state, updateItem: this.updateItem, error: this.state.error, loading: this.state.loading });
    }
  }]);

  return SearchResultsContainer;
}(_preact.Component);

exports.default = SearchResultsContainer;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchResultMarkup;

var _preact = __webpack_require__(0);

var _Form = __webpack_require__(149);

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
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Form(_ref) {
  var state = _ref.state,
      updateFilter = _ref.updateFilter;

  var items = [{
    title: 'All Provinces',
    value: 'all'
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
    (0, _preact.h)(
      'div',
      { className: 'SearchResult-filter' },
      (0, _preact.h)(_index2.default, {
        name: 'province',
        items: items,
        property: state.province,
        open: state.open === 'province',
        changeAction: function changeAction(value) {
          return updateFilter('province', value);
        }
      })
    )
  );
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _glossary = __webpack_require__(29);

var _glossary2 = _interopRequireDefault(_glossary);

var _createGlossaryGroupedObject = __webpack_require__(151);

var _createGlossaryGroupedObject2 = _interopRequireDefault(_createGlossaryGroupedObject);

var _Container = __webpack_require__(152);

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Glossary() {
  var glossaryGroupedObject = (0, _createGlossaryGroupedObject2.default)(_glossary2.default);
  var nodes = document.getElementsByClassName('Glossary');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i++) {
      (0, _preact.render)((0, _preact.h)(_Container2.default, { glossaryObject: glossaryGroupedObject }), nodes[i]);
    }
  }
}

exports.default = Glossary();

/***/ }),
/* 151 */
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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _fuse = __webpack_require__(15);

var _fuse2 = _interopRequireDefault(_fuse);

var _Markup = __webpack_require__(153);

var _Markup2 = _interopRequireDefault(_Markup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.state = {
      currentPhrase: '',
      currentItems: _this.props.glossaryObject
    };

    _this.eventHandlers = {
      changePhrase: _this.changePhrase.bind(_this)
    };
    return _this;
  }

  _createClass(Container, [{
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
      return (0, _preact.h)(_Markup2.default, _extends({}, this.state, this.eventHandlers));
    }
  }]);

  return Container;
}(_preact.Component);

exports.default = Container;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Markup;

var _preact = __webpack_require__(0);

var _Controls = __webpack_require__(154);

var _Controls2 = _interopRequireDefault(_Controls);

var _List = __webpack_require__(155);

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
/* 154 */
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
/* 155 */
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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _VideosContainer = __webpack_require__(157);

var _VideosContainer2 = _interopRequireDefault(_VideosContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Videos() {
  var nodes = document.getElementsByClassName('Videos');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i++) {
      var items = JSON.parse(nodes[i].getAttribute('data-items')).data;
      (0, _preact.render)((0, _preact.h)(_VideosContainer2.default, { items: items }), nodes[i]);
    }
  }
}

exports.default = Videos();

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _fuse = __webpack_require__(15);

var _fuse2 = _interopRequireDefault(_fuse);

var _Markup = __webpack_require__(158);

var _Markup2 = _interopRequireDefault(_Markup);

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
      return (0, _preact.h)(_Markup2.default, {
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

exports.default = VideosContainer;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Markup;

var _preact = __webpack_require__(0);

var _Item = __webpack_require__(159);

var _Item2 = _interopRequireDefault(_Item);

var _Modal = __webpack_require__(162);

var _Modal2 = _interopRequireDefault(_Modal);

var _Controls = __webpack_require__(164);

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
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _preact = __webpack_require__(0);

var _PlayIcon = __webpack_require__(160);

var _PlayIcon2 = _interopRequireDefault(_PlayIcon);

var _trimString = __webpack_require__(161);

var _trimString2 = _interopRequireDefault(_trimString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return (0, _preact.h)(
    'li',
    { className: 'u-listItemReset' },
    (0, _preact.h)(
      'a',
      { className: 'Videos-item', onClick: setModalWrapper },
      (0, _preact.h)(
        'div',
        { className: 'Videos-thumbnailWrap' },
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
            languageKeys.map(function (key) {
              return (0, _preact.h)(
                'li',
                { className: 'Videos-pill' },
                key
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
/* 160 */
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
/* 161 */
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
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _preact = __webpack_require__(0);

var _CloseIcon = __webpack_require__(163);

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

var _index = __webpack_require__(3);

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

  var selectOptions = Object.keys(languageOptions).map(function (language) {
    return {
      title: language,
      value: languageOptions[language]
    };
  });

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
            items: selectOptions,
            property: open.language,
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
/* 163 */
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
/* 164 */
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
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _VideoContainer = __webpack_require__(166);

var _VideoContainer2 = _interopRequireDefault(_VideoContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Videos() {
  var nodes = document.getElementsByClassName('Video');

  if (nodes.length > 0) {
    for (var i = 0; i < nodes.length; i++) {
      var component = nodes[i];
      var jsonData = JSON.parse(component.getAttribute('data-json'));
      (0, _preact.render)((0, _preact.h)(_VideoContainer2.default, { jsonData: jsonData }), component);
    }
  }
}

exports.default = Videos();

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Markup = __webpack_require__(167);

var _Markup2 = _interopRequireDefault(_Markup);

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
      return (0, _preact.h)(_Markup2.default, {
        open: this.state.open,
        setLanguage: this.setLanguage,
        languageOptions: this.props.jsonData
      });
    }
  }]);

  return VideoContainer;
}(_preact.Component);

exports.default = VideoContainer;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _preact = __webpack_require__(0);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Modal(_ref) {
  var open = _ref.open,
      languageOptions = _ref.languageOptions,
      setLanguage = _ref.setLanguage;

  var selectOptions = Object.keys(languageOptions).map(function (language) {
    return {
      title: language,
      value: languageOptions[language]
    };
  });

  var toggle = (0, _preact.h)(
    'div',
    null,
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
        items: selectOptions,
        property: open.language,
        changeAction: function changeAction(value) {
          return setLanguage(value);
        }
      })
    )
  );

  return (0, _preact.h)(
    'div',
    { className: 'Videos' },
    (0, _preact.h)(
      'div',
      { className: 'Videos-embed' },
      (0, _preact.h)('div', { className: 'Videos-loading' }),
      (0, _preact.h)('iframe', { className: 'Videos-iframe', width: '560', height: '315', src: 'https://www.youtube.com/embed/' + open.language + '?rel=0&amp;amp;showinfo=0', frameborder: '0', allow: 'autoplay; encrypted-media', allowfullscreen: 'allowfullscreen' })
    ),
    Object.keys(languageOptions) > 1 ? toggle : null
  );
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _RevenueMarkup = __webpack_require__(35);

var _RevenueMarkup2 = _interopRequireDefault(_RevenueMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Revenue() {
  var componentsList = document.getElementsByClassName('Revenue-container');

  if (componentsList.length > 0) {
    for (var i = 0; i < componentsList.length; i++) {
      var component = componentsList[i];
      var rawItems = JSON.parse(component.getAttribute('data-info')).data;
      var link = component.getAttribute('data-link');
      var year = component.getAttribute('data-year');
      var shortcuts = component.getAttribute('data-shortcuts') === 'true';

      var items = rawItems.reduce(function (results, val) {
        return _extends({}, results, _defineProperty({}, val.category, val.amount));
      }, {});

      (0, _preact.render)((0, _preact.h)(_RevenueMarkup2.default, { items: items, link: link, year: year, shortcuts: shortcuts }), component);
    }
  }
}

exports.default = Revenue();

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _preact = __webpack_require__(0);

var _trimValues = __webpack_require__(170);

var _trimValues2 = _interopRequireDefault(_trimValues);

var _removePunctuation = __webpack_require__(14);

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item(_ref) {
  var year = _ref.year,
      title = _ref.title,
      value = _ref.value,
      shortcuts = _ref.shortcuts;

  var Tag = shortcuts ? 'a' : 'div';
  var link = shortcuts ? '/' + year + '/search-result?search_type=full-search&search=' + encodeURI((0, _removePunctuation2.default)(title)) : null;

  return (0, _preact.h)(
    'div',
    { className: 'Revenue-itemWrap' },
    (0, _preact.h)(
      Tag,
      { href: link, className: 'Revenue-item' + (shortcuts ? ' Revenue-item--link' : '') },
      (0, _preact.h)(
        'div',
        { className: 'Revenue-title' },
        title
      ),
      value !== null ? (0, _preact.h)(
        'div',
        { className: 'Revenue-value' },
        'R',
        (0, _trimValues2.default)(value)
      ) : null
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
exports.default = trimValues;
function trimValues(value) {
  if (value > 1000000000000) {
    return Math.round(value / 1000000000000) + " Trillion";
  } else if (value > 1000000000) {
    return Math.round(value / 1000000000) + " Billion";
  } else if (value > 1000000) {
    return Math.round(value / 1000000) + " Million";
  } else if (value > 1000) {
    return Math.round(value / 1000) + " Thousand";
  }

  return value;
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _ExpenditureMarkup = __webpack_require__(172);

var _ExpenditureMarkup2 = _interopRequireDefault(_ExpenditureMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Expenditure() {
  var componentsList = document.getElementsByClassName('Expenditure-data');

  if (componentsList.length > 0) {
    for (var i = 0; i < componentsList.length; i++) {
      var component = componentsList[i];
      var rawItems = JSON.parse(component.getAttribute('data-info')).data;
      var year = component.getAttribute('data-year');

      var items = rawItems.reduce(function (results, val) {
        return _extends({}, results, _defineProperty({}, val.name, [val.total_budget]));
      }, {});

      (0, _preact.render)((0, _preact.h)(_ExpenditureMarkup2.default, { items: items, year: year }), component);
    }
  }
}

exports.default = Expenditure();

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ExpenditureMarkup;

var _preact = __webpack_require__(0);

var _GraphContainer = __webpack_require__(31);

var _GraphContainer2 = _interopRequireDefault(_GraphContainer);

var _RevenueMarkup = __webpack_require__(35);

var _RevenueMarkup2 = _interopRequireDefault(_RevenueMarkup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ExpenditureMarkup(_ref) {
  var items = _ref.items,
      year = _ref.year;


  var newItems = Object.keys(items).reduce(function (results, key) {
    return _extends({}, results, _defineProperty({}, key, items[key][0]));
  }, {});

  var hasNull = Object.keys(items).reduce(function (results, key) {
    return items[key][0] === null;
  }, false);

  if (hasNull) {
    return (0, _preact.h)(
      'div',
      { className: 'Expenditure-wrap' },
      (0, _preact.h)(_RevenueMarkup2.default, _extends({ year: year }, { items: newItems, shortcuts: true })),
      (0, _preact.h)(
        'div',
        { className: 'Expenditure-linkWrap' },
        (0, _preact.h)(
          'a',
          { href: '/' + year + '/departments', className: 'Expenditure-link' },
          'Explore National and Provincial Expenditure by Department for ',
          year
        )
      )
    );
  }

  return (0, _preact.h)(
    'div',
    { className: 'Expenditure-wrap Expenditure-wrap--graph' },
    (0, _preact.h)(_GraphContainer2.default, _extends({ items: items, year: year }, { legend: [] })),
    (0, _preact.h)(
      'div',
      { className: 'Expenditure-linkWrap Expenditure-linkWrap--extra' },
      (0, _preact.h)(
        'a',
        { href: '/' + year + '/departments', className: 'Expenditure-link' },
        'Explore National and Provincial Expenditure by Department for ',
        year
      )
    )
  );
}

/***/ })
/******/ ]);
//# sourceMappingURL=scripts.js.map