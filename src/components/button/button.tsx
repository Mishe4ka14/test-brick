import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import icon from '../../assets/nlo.png';

interface SearchButtonProps {
  onClick: () => Promise<void>;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isFlying, setIsFlying] = useState(false); 

  useEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current.children, { opacity: 0 });

      const hoverTimeline = gsap.timeline({ paused: true });
      hoverTimeline.to(textRef.current.children, {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power1.inOut",
      });

      const button = buttonRef.current;
      if (button) {
        button.addEventListener("mouseenter", () => hoverTimeline.play());
        button.addEventListener("mouseleave", () => hoverTimeline.reverse());
      }

      return () => {
        if (button) {
          button.removeEventListener("mouseenter", () => hoverTimeline.play());
          button.removeEventListener("mouseleave", () => hoverTimeline.reverse());
        }
      };
    }
  }, []);

  const handleClick = () => {
    if (textRef.current) {
      gsap.to(textRef.current.children, { opacity: 0, duration: 0.5 });
    }

    if (buttonRef.current && !isFlying) {
      setIsFlying(true);

      // определяем направление полета в зависимости от ширины экрана
      const animationDirection = window.innerWidth < 600 ? { y: -window.innerHeight } : { x: window.innerWidth };

      gsap.to(buttonRef.current, {
        ...animationDirection,
        duration: 2,
        ease: "power2.inOut",
      });

      onClick()
        .then(() => {
          setTimeout(() => {
            gsap.to(buttonRef.current, {
              x: 0,
              y: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => setIsFlying(false), 
            });
          }, 1500);
        })
        .catch((error) => {
          console.error("Ошибка при выполнении запроса:", error);
          setIsFlying(false);
        });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${icon.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
