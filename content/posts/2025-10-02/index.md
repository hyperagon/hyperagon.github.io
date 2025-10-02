+++
title = "Oh Glaxnimate"
summary = "Not Supported"
date = 2025-10-02T08:10:34+01:00
draft = false
tags = ['glaxnimate', 'svg']
+++
I've been trying to get animations on [SVG](https://en.wikipedia.org/wiki/SVG) to then import it to [Glaxnimate](https://glaxnimate.org/) but jokes on me, it doesn't support scaling *animateTransform*...

This works finee:
```
<svg width="100" height="100">
  <title>Attribute Animation with SMIL</title>
  <rect x="0" y="0" width="100" height="100" stroke="black" stroke-width="1"></rect>
  <circle cx="50" cy="50" r="50" fill="blue" stroke="black" stroke-width="1">
    <animate attributeName="r" from="0" to="350" dur="5s" repeatCount="indefinite"></animate>
  </circle>
</svg>
```

<svg width="100" height="100">
  <title>Attribute Animation with SMIL</title>
  <rect x="0" y="0" width="100" height="100" stroke="black" stroke-width="1"></rect>
  <circle cx="50" cy="50" r="50" fill="blue" stroke="black" stroke-width="1">
    <animate attributeName="r" from="0" to="350" dur="5s" repeatCount="indefinite"></animate>
  </circle>
</svg>

This however does not:
```
``
