'use client';

import Header from "@/components/header/header";
import { useState, useEffect } from "react";
import { Input, Select } from 'antd';
import SearchButton from "@/components/button/button";
import { fetchUniversalFunction } from "@/api/characters.api";
import { ICharArray } from "@/types/types";
import CharItem from "@/components/char-item/char-item";
import { filterOptions } from "@/utils/filtered-options";
import { FilterSelect } from "@/components/filter-select/filter-select";
import { transliterate } from "@/hooks/translitirate";
import NoResults from "@/components/no-results/no-results";

const HomePage: React.FC = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [race, setRace] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>('');
  const [noResults, setNoResults] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharArray | null>(null);
  const [showCharacter, setShowCharacter] = useState(false);
  const [noTimer, setNoTimer] = useState(false);

  // Фильтры без "unknown" значений
  const filters = {
    ...(status !== 'unknown' && status !== undefined && { status }),
    ...(gender !== 'unknown' && gender !== undefined && { gender }),
    ...(race !== 'unknown' && race !== undefined && { race }),
    ...(name !== '' && name !== undefined && { name })
  };

  const handleSearch = async () => {
    try {
      if(filters.name){
        filters.name = transliterate(filters.name);
      }
      setCharacter(null);
      sessionStorage.removeItem('foundCharacters');
      const randomCharacter = await fetchUniversalFunction(filters);
      setCharacter('results' in randomCharacter ? randomCharacter : { info: { count: 1, next: null, pages: 1 }, results: [randomCharacter] });
      sessionStorage.setItem('foundCharacters', JSON.stringify(randomCharacter));
    } catch (error) {
      console.error('Ошибка при получении персонажа:', error);
      const timer = setTimeout(() => setNoResults(true), 3000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    const savedCharacters = sessionStorage.getItem('foundCharacters');
    if (savedCharacters) {
      setNoTimer(true);
      setCharacter(JSON.parse(savedCharacters));
    }
  }, []);

  useEffect(() => { //эффект для задержки отрисовки
    if (character) {
      setShowCharacter(false);
      if(noTimer){
        setShowCharacter(true)
        setNoTimer(false);
      } else {}
      const timer = setTimeout(() => setShowCharacter(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [character]);

  useEffect(() => { //выставляем значения из стораджа
    const savedFilters = sessionStorage.getItem('characterFilters');
    if (savedFilters) {
      const { status, gender, race, name } = JSON.parse(savedFilters);
      setStatus(status || undefined);
      setGender(gender || undefined);
      setRace(race || undefined);
      setName(name || undefined);
    }
  }, []);

  const handleChangeFilter = (filterType: 'status' | 'gender' | 'race' | 'name', value: string | undefined) => {
    const newValue = (value === 'unknown' || '') ? undefined : value;
    sessionStorage.setItem('characterFilters', JSON.stringify({ ...filters, [filterType]: newValue }));
    if (filterType === 'status') setStatus(newValue);
    if (filterType === 'gender') setGender(newValue);
    if (filterType === 'race') setRace(newValue);
    if (filterType === 'name') setName(newValue);
    setNoResults(false);
  };

  
  const handleClearFilters = () => {
    sessionStorage.removeItem('characterFilters');
    setStatus(undefined);
    setGender(undefined);
    setRace(undefined);
    setName('');
    setNoResults(false);
    setCharacter(null);
    sessionStorage.removeItem('foundCharacters')
  };

  return (
    <div className="container">
      <Header />
      <main>
        <div className="flex flex-col items-center sm:items-start lg:ml-20">
          <div className="flex flex-col items-start">
            <label className="mb-1 text-white">
              <h4>Имя персонажа</h4>
            </label>
            <Input
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value); 
                handleChangeFilter('name', value);
              }}
              
              placeholder="Введите имя персонажа..."
              className="w-[90vw] sm:w-[70vw] md:w-[50vw]"
            />
          </div>
        </div>

        <div className="flex justify-around md:justify-start md:gap-10 lg:ml-20 mt-10">
          <FilterSelect label="Жив???" value={status} onChange={(value) => handleChangeFilter('status', value)} options={filterOptions.status} />
          <FilterSelect label="Пол" value={gender} onChange={(value) => handleChangeFilter('gender', value)} options={filterOptions.gender} />
        </div>

        <div className="flex items-center justify-start gap-10 lg:ml-20 mt-10">
          <FilterSelect label="Раса" value={race} onChange={(value) => handleChangeFilter('race', value)} options={filterOptions.race} />
          <SearchButton onClick={handleSearch} />
        </div>
        <button 
          className="lg:ml-20 mt-2 bg-transparent text-gray-300 border border-gray-500 rounded-md text-sm px-2 py-1
          transition-colors duration-300 hover:bg-[#363249] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          onClick={handleClearFilters}
        >
          сбросить фильтры
        </button>
      </main>

      {showCharacter && (
        <div>
          {character && 'results' in character ? (
            character.results.map((char) => <CharItem key={char.id} character={char} />)
          ) : (
            character && <CharItem character={character} />
          )}
        </div>
      )}
      {noResults && (
        <NoResults/>
      )}
    </div>
  );
};

export default HomePage;
