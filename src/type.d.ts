type Country = {
  code: string;
  name: string;
};

type SearchContextType = {
  searchValue: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};