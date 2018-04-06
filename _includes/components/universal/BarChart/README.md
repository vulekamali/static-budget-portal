---
title: BarChart
state:
  text: use with caution, refactor pending
  color: black
  background: yellow
---

## Overview

...

## Examples

### Basic
[View Source](basic.html)
<iframe width="100%" height="315" src="basic.html" frameborder="0" allowfullscreen></iframe>

### Grouped
[View Source](multiple.html)
<iframe width="100%" height="800" src="grouped.html" frameborder="0" allowfullscreen></iframe>

## Modifiers

### Preact Props

\* Required props

| Prop | Description |
|---|---|
| `items`* | An object with the following schema: **{ `string`: [ `int`, `int` ], ... }**. Each key (string) indicates a label attached to a value or values, while each value (int) in the array represents a bar in the chart associated with the label. Note that even if you just have one value you still need pass it in an array. |
| `width`* | An integer that determines the amount if pixels that the chart will be wide. In order to have this be calculated automatically based of it's parent node in the DOM wrap this component in the `ChartWidthContainer` component |
| `hover` | A boolean that indicates whether values will be displayed as tooltips on hover, or will be permanently displayed alongside the bar. In order to have this automatically be calculated based of the viewport width wrap this component in `ChartWidthContainer` component |
| `guides` | A boolean that indicates whether guidelines will be shown alongside numbers on the x-axis. In order to have this automatically be calculated based of the viewport width wrap this component in `ChartWidthContainer` component |
| `scale` | An integer that determine the scale that the chart will be displayed at. The size of everything (include the width prop) is multiplied by this number to emulate changes in scale. This is useful when you want to scale things up for the downloaded version. |
| `download` | An object with the following schema: **{ heading: `string`, subHeading: `string`, type: `string` }**. If the download prop is supplied all the above need to be included. This prop signals that this rendition of the chart will be used to create a PNG image for download. This includes a white background, additional padding on the sides, vulekamali branding and the above values as text in the PNG. |