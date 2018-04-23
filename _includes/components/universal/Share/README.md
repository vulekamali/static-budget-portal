---
title: Share
category: Universal Components
assets: examples
state:
  text: ✔ stable
  color: white
  background: green
API:
  text: HTML / Preact
  color: black
  background: '#CCCCCC'
support:
  text: IE 9
  color: white
  background: grey
---

- Component is used to provide user with functionality to share the current page via Facebook, Twitter or just copy as a link.
- For Facebook and Twitter a new window is opened that has the FB / Twitter specific URL with the required query strings.
- To copy the link a modal is opened (via a Redux action creator) with the URL for a user to copy.

## Examples

### Basic
<iframe width="100%" height="250" src="basic.html" frameborder="0" allowfullscreen></iframe>
[View Source](basic.html)

<iframe width="100%" height="150" src="code-basic.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-basic.html)

### Anchor
<iframe width="100%" height="250" src="anchor.html" frameborder="0" allowfullscreen></iframe>
[View Source](anchor.html)

<iframe width="100%" height="150" src="code-anchor.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-anchor.html)

## API

### Preact props

| Props | Description |
|---|---|
| `anchor` | An optional string that get attached to the end of the URL as an anchor text (do not include the '#') |

### HTML via data attributes
_same API as Preact, just prepend `data-` to prop names._

## Support

| Browser | Enhancement |
|---|---|
| IE 5 | Webpack ES6 modules not supported (No support) |
| IE 9 | Modal enter/exit animation does not fire (Base Support) |
| Evergreen browsers | Optimal Support |