---
title: "Using embeddings to search complex data models (Magic: the Gathering cards)"
author: "Joona Gynther"
date: "2023-12-29"
---

In real life data gets complicated. It's not all just nice numbers that neatly form connections. Especially because we humans use something called language to communicate. It is sort of a badly defined, ever-changing mess with a lot of implicit things that are just assumed to be understood, either from context or just as generally known facts.

## So what are embeddings?

On a high level an embedding is a projection of an item into a vector. Specifically it is a projection into a (relatively) low dimensional, dense [latent space](https://en.wikipedia.org/wiki/Latent_space). Mathematically a _latent space_ is defined as a [manifold](https://en.wikipedia.org/wiki/Manifold) in which similar items are located close to each other. Usually the dimensionality of the latent space is lower than that of the [feature space](<https://en.wikipedia.org/wiki/Feature_(machine_learning)#Feature_vectors>), essentially making it a form of data compression. An embedding is the position of an item in this n-dimensional latent space — a vector.

In the case of language, a text embedding is a projection of a piece of text into a fixed-length vector that is located in n-dimensional space close to similar pieces of text. Similarity is defined by [semantic](https://en.wikipedia.org/wiki/Semantic_similarity) rather than lexicographical similarity, which basically means text is grouped by its actual meaning rather than the words that make it up.

As arbitrary length text is projected into a fixed-length vector, it is essentially also a form of lossy compression.

### An example

Let's imagine we have numbers where every digit is either a 1 or a 4. We have a need to understand how our collection of 1s and 4s relate to each other. We can represent the amount of each in 2-dimensional space as a (x, y) coordinate.

![Visualized 1s and 4s in 2d-space](/static/images/semantic-magic/1-4-embedding.png)

We can see that numbers that have a lot of 4s are physically close each other, same as numbers with a lot of 1s. Numbers with a mix would fall somewhere in between. We could add any number of dimensions to capture the same relationship between any numbers, but the visualizations are not meaningful past 3-dimensional space. But that does not matter. The idea, and the math, work the same in any n-dimensional space.

While the example is completely trivial as our items were already numbers, the idea of embeddings is not anymore complex. They are a way of capturing the relationship between your items as how "close" or similar they are.

In reality you use a machine learning model to learn these relationships and convert your items into a vector representation. The outputted vectors and dimensions would make no sense to a human, and they don't have to. Finding how similar items are becomes an exercise in [simple algebra](https://en.wikipedia.org/wiki/Cosine_similarity).

It is not a perfect process but that does not matter, it is _very_ useful.

![Visualized 1s and 4s in 3d-space](/static/images/semantic-magic/1-4-2-embedding.png)

### In practice

Embeddings can be used for efficient similarity search, which turns out to be really useful. A lot of problems can be framed in terms of similarity:

- _Search_: Find items similar to a search query
- _Recommendation systems_: Recommend similar items
- _Media search_: Find media similar to other media (images, video, audio) or text
- _Classification_: Classify items by the most similar label
- _Anomaly detection_: Detect items with little similarity
- _Translation_: Find similar meaning in other languages

## Our data model

[Magic: the Gathering](https://en.wikipedia.org/wiki/Magic:_The_Gathering) (or Magic or MTG) is a collectible card game originally released in 1993. The main idea is simple: you construct a deck of cards and use it to battle your opponent. You cast spells, summon creatures and use artifacts all depicted by their individual, physical (or digital) cards. First player to reduce their opponents life total to 0 wins the game.

Magic has over 30 years of individual cards with, for all intents and purposes, completely arbitrary rules defined in natural language that define what a card actually does when played.

There are something like [27 431 unique](https://scryfall.com/search?q=color%3C%3DWUBRG&unique=cards&as=grid&order=name) Magic cards, well except some cards have another card on their flip side and... eh.. it gets complicated. Point is there are a lot of cards that have unique and complex interactions with each other based on complex natural language rules.

For the purposes of this blog, you don't have to understand how Magic works, if you want to you can get started [here](https://magic.wizards.com/en/how-to-play). Beware, [the comprehensive rules](https://magic.wizards.com/en/rules) for Magic are _currently_ a 287 page document.

Magic cards will act as a proxy to anything defined in complex natural language to demonstrate how embeddings can help us use our more complex data.

### Anatomy

![Anatomy of a magic card](/static/images/semantic-magic/anatomy.png)

A Magic card is made up of ~5 attributes that ultimately define how it works: name, mana cost, type line, power/toughness and most importantly rules text. This is simplifying it as there are also attributes that can be derived from these like the color of a card.

- Name: the _who_ of a Magic card. There are restrictions to how many cards of the same name you can have in a deck. Some cards also interact with cards based on name.
- Type line: defines _what_ a card is. Is it a creature that gets summoned on to the board or a spell that has an effect and then gets placed into the graveyard of used cards.
- Mana cost: in Magic what you can do is restricted by a resource called _mana_. Most things cost mana to do. Playing cards and activating abilities of said cards usually costs mana.
- Power and toughness: for mostly creatures, power defines how much damage that card deals when attacking or defending and toughness defines how much damage it can take before dying.
- Rules text: arbitrary text that defines _what_ a card does. It can include things like keywords that define common functionality, abilities that can be activated and effects that trigger on certain events.

### Why

When constructing a Magic deck and building your strategy it is not only important what your cards are but what they do. Interactions between cards are complex and you want to build a strategy where your cards have ample synergy between each other to ultimately win you the game.

There are tools for searching Magic cards by their attributes like the official [Gatherer](https://gatherer.wizards.com/Pages/Default.aspx) and (way) better community managed resources like [Scryfall](https://scryfall.com/). Attribute based search can be problematic when functionally same effects on cards can be (and are) worded in wildly different ways.

I often find myself looking for cards that _"are similar to x"_ or _"do y"_ which can be very difficult or impossible to turn into a search query.

There are two possible solutions to figure out what a card actually _does_: either formalize the rules text into rigid, parsable structure or use natural language processing. While the former is a mighty undertaking, it is possible. Various digital versions of Magic have parsing engines to turn rules into gameplay.

## How

Let's take a step back. Our problem is we need to be able to search Magic cards, not to understand them or to definitively answer the question of what they do. We simply need to be able to rank cards based on similarity. A job that is perfect for embeddings.

I used [llmrails/ember-v1](https://huggingface.co/llmrails/ember-v1) embedding model that's, at the time of writing, ranked first for reranking on the [Massive Text Embedding Benchmark](https://huggingface.co/spaces/mteb/leaderboard). Ember-v1 is available under a MIT license.

I used the model through the [SentenceTransformers](https://www.sbert.net/) library to make my life easier, but you could use it directly through Hugging Face Transformers as well.

Code provided here is just snippets and you can find full source code on [Github](https://github.com/JGynther/semantic-magic).

### Preparing data

I'm using bulk card data from [Scryfall](https://scryfall.com/docs/api/bulk-data). The dataset I used contained 30 321 card objects. The full schema for a card can be seen [here](https://scryfall.com/docs/api/cards). However, we are only interested in a few fields that define more or less what a card does when played: type line and rules text. While the other attributes outlined above also affect gameplay, my hypothesis is that they don't matter for finding _similar_ cards.

We can construct a basic function to extract the fields into a string:

```python
def construct_embedding_string(card: dict[str, str]):
    type_line = card["type_line"]
    oracle_text = card.get("oracle_text", "") # rules text
    text = " ".join([type_line, oracle_text])
    return text
```

And preprocessing the JSON dump of cards:

```python
with open("oracle-cards.json") as file:
    data = json.loads(file.read())

cards = [construct_embedding_string(card) for card in data]
```

### Encoding cards

To turn our strings into embeddings - encode them - we can use SentenceTransformers which abstracts away a lot of the work. This step can be sped up with a GPU. In my case I used my M1 MacBook Air to run the inference in ~15 minutes.

You could also use any other embedding models like those available in Embedding APIs like [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/embeddings.html). The important part is that you can only compare embeddings made with the same model against each other. Comparing between models would result in completely nonsense results.

```python
model_id = "llmrails/ember-v1"
model = SentenceTransformer(model_id)

embeddings = model.encode(cards, normalize_embeddings=True)
torch.save(embeddings, "embeddings.pt") # save embeddings to disk
```

### Vector search

We could directly compare our embedding vectors using something like `numpy.dot` to calculate the similarity score. To make it easier and simpler, I am going to use [Faiss](https://github.com/facebookresearch/faiss). Faiss is a library for efficient similarity search of dense vectors (such as embeddings), created by Meta's Fundamental AI Research group.

Faiss will create an index into RAM based on our embeddings we can then use for nearest neighbor search. The idea is that we will find K most similar cards (K nearest neighbors) for a given embedding vector based on a similarity metric (i.e. cosine similarity). Since our embedding vectors were normalized (length = 1), calculating the dot product (or inner product) is the same as cosine similarity.

The index of a card in our original JSON, the embeddings we created and in the Faiss index will be the same. So there is no fancy mechanism for connecting embeddings to original card object but just the sequential index.

```python
embeddings = torch.load("embeddings.pt")
embeddings = np.array(embeddings)

dimensions = embeddings[0].shape[0]
index = faiss.IndexFlatIP(dimensions) # Inner product index
index.add(embeddings)
```

We can the run a kNN search on a specific card to find the K most similar cards:

```python
card = find_card("dark ritual", cards)
vector = np.array([embeddings[card]])

distances, indexes = index.search(vector, k=5)
```

`find_card` is a simple utility that finds the index of a card by name:

```python
def find_card(name: str, cards: list[dict[str, str]]):
    name = name.lower()

    for i, card in enumerate(cards):
        if card["name"].lower() == name:
            return i

    raise ValueError(f"Card {name} not found")
```

### Results

Running the search for K=5 for the card "Dark Ritual" returns the following results. Notice that we don't exclude the card itself from the search, so the card itself should be the most similar result. For cosine similarity higher number means more similar.

| Card name           | Similarity | Rules text                                        |
| ------------------- | ---------- | ------------------------------------------------- |
| Dark Ritual         | 0.99999994 | Add {B}{B}{B}.                                    |
| Pyretic Ritual      | 0.92599225 | Add {R}{R}{R}.                                    |
| Seething Song       | 0.91956145 | Add {R}{R}{R}{R}{R}.                              |
| Songs of the Damned | 0.8036735  | Add {B} for each creature card in your graveyard. |
| Battle Hymn         | 0.7631681  | Add {R} for each creature you control.            |

![Results](/static/images/semantic-magic/results.png)

So how do we actually know if it is working? That is a hard question to answer. Similarity on language is at least partly subjective. There might not be a canonical answer to which piece of text is the most similar. Human review is likely the best option to see if the results are reasonable.

As an extra sanity check we can try to visualize our embeddings using [dimensionality reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction). I tried the [t-distributed stochastic neighbor embedding (t-SNE)](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding) algorithm. t-SNE is a statistical method for visualizing high-dimensional data by giving each datapoint a location in two or three dimensional space. t-SNE is a non-linear technique.

My hypothesis is that if cards of the same type form reasonable looking clusters our method is probably working.

![Dimensionally reduced 2D graph](/static/images/semantic-magic/dimred.png)
You can view visualization code [here](https://github.com/JGynther/static/images/semantic-magic/blob/main/visualize.py).

### Bonus: Performance

As said embeddings make for efficient similarity searching, but how efficient exactly? To test this I ran two performance tests [performance_naive.py](https://github.com/JGynther/static/images/semantic-magic/blob/main/performance_naive.py) and [performance_batched.py](https://github.com/JGynther/static/images/semantic-magic/blob/main/performance_batched.py). Both tests do a kNN search with k=5 for 10 000 randomly selected cards and repeat it 10 times.

Both tests were run on M1 MacBook Air with Python 3.11.6.

#### Naive test (no batching)

| Label                | Result             |
| -------------------- | ------------------ |
| Total time (seconds) | 276.14129757881165 |
| Searches per second  | 362.13344717647556 |
| Mean (per 10 000)    | 27.614129757881166 |
| Std                  | 1.6568088040742195 |
| Min                  | 24.79843497276306  |
| Max                  | 29.459707260131836 |

#### Batching test

| Label                | Result              |
| -------------------- | ------------------- |
| Total time (seconds) | 6.15525484085083    |
| Searches per second  | 16246.281037192146  |
| Mean (per 10 000)    | 0.615525484085083   |
| Std                  | 0.01974808488726403 |
| Min                  | 0.5988879203796387  |
| Max                  | 0.6716349124908447  |

## Conclusion

Hopefully this post highlighted how embeddings are useful for working with complex natural language data, even though the subject was quite light-hearted. In real-life you will run into good uses for embeddings in search and recommendation systems, or maybe retrieval augmented generation (RAG) with large language models.

Full source code is available on [Github](https://github.com/JGynther/semantic-magic).

---

Published on 29.12.2023 by Joona Gynther. You can find me on [LinkedIn](https://www.linkedin.com/in/joona-gynther/).

---
