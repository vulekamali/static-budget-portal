---
title: Section
state:
  text: stable
  color: white
  background: green
---

## Overview

`Section` should form the backbone of how you seperate groups of content inside the `Page` component. By default this component takes on the appearance of a traditional UI card component. However, it has the capacity to appear beveled with more than one card nested inside of it to create another level of content grouping. In addition, a modifier can be passed to the component to only use it's padding and structure without the styling. 

It is recommended to not nest component directly inside the Page component without having a `Section` component as a middle-man.

_NOTE: The `Section` component aims to encapsulate itself from the it's parent component (usually the `Page` component), this means that in most cases you will need to add bottom or top margins via utility classes. This is also helpful in circumstances where it would be hard to programatically predict how things should collapse on mobile (specifically with columns and sidebars)._

## Examples

### Basic
[View Source](basic.html)
<iframe width="100%" height="315" src="basic.html" frameborder="0" allowfullscreen></iframe>

### Grouped
[View Source](grouped.html)
<iframe style="resize: horizontal;" width="100%" height="800" src="grouped.html" frameborder="0" allowfullscreen></iframe>

### Green Bevel
[View Source](green.html)
<iframe style="resize: horizontal;" width="100%" height="315" src="green.html" frameborder="0" allowfullscreen></iframe>

### Dark Card
[View Source](dark.html)
<iframe style="resize: horizontal;" width="100%" height="315" src="dark.html" frameborder="0" allowfullscreen></iframe>

### Clickable
[View Source](clickable.html)
<iframe style="resize: horizontal;" width="100%" height="315" src="clickable.html" frameborder="0" allowfullscreen></iframe>

### Invisible Card
[View Source](invisible.html)
<iframe style="resize: horizontal;" width="100%" height="315" src="invisible.html" frameborder="0" allowfullscreen></iframe>

## Modifiers

### CSS Classes

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
| `.is-dark` | Changes the background to dark grey and the text color to white. This is an alternative way of indicating a call of action. This is usually used as a secondary call to action alongside the main green bordered `Section` call to action. |
| `.is-invisible` | Hides all styling associated with the component, but preserves padding. This is useful when you want the title to be inside the bevel or you want to add supplimentary content inside the bevel after the cards |

#### .Section-title
| Modifier | Description |
|---|---|
| `.is-small` | Changes the text size from the default `16px` to `14px`, this is usefully when you want to have nested titles in the content underneath the primary title |