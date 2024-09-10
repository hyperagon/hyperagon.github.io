+++
title = "Naev Cheats"
summary = "Getting to the fun faster."
date = 2024-09-05T08:10:34+01:00
postedon = 2024-08-14T08:10:34+01:00
draft = false
tags = ['naev']
+++
[Naev](https://naev.org/) is a pretty nice [open-source](https://github.com/naev/naev/) game, made with a mixture of [C](https://en.wikipedia.org/wiki/C_(programming_language)) (it uses the [SDL](https://www.libsdl.org/) library) and [Lua](https://www.lua.org/).

Anyway, the game is quite slow (the bigger the ship the slower) and it takes ages to get to the *heavy stuff*
so I looked to [cheat and found a page ,which is outdated,](http://denshack.blogspot.com/2016/05/naev-cheats.html) then I digged around and made my own list.

### Resources
- https://naev.fandom.com/wiki/Naev_Wiki
- https://naev.org/api/index.html
- https://github.com/naev/naev/wiki/FAQ
- [Fam plays Naev 0.11.5](https://www.youtube.com/watch?v=Z0GeD2DV7Zk&list=PLoa8A9b-8ZhFvQz0Lh-c6-4tFGsBeVg7z)

# Naev codes Verified for version 0.11.5

Hit **F2** to enter codes, **Ctrl+V** works.

You can also chain commands, split by space.

`player.outfitAdd("Local System Map") player.refuel()`

## [Invincibility](https://naev.org/api/modules/pilot.html#setInvincible)

`player.pilot():setInvincible(true)`

#### Make target invinciblle (use it on your interceptors)

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

`player.teleport("Sol", true)`

#### Visit Pirate Systems (**!!** and **\*** means that you can't land there)

`player.teleport("Quorel")`

`player.teleport("New Haven")`

#### The only way to reach the Debug System

`player.teleport("Zied")`

## [Get money](https://naev.org/api/modules/player.html#pay)

`player.pay(1000000000)`

## [Disable Target](https://naev.org/api/modules/pilot.html#disable) (stops after boarding)

`player.pilot():target():disable(true)`

## [Kill Target](https://naev.org/api/modules/pilot.html#kill) (["With great power comes great responsibility"](https://youtu.be/guuYU74wU70?t=71))

`player.pilot():target():kill()`

## [Add outfit to player](https://naev.org/api/modules/player.html#outfitAdd) (default quantity is 1)

`player.outfitAdd("Laser Cannon MK1", 2)`

`player.outfitAdd("Laser Turret MK1", 4)`

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

`player.outfitAdd("Left Boot")`
`player.outfitAdd("Love Letter")`
`player.outfitAdd("Pilot Doll")`
`player.outfitAdd("Satellite Mock-up")`
`player.outfitAdd("Swamp Bombing")`
`player.outfitAdd("Toy Drone")`
`player.outfitAdd("Sandwich Holder")`
`player.outfitAdd("Fuzzy Dice")`

#### Flow abilities (your ship needs the appropriate Sirius equipment)

`player.outfitAdd("Seeking Chakra")`
`player.outfitAdd("Feather Drive")`
`player.outfitAdd("Cleansing Flames")`
`player.outfitAdd("Astral Projection")`
`player.outfitAdd("Avatar of Sirichana")`
`player.outfitAdd("Reality Rip")`
`player.outfitAdd("House of Mirrors")`

Or complete the challenge after contacting (Y) the Obelisk (not all exist)

`player.teleport("Ulysses") player.pilot():setPos( vec2.new(8040.138268, -4638.671909) )`

`player.teleport("Churchill") player.pilot():setPos( vec2.new(4792.821912, -10961.912544) )`

`player.teleport("Anarbalis") player.pilot():setPos( vec2.new(14731, 5908.31) )`

`player.teleport("Aesir") player.pilot():setPos( vec2.new(-2743.756474, 5429.310318) )`

## [Get another ship](https://naev.org/api/modules/player.html#shipAdd) (must be on a planet, swap in the *Equipment* tab)

`player.shipAdd("Hawking")`

`player.shipAdd("Empire Peacemaker")`

`player.shipAdd("Ze'lek Diablo")`

`player.shipAdd("Sirius Divinity")`

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
`faction.modPlayerRaw("Wild Ones", 100)`
`faction.modPlayerRaw("Dreamer Clan", 100)`
`faction.modPlayerRaw("Black Lotus", 100)`

## Discover systems, including neighbors (second true)

`system.get("Qorel"):setKnown(true, true)`
`system.get("Eneguoz"):setKnown(true, true)`
`system.get("Uhriabi"):setKnown(true, true)`
`system.get("Pas"):setKnown(true, true)`
`system.get("Effetey"):setKnown(true, true)`

## [Change chapter](https://naev.org/api/modules/player.html#chapterSet)

`player.chapterSet(2)`

## [Set Fleet Capacity](https://naev.org/api/modules/player.html#fleetCapacitySet) (You get 100 on Chapter 1)

`player.fleetCapacitySet(100)`

# Walkthrough

## Empire

You may find **Liutenant Czesc** in a (Spaceport) Bar and he'll give long-distance missions and unlock new types of cargo missions. (some will require a standing of 15 with the Empire)

After doing 2 *Liutenant Czesc* missions you may find **Commander Soldner** in a (Spaceport) Bar at *Gamma Polaris* and he'll give dangerous missions then unlock *Heavy Weapon License* and *Heavy Combat Vessel License* in some shops.

In chapter 1, after doing missions for *Commander Soldner* you may find **Lt. Commander Dimitri** at the *Omega Enclave* (in Fortitude), follow his missions then **Commodore Keer** will swap for him and tell you to crush the *ESS Trinity* (in Rockbed, get there through Fortitude -> Pontus -> Rockbed) then to join the battle on *C-00*. You will be able to buy *Drones* after.

## Sirius

If you go to **Eye of Night** and investigate the distress signal (Ruined Station) you'll get Flow abilities.

`player.teleport("Eye of Night") player.pilot():setPos( vec2.new(8314, -21828) )`

Then see *Starring Fyrra* in *Trall* and she'll show you the location of the Kal Tok Obelisk (it's in Ulysses), talk with it with Y and complete its puzzle to obtain the `Seeking Chakra` activated outfit.

`player.teleport("Eye of Night") player.pilot():setPos( vec2.new(-3759, -8180) )`

## Most Factions

To go to **Chapter 1** you need to sell *Therite*, *Kermite* and *Vixilium* to a ship near a construction site then leave the system.
