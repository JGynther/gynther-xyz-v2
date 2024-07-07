import Banner from "@components/banner";
import Button from "@components/button";

const link = "github.com/JGynther/gynther-xyz-v2";

const Home = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <header className="pb-20">
          <Banner />
        </header>

        <div className="tracking-wider text-sm md:text-base">
          <h1 className="font-semibold mb-3">Hi, I'm Joona.</h1>
          <h4 className="font-extralight">
            Associate Solutions Architect @ Amazon Web Services
          </h4>
        </div>

        <div className="pt-8">
          <a
            className="opacity-80 tracking-wider hover:opacity-100 transition"
            href="https://www.linkedin.com/in/joona-gynther/"
          >
            You can find me on LinkedIn &rarr;
          </a>
        </div>

        <div className="flex pt-14">
          <Button link="/ravings">Read my incoherent thoughts in a blog</Button>
        </div>
      </div>

      <footer className="text-sm font-mono text-white text-opacity-50 flex flex-col space-y-2">
        <span>
          <a href="/.json">.json</a>
        </span>
        <span>
          Made with no 💤 by me. <a href={"https://" + link}>{link}</a>
        </span>
      </footer>
    </div>
  );
};

export default Home;
