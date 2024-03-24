+++
title = 'Darknet'
summary = 'What to do with labeled images.'
date = 2024-03-21T08:49:39Z
draft = false
tags = ['yolo', 'label-studio', 'goal 3', 'resources', 'google colab', 'jupyter notebook']
+++
Kept following [this guide](https://betterdatascience.com/detect-license-plates-with-yolo/) to detect license plates.
Since I had the labels I moved on to [Google Colab](https://colab.research.google.com). Don't forget to set the runtime to a GPU.

![How to set the runtime type to GPU](google-colab.png)

I tried to mount Google Drive but got [this issue](https://stackoverflow.com/questions/69822304/google-colab-google-drive-can%C2%B4t-be-mounted-anymore-browser-popup-google-dri). Apparently I was using "Blue's Solution". [This is what worked instead](https://stackoverflow.com/questions/57419346/how-can-i-access-my-google-drive-files-from-google-colab), adding a **Files** tab after I agreed to allow the Colab to connect to my Google Drive.

```
from google.colab import drive 
drive.mount('/content/gdrive', force_remount=True)
```

![Access to GoogleDrive](file_acess.png)

Then just copy the folder path. Note that the `Ctrl+c` and `Ctrl+v` shortcuts work ~~despite there being no Paste option~~ (It's under *Edit*) in the context menu (what shows up when you right-click).

![Copy folder Path](copy_path.png)

```
root_dir = "/content/gdrive/MyDrive/Colab Notebooks/"
base_dir = root_dir + 'Cars/'
```

It then mentions **Darknet**, an open source neural network framework which has several reources ([1](https://github.com/AlexeyAB/darknet), [2](https://github.com/hank-ai/darknet), [3](https://www.ccoderun.ca/programming/darknet_faq/)), I assume it's the open-source version of the [Ultralytics YOLO](https://github.com/ultralytics/ultralytics). which I used earlier to detect cars.

```
!git clone https://github.com/AlexeyAB/darknet # Makes a darknet folder
```

Now set *GPU*, *CUDNN* and *OPENCV* to 1, this is easy to do with Python.

```
# https://stackoverflow.com/questions/39086/search-and-replace-a-line-in-a-file-in-python

f = open('/content/darknet/Makefile', 'r')
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
    lines += line
f.close()

g = open('/content/darknet/Makefile', 'w')
g.write(lines)
g.close()
```

Then we compile Darknet.

```
!cd "/content/darknet";make --silent;clear;echo "Darknet Compiled!"
```

Note that anything starting with a bang (!) is a *shell* command and not *Python* so a *print* is equal to an `!echo "Darknet Compiled."`, very smooth ~~Google~~ Jupyter.
Now let's configure YOLO itself.

```
!cp /content/darknet/cfg/yolov3.cfg /content/darknet/cfg/yolov3-train.cfg

f = open('/content/darknet/cfg/yolov3-train.cfg', 'r')
lines = ''
for line in f:
    if line.find('batch=1') != -1:
        lines += line.replace('batch=1', 'batch=64')
        continue
    if line.find('subdivisions=1') != -1:
        lines += line.replace('subdivisions=1', 'subdivisions=16')
        continue
    if line.find('max_batches=500200') != -1:
        lines += line.replace('max_batches=500200', 'max_batches=2000')
        continue
    if line.find('filters=255') != -1:
        lines += line.replace('filters=255', 'filters=18')
        continue
    if line.find('classes=80') != -1:
        lines += line.replace('classes=80', 'classes=1')
        continue
    lines += line
f.close()
```

And make two new files.

```
!echo -e 'license-plate' > /content/darknet/data/obj.names 
!echo -e 'classes = 1\ntrain = /content/darknet/data/train.txt\nvalid = /content/darknet/data/test.txt\nnames = /content/darknet/data/obj.names\nbackup = /content/yolo-license-plates' > /content/darknet/data/obj.data
```

Now we unzip the data.

```
!mkdir data/obj !unzip ../images.zip -d data/obj
```

Get the YOLO weights.

```
!cd /content/darknet;wget https://pjreddie.com/media/files/darknet53.conv.74
```

And use **Darknet**.

```
!cd *content/darknet;./darknet detector train data/obj.data cfg/yolov3-train.cfg darknet53.conv.74 -dont_show
```

# To be continued.
