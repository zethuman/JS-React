import gsap from "gsap"

export const textIntro = (e:any) => {
  gsap.from(e, {
    xPercent: -20,
    opacity: 0,
    stagger: 0.2,
    duration: 2,
    scale: -1,
    ease: "back",
  });
};
