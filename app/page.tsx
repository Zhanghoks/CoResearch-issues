import { SiteStory } from "./components/site-story";
import { githubUrl } from "./content";

export default function Home() {
  return (
    <main>
      <section data-home-hero className="p-6 md:p-10">
        <div className="relative overflow-hidden rounded-[24px] md:rounded-[28px]">
          <img
            src="/hero-wanderer.jpg"
            alt="雾海上的漫游者"
            width={1024}
            height={768}
            className="block h-auto w-full"
          />
          <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-8 md:pt-12">
            <h1 className="text-center text-5xl font-semibold tracking-tight text-[#262626] md:text-7xl">
              CoResearch
            </h1>
            <a
              href={githubUrl}
              className="mt-5 rounded-full bg-[#262626] px-5 py-3 text-sm font-medium text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
      <SiteStory />
    </main>
  );
}
