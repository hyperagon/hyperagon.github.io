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

## Add Licenses

```
licenses
	City-Ship
	Militia
	Navy
	"Navy Auxiliary"
	"Navy Carrier"
	"Navy Cruiser"
	Pilot's
	Remnant
	"Remnant Capital"
	Wanderer
	"Wanderer Outfits"
	Coalition
	Heliarch
account
```

## Get credits

```
account
	credits 1000000000000000
	"salaries income"
		"Free Worlds" 2100
```

## Add Cloaking

Either add `cloak 0.04` to your ship's attributes or a `Cloking Device` to its outfits.

Press **C** to cloak, note that you can't fire weapons or hail planets while cloaked.

## Add Outifts (they all take mass but outfits space will go negative and still work)

```
	outfits
	...
	"Cargo Expansion" 99
	"Fuel Pod" 99
  ```

While you could just edit the ships *fuel* and *cargo space* not all parameters work.

### Huge Thrusters (but also fastest)

```
	outfits
	...
	"Tyrant Plasma Steering"
	"Tyrant Plasma Thruster"
```

### Add Quarg equipment (Alien technology is mostly better)

```
	outfits
	...
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

### Ultimate (Vyuir) ship (You can find it at Kanguwa but you'll never capture it)

```
ship vyu-Ir
	name Solemnity
	noun entity
	sprite ship/vyuir/vyuir
		"frame rate" 4.0000002
	thumbnail thumbnail/vyuir
	"never disabled"
	swizzle 0
	uuid 553341ea-546d-48b4-a2b0-eec5ad7bc2e7
	attributes
		category "Heavy Warship"
		cost 77777777
		mass 1400
		"flare sound" "impulse engine"
		"reverse flare sound" "impulse engine"
		"steering flare sound" "impulse engine"
		automaton 1
		bunks 100
		"cargo space" 1000
		cloak 0.04
		"disruption protection" 2
		drag 30
		"energy capacity" 60000
		"energy generation" 80
		"energy protection" 2
		"engine capacity" 1000
		"force protection" 1
		"fuel capacity" 1000
		"gun ports" 5
		"heat dissipation" 6.7
		"heat generation" 20
		hull 49000
		"hull repair rate" 1.9
		"ion protection" 2
		"outfit space" 1000
		ramcoop 100
		"required crew" 1
		"reverse thrust" 75
		"reverse thrusting energy" 20
		"reverse thrusting heat" 10
		"scramble protection" 2
		"shield energy" 13
		"shield generation" 13
		shields 68000
		"slowing protection" 1
		thrust 75
		"thrusting energy" 20
		"thrusting heat" 10
		turn 900
		"turning energy" 10
		"turning heat" 5
		"weapon capacity" 1000
	outfits
		"Abyssal Composer"
		"Fate Divider" 2
		"Fate Sealer" 2
		"Jump Drive"
	crew 0
	fuel 1000.0002
	shields 68000
	hull 49000
	position -2905.5565 963.48589
	engine 0 200
		zoom 1
		angle 0
		gimbal 0
		under
	"reverse engine" 0 200
		zoom 1
		angle -360
		gimbal 0
		under
	"steering engine" 0 200
		zoom 1
		angle 0
		gimbal 0
		under
		none
	gun -73 -9 "Fate Sealer"
		under
	gun 73 -9 "Fate Sealer"
		under
	gun -102 -76 "Fate Divider"
		under
	gun 102 -76 "Fate Divider"
		under
	gun 0 -90 "Abyssal Composer"
		under
	explode "huge explosion" 15
	explode "large explosion" 50
	explode "medium explosion" 70
	explode "small explosion" 60
	explode "tiny explosion" 120
	"final explode" "final explosion large" 1
	system Sabik
	planet Longjump
```

### Discover the Hai

Enter the wormhole at `Ultima Thule`.

### Discover the Remnant

Enter the red wormhole at `Terminus`, you'll need a *Quantum Key Stone*, also 500 fuel just to reach them.

### Add Korath equipment (their crew use *Thermal Repeater Rifle*. making it hard to capture them)

```
	outfits
	...
	"Afterburner (Asteroid Class)"
	"Banisher Grav-Turret"
	"Bow Drive (Meteor Class)"
	"Firelight Missile Bank" 2
	"Firelight Storage Rack"
	"Fuel Processor"
	"Grab-Strike Turret" 4
	Hyperdrive
	"Jump Drive"
	"Liquid Sodium Cooler"
	"Outfits Expansion" 2
	"Small Heat Shunt"
	"Steering (Planetary Class)"
	"Systems Core (Medium)"
	"Thermal Repeater Rifle" 196
	"Thruster (Planetary Class)"
	"Triple Plasma Core"
	"Warder Anti-Missile"
```

## Discover Republic/Free Worlds/Syndicate Map

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

## Discover Full Map

```
What you know:
visited "1 Axis"
visited "10 Pole"
visited "11 Autumn Above"
visited "11 Spring Below"
visited "12 Autumn Above"
visited "14 Pole"
visited "14 Summer Above"
visited "14 Winter Below"
visited "16 Autumn Rising"
visited "3 Axis"
visited "3 Pole"
visited "3 Spring Rising"
visited "4 Axis"
visited "4 Spring Rising"
visited "4 Summer Rising"
visited "4 Winter Rising"
visited "5 Axis"
visited "5 Spring Below"
visited "5 Summer Above"
visited "5 Winter Above"
visited "7 Autumn Rising"
visited "8 Winter Below"
visited "9 Spring Above"
visited Ablodab
visited Ablub
visited Acamar
visited Achernar
visited Acnanjo
visited Acrux
visited Actannka
visited Adhara
visited "Ae Ce L-332"
visited "Ae Ce Q-761"
visited "Ae Il A-3"
visited "Ae Il B-11"
visited "Ae Il F-46"
visited "Ae Il G-66"
visited "Ae Il H-24"
visited "Ae Il I-99"
visited "Ae Il M-77"
visited "Ae Il O-96"
visited Aescolanus
visited Aierena
visited "Aik Kamgatake"
visited Aki'il
visited Aksek
visited "Al Dhanab"
visited Albaldah
visited Albireo
visited Alcyone
visited Aldebaran
visited Alderamin
visited Aldhibain
visited Aleit
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
visited Anbrim
visited "Ancient Hope"
visited Ankaa
visited Answer
visited Antares
visited Antevorta
visited Ap'arak
visited Arcturus
visited Arculus
visited Arneb
visited Ascella
visited Asikafarnut
visited Asio
visited Aspidiske
visited Atik
visited Atria
visited Auhru
visited Avior
visited "Avo Chigo"
visited Aya'k'k
visited Beginning
visited Belenos
visited Bellatrix
visited Belonging
visited Belug
visited Belugt
visited "Beta Lupi"
visited Betelgeuse
visited Bloptab
visited Blubipad
visited Blugtad
visited Boral
visited "Bore Fah"
visited "Bosuno Le"
visited "Bote Asu"
visited "Bright Void"
visited "Broken Bowl"
visited Caeculus
visited Canopus
visited Capella
visited Caph
visited Cardax
visited Cardea
visited Castor
visited Cebalrai
visited Celeborim
visited Chikatip
visited Chimitarp
visited Chirr'ay'akai
visited Chornifath
visited Chy'chra
visited Cinxia
visited Citadelle
visited Coluber
visited Companion
visited Convector
visited "Cor Caroli"
visited Cotpoxi
visited Cshudlye
visited "Da Ent"
visited "Da Lest"
visited Dabih
visited Danoa
visited "Dark Hills"
visited Debrugt
visited Delia
visited "Delta Capricorni"
visited "Delta Sagittarii"
visited "Delta Velorum"
visited Deneb
visited Denebola
visited Diphda
visited Dixere
visited Dschubba
visited Dubhe
visited "Due Yoot"
visited Durax
visited E-4183
visited E-9182
visited Eber
visited Eblumab
visited Edusa
visited Eebu
visited "Ehma Ti"
visited Ek'kek'ru
visited Ekuarik
visited "Elabi Choati"
visited Elifennka
visited Elnath
visited "Elo Chigo"
visited Eltanin
visited Empeles
visited Eneremprukt
visited "Eneva Katta"
visited Enif
visited Eogho
visited "Epsilon Leonis"
visited "Era Natta"
visited "Eragaru Le"
visited "Erba Yle"
visited Es'sprak'ai
visited Eshkoshtar
visited Esix
visited Eteron
visited Evrae
visited "Fah Root"
visited "Fah Soom"
visited Fala
visited "Fallen Leaf"
visited "Far Horizon"
visited Farbutero
visited Farinus
visited Faronektu
visited Fasitopfar
visited Fearis
visited "Fell Omen"
visited Feraticus
visited Fereti
visited Feroteri
visited Ferukistek
visited Fingol
visited Flugbu
visited Fomalhaut
visited Fornarep
visited "Four Pillars"
visited Fscher
visited Fumalsamakah
visited Furmeliki
visited G-3191
visited G-6183
visited G-719
visited G-819
visited Gacrux
visited "Gamma Cassiopeiae"
visited "Gamma Corvi"
visited Gaungu
visited "Genta Bo"
visited "Gento Ah"
visited Gerenus
visited Ghhil
visited Gienah
visited Giribea
visited Girtab
visited Glubatub
visited Gomeisa
visited "Good Omen"
visited Gorvi
visited Graffias
visited Gualetri
visited Gupta
visited H-8188
visited H-9187
visited Hadar
visited Hamal
visited Han
visited Hassaleh
visited Hatysa
visited "Heia Due"
visited Hesselpost
visited Heutesl
visited "Hi Yahr"
visited Hintar
visited Holeb
visited Homeward
visited Host
visited Hunter
visited Huud
visited Iigen
visited Iinjma
visited Iise
visited Ik'kara'ka
visited Ildaria
visited Iliniza
visited Ilirco
visited "Imo Dep"
visited Insitor
visited "Io Lowe"
visited "Io Mann"
visited Ipsing
visited "Is Ce B-139"
visited "Is Ce F-422"
visited "Is Ce G-460"
visited "Is Ce J-591"
visited "Is Il T-127"
visited "Is Il T-94"
visited "Is Il V-263"
visited "Is Il X-626"
visited "Is Il Z-59"
visited "Is Il Z-814"
visited Iyech'yek
visited Izar
visited "Jentu Centi"
visited "Jentu Le"
visited Jied
visited Jyelio
visited Ka'ch'chrai
visited Ka'pru
visited Kaliptari
visited Kanguwa
visited "Kappa Centauri"
visited Karhio
visited Kashikt
visited Kasikfar
visited "Kaus Australis"
visited "Kaus Borealis"
visited "Ki War Ek"
visited "Kifrana Terberah"
visited Kilema
visited Kiluit
visited Kiro'ku
visited Kiru'kichi
visited Kneirc
visited Kochab
visited "Kor Ak'Mari"
visited "Kor En'lakfar"
visited "Kor Fel'tar"
visited "Kor Men"
visited "Kor Nor'peli"
visited "Kor Tar'bei"
visited "Kor Zena'i"
visited Kornephoros
visited Korsmanath
visited Kraz
visited Kugel
visited Kursa
visited L-118
visited L-6181
visited "Last Word"
visited Lesath
visited Levana
visited Limen
visited Lire
visited Lloloi
visited Lolami
visited "Lom Tahr"
visited "Lone Cloud"
visited Lucina
visited Lurata
visited M-1188
visited MC-42
visited MS-219
visited Makferuti
visited Maoni
visited Markab
visited Markeb
visited Matar
visited Mebla
visited Meblumem
visited Mebsuta
visited Meftarkata
visited "Mego Faro"
visited "Mego Inito"
visited "Mego Seo"
visited "Mei Yohn"
visited Men
visited Menkalinan
visited Menkar
visited Menkent
visited Merak
visited Mesuket
visited Miaplacidus
visited Miblulub
visited Mimosa
visited Minkar
visited Mintaka
visited Mirach
visited Mirfak
visited Mirzam
visited Misam
visited Mizar
visited Mnashyu
visited Mohuwo
visited Moktar
visited Mora
visited Msalbit
visited Muhlifain
visited Muphrid
visited Naos
visited Naper
visited Nenia
visited Nihal
visited Nnatai
visited Nnaug
visited Nocte
visited Nona
visited Nunki
visited O-3184
visited Oblate
visited Oihaug
visited Ookmya
visited Oosuoro
visited Orbona
visited Orvala
visited Ossipago
visited Paeli
visited Pantica
visited Parca
visited "Paru Paru"
visited Pbelnep
visited Peacock
visited Pelubta
visited Peragenor
visited Peresedersi
visited Perfica
visited Persian
visited Persitar
visited Phact
visited Phecda
visited Pherkad
visited Phurad
visited Piadenli
visited Pik'ro'iyak
visited Plort
visited Polaris
visited Polerius
visited Pollux
visited Porrima
visited Prakacha'a
visited Procyon
visited Ptetubo
visited Ptobeh
visited Pukako
visited Quaru
visited Queri
visited Rajak
visited Rasalhague
visited Rastaban
visited "Rati Cal"
visited "Ravu Kon"
visited Regor
visited Regulus
visited Relifer
visited Remembrance
visited Rigel
visited Ritilas
visited Rouseu
visited Ruchbah
visited Rutilicus
visited Sabik
visited Sabriset
visited Sadalmelik
visited Sadalsuud
visited Sadr
visited "Sagittarius A*"
visited Saiph
visited Salipastart
visited Saquergen
visited Sargas
visited Sarin
visited Sayaiban
visited Scheat
visited Schedar
visited Scija
visited Segesta
visited Seginus
visited Seketra
visited Sepetrosk
visited Sepriaptu
visited "Sera Natta"
visited Sevrelect
visited Shaula
visited Sheratan
visited "Shini Bori"
visited Si'yak'ku
visited Sich'ka'ara
visited Silikatakfar
visited "Silver Bell"
visited "Silver String"
visited Similisti
visited Sirius
visited Skeruto
visited Sko'karak
visited Sobarati
visited Sol
visited "Sol Arach"
visited "Sol Kimek"
visited "Sol Saryd"
visited Solifar
visited Sospi
visited Speloog
visited Spica
visited "Steep Roof"
visited Stercutus
visited Suhail
visited Sumar
visited Tais
visited Talita
visited "Tania Australis"
visited Tarazed
visited Tebuteb
visited Tejat
visited Terminus
visited "Thshybo Le"
visited Thuban
visited Torbab
visited Tortor
visited Tscera
visited Turais
visited U-5188
visited Uelawan
visited Uhebe
visited "Ula Mon"
visited "Ultima Thule"
visited Umbral
visited Unagi
visited Unukalhai
visited "Urba Pest"
visited Uttna
visited "Uwa Fahn"
visited "Uwo Seija"
visited V-2189
visited Vaiov
visited Vanguwo
visited Vega
visited Vesvii
visited Vilacira
visited Vindemiatrix
visited Volax
visited Vorsuke
visited Vulcuja
visited W-3197
visited "Wah Ki"
visited "Wah Oh"
visited "Wah Yoot"
visited Waypoint
visited Wazn
visited Wei
visited Wezen
visited Wreoul
visited "Xutluno Fali"
visited "Xutluno Rees"
visited "Ya Hai"
visited "Yed Prior"
visited Yerser
visited Yli
visited Yllke
visited Yranjiu
visited Zaurak
visited Zeinar
visited "Zeta Aquilae"
visited "Zeta Centauri"
visited Zolpulti
visited Zosma
visited "Zuba Zub"
visited Zubenelgenubi
visited Zubeneschamali
harvedted
```
