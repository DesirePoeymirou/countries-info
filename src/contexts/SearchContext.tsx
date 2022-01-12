import React, { useState, createContext } from "react";

const SearchContext = createContext<SearchContextType>({
  country: "",
  continent: "",
  currency: "",
  setCountry: () => {},
  setContinent: () => {},
  setCurrency: () => {},
});

const SearchContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [country, setCountry] = useState<string>("");
  const [continent, setContinent] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        country,
        setCountry,
        continent,
        setContinent,
        currency,
        setCurrency,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContextProvider, SearchContext };
