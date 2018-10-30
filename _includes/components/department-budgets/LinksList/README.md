#LinksList

## Overview

A list of actionable links usually associated with a piece of UI directly above or below it. Requires an icon from the `components/universal/Icon` Jekyll include for each link.

## Props


## Examples

### Basic React Example

```jsx
const example = [
  {
    id: 'dataset',
    title: 'View Dataset',
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