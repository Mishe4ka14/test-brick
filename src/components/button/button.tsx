import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import icon from '../../assets/nlo.png';

const SearchButton = () => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current.children, { opacity: 0 });

      const hoverTimeline = gsap.timeline({ paused: true });
      hoverTimeline.to(textRef.current.children, {
        opacity: 1,
        duration: 3,
        stagger: 0.2,
        ease: "power1.inOut",
      });

      const button = buttonRef.current;
      if (button) {
        button.addEventListener("mouseenter", () => hoverTimeline.play());
        button.addEventListener("mouseleave", () => hoverTimeline.reverse());
      }
    }
  }, []);

  const handleClick = () => {
    if (textRef.current) {
      gsap.to(textRef.current.children, { opacity: 0, duration: 0.5 });
    }

    // анимация полета кнопки 
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: window.innerWidth,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick} 
      style={{
        backgroundImage: `url(${icon.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="w-12 h-12 rounded-full transition-transform transform hover:scale-125 search-button relative"
    >
      <span
        ref={textRef}
        className="absolute top-1/2 left-full ml-2 text-white flex"
      >
        {"...ИСКАТЬ...".split("").map((char, index) => (
          <span key={index} className="text-lg">{char}</span>
        ))}
      </span>
    </button>
  );
};

export default SearchButton;
