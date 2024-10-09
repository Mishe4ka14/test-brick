import { getRandomCharacterId } from "@/hooks/random-number";
import { IChar, ICharArray } from "@/types/types";

const CHAR_URL = 'https://rickandmortyapi.com/api/character/';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

interface Filters {
  status?: string;
  gender?: string;
  race?: string;
}

export const fetchUniversalFunction = async (filters: Filters = {}): Promise<IChar | ICharArray> => {
  try {
    const params = new URLSearchParams();

    // Добавление фильтров в параметры запроса
    if (filters.status) {
      params.append('status', filters.status);
    }
    if (filters.gender) {
      params.append('gender', filters.gender);
    }
    if (filters.race) {
      params.append('race', filters.race);
    }

    // Определяем, нужно ли получать случайного персонажа
    const charNumber = Object.keys(filters).length === 0 ? getRandomCharacterId() : '';
    const url = charNumber ? `${CHAR_URL}${charNumber}` : `${CHAR_URL}?${params.toString()}`;

    const response = await fetch(url);
    const data = await checkResponse<{ results?: ICharArray; info?: any }>(response);

    if (data.results) {
      return data as unknown as ICharArray;
    } else {
      return data as IChar;
    }
  } catch (error) {
    console.error('Ошибка при получении персонажа:', error);
    throw error;
  }
};
