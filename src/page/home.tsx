import { Link } from "react-router-dom";

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
          <h1 className="font-semibold mb-8 text-xl">Hi, I'm Joona.</h1>
          <h4>
            A professional computer guy. I work with the cloud, data and stuff
          </h4>
          <h4>
            Also a "speaker" - I talk, and sometimes no one stops me. Sometimes
            that is on stage
          </h4>
          <br />
          <h4 className="opacity-60">Currently vacationing</h4>
          <h4 className="opacity-60">Previously @ Amazon Web Services</h4>
        </div>

        <div className="pt-12">
          <a
            className="opacity-80 tracking-wider hover:opacity-100 transition"
            href="https://www.linkedin.com/in/joona-gynther/"
          >
            You can find me on LinkedIn &rarr;
          </a>
        </div>

        <div className="flex py-14">
          <Button link="/ravings">Read my incoherent thoughts in a blog</Button>
        </div>
      </div>

      <footer className="text-sm font-mono text-white text-opacity-50 flex flex-col space-y-2">
        <div className="space-x-5 mb-2">
          <Link to="/hey">Hey</Link>
          <a href="/.json">.json</a>
        </div>
        <div>
          Made with no 💤 by me. <a href={"https://" + link}>{link}</a>
        </div>
      </footer>
    </div>
  );
};

export { Home as Component };
