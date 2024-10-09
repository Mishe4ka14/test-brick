'use client';

import React from "react";
import { useSearchParams } from 'next/navigation';
import { getRandomGradient } from "@/hooks/get-random-gradient";
import { FullType } from "@/types/types";
import { extractEpisodeNumber } from "@/hooks/extract-number";

const CharacterDetails = () => {
  const searchParams = useSearchParams();
  const character = searchParams.get('character');
  const randomColor = getRandomGradient();

  if (!character) {
    return <div>Загрузка...</div>; 
  }

  // получаем данные в параметрах
  const characterData: FullType = JSON.parse(decodeURIComponent(character));

  const episodeNumbers = extractEpisodeNumber(characterData.episode);

  const getSeasonAndEpisode = (episodeNumber: number) => {
    let season, episode;

    if (episodeNumber <= 11) {
      season = 1;
      episode = episodeNumber;
    } else {
      season = Math.ceil((episodeNumber - 11) / 10) + 1;
      episode = (episodeNumber - 11) % 10 || 10;
    }

    return { season, episode };
  };

  return (
    <div>
      <div className="bg-[#26232e] border border-white rounded-lg p-6 sm:p-8 lg:p-12 w-[90vw] xl:w-[100%]">
        <div className="flex flex-col sm:flex-row items-center">
          <img
            src={characterData.image}
            alt="Изображение персонажа"
            className="mr-0 sm:mr-[5%] mb-4 sm:mb-0 border border-white rounded-full w-[70%] h-[70%] sm:w-[50%] sm:h-[50%] lg:w-auto lg:h-auto"/>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Профиль персонажа&nbsp;</h2>
            <div className="flex justify-center sm:justify-start">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                style={{
                  background: randomColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {characterData.name}
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg">Раса: {characterData.species}</p>
            <p className="text-sm sm:text-base lg:text-lg">Пол: {characterData.gender}</p>
            <p className="text-sm sm:text-base lg:text-lg">Вид: {characterData.type === '' ? 'Неизвестен' : characterData.type}</p>
            <p className="text-sm sm:text-base lg:text-lg">
              {characterData.gender === 'Female' ? 'Жива???' : 'Жив???'} &nbsp;
              {characterData.status === 'Alive' ? 'К счастью, пока да' : 'К сожалению, уже нет :((('}
            </p>
            <p className="text-sm sm:text-base lg:text-lg">Локация: {characterData.location.name}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-white text-sm sm:text-base lg:text-lg mb-2">Появляется в следующих сериях:</p>
          <ul className="flex flex-wrap gap-2 sm:gap-4 text-white text-sm sm:text-base lg:text-lg">
            {episodeNumbers.map((number, index) => {
              const { season, episode } = getSeasonAndEpisode(number);
              const episodeUrl = `https://rick-and-morty.tv/season-${season}/episode-${episode}/`;

              return (
                <li className="bg-[#333] p-2 sm:p-3 rounded" key={index}>
                  <a href={episodeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Эпизод {number}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="hidden sm:block mt-8 bg-[#333] text-white text-center p-4 rounded">
        А здесь могла бы быть ваша реклама :)
      </div>
    </div>
  );
};

export default React.memo(CharacterDetails);
