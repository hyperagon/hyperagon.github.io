+++
title = "Pingus Cheats"
summary = "In case it freezes."
date = 2025-05-19T08:10:34+01:00
draft = false
tags = ['games']
+++
[Pingus](https://pingus.seul.org/) is quite an old game (1998) but it's short and a nice [Lemmings](https://en.wikipedia.org/wiki/Lemmings_(video_game)) clone.

### Setup

I used [Flatpak](https://flatpak.org/), following [this guide](https://www.clearlinux.org/node/30116.html):
```
sudo apt install flatpak
flatpak install flathub org.seul.pingus
flatpak run org.seul.pingus
```

### Unlock all levels

- Run it once
- Edit /home/username/.var/app/org.seul.pingus/config/pingus-0.8/savegames/savegames.scm

```
(pingus-savegame
  (levels
    (level
      (filename "tutorial/digger-tutorial2-grumbel")
      (status "accessible")
      (time 1960)
      (saved-pingus 10))
    (level
      (filename "tutorial/floater-tutorial-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow7-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow8-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/basher-tutorial-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow9-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow10-grumbel")
      (status "accessible")
      (time 4944)
      (saved-pingus 20))
    (level
      (filename "tutorial/snow11-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/jumper-tutorial-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow12-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow22-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/miner-tutorial2-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow17-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow16-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow20-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/bomber-tutorial2-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow15-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow14-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow21-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/solid-tutorial-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))
    (level
      (filename "tutorial/snow19-grumbel")
      (status "accessible")
      (time 0)
      (saved-pingus 0))))

;; EOF ;;
```

It's not a very a hard game but it occasionally freezes.
