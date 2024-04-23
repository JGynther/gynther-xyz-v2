import Banner from "@components/banner";
import Button from "@components/button";

const link = "github.com/JGynther/gynther-xyz-v2";

const App = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <header className="pb-10">
          <Banner />
        </header>

        <div className="tracking-wider text-sm md:text-base">
          <h1 className="text-lg">Hi, I'm Joona.</h1>
          <h4 className="font-extralight">
            Associate Solutions Architect @ Amazon Web Services
          </h4>
        </div>

        <div className="pt-8">
          <a
            className="opacity-80 tracking-wider hover:opacity-100 transition"
            href="/connect"
          >
            Let's connect &rarr;
          </a>
        </div>

        <div className="flex pt-14">
          <Button link="/blog">Read my incoherent thoughts in a blog</Button>
        </div>
      </div>

      <footer className="text-sm font-mono text-white text-opacity-50">
        Made with no 💤 by me. <a href={"https://" + link}>{link}</a>
      </footer>
    </div>
  );
};

export default App;
