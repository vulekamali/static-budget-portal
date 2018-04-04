---
title: Section
state:
  text: requires more documentation
  color: black
  background: yellow
---

## Overview

`Section` should form the backbone of how you seperate groups of content inside the `Page` component. By default this component takes on the appearance of a traditional UI card component. However, it has the capacity to appear beveled with more than one card nested inside of it to create another level of content grouping. In addition, a modifier can be passed to the component to only use it's padding and structure without the styling. 

It is recommended to not nest component directly inside the Page component without having a `Section` component as a middle-man.

## Examples

### Basic
[View Source](basic.html)
<iframe width="100%" height="315" src="basic.html" frameborder="0" allowfullscreen></iframe>

### Grouped
[View Source](grouped.html)
<iframe width="100%" height="800" src="grouped.html" frameborder="0" allowfullscreen></iframe>

### Green Bevel
[View Source](green.html)
<iframe width="100%" height="315" src="green.html" frameborder="0" allowfullscreen></iframe>

### Clickable
[View Source](clickable.html)
<iframe width="100%" height="315" src="clickable.html" frameborder="0" allowfullscreen></iframe>

### Invisible Card
[View Source](invisible.html)
<iframe width="100%" height="315" src="invisible.html" frameborder="0" allowfullscreen></iframe>

## Modifiers

### HTML

#### .Section
| Modifier | Description |
|---|---|
| `.is-bevel` | Creates the grey bevel effect that forms the base on which additional cards rest. However can also be used without cards if you want to add supplementary information with little visual weight |
| `.is-green` | Should only be used in conjunction with `.is-bevel`, turns the bevel green. Is used for primary call to action cards   |
| `.is-invisible` | Hides all styling associated with the component, but preserves padding. This is usefull to ensure that content lines up with cards around it, even when you want the content to appear 'outside' the cards structure |
| `.is-link` | Displays pointer cursor and darkens the component by 10% when mouse if hovered over it, this provides the visual feedback that the card is a clickable link. It is usually a good idea to include some underline text inside the component to further indicate this. Automatically darkens all children nested inside section as well.

#### .Section-card
| Modifier | Description |
|---|---|
| `.is-link` | Displays pointer cursor and darkens the component by 10% when mouse if hovered over it, this provides the visual feedback that the card is a clickable link. It is usually a good idea to include some underline text inside the component to further indicate this. Remember to add `.is-link` to any `.Section-card` nodes nested in this component as well.