---
title: Modal
category: Universal Components
assets: examples
state:
  text: ✔ stable
  color: white
  background: green
API:
  text: Preact
  color: black
  background: '#CCCCCC'
support:
  text: IE 9
  color: white
  background: grey
---

## Table of Contents
- [Overview](#overview)
- [Examples](#examples)
- [API](#api)
- [Support](#support)

## Overview

- A component representing a standard 'modal' (or often called 'dialog') pattern.
- Note that, although feasable, there is currently no HTML for this component. It can only be rendered via Preact.
- Uses `preact-css-transition-group` to animate showing and hiding of modals.

## Examples

### Basic (drag to resize this iframe)
<iframe style="resize: horizontal;" width="100%" height="500" src="basic.html" frameborder="0" allowfullscreen></iframe>
[View Example](basic.html)

```
// Preact code

<Modal
  title="Test title"
  closeAction={() => console.log('Close action triggered')}
  open
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida at diam sagittis consequat. Sed dictum magna nunc, hendrerit dignissim sem auctor at. In augue arcu, fringilla a eros at, vulputate facilisis ipsum. Nam euismod tortor arcu, eu suscipit ligula interdum vitae. Suspendisse consequat, augue eget luctus scelerisque, massa nunc luctus nunc, eu efficitur nulla nisl at dolor. Mauris ullamcorper fringilla sapien, et lobortis felis mattis et. Mauris rhoncus neque in aliquet volutpat. Duis egestas ac enim eget condimentum. Phasellus fermentum nulla vel elit luctus, ac consectetur ipsum molestie. Nunc at porta felis. Donec et condimentum neque. Integer ac pretium quam.</p>
  <a href="#" className="Button is-inline">Example button</a>
</Modal>
```

## API

### Preact Component

| Prop | Description |
|---|---|
| `title` | A string that determines the text that will be displayed at the top of the modal |
| `closeAction` | A function that executes whenever a user clicks on the black overlay behind the modal or the close button inside it. |
| `open` | A boolean that determines whether the modal is currently open or not |
| children | Any Preact nodes passed as children of the component will be rendered inside it's content area. Note that the principle of JavaScript closures allows for the execution of parent events from inside the modal's passed children.

## Support

| Browser | Enhancement |
|---|---|
| IE 5 | Does not support Webpack's transpilation of JavaScript's module system (No support) |
| IE 9 | Supports all functionality, however due to lacking flexbox support modal is not centered vertically, but offset `40px` from the top (Base support) |
| IE 10 | Optimal support |