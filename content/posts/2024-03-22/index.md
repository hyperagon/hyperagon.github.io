+++
title = 'Darknet 2'
summary = 'What to do with labeled images.'
date = 2024-03-22T15:18:47Z
draft = false
tags = ['yolo', 'label-studio', 'goal 3', 'resources', 'jupyter notebook']
+++
Ok everything is getting messy so let's organize.
First off, there are long paths since everything went to the *darknet* folder so let's fix it by using variables.

To see how they work we can do a little test.

![How to use a variable in Jupyter.](variable.png)

So let's restart.

```
from google.colab import drive
drive.mount('/content/gdrive', force_remount=True)

root_dir = "/content/gdrive/MyDrive/Colab Notebooks/"
base_dir = root_dir + 'Cars/'

DN = "/content/darknet"
!git clone https://github.com/AlexeyAB/darknet $DN # Makes a darknet folder



```
