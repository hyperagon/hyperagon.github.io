---
title: 'Number Detector'
summary: 'PyTorch ➝ ONNX Number Detector'
date: ‘2024-03-04’
tags: ['goal', 'machine learning', 'pyttorch', 'onnx']
---
By following this [Guide (How to Run PyTorch Models in the Browser With ONNX.js)](https://www.youtube.com/watch?v=Vs730jsRgO8S) I was able to put a model created in PyTorch online.

What a nice example, web + machine learning. Thus completing [Goal #1](/posts/2024-02-27). I used a greedy selection.

Note:
- Direct links in `raw html` did not work, being relativized.
- Relative links act acording to the structure in the **public** directory (created when you use `hugo`).

{{<rawhtml>}}
    <style>
#container {
  align-items: center;
  color: #212121;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  justify-content: center;
  margin: 0;
}

.elevation {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.card {
  background: #fff;
  border-radius: 4px;
  padding: 16px;
}

.canvas {
  border-radius: 4px;
  height: 140px;
  width: 140px;
}

.button {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), inset 0 0 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.25px;
  line-height: 36px;
  margin: 16px 0;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  width: 140px;
}

.button:hover {
  background: #f5f5f5;
}

.button:active {
  box-shadow: 0 0 rgba(0, 0, 0, 0.2), 0 0 rgba(0, 0, 0, 0.14),
    0 0 rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.prediction {
    text-align: center;
}
    </style>
  </head>

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
      </div>
    </div>
</div>

    <script src="../onnx.min.js"></script>
    <script src="../script.js"></script>
{{</rawhtml>}}
