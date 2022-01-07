import React, { useState, createContext } from "react";

const SearchContext = createContext<SearchContextType>({
  searchValue: "",
  handleChange: () => {},
});

const SearchContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchContext.Provider value={{ searchValue, handleChange }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContextProvider, SearchContext };
