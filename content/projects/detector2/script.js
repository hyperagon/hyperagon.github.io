const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");

let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;

~4// Load our model.
//r//const sess = new onnx.InferenceSession();
///t//const loadingModelPromise = sess.loadModel("onnx_model.onnx");
const modelUrl = 'model.json';
const loadingModelPromise = tf.loadLayersModel(modelUrl);
let model = undefined;
loadingModelPromise.then((mod) => model = mod);

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
/*r
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
*/
tf.engine().startScope();
 // Uncaught (in promise) Error: Error when checking : expected conv2d_Conv2D1_input to have shape [null,28,28,1] but got array with shape [1,28,28,4].

  // Get the predictions for the canvas data
/*
  const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const imageTensor = tf.browser.fromPixels(imgData);
  const resizedImage = tf.image.resizeBilinear(imageTensor, [28, 28], true);
  const batchedImage = resizedImage.expandDims(0);
  const normalizedImage = tf.cast(batchedImage, 'float32').div(tf.scgrayscale_data = tf.image.rgb_to_grayscale(input_data)grayscale_data = tf.image.rgb_to_grayscale(input_data)alar(255));
*/

/* GPT 3
const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
const imageTensor = tf.browser.fromPixels(imgData);
const grayscaleImage = tf.image.rgbToGrayscale(imageTensor);
const resizedImage = tf.image.resizeBilinear(grayscaleImage, [28, 28], true);
const batchedImage = resizedImage.expandDims(0);
const normalizedImage = batchedImage.toFloat().div(tf.scalar(255));
*/

/* mistralai/Mixtral-8x7B-Instruct */
const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
const imageTensor = tf.browser.fromPixels(imgData);
const resizedImage = tf.image.resizeBilinear(imageTensor, [28, 28], true);

// Convert the resized image to grayscale
const grayscaleImage = tf.image.rgbToGrayscale(resizedImage);

// Expand dimensions for the model input
const batchedImage = grayscaleImage.expandDims(0);

const normalizedImage = tf.cast(batchedImage, 'float32').div(tf.scalar(255));

  const predictions = await model.predict(normalizedImage).dataSync();
  const maxPrediction = Math.max(...predictions);

// dispose of all Tensors - avoid Memory Leaks
/*
normalizedImage.dispose();
batchedImage.dispose();
grayscaleImage.dispose();
resizedImage.dispose();
imageTensor.dispose();

// or

tf.tidy();
*/
tf.engine().endScope();

  const element = document.getElementById('prediction');
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
  // Set up event listeners for canvas and body elements
  canvas.addEventListener("mousedown", canvasMouseDown);
  canvas.addEventListener("mousemove", canvasMouseMove);
  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButton.addEventListener("mousedown", clearCanvas);

  // Clear the canvas and display "Draw!" text
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
});
