+++
title = "Friction Graphics"
summary = "Scalable Animations"
date = 2026-09-03T08:10:34+01:00
draft = false
tags = ['animation', 'friction graphics', 'werbvg']
+++
So I've been using [Friction Graphics](https://friction.graphics/) and found one bug, but the console doesn't really help.
```
Friction 1.0.0-rc.3 - https://friction.graphics
Using FFmpeg "4.2.11-friction" 3678052
Only C and default locale supported with the posix collation implementation
Only C and default locale supported with the posix collation implementation
Case insensitive sorting unsupported in the posix collation implementation
Numeric mode unsupported in the posix collation implementation
qt.qpa.wayland: Wayland does not support QWindow::requestActivate()
```

What happens is that the animation does not play (stuck at `Cache: 0%`) yet I can move the timeline and that changes,
this happened after exporting to a video file (*.MKV* and *.MP4*) the animation is irrelevant.
The files produced look fine so it's a reminder to save **BEFORE** you render/export.

Just [try it](follow_path.friction). It does not play, I tried changing to Render to Image Sequence but no luck.

I also suspect that the *WebVG* icons are actually [Lucide Icons](https://lucide.dev/icons/), they look similar.
With an [ISC License](https://en.wikipedia.org/wiki/ISC_license) it's fair I suppose.
