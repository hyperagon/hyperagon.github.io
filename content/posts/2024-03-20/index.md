+++
title = 'Detecting things'
summary = 'Old guides everywhere.'
date = 2024-03-20T00:02:03Z
draft = true
tags = ['docker', 'label-studio']
+++
I was looking up some guides but they are rather outdated. I found [this one](https://betterdatascience.com/detect-license-plates-with-yolo/) which used **LabelIMG** (now **Label Studio**).

First of all I really needed a way to run [Docker](https://docs.docker.com/get-docker/) so I followed the guide. This is silly since it could work just fine as a local server.

Once that was done I could open [Label Studio](https://docs.docker.com/get-docker/) by running `sudo docker run -it -p 8080:8080 -v $(pwd)/mydata:/label-studio/data heartexlabs/label-studio:1.6.0`, use it and export a *JSON* file.

Avoid setting the confidence too low though:
![Picture with several defections at confidence 0.](mess_yolo_mnist.png)
