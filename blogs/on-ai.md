---
title: "On artificial intelligence"
author: "Joona Gynther"
date: "2025-06-26"
---
AI is both incredibly powerful and widely misused. Apologies in advance—this post has been brewing in my head for the past two years and will be a bit of a rant.

--

My first experience with LLMs is from sometime in 2021, when I got access to GPT-3 Beta, roughly four years ago. In 2023 ChatGPT had awoken the ~~the dark side~~ _the business side_  to the possibilities of the technology and jump-started the arms race of dot-ai companies. Sometime after, while I was at AWS, I spent _a lot_ of time trying to understand the technology and how it would fit into enterprise systems.

> "Now we use Generative AI powered by multi-modal Foundation Models ("LLMs") integrated with Retrieval Augmented Generation (RAG) and AI Knowledge Graphs via Model Context Protocol (MCP) to build dynamic agentic Enterprise AI systems. Prompt-engineered to perfection, the AGI system took over everyone's jobs at 15:47 yesterday."
– Me via Claude Sonnet 4.0 and ChatGPT

Wait, no, did we already stop doing prompt engineering?

## H1/2025
As reported by [FT](https://www.ft.com/content/9edc67e6-96a9-4d2b-820d-57bc1279e358), [TechCrunch](https://techcrunch.com/2025/06/20/mira-muratis-thinking-machines-lab-closes-on-2b-at-10b-valuation/), [Crunchbase](https://news.crunchbase.com/venture/biggest-seed-round-ai-thinking-machines-mira-murati/) and any number of others last week, [Mira Murati](https://en.wikipedia.org/wiki/Mira_Murati), former CTO of OpenAI, founded Thinking Machines Lab with an eye-watering seed round of US$2 billion at $10 billion valuation. "Seed" as in initial funding. Yeah.

According to [TechCrunch](https://techcrunch.com/2025/06/18/here-are-the-24-us-ai-startups-that-have-raised-100m-or-more-in-2025/) during H1/2025 24 AI startups have raised rounds over US$100 million, totaling over $48.62 billion:

OpenAI ($40000M), Anthropic ($3500M), Anysphere (Cursor) ($900M), Lambda ($480M), SandboxAQ ($450M), Runway ($308M), Together AI ($305M), Harvey ($300M), Abridge ($250M), Celestial AI ($250M), Shield AI ($240M), Lila Sciences ($200M), ElevenLabs ($180M), Glean ($150M), Hippocratic AI ($141M), Reflection.Ai ($130M), Turing ($111M), Nexthop AI ($110M), Insilico Medicine ($110M), Eudia ($105M), Snorkel AI ($100M), LMArena ($100M), TensorWave ($100M), EnCharge AI ($100M)

> Wait, why don't I have an AI startup?

Maybe that sheds some light on the current state of things.

## Your management knows nothing

Because I can't write to save my life, I will instead quote this incredible article by Nikhil Suresh: [I Will Fucking Piledrive You If You Mention AI Again](https://ludic.mataroa.blog/blog/i-will-fucking-piledrive-you-if-you-mention-ai-again/). If you haven't read it, stop everything you are doing and go read it. I do warn: it is, eh, strongly worded.

> And then some absolute son of a bitch created ChatGPT, and now look at us. Look at us, resplendent in our pauper's robes, stitched from corpulent greed and breathless credulity, spending half of the planet's engineering efforts to add chatbot support to every application under the sun when half of the industry hasn't worked out how to test database backups regularly.

If you don't work at the tiny fraction of companies with clear use cases for AI, whatever "AI" you are working on was decided to be a strategic direction because your management was at the golf course with someone else's management.

They know as much about this as they did about blockchain or quantum computing – i.e., nothing.

According to the Stanford Institute for Human-Centric AI's [_"The 2025 AI Index"_ report](https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf), most companies that report financial impacts from AI adoption either saw ≤10% cost reductions or ≤5% revenue increases. Numbers small enough to make me doubt if you can even reliably measure and attribute these effects to AI initiatives – or to anything for that matter.

For almost all companies, these AI initiatives have either very little impact, if any at all.

I want to be honest with you: whatever "AI" you are working on is probably a steaming pile of bullshit. No customer asked for it, it improved nothing about your core competencies and wasted an incredible amount of time and money.

## So is AI useless?

No. It is incredibly useful.

## But...

But it is not what you are being sold either. If these AI systems were as gamechanging as they are made to be, no company would ever have started selling them. They would have been kept a secret and used to win capitalism. If the most profitable thing to do is sell shovels, maybe it is a good opportunity to step back and really have a think.

Instead of focusing on fundamentally improving the technology most companies selling AI are trying to work around fundamental technological limitations by building more and more sophisticated ways to interact with these models. Essentially they are building better and better tech demos to convince you to buy their brand of a shovel.

Even though that shovel was built from a shaft sold by Nvidia and a blade from OpenAI, at least it has a cool paint job!

So no, software developers won't get replaced by AI agents. The only people who say so are the ones selling AI agents. You don't need to stop everything to start shoving AI into your organizations workflows to prepare for "the future of work".

## So what should I do?

Don't make a chatbot.
[Don't fire your customer support staff.](https://www.independent.co.uk/news/business/klarna-ceo-sebastian-siemiatkowski-ai-job-cuts-hiring-b2755580.html)
Just to be clear on those.

If you are looking to actually successfully test AI, look at your actual problems. Find one with a clear, small scope where AI being able to bring _small, incremental_ improvements is a reasonable hypothesis. Define clear objectives. Don't reframe the metrics after the fact. Check the performance against a control. LLMs are good at small tasks involving natural language processing.

Don't lie to yourself; if it does not work, kill it.

Or, focus on solving those actual long standing issues at your org.

#### Bad example
"Let's improve customer service with AI"

#### Slightly less bad example
"Our customer service is spending a lot of time triaging issues. Maybe they can use AI to be more efficient."

#### Good example
"We think triaging issues takes too long on average in customer service engagements. Let's test automatically tagging a portion of tickets with better category information. We can measure the difference of ticket resolution time between tagged and untagged issues while keeping customer satisfaction as a control variable."

### How to win at capitalism

The recipe is actually simple: focus on solving problems. Focus on being the best at your core business. Listen to your customers: ask them what they need.

Build something so good that it cons your customers into thinking they are so happy with your products that they continue being your customers for decades to come.

I will wear a fancy suit and come tell this to your management at 500 bucks an hour.

---

> "If you are going to ascribe everything we do to being greedy, at least give us credit for being greedy long (value creation) and not greedy short (screwing over customers)." – [Gaben](https://en.wikipedia.org/wiki/Gabe_Newell)

---

## Closing
I have become very burned out by the technology I used to be super enthusiastic about. But with the current direction of things we are only heading towards a huge disappointment, which will again postpone the adoption of useful ML by organizations.

Maybe I get annoyed enough to build something useful. Maybe I don't. I have almost learned to not jinx myself by saying I won't do something.

Thanks for listening to my TED talk.

---

Published on 26.6.2025 by Joona Gynther. You can find me on [LinkedIn](https://www.linkedin.com/in/joona-gynther/).

---
