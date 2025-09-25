import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ParallaxText({ children, baseVelocity = 100 }) {
  const scrollerRef = useRef(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    const scrollerContent = Array.from(scroller.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scroller.appendChild(duplicatedItem);
    });

    const tween = gsap.to(scroller, {
      xPercent: -50,
      ease: "none",
      duration: 5 / (baseVelocity / 100),
      repeat: -1,
    });

    // --- THE MAGIC PART ---
    // Create a smooth setter function for the tween's timeScale
    const timeScaleSetter = gsap.quickTo(tween, "timeScale", { 
      duration: 0.2, // How fast to smooth the change
      ease: "power2.out" 
    });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (Math.abs(velocity) > 10) { // Only react to noticeable scrolling
          // Calculate the target timeScale based on velocity
          const direction = velocity > 0 ? 1 : -1;
          const targetTimeScale = direction * gsap.utils.mapRange(0, 1500, 1, 3, Math.abs(velocity));
          
          // Use the smooth setter to animate the timeScale
          timeScaleSetter(targetTimeScale);
        } else {
          // When scrolling stops, smoothly return to the base speed
          timeScaleSetter(baseVelocity > 0 ? 1 : -1);
        }
      },
    });
    
    return () => {
        // Cleanup GSAP instances
        if (tween) tween.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [baseVelocity, children]);

  return (
    <div className="parallax-container" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div ref={scrollerRef} className="scroller" style={{ display: "flex", whiteSpace: "nowrap" }}>
        <span>{children}&nbsp;</span>
        <span>{children}&nbsp;</span>
        <span>{children}&nbsp;</span>
        <span>{children}&nbsp;</span>
      </div>
    </div>
  );
}

export default ParallaxText;