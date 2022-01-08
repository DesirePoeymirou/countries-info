type Country = {
  code: string;
  name: string;
  continent: {name: string};
};

type Continent = {
  code: string;
  name: string;
};

type SearchContextType = {
  searchValue: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

type SelectContextType = {
  selectValue: string,
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
};