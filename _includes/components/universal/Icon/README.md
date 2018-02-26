# Button

## Overview

### Notes

- You should never set the fill or stroke colour of the component manually, it should be inherited (throught the CSS cascade from its parent DOM node)
- This component can be used anywhere given that there is enough space for it.
- Sizes are labeled according to pixel size (instead of for example 'large') in order to keep the naming scaleable should new sizes be introduced.
- Icons are always exact squares, this makes it easier to resize them (since IE required that you specify both height and width)

### Description

Component should be used to communicate a concept iconographically. Can be used inside buttons as well. 

### Examples

- [Download Icon](download.html)
- [Facebook Icon](facebook.html)
- [Twitter Icon](twitter.html)
- [Search Icon](search.html)
- [Small Sizing](small.html)

## Instructions

### Using in Plain HTML

If you want to use any of the preset icons as plain HTML you can copy and paste the markup from the examples above. In addition you change the size with the 'is-' modifier (make sure that the class corresponds to a React prop for 'size', for example for a small version](small.html) you need the 'is-small' class.

```
  <svg class="Icon is-small" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 100 100">
  ... rest of component ...
```

### Using in React

You can use the `<Icon />` component and pass one of the following props:

| type |
|---|
| `download` |
| `facebook` |
| `search` |
| `twitter` |

| size |
| --- |
| `medium` |
| `small` |

```
<Icon type="twitter" size="small" />
```

### Using in Liquid Templating

You can use the react props as Liquid variables that you pass into the `{% include %}` tag:

```
{% include components/universal/Icon type='twitter' size='small' %}
```