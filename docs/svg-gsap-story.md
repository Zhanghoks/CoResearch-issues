# Research World: SVG + GSAP story

This implementation replaces only the rendered `ResearchWorldStory` section. The existing hero, navigation, community content, documentation, and unused PixiJS renderer remain intact. Dependencies are unchanged.

## Interaction

The same SVG scene stays mounted through 13 settled chapter states:

Graph → Research World → Literature Space → Core → Frontier → Margin/Boundary → Idea Space → Explore (domain) → Explore (focus) → Deep Dive → Gap Finder → Innovator → Candidate / iteration.

ScrollTrigger pins the stage below the measured site header. Scroll is the single playback source. Previous, next, and chapter selection scroll to the timeline's **settled** label, not the start of a transition. Native wheel, touch, or navigation keys cancel an in-progress programmatic scroll. A separate click-presentation mode pauses scroll-driven playback; changing mode preserves the current chapter. Reduced-motion preferences use immediate slide changes with no pin or camera tween. Very short viewports use presentation mode to avoid trapping page scrolling. A skip button exits the pinned section. The text transcript is always available, including when JavaScript or animation loading fails.

## Files

- `app/components/research-story/ResearchWorldStory.tsx`: lifecycle, scoped GSAP context, pinning, controls, motion preference, header measurement and teardown.
- `ResearchWorldSvg.tsx`: declarative layers, SVG icons, mock nodes and links. Definition IDs use React `useId`.
- `StoryNarration.tsx`: current chapter copy, separate from the camera.
- `research-story.css`: responsive layout, low-saturation palette, focus styles, transcript.
- `app/graph-svg/mock-world.ts`: seeded stable coordinates and explicit semantic paths; no force simulation during scrolling.
- `app/graph-svg/story.ts`: chapter targets and pure `sampleStory(progress)` interpolation.
- `app/graph-svg/scene.ts`: cached DOM handles; applies numeric pose/opacity/dash properties without per-frame React reconciliation.
- `scripts/test-research-story.mjs`: graph, path, phase visibility, reversibility and renderer-reset assertions; executes automatically before `npm run build`.

## Data contract

The map contains 300 mock nodes and 556 mock links. Domain memberships may overlap. The gray base graph excludes the future Gap and Method candidate, which appear only in their narrative phases. Explore follows the explicitly defined direction path. Literature relations are demonstration data, not verified academic lineage. Geometry, node density and location are **not** used as evidence of scientific maturity or novelty.

Core / Frontier / Margin are illustrative local evidence regions. Research World includes both Literature Space and Idea Space. The gold marker is a projection of the current research position, not the whole Idea State. Intent is a suggested direction, not execution permission. An out-of-boundary Method remains a **candidate**, not a claim of an actual breakthrough. The animation never launches a live research task.

## Local development

```sh
npm ci
npm run test:story
npm run dev
# Verify the project base path too:
NEXT_PUBLIC_BASE_PATH=/CoResearch-Community npm run build
```

`package-lock.json` is unchanged because no dependency or version was added; package.json adds scripts only. `prebuild` runs the pure tests in the existing GitHub Pages build without requiring workflow permissions.

## Verification and manual acceptance

The implementation was checked locally with TypeScript syntax/transpilation, strict checking of pure graph/story/scene modules, graph-reference assertions, phase/reset tests, and browser rendering of the actual SVG plus pure scene renderer at desktop/mobile sizes. The local browser fixture does **not** substitute for a full Next.js + GSAP lifecycle test. Network restrictions prevented npm installation/full Next.js build locally; verify the GitHub Pages build separately.

For browser acceptance, check: first-frame layout, all chapter jumps, reverse scrolling, repeated mode changes, wheel/touch interruption, browser resize and header reflow, keyboard controls, reduced motion, a 390px mobile viewport, short landscape viewport, skip/return and client-side navigation away/back. Ensure only one story ScrollTrigger and one SVG remain after re-mounts. No unknown node or scientific candidate should appear before its chapter.

## Technical references

- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP context and cleanup: https://gsap.com/docs/v3/GSAP/gsap.context()/
- SVG coordinates: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
