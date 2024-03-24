+++
title = 'Label Studio'
summary = 'How to set up Label Studio locally.'
date = 2024-03-20T00:02:03Z
draft = false
tags = ['docker', 'label-studio', 'goal 3']
+++
I was looking up some guides but they are rather outdated. [This one](https://betterdatascience.com/detect-license-plates-with-yolo/) used [LabelIMG](https://github.com/HumanSignal/labelImg) (now  part of **Label Studio**).

Since **pip** failed to install it I decided to go with **Docker** and followed the [guide to install it](https://docs.docker.com/get-docker/).
Once that was done I could open [Label Studio](https://github.com/HumanSignal/label-studio) by running `docker run -it -p 8080:8080 -v label-studio/data heartexlabs/label-studio:latest`.

![Label Studio next to the terminal running it.](2024-03-20.png)

~~Note that the account will be **forgotten**.~~

Turns out that I had a ton of stopped containers and images, seen using `docker ps -a` and `docker images` which I removed by using `docker rmi <IMAGE ID>` and `docker rm <CONRAINER ID>`. No wonder my login was forgotten, I kept starting new ones!

After running `docker run ...` you should have a container listed in `docker ps -a` which you can start/stop with `docker start/stop <CONTAINER ID>`. This is quite a hassle for a single machine since **Docker** was made for clusters but it's easy to learn.
