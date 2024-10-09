import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NoResults = () => {
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const letters = textRef.current.children;

      gsap.set(letters, { opacity: 0 });

      const infiniteTimeline = gsap.timeline({ repeat: -1 });
      infiniteTimeline
        .to(letters, {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power1.inOut",
        })
        .to(letters, {
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power1.inOut",
        });

      return () => {
        infiniteTimeline.kill();
      };
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-[10vw] sm:items-center mt-[2vh] p-4 lg:ml-20 bg-[#26232e]">
      <span
        ref={textRef}
        className=" ml-2 text-white flex"
      >
        {`ВСЕЛЕННАЯ...ОТВЕТИЛА..ПУСТОТОЙ`.split("").map((char, index) => (
          <span key={index} className="text-lg">{char}</span>
        ))}
      </span>
    </div>
  );
};

export default NoResults;
