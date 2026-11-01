import { SiteStory } from "./components/site-story";
import { githubUrl } from "./content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <main>
      <section data-home-hero className="p-6 md:p-10">
        <div className="relative overflow-hidden rounded-[24px] md:rounded-[28px]">
          <img
            src={`${basePath}/hero-wanderer.jpg?v=576`}
            alt="雾海上的漫游者"
            width={1024}
            height={576}
            className="block h-auto w-full"
          />
          <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-8 md:pt-12">
            <h1 className="text-center text-5xl font-semibold tracking-tight text-[#262626] md:text-7xl">
              CoResearch
            </h1>
            <a
              href={githubUrl}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#262626] px-5 py-3 text-sm font-medium text-white"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
      <SiteStory />
    </main>
  );
}
