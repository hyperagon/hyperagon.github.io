+++
title = "2006scape Cheats"
summary = "Another Runescape emulation"
date = 2025-08-22T08:10:34+01:00
draft = false
tags = ['2006scape', 'games']
+++
I didn't miss this one, it was just harder to setup than *2009scape* since its instructions relied on [IntelliJ](https://www.jetbrains.com/idea/) instead of plain *Command Line/Terminal*. I got it working and made a pull request with the new files but you can just use the [source](https://github.com/2006-Scape/2006Scape).

Anyway, onto cheating. The `::commands` are sparse but the savefiles are in plain text (.TXT), meaning that you can just logout and edit them (after a refresh since it saves on logout). These can be found at `2006Scape/2006Scape Server/data/characters/`

Want all skills at 99/99? Replace *[SKILLS]* with:
```
[SKILLS]
character-skill = 0	99	200000000
character-skill = 1	99	200000000
character-skill = 2	99	200000000
character-skill = 3	99	200000000
character-skill = 4	99	200000000
character-skill = 5	99	200000000
character-skill = 6	99	200000000
character-skill = 7	99	200000000
character-skill = 8	99	200000000
character-skill = 9	99	200000000
character-skill = 10	99	200000000
character-skill = 11	99	200000000
character-skill = 12	99	200000000
character-skill = 13	99	200000000
character-skill = 14	99	200000000
character-skill = 15	99	200000000
character-skill = 16	99	200000000
character-skill = 17	99	200000000
character-skill = 18	99	200000000
character-skill = 19	99	200000000
character-skill = 20	99	200000000
character-skill = 21	99	200000000
character-skill = 22	99	200000000
character-skill = 23	99	200000000
character-skill = 24	99	200000000
```

Want lots of gold and runes? Replace *[ITEMS]* with:
```
[ITEMS]
character-item = 0	1352	1
character-item = 1	591	1
character-item = 2	304	1
character-item = 3	1266	1
character-item = 4	1926	1
character-item = 5	1932	1
character-item = 6	2348	1
character-item = 7	996	999999999
character-item = 8	1756	1
character-item = 9	2328	1
character-item = 10	2328	1
character-item = 11	555	999999999
character-item = 13	557	999999999
character-item = 14	559	999999999
character-item = 15	556	999999999
character-item = 16	558	999999998
character-item = 17	560	999999999
character-item = 18	561	999999999
character-item = 19	562	999999999
character-item = 21	563	999999999
character-item = 22	564	999999999
character-item = 23	565	999999999
character-item = 24	566	999999999
character-item = 25	567	999999999
```

Or just those in the bank? Replace *[BANK]* with:
```
[BANK]
character-bank = 0	996	999999999
character-bank = 1	557	999999999
character-bank = 2	559	999999999
character-bank = 3	555	999999999
character-bank = 4	556	999999999
character-bank = 5	558	999999999
character-bank = 6	560	999999999
character-bank = 7	561	999999999
character-bank = 8	562	999999999
character-bank = 9	563	999999999
character-bank = 10	564	999999999
character-bank = 11	565	999999999
character-bank = 12	566	999999999
character-bank = 13	567	999999999
```

You could also do it with **2009scape**, it has [JSON](https://www.json.org/json-en.html) files in the `2009Scape/game/data/players/` directory, yet those files are huge, making it a lot less convenient.
