# Button

## Overview

### Notes

- This component can be used eveywhere - as long as there is enough space for it.
- Resize the example windows to see how it renders at different viewports.
- Unless specified otherwise this component is a block element that fills 100% of it's parent. You can use the parent to control it's width, or provide an inline class modifier.

### Description

A button should indication a action that the user can perform. 

### Examples

- [Basic example](basic.html)
- [Multi-line button](multiline.html)
- [Inline example](inline.html)
- [Invisible button example](invisible.html)
- [Has icon example](icon.html)

## Instructions

### Using in Plain HTML

You can use the [basic version](basic.html) of the button as follows:

```
<a href="... link here ..." class="Button">... title here ...</a>
```

You can also apply the component to a button tag too:

```
<button class="Button">... title here ...</button>
```

You can force the button to be [inline (wrap around it's title)](inline.html) by adding a modifier class:

```
<button class="Button is-inline">... title here ...</button>
```

You can render a [invisible button (one only visible once hovered over)](invisible.html) with the following modifier:

```
<button class="Button is-invisible">... title here ...</button>
```

In addition if you want to have the button [wrap an icon](icon.html) you need to add the relevant modifier so that line-height can be adjusted accordingly:

```
<button class="Button has-icon">... icon here ...</button>
```

### Using in React

There exists no dedicated React module for this UI component, you can just use the HTML css modifiers.

### Using in Liquid Templating

There exists no dedicated React module for this UI component, you can just use the HTML css modifiers.