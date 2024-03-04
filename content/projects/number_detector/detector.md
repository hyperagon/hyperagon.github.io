---
title: 'Number Detector'
summary: 'PyTorch ➝ ONNX Number Detector'
date: ‘2024-03-04’
tags: ['goal', 'machine learning', 'pyttorcx', 'onnx']
---
By following this [Guide (How to Run PyTorch Models in the Browser With ONNX.js)](https://www.youtube.com/watch?v=Vs730jsRgO8S) I was able to put a model created in PyTorch online.

What a nice example, web + machine learning. Thus completing [Goal #1](/posts/2024-02-27). I used a greedy selection.

Note: Direct links in `raw html` did not work, being relativized.

{{<rawhtml>}}
<link rel="stylesheet" href="style.css" />

<div id="container">
    <div class="card elevation">
      <canvas
        class="canvas elevation"
        id="canvas"
        width="280"
        height="280"
      ></canvas>

      <div class="button" id="clear-button">CLEAR</div>

      <div>
          <div id="prediction" class="prediction">?</div>
      </div>
        <div style="text-align:right">
        
        </div>
    </div>
</div>

    <script src="./onnx.min.js"></script>
    <script src="./detector.js"></script>
{{</rawhtml>}}
