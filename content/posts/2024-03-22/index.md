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

And unzip the files.

```
!mkdir "$DN/data"; mkdir "$DN/data/obj"
!unzip -q "$base_dir/cars.zip" -d "$DN/data/obj"
```

Now we can compile **Darknet***.

```
!cd $DN; make --silent; clear; echo "Darknet Compiled!"

```

Then we set **YOLO** up:

```
!cp $DN/cfg/yolov3.cfg $DN/cfg/yolov3-train.cfg

f = open(DN + '/cfg/yolov3-train.cfg', 'r')
lines = ''
for line in f:
    if line.find('batch=1') != -1:
        line = line.replace('batch=1', 'batch=64')
    if line.find('subdivisions=1') != -1:
        line = line.replace('subdivisions=1', 'subdivisions=16')
    if line.find('max_batches=500200') != -1:
        line = line.replace('max_batches=500200', 'max_batches=2000')
    if line.find('filters=255') != -1:
        line = line.replace('filters=255', 'filters=18')
    if line.find('classes=80') != -1:
        line = line.replace('classes=80', 'classes=1')
    lines += line
f.close()
with open(DN + '/cfg/yolov3-train.cfg', 'w') as f:
  f.write(lines)
```

Don't forget to make `obj.names` and `obj.data`.

```
!echo -e 'license-plate' > $DN/data/obj.names
!echo -e 'classes = 1\ntrain = ${DN}/data/trQEain.txt\nvalid = ${DN}/data/test.txt\nnames = ${DN}/data/obj.names\nbackup = ${DN}/yolo-license-plates' > $DN/data/obj.data
```

Unzip the training data.

```
!mkdir "$DN/data";
!unzip -q "$base_dir/cars.zip" -d "$DN/data/"
```

Make a list of all training images.

```
!find $DN/data/obj/images/* > $DN/data/train.txt
```

Now we can merge the labels and the images.

```
!mv $DN/data/obj/labels/* $DN/data/
```

Now we the weights.

```
!cd $DN;wget https://pjreddie.com/media/files/darknet53.conv.74
```
And, finally, run Darknet.

```
!cd $DN;./darknet detector train $DN/data/obj.data /content/darknet/cfg/yolov3-train.cfg /content/darknet/darknet53.conv.74 -dont_show
```

I got `Error: You set incorrect value batch=1 for Training! You should set batch=64 subdivision=64` since I wasn't writing what I changed. so I fixed it.

Then I got issues with the placement so I set everything (both labels and images) to go in the data folder.

Got "Can't open label file. (This can be normal only if you use MSCOCO) ..." and it made me wonder [where I should place labels](https://stackoverflow.com/questions/66263909/cant-open-label-file-this-can-be-normal-only-if-you-use-mscoco-yolo).

I tried to include a labels.txt and referencing it with `labels = labels.txt` but still get warning that it can't be found in images/*.txt... But it does look like it'a not stopping.


