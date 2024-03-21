+++
title = 'What to do with Labels'
summary = 'Labeled images and exported files, now what?'
date = 2024-03-21T08:49:39Z
draft = false
tags = ['yolo', 'label-studio']
+++
Kept following [this guide](https://betterdatascience.com/detect-license-plates-with-yolo/) to detect license plates. The whole 

It went to [Google Colab](colab.research.google.com) and set the runtime to a TPU (Tensor Processing Unit).

![How to set the runtime type to TPU](google-colab.png)

I tried to mount Google Drive but got [this issue](https://stackoverflow.com/questions/69822304/google-colab-google-drive-can%C2%B4t-be-mounted-anymore-browser-popup-google-dri). Apparently I was using "Blue's Solution" but [this is what worked](https://stackoverflow.com/questions/57419346/how-can-i-access-my-google-drive-files-from-google-colab), adding a **Files** tab after I agreed to allow the Colab to connect to my Google Drive.

```
from google.colab import drive 
drive.mount('/content/gdrive', force_remount=True)
```

![Access to GoogleDrive](file_acess.png)

Then just copy the folder path. Note that the `Ctrl+c` and `Ctrl+v` shortcuts work despite there being no Copy/Paste option in the context menu (what shows up on right-click).

![Copy folder Path](copy_path.png)

```
from google.colab import drive 
drive.mount('/content/gdrive', force_remount=True)

root_dir = "/content/gdrive/MyDrive/Colab Notebooks/"
base_dir = root_dir + 'Cars/'
```

It then mentions **Darknet**, an open source neural network framework which has several reources ([1](https://github.com/AlexeyAB/darknet), [2](https://github.com/hank-ai/darknet), [3](https://www.ccoderun.ca/programming/darknet_faq/)), I assume it's the open-source version of the [Ultralytics YOLO](https://github.com/ultralytics/ultralytics). which I used earlier to detect cars.

Now set GPU, CUDNN and OPENCV to 1, this is easy to do with Python:

```
# https://stackoverflow.com/questions/39086/search-and-replace-a-line-in-a-file-in-python
f = open('/content/yolo/Makefile', 'r')
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

g = open('/content/yolo/Makefile', 'w')
g.write(lines)
g.close()
```

