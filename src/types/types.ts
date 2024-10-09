export interface IChar {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
}

export interface ICharArray {
  info: {
    count: number,
    next: string | null,
    pages: number
  }; 
  results: IChar[];
}

export interface FullType extends IChar {
  type: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
  url: string;
  created: string;
}