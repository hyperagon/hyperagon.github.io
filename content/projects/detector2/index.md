---
title: 'Number Detector (Tensorflow)'
summary: 'TensorFlow.js Number Detector'
date:  2024-03-05T20:00:13Z
tags: ['goal', 'machine learning', 'keras', 'keras.js', 'tensorflow.js']
---
Making a simple number detector in [Keras](https://keras.io/) was easy but the Online part involved some backtracking since I looked at [Keras.js](https://transcranial.github.io/keras-js/) before [TensorFlow.js](https://www.tensorflow.org/js). Being unsucessful at converting the model so I just used the [online one](https://github.com/tensorflow/tfjs-examples/tree/master/mnist) instead, adding a [save feature](https://github.com/tensorflow/tfjs-examples/tree/master/mnist).

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
      </div>
    </div>
  </div>

<!-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script> -->
  <script src="tf.min.js"></script>
  <script src="script.js"></script>
{{</rawhtml>}}
