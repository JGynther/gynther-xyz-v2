import { BannerSmall as Banner } from "@components/banner";
import { Center } from "@components/wrapper";
import { Link } from "react-router-dom";

type EntryProps = { date: string } & React.PropsWithChildren;

const Entry = ({ date, children }: EntryProps) => {
  return (
    <div className="flex flex-col my-14" id={date}>
      <div className="text-2xl font-bold">{date}</div>
      <div className="pl-6 py-6 border-l-2 ml-2 mt-2 space-y-12 border-dashed border-white/20">
        {children}
      </div>
    </div>
  );
};

const Thought = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border-l-2 pl-6 py-1 text-white/80 border-white/20">
      {children}
    </div>
  );
};

const Hey = () => {
  return (
    <Center>
      <Link to="/">
        <Banner />
      </Link>

      <h3 className="mt-16 text-3xl font-bold">
        I think about a lot of stuff. Here is some of it.
      </h3>

      <Entry date="25.9.2024">
        <Thought>
          This is my first try at this format. Here is a dump of things that
          have been on my mind.
        </Thought>

        <Thought>
          I have been working on a similarity search engine for Magic: The
          Gathering cards. Recently it has lead me on interesting paths: writing
          a custom Recursive Decent Parser to render card text, encoding
          text-heavy data for efficient transfer and consistent hashing of card
          names.
          <br />
          <br />
          Instead of a 3-tier thing, I am planning of just using S3. And have
          the whole application "database" just be a (few) json files. Unless
          Protobuf ends up being better despite my testing...
          <br />
          <br />
          Writing parsers is uh... interesting... hence I have promised myself
          not to write a full "compiler" to analyze Magic cards. So most likely
          next I will write a compiler to analyze Magic cards.
        </Thought>

        <Thought>
          I have yet to see a product with "AI" in it that I would pay money
          for.
          <br />
          <br />
          If we have interacted professionaly chances are we talked about
          Generative AI. It's not like I don't know or like the technology. If
          you have a problem where embeddings or language modelling are a good
          solution (odds are you don't), the "AI" should be a pure
          implementation detail. I should not know about it.
          <br />
          <br />
          Fight me.
        </Thought>

        <Thought>
          I have been looking at Apache Iceberg a lot at work. The real secret
          to having a delightful data platform might just be giving up. Instead
          of ETL-ELT-ing your data everywhere just plob it to S3. Instead of
          making teams properly use {"<tool>"} just let them use whatever.
          Spark? Great! Athena? Go right ahead. Snowflake? Sure. Download data
          files directly from S3 and look at them? Uhh... have fun?
        </Thought>

        <Thought>
          Recently I have been reading <i>"Real World OCaml"</i>. OCaml is
          interesting. Quant firm Jane Street uses OCaml for{" "}
          <a
            className="underline"
            href="https://ocaml.org/success-stories/large-scale-trading-system"
          >
            their trading system
          </a>
          .
        </Thought>

        <Thought>
          I'm starting to think Functional Programming might have the better
          mental model over Object-Orientation. Functions that process state
          align better to actual data than state that encapsulates methods.
        </Thought>
      </Entry>
    </Center>
  );
};

export { Hey as Component };
