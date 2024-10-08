import { getRandomCharacterId } from "@/hooks/random-number";
import { IChar } from "@/types/types";

const CHAR_URL = 'https://rickandmortyapi.com/api/character/';

const checkResponse = <T>(res: Response): Promise<T>=> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchRandomCharacters = async (): Promise<IChar[]> => {
  try {
    const charNumber = getRandomCharacterId();
    const response = await fetch(`${CHAR_URL}${charNumber}`); 
    return await checkResponse(response);
  } catch (error) {
    console.error('Ошибка при получении персонажа:', error); 
    throw error;
  }
};
