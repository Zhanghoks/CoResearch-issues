import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GraphController, GraphPose } from "./renderer";

export type GraphSlide = {
  label: string;
  /** Numeric pose properties interpolate smoothly; focus changes at slide boundaries. */
  pose: Partial<Omit<GraphPose, "focusId">>;
  focusId?: string | null;
  duration?: number;
};

/** Opt-in adapter. Call after mountGraph resolves; dispose before controller.destroy(). */
export function createGraphScrollStory(
  controller: GraphController,
  trigger: HTMLElement,
  pin: HTMLElement,
  slides: GraphSlide[],
) {
  gsap.registerPlugin(ScrollTrigger);
  const initial = { ...controller.pose };
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const timeline = gsap.timeline({
      onUpdate: controller.render,
      scrollTrigger: {
        trigger,
        pin,
        start: "top top+=80",
        end: () => `+=${window.innerHeight * Math.max(1, slides.length)}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    for (const slide of slides) {
      timeline.addLabel(slide.label);
      if (slide.focusId !== undefined) {
        timeline.set(controller.pose, { focusId: slide.focusId });
      }
      timeline.to(controller.pose, {
        ...slide.pose,
        duration: slide.duration ?? 1,
        ease: "power1.inOut",
      });
    }
    return () => {
      Object.assign(controller.pose, initial);
      controller.render();
    };
  });
  return () => media.revert();
}
