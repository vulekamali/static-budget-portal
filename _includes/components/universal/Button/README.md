---
title: Button
category: Universal Components
assets: examples
state:
  text: ✖ unstable
  color: white
  background: red
API:
  text: HTML
  color: black
  background: '#CCCCCC'
support:
  text: IE 10+
  color: white
  background: grey
---

## Table of Contents
- [Overview](#overview)
- [Examples](#examples)
- [API](#api)

## Overview

...

## Examples

### Basic
<iframe width="100%" height="100" src="basic.html" frameborder="0" allowfullscreen></iframe>
[View Example](basic.html)

<iframe width="100%" height="100" src="code-basic.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-basic.html)

### Multiple Lines
<iframe width="100%" height="100" src="multiline.html" frameborder="0" allowfullscreen></iframe>
[View Example](multiline.html)

<iframe width="100%" height="100" src="code-multiline.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-multiline.html)

### Inline
<iframe width="100%" height="100" src="inline.html" frameborder="0" allowfullscreen></iframe>
[View Example](inline.html)

<iframe width="100%" height="100" src="code-inline.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-inline.html)

### 
<iframe width="100%" height="100" src="inline.html" frameborder="0" allowfullscreen></iframe>
[View Example](inline.html)

<iframe width="100%" height="100" src="code-inline.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-inline.html)

## API

### HTML via CSS classes

#### `.Section`
| Modifier | Description |
|---|---|
| `.is-bevel` | Creates the grey bevel effect that forms the base on which additional cards rest. However can also be used without cards if you want to add supplementary information with little visual weight |
| `.is-green` | Should only be used in conjunction with `.is-bevel`, turns the bevel green. Is used for primary call to action cards   |
| `.is-invisible` | Hides all styling associated with the component, but preserves padding. This is usefull to ensure that content lines up with cards around it, even when you want the content to appear 'outside' the cards structure |
| `.is-link` | Displays pointer cursor and darkens the component by 10% when mouse if hovered over it, this provides the visual feedback that the card is a clickable link. It is usually a good idea to include some underline text inside the component to further indicate this. Automatically darkens all children nested inside section as well.

#### `.Section-card`
| Modifier | Description |
|---|---|
| `.is-dark` | Changes the background to dark grey and the text color to white. This is an alternative way of indicating a call of action. This is usually used as a secondary call to action alongside the main green bordered `Section` call to action. |
| `.is-invisible` | Hides all styling associated with the component, but preserves padding. This is useful when you want the title to be inside the bevel or you want to add supplimentary content inside the bevel after the cards |

#### `.Section-title`
| Modifier | Description |
|---|---|
| `.is-small` | Changes the text size from the default `16px` to `14px`, this is usefully when you want to have nested titles in the content underneath the primary title |