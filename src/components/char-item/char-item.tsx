'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getRandomGradient } from "@/hooks/get-random-gradient";
import { IChar } from "@/types/types";
import Link from 'next/link';

interface CharItemProps {
  character: IChar
}

const CharItem: React.FC<CharItemProps> = ({ character }) => {
  const itemRef = useRef<HTMLDivElement | null>(null); 
  const randomColor = getRandomGradient();
  const characterData = encodeURIComponent(JSON.stringify(character));
  const {name, species, gender, id} = character;

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1 }
      );
    }
  }, []); 

  return (
    //передаем данные в параметрах запроса
    <Link href={`/details/character/${character.id}?character=${characterData}`}> 
      <div 
        ref={itemRef} 
        className="flex flex-col sm:flex-row sm:justify-start sm:gap-0 sm:items-center mt-[2vh] p-4 lg:ml-20
          border border-white rounded-lg bg-[#26232e] 
          transition-colors duration-400 ease-in-out 
          hover:bg-[#363249] hover:shadow-lg"
      >
      <h4
        className="text-lg font-extrabold w-[80%] sm:w-[30%]"
        style={{
          background: randomColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {name}
      </h4>
      <div className="flex w-[80%] sm:w-[30%]">
        <p className="text-sm">Раса:&nbsp;</p>
        <p
          className="text-sm"
          style={{
            background: randomColor,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {species}
        </p>
      </div>
      <div className="flex w-[80%] sm:w-[30%]">
        <p className="text-sm">Пол:&nbsp;</p>
        <p
          className="text-sm"
          style={{
            background: randomColor,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {gender}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default React.memo(CharItem);
