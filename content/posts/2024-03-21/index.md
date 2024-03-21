+++
title = 'What to do with Labels'
summary = 'Labeled images and exported files, now what?'
date = 2024-03-21T08:49:39Z
draft = false
tags = ['yolo', 'label-studio']
+++
Kept following [this guide](https://betterdatascience.com/detect-license-plates-with-yolo/) o detect license plates. The whole 

It went to [Google Colab](colab.research.google.com) and set the runtime to a TPU (Tensor Processing Unit).

![How to set the runtime type to TPU](google-colab.png)

I tried to mount Google Drive but got [this issue](https://stackoverflow.com/questions/69822304/google-colab-google-drive-can%C2%B4t-be-mounted-anymore-browser-popup-google-dri), Apparently I was using "Blue's Solution". But [this is what worked](https://stackoverflow.com/questions/57419346/how-can-i-access-my-google-drive-files-from-google-colab).

It also mentions Darknet, an open source neural network framework which has several reources ([1](https://github.com/AlexeyAB/darknet), [2](https://github.com/hank-ai/darknet), [3](https://www.ccoderun.ca/programming/darknet_faq/)), I assume it's the open-source version of the [Ultralytics YOLO](https://github.com/ultralytics/ultralytics).« which I used earlier.

