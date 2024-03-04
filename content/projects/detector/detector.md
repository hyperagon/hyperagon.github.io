---
title: 'Number Detector'
summary: 'PyTorch ➝ ONNX Number Detector'
date: ‘2024-03-04’
url: '/detector'
tags: ['goal', 'machine learning', 'pyttorch', 'onnx']
---
By following this [Guide (How to Run PyTorch Models in the Browser With ONNX.js)](https://www.youtube.com/watch?v=Vs730jsRgO8S) I was able to put a model created in PyTorch online.

What a nice example, web + machine learning. Thus completing [Goal #1](/posts/2024-02-27). I used a greedy selection.

Note: Direct links in `raw html` did not work, being relativized.

{{<rawhtml>}}
    <style>
#container {
  align-items: center;
  background: #fafafa;
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

    <script src="./onnx.min.js"></script>
    <script>
const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");

let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;

// Load our model.
const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./model.onnx");

// Add 'Draw a number here!' to the canvas.
ctx.lineWidth = 28;
ctx.lineJoin = "round";
ctx.font = "28px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#212121";
ctx.fillText("Wait", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

// Set the line color for the canvas.
ctx.strokeStyle = "#212121";

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const element = document.getElementById('prediction');
    element.innerText = '?';
}

function drawLine(fromX, fromY, toX, toY) {
  // Draws a line from (fromX, fromY) to (toX, toY).
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
  updatePredictions();
}

async function updatePredictions() {
  // Get the predictions for the canvas data.
  const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const input = new onnx.Tensor(new Float32Array(imgData.data), "float32");

  const outputMap = await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const predictions = outputTensor.data;
  const maxPrediction = Math.max(...predictions);

    const element = document.getElementById('prediction');
    //console.log(predictions);
    let pred = predictions.indexOf(maxPrediction);
    if (pred >= 0) {
        element.innerText = pred;
    } else {
        element.innerText = '?';
    }
}

function canvasMouseDown(event) {
  isMouseDown = true;
  if (hasIntroText) {
    clearCanvas();
    hasIntroText = false;
  }
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;

  // To draw a dot on the mouse down event, we set laxtX and lastY to be
  // slightly offset from x and y, and then we call `canvasMouseMove(event)`,
  // which draws a line from (laxtX, lastY) to (x, y) that shows up as a
  // dot because the difference between those points is so small. However,
  // if the points were the same, nothing would be drawn, which is why the
  // 0.001 offset is added.
  lastX = x + 0.001;
  lastY = y + 0.001;
  canvasMouseMove(event);
}

function canvasMouseMove(event) {
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;
  if (isMouseDown) {
    drawLine(lastX, lastY, x, y);
  }
  lastX = x;
  lastY = y;
}

function bodyMouseUp() {
  isMouseDown = false;
}

function bodyMouseOut(event) {
  // We won't be able to detect a MouseUp event if the mouse has moved
  // ouside the window, so when the mouse leaves the window, we set
  // `isMouseDown` to false automatically. This prevents lines from
  // continuing to be drawn when the mouse returns to the canvas after
  // having been released outside the window.
  if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
    isMouseDown = false;
  }
}

loadingModelPromise.then(() => {
  canvas.addEventListener("mousedown", canvasMouseDown);
  canvas.addEventListener("mousemove", canvasMouseMove);
  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButton.addEventListener("mousedown", clearCanvas);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
})
    </script>
{{</rawhtml>}}
