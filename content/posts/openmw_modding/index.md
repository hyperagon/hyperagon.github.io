+++
title = "OpenMW Modding"
summary = "Modding is the ultimate form of Cheating"
date = 2026-06-08T08:10:34+01:00
draft = false
tags = ['modding', 'openmw']
+++
*Modding is the ultimate form of cheating* and I made a video that will come out after I'm done completing [OpenMW](https://openmw.org/). Parts of this overlap with what was done in [this guide](https://openmw.readthedocs.io/en/stable/manuals/openmw-cs/tour.html).

For starters let's do an Elixir that recovers everything.
![Elixir](1.png)

Let's put it indide the left-most vase after going down from the Silt Strider on Balmora.
![Find the Object](2.png)

Then edit that record to have that new item.
![Edit that record to have it](3.png)

And let's also make a *Cheater's Amulet* with the same effect but constant (every second).
![Make an Amulet](4.png)

Now we need to clone Fargoth or any other NPC.
![Make an NPC](5.png)

Then edit his/her dialog.
![Edit Dialog](6.png)

In the scripts you can use things like `player->addItem "p_elixir" 1` to gert that item and `"Fam"->resurrect()` to make the NPC immortal.
