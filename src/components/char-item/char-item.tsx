import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getRandomGradient } from "@/hooks/get-random-gradient";

interface CharItemProps {
  name: string;
  species: string;
  gender: string;
}

export const CharItem: React.FC<CharItemProps> = ({ name, species, gender }) => {
  const itemRef = useRef<HTMLDivElement | null>(null); // Создаем ссылку на элемент

  const randomColor = getRandomGradient();

  useEffect(() => {
    // Анимация при монтировании компонента
    if (itemRef.current) {
      gsap.fromTo(itemRef.current, 
        { scale: 0, opacity: 0 }, // Начальное состояние
        { scale: 1, opacity: 1, duration: 1 } // Конечное состояние
      );
    }
  }, []); // Запускаем эффект только при монтировании компонента

  return (
    <div 
      ref={itemRef} // Привязываем ссылку к элементу
      className="flex flex-col sm:flex-row sm:justify-start sm:gap-[10vw] sm:items-center mt-[2vh] p-4 lg:ml-20 border border-white rounded-lg bg-[#26232e]"
    >
      <h4
        className="text-lg font-semibold"
        style={{
          background: randomColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {name}
      </h4>
      <p className="text-sm">Раса: {species}</p>
      <p className="text-sm">Пол: {gender}</p>
    </div>
  );
};
