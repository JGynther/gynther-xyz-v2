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
          <h4 className="opacity-60">
            Sr. Cloud Dev, Research @ F-Secure Corporation
          </h4>
          <h4 className="opacity-60">Previously seen at places like Amazon</h4>
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

      <footer className="text-sm font-mono text-white/50 flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="space-x-5">
            <Link to="/hey">Hey</Link>
            <a href="/api.json">API</a>
          </div>
          <div>
            Email{" "}
            <span className="bg-neutral-800 py-1 px-3 rounded">
              am9vbmErYjY0QGd5bnRoZXIueHl6Cg==
            </span>
          </div>
        </div>
        <div>
          Made with no 💤 by me. <a href={"https://" + link}>{link}</a>
        </div>
      </footer>
    </div>
  );
};

export { Home as Component };
