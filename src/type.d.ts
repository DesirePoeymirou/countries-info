type Continent = {
  code: string;
  name: string;
};

type Country = {
  code: string;
  name: string;
  continent: Continent;
  currency: string;
};

type SearchContextType = {
  country: string,
  continent: string,
  currency: string,
  setCountry: (country: string) => void;
  setContinent: (continent: string) => void;
  setCurrency: (currency: string) => void;
};

type Currency = {
  name: string;
};