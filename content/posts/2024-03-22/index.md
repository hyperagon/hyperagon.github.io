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

Now we replace paths with the DN variable accordingly (Note: Skip if not using GPU).

```
# https://stackoverflow.com/questions/39086/search-and-replace-a-line-in-a-file-in-python

f = open(DN + '/Makefile', 'r')
lines = ''
for line in f:
    if line.find('GPU=0') != -1:
        lines += line.replace('GPU=0', 'GPU=1')
        continue
    if line.find('CUDNN=0') != -1:
        lines += line.replace('CUDNN=0', 'CUDNN=1')
        continue
    if line.find('OPENCV=0') != -1:
        lines += line.replace('OPENCV=0', 'OPENCV=1')
        continue
1    lines += line
f.close()

g = open(DN + '/Makefile', 'w')
g.write(lines)
g.close()
```

```
!mkdir "$DN/data"; mkdir "$DN/data/obj"
!unzip -q "$base_dir/cars.zip" -d "$DN/data/obj"
```

Now we can compile **Darknet***.

```
!cd $DN; make --silent; clear; echo "Darknet Compiled!"
```


