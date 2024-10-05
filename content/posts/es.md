+++
title = "Endless Sky Cheats"
summary = "Getting to the fun faster."
date = 2024-10-02T08:10:34+01:00
postdate = 2024-08-14T08:10:34+01:00
draft = false
tags = ['endless sky']
+++
[Endless Sky]((https://endless-sky.github.io/)) is another [open-source](https://github.com/endless-sky/endless-sky) game, made with [C++](https://en.wikipedia.org/wiki/C++).

Similar to [NAEV](https://naev.org/) it was inspired by the **Escape Velocity** gane.
I looked to [cheat and found a discussion,](https://steamcommunity.com/app/404410/discussions/0/154645427521143152/) then I digged around and made my own list to avoid needing [plugins](https://endless-sky.github.io/plugins.html) / [Cheat Engine](https://www.cheatengine.org/).

### Resources

- https://endless-sky.github.io/
- https://github.com/endless-sky/endless-sky
- https://github.com/endless-sky/endless-sky/wiki/PlayersManual
- https://endless-sky.fandom.com/wiki/Endless_Sky_Wiki
- https://www.reddit.com/r/endlesssky/
- [Fam plays ES 0.10.8](https://www.youtube.com/watch?v=H8Ja1rXFIQQ&list=PLoa8A9b-8ZhHNbTAPue7R5ZQ8NgUa11rt)

# Verified for version 0.10.8

## [Save File Location](https://www.reddit.com/r/endlesssky/comments/ob0vsy/where_are_savefiles_located/) (each snapshot is a .TXT file)

### Windows
`C:\Users\yourusername\AppData\Roaming\endless-sky\saves\`    

### Linux
`~/.local/share/endless-sky/saves/`

### [Mac OS / OS X](https://steamcommunity.com/app/404410/discussions/0/492379439666619018/)
`~/Library/ApplicationSupport/endless-sky/saves/`

"The Library folder is hidden by default on recent OS X versions. See [this article](
http://www.macworld.com/article/2057221/how-to-view-the-library-folder-in-mavericks.html) to show it."

## Add Outifts (they all take mass but outfits space will go negative and still work)

```
	"Cargo Expansion" 99
	"Fuel Pod" 99
  ```

While you could just edit the ships *fuel* and *cargo space* not all parameters work.

### Replace Thrusters

```
	"Tyrant Plasma Steering"
	"Tyrant Plasma Thruster"
```

## Discover Map (so much for Endless)

Replace the following

```
# What you know:
...
harvested
```

by

```
# What you know:
visited Acamar
visited Achernar
visited Acrux
visited Adhara
visited "Al Dhanab"
visited Albaldah
visited Albireo
visited Alcyone
visited Aldebaran
visited Alderamin
visited Aldhibain
visited Algenib
visited Algieba
visited Algol
visited Algorel
visited Alheka
visited Alhena
visited Alioth
visited Alkaid
visited Almaaz
visited Almach
visited Alnair
visited Alnasl
visited Alnilam
visited Alnitak
visited Alniyat
visited "Alpha Arae"
visited "Alpha Centauri"
visited "Alpha Hydri"
visited Alphard
visited Alphecca
visited Alpheratz
visited Alpherg
visited Altair
visited Aludra
visited Ankaa
visited Antares
visited Arcturus
visited Arneb
visited Ascella
visited Aspidiske
visited Atik
visited Atria
visited Avior
visited Belenos
visited Bellatrix
visited "Beta Lupi"
visited Betelgeuse
visited Canopus
visited Capella
visited Caph
visited Cardax
visited Castor
visited Cebalrai
visited Citadelle
visited "Cor Caroli"
visited Dabih
visited Danoa
visited "Delta Capricorni"
visited "Delta Sagittarii"
visited "Delta Velorum"
visited Denebola
visited Diphda
visited Dschubba
visited Dubhe
visited Durax
visited Eber
visited Elnath
visited Eltanin
visited Enif
visited "Epsilon Leonis"
visited Eteron
visited Fala
visited Fingol
visited Fomalhaut
visited Fumalsamakah
visited Gacrux
visited "Gamma Cassiopeiae"
visited "Gamma Corvi"
visited Gienah
visited Girtab
visited Gomeisa
visited Gorvi
visited Graffias
visited Hadar
visited Hamal
visited Han
visited Hassaleh
visited Hatysa
visited Hintar
visited Holeb
visited Ildaria
visited Ipsing
visited Izar
visited "Kappa Centauri"
visited "Kaus Australis"
visited "Kaus Borealis"
visited Kochab
visited Kornephoros
visited Kraz
visited Kugel
visited Kursa
visited Lesath
visited Limen
visited Lolami
visited Lurata
visited Markab
visited Markeb
visited Matar
visited Mebsuta
visited Men
visited Menkalinan
visited Menkar
visited Menkent
visited Merak
visited Miaplacidus
visited Mimosa
visited Minkar
visited Mintaka
visited Mirach
visited Mirfak
visited Mirzam
visited Misam
visited Mizar
visited Moktar
visited Mora
visited Muhlifain
visited Muphrid
visited Naos
visited Naper
visited Nihal
visited Nocte
visited Nunki
visited Oblate
visited Orbona
visited Orvala
visited Peacock
visited Persian
visited Phact
visited Phecda
visited Pherkad
visited Phurad
visited Polaris
visited Pollux
visited Porrima
visited Procyon
visited Rajak
visited Rasalhague
visited Rastaban
visited Regor
visited Regulus
visited Rigel
visited Ruchbah
visited Rutilicus
visited Sabik
visited Sadalmelik
visited Sadalsuud
visited Sadr
visited Saiph
visited Sargas
visited Sarin
visited Scheat
visited Schedar
visited Seginus
visited Shaula
visited Sheratan
visited Sirius
visited Sol
visited Sospi
visited Spica
visited Suhail
visited Sumar
visited Tais
visited Talita
visited "Tania Australis"
visited Tarazed
visited Tejat
visited Terminus
visited Thuban
visited Tortor
visited Turais
visited "Ultima Thule"
visited Umbral
visited Unagi
visited Unukalhai
visited Vega
visited Vindemiatrix
visited Volax
visited Wazn
visited Wei
visited Wezen
visited "Yed Prior"
visited Zaurak
visited "Zeta Aquilae"
visited "Zeta Centauri"
visited Zosma
visited Zubenelgenubi
visited Zubeneschamali
harvested
```

### Add Quarg euipment (Alien tedchnology is simply better)

```
	outfits
	"Antimatter Core"
	"Intrusion Countermeasures" 20
	"Jump Drive"
	"Medium Graviton Steering"
	"Medium Graviton Thruster"
	"Nanotech Battery"
	"Quantum Shield Generator"
	"Quarg Anti-Missile" 2
	"Quarg Skylance" 4
```
