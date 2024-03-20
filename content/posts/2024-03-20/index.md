+++
title = 'Label Studio'
summary = 'How to set up Label Studio locally.'
date = 2024-03-20T00:02:03Z
draft = false
tags = ['docker', 'label-studio']
+++
I was looking up some guides but they are rather outdated. I found [this one](https://betterdatascience.com/detect-license-plates-with-yolo/) which used [LabelIMG](https://github.com/HumanSignal/labelImg) (now  part of **Label Studio**).

First of all I needed a way to get **Docker** so I followed the [guide](https://docs.docker.com/get-docker/).
Once that was done I could open [Label Studio](https://github.com/HumanSignal/label-studio) by running `docker run -it -p 8080:8080 -v label-studio/data heartexlabs/label-studio:1.6.0`, use it and export a *JSON* file.
![Label Studio next to the terminal running it](2024-03-20.png)

I had to kill the container later on, using `docker ps` to list containers and `docker kill <ID>`. I'm new to docker and really thought that stopping a container would suffice but the address was still directing me to that website.

~~Note that the account will be **forgotten**.~~

Turns out that I had a ton of stopped containers and images, seen using `docker images` and trying to remove them by using `docker rmi <IMAGE ID>` and `docker rm <CONRAINER ID>`. No wonder my login was forgotten, I kept starting new ones!

After running `docker run ...` you should have a container listed in `docker ps -a` which you can start/stop with `docker start/stop <CONTAINER ID>`. This is quite a hassle for a single machine since **docker** was made for clusters. 😅️
