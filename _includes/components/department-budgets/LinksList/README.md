# LinksList

## Overview

A list of actionable links usually associated with a piece of UI directly above or below it. Requires an icon from the `components/universal/Icon` Jekyll include for each link if implemented via Jekyll.

## Jekyll Implementation

## Props (for React Implementation)

- `listArray`: Pass an array of objects. Each objecft represents an link item. All properties in obhects are requred, and are as follows:
  - `listArray.id`: Used in React to create `key` attribute
  - `listArray.title`: The text that will be used to show the link (that user will click on)
  - `listArray.prefex`: A string that will be prefixed before the link text (however after the icon). Useful when you want to provide more information about the link.
  - `listArray.link`: A string that will be used in the `href` attribute of the link.
  - `listArray.type`: The type will determine what icon will be added to link (currently supports all icons in the `components/universal/Icons` component).

## Examples

### Basic React Example

```jsx
const example = [
  {
    id: 'dataset',
    title: 'View Dataset',
    prefix: 'Source',
    link: '/dataset',
    type: 'dataset',
  },
  {
    id: 'dataset',
    title: 'View Dataset',
    link: '//google.com',
    type: 'dataset',
  },
  {
    id: 'pdf',
    title: 'Download PDF',
    link: '/assets/file.pdf',
    type: 'download',
  },
];

<LinksList listArray={example} />
```

### Basic Jekyll Example

```html
<ul class="LinksList">
  <li class="LinksList-item">
    <a href="/dataset" class="LinksList-link">
      <span class="LinksList-icon">{% include components/universal/Icon/index.html type="dataset" %}</span>
      <span>Source:&nbsp;</span>
      <span class="LinksList-title">View Dataset</span>
    </a>
  </li>

  <li class="LinksList-item">
    <a href="//google.com" class="LinksList-link" rel="noopener noreferrer">
      <span class="LinksList-icon">{% include components/universal/Icon/index.html type="guide" %}</span>
      <span class="LinksList-title">Go to Google.com</span>
    </a>
  </li>

  <li class="LinksList-item">
    <a href="/assets/file.pdf" class="LinksList-link" rel="noopener noreferrer">
      <span class="LinksList-icon">{% include components/universal/Icon/index.html type="download" %}</span>
      <span class="LinksList-title">Download PDF</span>
    </a>
  </li>
</ul>
```