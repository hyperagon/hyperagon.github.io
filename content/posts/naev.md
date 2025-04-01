+++
title = "NAEV Cheats"
summary = "Getting to the fun faster."
date = 2024-10-02T08:10:34+01:00
postdate = 2024-08-14T08:10:34+01:00
draft = false
tags = ['naev', 'games']
+++
[NAEV](https://naev.org/) is a pretty nice [open-source](https://github.com/naev/naev/) game, made with a mixture of [C](https://en.wikipedia.org/wiki/C_(programming_language)) (it uses the [SDL](https://www.libsdl.org/) library) and [Lua](https://www.lua.org/).

Anyway, the game is quite slow (the bigger the ship the slower) and it takes ages to get to the *heavy stuff*
so I looked to [cheat and found a page ,which is outdated,](http://denshack.blogspot.com/2016/05/naev-cheats.html) then I digged around and made my own list.

### Resources

- https://naev.fandom.com/wiki/Naev_Wiki
- https://naev.org/api/index.html
- https://github.com/naev/naev/wiki/FAQ
- [Fam plays Naev 0.11.5](https://www.youtube.com/watch?v=Z0GeD2DV7Zk&list=PLoa8A9b-8ZhFvQz0Lh-c6-4tFGsBeVg7z)

# Verified for version 0.11.5

Hit **F2** to enter codes, **Ctrl+V** works.

You can also chain commands, split by space.

`player.outfitAdd("Local System Map") player.refuel()`

## [Invincibility](https://naev.org/api/modules/pilot.html#setInvincible)

`player.pilot():setInvincible(true)`

#### Make fleet invincible (not couting your ship or interceptors)

`for _,Ship in pairs(player.fleetList()) do Ship:setInvincible() end`

#### Make target invincible (use it on your interceptors)

`player.pilot():target():setInvincible(true)`

## [Set Armor and Shield (Percentage)](https://naev.org/api/modules/pilot.html#setHealth)

`player.pilot():setHealth(100, 100)`

## [Set Energy (Percentage)](https://naev.org/api/modules/pilot.html#setEnergy)

`player.pilot():setEnergy(100)`

## [Reload](https://naev.org/api/modules/pilot.html#fillAmmo)

`player.pilot():fillAmmo()`

## [Refuel](https://naev.org/api/modules/player.html#refuel)

`player.refuel()`

## Get local map

`player.outfitAdd("Local System Map")`

## Get full map

`player.outfitAdd("Ultra Map")`

Or learn [Lua](https://www.lua.org/) and hard-code it...

`for _,S in pairs(system.getAll()) do S:setKnown(true, true) end`

## [Teleport](https://naev.org/api/modules/player.html#teleport) (does not work while landed)

`player.teleport("Gamma Polaris")`
`player.teleport("Halir")`
`player.teleport("New Mars")`
`player.teleport("Polaris Prime")`
`player.teleport("Emperor's Fist")`

`player.teleport("Sol", true)`

#### Visit Pirate Systems (**!!** means that you can't land there)

`player.teleport("Quorel")`

`player.teleport("New Haven")`

#### The only way to reach the Debug System

`player.teleport("Zied")`

## [Get money](https://naev.org/api/modules/player.html#pay) (can be negative)

`player.pay(1000000000)`

## [Disable Target](https://naev.org/api/modules/pilot.html#disable) (permanent if false)

`player.pilot():target():disable(false)`

## [Kill Target](https://naev.org/api/modules/pilot.html#kill) (["With great power comes great responsibility"](https://youtu.be/guuYU74wU70?t=71))

`player.pilot():target():kill()`

Or if you're a [megalomqaniac](https://www.youtube.com/watch?v=wDgQdr8ZkTw), kill everything.

`for _,Enemy in pairs(player.pilot():getEnemies()) do Enemy:kill() end`
`for _,Ally in pairs(player.pilot():getAllies()) do Ally:kill() end`

## [Add outfit to player](https://naev.org/api/modules/player.html#outfitAdd) (default quantity is 1)

`player.outfitAdd("Laser Cannon MK1", 2)`

`player.outfitAdd("Laser Turret MK1", 4)`

#### An easy way to get rare outfits

`player.outfitAdd("Antimatter Lance")`

`player.outfitAdd("Energy Harpoon", 2)`

#### For bay slots (with an airplane) you can use docks or bays (hold the **6** key to use)

`player.outfitAdd("Lancelot Bay", 2)`

`player.outfitAdd("Hyena Bay", 2)`

#### Licenses (regardless of requirements)

`player.outfitAdd("Medium Weapon License")`

`player.outfitAdd("Heavy Weapon License")`

`player.outfitAdd("Light Combat Vessel License")`

`player.outfitAdd("Medium Combat Vessel License")`

`player.outfitAdd("Heavy Combat Vessel License")`

#### Accessories (you get these from some missions)

`player.outfitAdd("Love Letter")`
`player.outfitAdd("Pilot Doll")`
`player.outfitAdd("Satellite Mock-up")`
`player.outfitAdd("Swamp Bombing")`
`player.outfitAdd("Toy Drone")`
`player.outfitAdd("Sandwich Holder")`
`player.outfitAdd("Fuzzy Dice")`
`player.outfitAdd("Cyborg Feather")`
`player.outfitAdd("Broken Nebula Shielding Prototype")`
`player.outfitAdd("Trading Card (Common)")`
`player.outfitAdd("Trading Card (Uncommon)")`
`player.outfitAdd("Left Boot")`
`player.outfitAdd("Fancy Key Chain#")`
`player.outfitAdd("Star of Valor")`

#### Flow abilities (your ship needs the appropriate Sirius equipment)

`player.outfitAdd("Seeking Chakra")`
`player.outfitAdd("Feather Drive")`
`player.outfitAdd("Cleansing Flames")`
`player.outfitAdd("Astral Projection")`
`player.outfitAdd("Avatar of Sirichana")`
`player.outfitAdd("Reality Rip")`
`player.outfitAdd("House of Mirrors")`

#### Or complete the challenge after contacting (Y) the Obelisk (not all exist)

`player.teleport("Kal Atok Obelisk")`

`player.teleport("Kal Nuit Obelisk")`

`player.teleport("Kal Vora Obelisk")`

`player.teleport("Kal Maro Obelisk")`

`player.teleport("Kal Sitra Obelisk")`

## [Get another ship](https://naev.org/api/modules/player.html#shipAdd) (must be on a planet with a Shipyard, swap in the *Equipment* tab)

`player.shipAdd("Hawking")`

`player.shipAdd("Goddard")`

`player.shipAdd("Empire Peacemaker")`

`player.shipAdd("Ze'lek Diablo")`

`player.shipAdd("Sirius Divinity")`

`player.shipAdd("Pirate Kestrel")`

## [Add cargo to ship](https://naev.org/api/modules/pilot.html#cargoAdd) (capped by ships cargo)

`player.pilot():cargoAdd("Therite", 1000)`

`player.pilot():cargoAdd("Kermite", 1000)`

`player.pilot():cargoAdd("Vixilium", 1000)`

## [Set player's standing with a faction](https://naev.org/api/modules/faction.html#modPlayerRaw) (like/hate is respectively 100/-100)

`faction.modPlayerRaw("Goddard", 100)`
`faction.modPlayerRaw("Empire", 105)`
`faction.modPlayerRaw("Soromid", 100)`
`faction.modPlayerRaw("Sirius", 100)`
`faction.modPlayerRaw("Za'lek", 100)`
`faction.modPlayerRaw("Frontier", 190)`
`faction.modPlayerRaw("Dvaered", 100)`
`faction.modPlayerRaw("Traders Society", 100)`

#### Pirates

`faction.modPlayerRaw("FLF", 100)`
`faction.modPlayerRaw("Collective", 100)`
`faction.modPlayerRaw("Raven Clan", 100)`
`faction.modPlayerRaw("Wild Ones", 100)`
`faction.modPlayerRaw("Dreamer Clan", 100)`
`faction.modPlayerRaw("Black Lotus", 100)`

## [Add Intrinaic Outfit](https://naev.org/api/modules/pilot.html#outfitAddIntrinsic) (see these in "Toggle Display")

`player.pilot():outfitAddIntrinsic("Port & Polish")`

`player.pilot():outfitAddIntrinsic("Gauntlet Deluxe")`

`player.pilot():outfitAddIntrinsic("Internal Flow Amplifier")`

## [Discover systems](https://naev.org/api/modules/system.html#setKnown), including neighbors (second true)

`system.get("Qorel"):setKnown(true, true)`
`system.get("Eneguoz"):setKnown(true, true)`
`system.get("Uhriabi"):setKnown(true, true)`
`system.get("Pas"):setKnown(true, true)`
`system.get("Effetey"):setKnown(true, true)`

## [Change chapter](https://naev.org/api/modules/player.html#chapterSet) (Desn't actually change things)

`player.chapterSet(2)`

## [Set Fleet Capacity](https://naev.org/api/modules/player.html#fleetCapacitySet) (You get 100 on Chapter 1)

`player.fleetCapacitySet(100)`

## Set pilot/ship limits (percentage)

`player.pilot():intrinsicSet( "fbay_health", 200 )`
`player.pilot():intrinsicSet( "fbay_damage", 200 )`
`player.pilot():intrinsicSet( "fbay_capacity", 200 )`
`player.pilot():intrinsicSet( "fbay_rate", 200 )`
`player.pilot():intrinsicSet( "fbay_reload", 200 )`
`player.pilot():intrinsicSet( "cargo_mod", 300 )`
`player.pilot():intrinsicSet( "fuel_mod", 200 )`
`player.pilot():intrinsicSet( "ew_jump_detect", 200 )`
`player.pilot():intrinsicSet( "ew_detect", 200 )`
`player.pilot():intrinsicSet( "misc_hidden_jump_detect", 1 )`
`player.pilot():intrinsicSet( "misc_instant_jump", 1 )`
`player.pilot():intrinsicSet( "misc_reverse_thrust", 1 )`

# Walkthrough

## Empire

You may find **Liutenant Czesc** in a (Spaceport) Bar and he'll give long-distance missions and unlock new types of cargo missions. (some will require a standing of 15 with the Empire)

`player.teleport("Halir")`

After doing 2 *Liutenant Czesc* missions you may find **Commander Soldner** in a (Spaceport) Bar at *Gamma Polaris* and he'll give dangerous missions then unlock *Heavy Weapon License* and *Heavy Combat Vessel License* in some shops.

`player.teleport("Halir")`

In chapter 1, after doing missions for *Commander Soldner* you may find **Lt. Commander Dimitri** at the *Omega Enclave* (in Fortitude), follow his missions then **Commodore Keer** will swap for him and tell you to crush the *ESS Trinity* (in Rockbed, get there through Fortitude -> Pontus -> Rockbed) then to join the battle on *C-00*. You will be able to buy *Drones* after.

`player.teleport("Omega Enclave")`

## Dvaered / FLF

You will find two ships in Zacron, help one to start that factions mission line.

`player.teleport("Zacron")`

## Sirius

If you go to **Eye of Night** and investigate the distress signal (Ruined Station) you'll get Flow abilities.

`player.teleport("Eye of Night") player.pilot():setPos( vec2.new(8314, -21828) )`

Then see *Starring Fyrra* in *Traal* and she'll show you the location of the Kal Tok Obelisk (it's in Ulysses), talk with it with Y and complete its puzzle to obtain the `Seeking Chakra` activated outfit.

`player.teleport("Traal")`

## Raven Clan

Do mission for *Lucas* and you'll end up finding that you can accept missions for them in *Shangris Station*, located in **Pas**.

`player.teleport("Shangris Station")`

## Wild Ones

Complete all missions in *Minerva Station*, located in **Limbo**. You'll then be told to go to **New Haven** to get your reward.

`player.teleport("Minerva Station")`
`player.teleport("New Haven")`

## Most Factions

To go to **Chapter 1** you need to sell *Therite*, *Kermite* and *Vixilium* to an *Administrator* near a construction site then leave the system.

To increase fleet capacity you can do the missions in *Taiomi* found by exploring one of the derelict ships in *Bastion*.
