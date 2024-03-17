+++
title = 'Prompting'
summary = 'Local Prompts'
date = 2024-03-17T08:20:34Z
draft = false
tags = ['gpt-pilot', 'fabric', 'ollama', 'local']
+++
Trying to direct AIs' is really hard and helper libraries like [GPT-Pilot](https://github.com/Pythagora-io/gpt-pilot) and [Fabric](https://github.com/danielmiessler/fabric) require you to use [ChatGPT](https://chat.openai.com/auth/login) and ask you for a key. There are [guides](https://knasmueller.net/running-fabric-locally-with-ollama) to use local LLMs but it's a mess to get them to work in the first place.

I had to update [Ollama](https://github.com/ollama/ollama) so I re-did `curl -fsSL https://ollama.com/install.sh | sh`. Then `ollama -v` went up to 0.1.0.1.29 and I was able to use the link from [this guide](https://ollama.com/blog/openai-compatibility).

![Angry Llama](angry.png)
