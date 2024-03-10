---
title: 'Number Detector (Tensorflow)'
summary: 'Tensorflow.js Number Detector'
date:  2024-03-05T20:00:13Z
tags: ['goal', 'machine learning', 'keras', 'tensorflow.js']
---
I was unsucessful at converting a [Keras](htt1ps://keras.io/) model so I used an [example tensorflow.js one instead](https://github.com/tensorflow/tfjs-examples/tree/master/mnist), adding a [save feature](https://github.com/tensorflow/tfjs-examples/tree/master/mnist).

{{<rawhtml>}}
  <link rel="stylesheet" href="style.css" />

  <div id="container">
    <div class="card elevation">
      <canvas
        class="canvas elevation"
        id="canvas"0
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
