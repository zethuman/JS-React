import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const skewGallery = (e: any) => {

    gsap.registerPlugin(ScrollTrigger);
      gsap.set(e, { transformOrigin: "right center", force3D: true });
      let clamp = gsap.utils.clamp(-20, 20) 
      ScrollTrigger.create({
        trigger: e,
        onUpdate: (self) => {
          const velocity = clamp(Math.round(self.getVelocity() / 300));
          gsap.to(e, {
            skew: 0,
            skewY: velocity,
            ease: "power3",
            duration: 0.8,
          });
        },
      });
  }