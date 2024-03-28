+++
title = 'Darknet 6'
summary = 'What to do with labeled images.'
date = 2024-03-28T08:40:38Z
draft = false
tags = ['yolo', 'goal 3', 'resources', 'google colab', 'jupyter notebook']
+++
Finally got results, all you need is  a file with each class per line (**classes.txt**), the configuration (**yolov3-train.cfg**) and the weights for the modified YOLO detection (in this case I used older ones insted of the final ones so **yolov3-train_last.weights**).

![Requirements to make detections.](requirements.png)

This gave me a result, as bad as expedcted  but in the right area at least. Imagine if my machine could do it itself.

![Poor detection but at least it's in the right places.](detected.png)
