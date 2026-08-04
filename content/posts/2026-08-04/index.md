+++
title = "Tools on Llama.cpp"
summary = "Good grief"
date = 2026-07-04T08:10:34+01:00
draft = false
tags = ['llm', 'ai']
+++
I finally had [Llama.cpp](https://github.com/ggml-org/llama.cpp) serve an *LLM* with **tools** enabled,
it was just a matter of convincing it that it had tools... What is it with these models not trusting the user?

![Local Tools](2026-08-03.png)

It was unable to get the date right since it was in a different language but that was easily fixed by instruxting it to use `date --iso-8601` to get a *YYYY-MM-DD* format, no need to translate numbers.
