---
title: Grid
category: Universal Components
assets: examples
state:
  text: ✔ stable
  color: white
  background: green
API:
  text: HTML
  color: black
  background: '#CCCCCC'
support:
  text: IE 8
  color: white
  background: grey
---

## Table of Contents
- [Overview](#overview)
- [Examples](#examples)
- [API](#api)
- [Support](#support)

## Overview

- The `Grid` component supports two types of HTML nodes: The `Grid` parent node, `Grid-inner` and `Grid-item`.
- You apply a modifier to the parent node to determine at what viewport the grid should trigger, at all viewports below this `Grid-items` will just function as normal `<div>` tags.
- No trigger is set by default in order to preserve mobile-first functionality and as a fallback when the required browser features are not supported.
- All items are seperated by gutters of `30px` between them.

## Examples

### 1 of 2
<iframe width="100%" height="150" src="1of2.html" frameborder="0" allowfullscreen></iframe>
[View Example](1of2.html)

<iframe width="100%" height="150" src="code-1of2.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-1of2.html)

### Trigger on tablet viewport (try resizing iframe)
<iframe style="resize: horizontal;" width="100%" height="150" src="tabletTrigger.html" frameborder="0" allowfullscreen></iframe>
[View Example](tabletTrigger.html)

<iframe width="100%" height="150" src="code-tabletTrigger.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-tabletTrigger.html)

### 1 of 3
<iframe width="100%" height="150" src="1of3.html" frameborder="0" allowfullscreen></iframe>
[View Example](1of3.html)

<iframe width="100%" height="150" src="code-1of3.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-1of3.html)

### mix
<iframe width="100%" height="200" src="mix.html" frameborder="0" allowfullscreen></iframe>
[View Example](mix.html)

<iframe width="100%" height="200" src="code-mix.html" frameborder="0" allowfullscreen></iframe>
[View Code](code-mix.html)

## API

### HTML via CSS classes

#### `.Grid`
| Modifier | Description |
|---|---|
| `.is-mobileTrigger` | Grid layout get triggered at mobile viewport size (0px) |
| `.is-tabletTrigger` | Grid layout only gets triggered at tablet viewport size (500px) |
| `.is-standardTrigger` | Grid layout only gets triggered at standard viewport size (750px) |
| `.is-widescreenTrigger` | Grid layout only gets triggered at widescreen viewport size (1050px) |

#### `.Grid-item`
| Modifier | Description |
|---|---|
| `.is-1of2` | Sizes the cell as half the size of it's current row |
| `.is-1of3` | Sizes the cell as a third the size of it's current row |
| `.is-2of3` | Sizes the cell as two-thirds the size of it's current row |

## Support

| Browser | Enhancement |
|---|---|
| IE 5 | No viewports are fired and an addition `30px` margin is added to the bottom of the component due to `calc` not being supported (Partial Support) |
| IE 8 | No viewport triggers are fired, which means that `Grid-item`'s will retain their default state of a width of  (Base Support) |
| IE 9 | Viewport triggers fire as expected (Optimal Support) |