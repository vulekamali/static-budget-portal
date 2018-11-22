---
layout: guides
data_key: index
---

{% assign page_data = site.data.guides.index %}


<h1 class="Page-mainHeading">Types of Content</h1>

<div class="Section is-invisible u-fontSize18 u-paddingTop0">
  {{ page_data.description }}
</div>

<div class="Grid has-twoColumn">
  {% for type in page_data.items %}
    {%
      include components/Preview/index.html
      title=type.name
      excerpt=type.description
      url=type.url_path
    %}
  {% endfor %}
</div>


