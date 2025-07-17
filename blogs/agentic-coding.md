---
title: "I don't want to review code"
author: "Joona Gynther"
date: "2025-07-18"
---

I previously wrote some generic thoughts on LLM-based AI, ["On artificial intelligence"](https://gynther.xyz/ravings/on-ai). This time I am writing on a more tangible issue, that I am at least somewhat competent to comment on, **using AI in professional software development**.

I write software professionally, and get reasonably paid to do so.  I consider my work to be on a "large scale". At non-trivial scale simple things become hard and everything breaks – all the time.

Generally I have access to whatever tools I choose to use – AI or not.

## Agentic software development
There appears to be a large number of visionaries who now believe the future of software development will look very different from today. Instead of humans writing code, humans will instead use multiple agents that autonomously work on problems, increasing productivity by X-fold.

It is easy to see where this idea stems from. Models produce code much much faster than humans, and other than money, there is no limitation to the parallelism that could be achieved. In theory, output scales linearly with the number of autonomous agents.

I don't believe in this future.

## Code reviews

Agentic coding shifts the work I need to do from coding to reviewing. I ask the model to produce what I need, try to ascertain if it actually produced it and if it actually works.

I don't want to review code.

We review code because we make mistakes. Having code reviewed makes us accountable for the code we propose. It makes us create solutions we think are _good_, not just _working_. Every line of code we add is a maintenance burden, and more importantly, a liability.

I don't review code because I particulary want to, we do it to keep up the rigour – to build systems that let us sleep.

Reviewing is much slower than writing. It does not scale linearly with code, but at least quadratically.

_More code = bad_

## A broken value proposition

The hard part is not writing code, it's building systems that _deterministically_ do what we think they do. It involves a lot more than just churning out code: dissecting problems, design and architecture, complexity of integration, testing, stakeholders, observability and maybe most importantly, ownership.

![IBM training manual 1979](/static/images/agentic-coding/ibm.jpg)
> You might have seen this IBM slide floating around the internet. At least IBM seems to attribute it to a 1979 training manual [1].

Someone needs to own the things we create. Someone needs to call the shots. Without ownership everything eventually rots. In order to create something of high quality we need to own it.

Model's can't own what they generate. That burden falls on the generatyr. We humans have an annoying tendency to use the path of least resistance. Generating code gives us an easy way out.

Anecdotally I have observed this with regard to consultants. In my experience outsourcing lowers system quality. Having been a consultant for a brief moment, I can understand why: the priorities are completely different. Consultants are paid for delivering projects and generally do not stick around for the long term.

The value proposition of agentic coding is the same: trade _quality_ and _control_ for **speed**.

## METR study
[METR](https://metr.org/) released an interesting paper this month: [Measuring the Impact of Early-2025 AI on
Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

The core finding is fascinating. Despite forecasts from both industry and economic experts, and the developers who participated in the study themselves, use of AI tools **slowed down** development.

![Graph from METR study](/static/images/agentic-coding/metr-1.png)

METR contracted experienced maintainers of high quality open-source projects for a randomized controlled trial. The developers proposed tasks from their respective projects they would like to contribute. Each task was then randomly assigned to either allow or disallow the use of AI tools. Most developers used Cursor Pro with Claude 3.5/3.7 Sonnet – frontier models at the time of the study.

![Graph from METR study](/static/images/agentic-coding/metr-2.png)
> Developer time split between activities [2]

One of the factors the authors propose to cause this slowdown is the low reliability of these AI tools. While generative AI tools clearly reduce the amount of time spent on coding, they also introduce new overhead.

To quote the paper:

> When using Cursor, developers accept <44% of the generations. When developers do not accept
generations, we observe a mix of reattempting with different prompts, and giving up (i.e. reverting
the proposed changes).

> This relatively low reliability qualitatively results in significant wasted time, as developers often
spend time reviewing, testing, or modifying AI generated code before they decide to reject it. One
developer notes that he “wasted at least an hour first trying to [solve a specific issue] with AI”
before eventually reverting all code changes and just implementing it without AI assistance.

> Developers further note that even when they accept AI generations, they spend a significant amount
of time reviewing and editing AI generated code to ensure it meets their high standards. 75% report
that they read every line of AI generated code, and 56% of developers report that they often need to
make major changes to clean up AI code—when asked, 100% developers report needing to modify
AI generated code. One developer comments that AI generated code resulted in “more to fix up, in
terms of code conventions, code style”. Another developer says “I accept [AI generated code] [...]
then I feel like I do a lot of simplifying its code.”

Note: the authors caution not to overgeneralize these findings. They state that size and maturity of the projects, and developer familiarity contribute to the slowdown.

## Perfect is the enemy of good

As the aphorism goes.

I have argued for quality here, but I have to acknowledge my own bias. I tend to aim for _perfect_ solutions rather than _good_ ones. Art of the "good enough" is hard.

If you can make something working fast, why shouldn't you? We make tradeoffs between quality and speed all the time. Why is the one using generative AI any different?

There is nothing more permanent than a temporary solution. You can only fix speed for quality with an astronomical amount of pain. But, the technology gets better every day. I only argue that _speed_ is the wrong issue to solve for. Solving for speed does not give the value general benchmarks of model performance would lead us to believe.

There are further innovations that will follow this technology.

--

I will continue writing code. I like it. It's artisanal. It's the closest thing to magic I can do in our universe.

---

Published on 18.7.2025 by Joona Gynther. You can find me on [LinkedIn](https://www.linkedin.com/in/joona-gynther/).

---

[1] https://www.ibm.com/think/insights/ai-decision-making-where-do-businesses-draw-the-line

[2] METR study, figure 18, https://arxiv.org/pdf/2507.09089
