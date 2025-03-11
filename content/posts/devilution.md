+++
title = "DevilutionX"
summary = "Reviving Diablo"
date = 2025-03-11T08:10:34+01:00
draft = false
tags = ['devilution', 'games']
+++
I've been playing [DevilutionX](https://github.com/diasurgical/devilutionX) in preparation for **Fam plays** since,
while it does not have cheats per-se, you can move and copy save files (the path is [probably in here](https://github.com/diasurgical/devilutionX/blob/master/docs/installing.md)).

### Save files for version 1.5.3

[My Save Files](/devilution.zip) have the stash (Gillian) chock-full of goodies, both the [*Diablo*](https://en.wikipedia.org/wiki/Diablo_(video_game)) (.sv) and [*Hellfire*](https://en.wikipedia.org/wiki/Diablo%3A_Hellfire) (.hsv) versions, although *Hellfire* reset everything and the save has more pages with assorted items.

[*Hellfire*](https://en.wikipedia.org/wiki/Diablo%3A_Hellfire) brought extra spells, oils, the Monk class and 8 new levels.

If you're using Windows you may find the [Bobafett Hero Editor](https://github.com/iccugs/bobafett_compiled_with_cheat_table)/[Cheat Engine](https://fearlessrevolution.com/viewtopic.php?t=16678) useful as well as other tools by [Diasurgical](https://github.com/diasurgical).

### Resources (courtesy of [Mistral](https://chat.mistral.ai/chat))
- [Ladik MPQ Editor](https://www.hiveworkshop.com/threads/ladiks-mpq-editor.249562/) (this is an older version but it extracts well)
- [Zezula MPQ Editor](https://www.zezula.net/en/mpq/download.html)
- [StormLib](https://github.com/ladislav-zezula/StormLib) (what the MPQ Editors use)
- [Ghast's Groto](https://mgpat-gm.github.io/index.html)

It missed [this one](http://www.guardiansofjustice.com/diablo/Frames/Fileindex.htm) which is no wonder as many links are dead.

*Update:* The lisfiles on **Diasurgical** are more complete, like the one for [save-games](https://github.com/diasurgical/devilutionx-mpq-tools/blob/main/data/save-listfile.txt).

### Version 1.6 Modding

On version 1.6 (development) I was able to change some parameters by having a **txtdata** folders with .TSV (tab-separated-values). You can get the original files [from the repository](https://github.com/diasurgical/DevilutionX/tree/master/assets/txtdata) and place it in the data folder (with your .sv/.hsv save-files) then change them accordingly. Make sure that you do not run an older version or it will overrite your save-files.

Here's an example `spell/spelldat.tsv` where every spell gets cheaper to cast with each level (minMana is 1):
```
id	name	soundId	bookCost10	staffCost10	manaCost	flags	bookLevel	staffLevel	minIntelligence	missiles	manaMultiplier	minMana	staffMin	staffMax
Firebolt	Firebolt	CastFire	100	5	6	Fire,Targeted	1	1	15	Firebolt	1	1	40	80
Healing	Healing	CastHealing	100	5	5	Magic,AllowedInTown	1	1	17	Healing	3	1	20	40
Lightning	Lightning	CastLightning	300	15	10	Lightning,Targeted	4	3	20	LightningControl	1	1	20	60
Flash	Flash	CastLightning	750	50	30	Lightning	5	4	33	FlashBottom,FlashTop	2	1	20	40
Identify	Identify	CastSkill	0	10	13	Magic,AllowedInTown	-1	-1	23	Identify	2	1	8	12
FireWall	Fire Wall	CastFire	600	40	28	Fire,Targeted	3	2	27	FireWallControl	2	1	8	16
TownPortal	Town Portal	CastSkill	300	20	35	Magic,Targeted	3	3	20	TownPortal	3	1	8	12
StoneCurse	Stone Curse	CastFire	1200	80	60	Magic,Targeted	6	5	51	StoneCurse	3	1	8	16
Infravision	Infravision	CastHealing	0	60	40	Magic	-1	-1	36	Infravision	5	1	0	0
Phasing	Phasing	CastFire	350	20	12	Magic	7	6	39	Phasing	2	4	40	80
ManaShield	Mana Shield	CastFire	1600	120	33	Magic	6	5	25	ManaShield	0	1	4	10
Fireball	Fireball	CastFire	800	30	16	Fire,Targeted	8	7	48	Fireball	1	1	40	80
Guardian	Guardian	CastFire	1400	95	50	Fire,Targeted	9	8	61	Guardian	2	1	16	32
ChainLightning	Chain Lightning	CastFire	1100	75	30	Lightning	8	7	54	ChainLightning	1	1	20	60
FlameWave	Flame Wave	CastFire	1000	65	35	Fire,Targeted	9	8	54	FlameWaveControl	3	1	20	40
DoomSerpents	Doom Serpents	CastFire	0	0	0	Lightning	-1	-1	0		0	0	40	80
BloodRitual	Blood Ritual	CastFire	0	0	0	Magic	-1	-1	0		0	0	40	80
Nova	Nova	CastLightning	2100	130	60	Magic	14	10	87	Nova	3	1	16	32
Invisibility	Invisibility	CastFire	0	0	0	Magic	-1	-1	0		0	0	40	80
Inferno	Inferno	CastFire	200	10	11	Fire,Targeted	3	2	20	InfernoControl	1	1	20	40
Golem	Golem	CastFire	1800	110	100	Fire,Targeted	11	9	81	Golem	6	1	1	32
Rage	Rage	CastHealing	0	0	15	Magic	-1	-1	0	Rage	1	1	0	0
Teleport	Teleport	CastSkill	2000	125	35	Magic,Targeted	14	12	105	Teleport	3	1	16	32
Apocalypse	Apocalypse	CastFire	3000	200	150	Fire	19	15	149	Apocalypse	6	1	8	12
Etherealize	Etherealize	CastFire	2600	160	100	Magic	-1	-1	93	Etherealize	0	1	2	6
ItemRepair	Item Repair	CastSkill	0	0	0	Magic,AllowedInTown	-1	-1	255	ItemRepair	0	0	40	80
StaffRecharge	Staff Recharge	CastSkill	0	0	0	Magic,AllowedInTown	-1	-1	255	StaffRecharge	0	0	40	80
TrapDisarm	Trap Disarm	CastSkill	0	0	0	Magic	-1	-1	255	TrapDisarm	0	0	40	80
Elemental	Elemental	CastFire	1050	70	35	Fire	8	6	68	Elemental	2	1	20	60
ChargedBolt	Charged Bolt	CastFire	100	5	6	Lightning,Targeted	1	1	25	ChargedBolt	1	1	40	80
HolyBolt	Holy Bolt	CastFire	100	5	7	Magic,Targeted	1	1	20	HolyBolt	1	1	40	80
Resurrect	Resurrect	CastHealing	400	25	20	Magic,AllowedInTown	-1	5	30	Resurrect	0	1	4	10
Telekinesis	Telekinesis	CastFire	250	20	15	Magic	2	2	33	Telekinesis	2	1	20	40
HealOther	Heal Other	CastHealing	100	5	5	Magic,AllowedInTown	1	1	17	HealOther	3	1	20	40
BloodStar	Blood Star	CastFire	2750	180	25	Magic	14	13	70	BloodStar	2	1	20	60
BoneSpirit	Bone Spirit	CastFire	1150	80	24	Magic	9	7	34	BoneSpirit	1	1	20	60
Mana	Mana	CastHealing	100	5	255	Magic,AllowedInTown	-1	5	17	Mana	3	1	12	24
Magi	the Magi	CastHealing	10000	20	255	Magic,AllowedInTown	-1	20	45	Magi	3	1	15	30
Jester	the Jester	CastHealing	10000	20	255	Magic,Targeted	-1	4	30	Jester	3	1	15	30
LightningWall	Lightning Wall	CastLightning	600	40	28	Lightning,Targeted	3	2	27	LightningWallControl	2	1	8	16
Immolation	Immolation	CastFire	2100	130	60	Fire	14	10	87	Immolation	3	1	16	32
Warp	Warp	CastSkill	300	20	35	Magic	3	3	25	Warp	3	1	8	12
Reflect	Reflect	CastSkill	300	20	35	Magic	3	3	25	Reflect	3	1	8	12
Berserk	Berserk	CastSkill	300	20	35	Magic,Targeted	3	3	35	Berserk	3	1	8	12
RingOfFire	Ring of Fire	CastFire	600	40	28	Fire	5	5	27	RingOfFire	2	1	8	16
Search	Search	CastSkill	300	20	15	Magic	1	3	25	Search	1	1	8	12
RuneOfFire	Rune of Fire	CastHealing	800	30	255	Magic,Targeted	-1	-1	48	RuneOfFire	1	10	40	80
RuneOfLight	Rune of Light	CastHealing	800	30	255	Magic,Targeted	-1	-1	48	RuneOfLight	1	10	40	80
RuneOfNova	Rune of Nova	CastHealing	800	30	255	Magic,Targeted	-1	-1	48	RuneOfNova	1	10	40	80
RuneOfImmolation	Rune of Immolation	CastHealing	800	30	255	Magic,Targeted	-1	-1	48	RuneOfImmolation	1	10	40	80
RuneOfStone	Rune of Stone	CastHealing	800	30	255	Magic,Targeted	-1	-1	48	RuneOfStone	1	10	40	80
```
