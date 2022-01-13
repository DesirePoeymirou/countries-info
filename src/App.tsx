import React, { useContext } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import Filters from "./components/Filters";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { GetCountries, GetContinents, GetCurrencies } from "./queries";
import { SearchContext } from "./contexts/SearchContext";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  const { country, continent, currency } = useContext(SearchContext);
  const countriesResult = useQuery(GetCountries({ continent, currency }));
  const continentsResult = useQuery(GetContinents);
  const currenciesResult = useQuery(GetCurrencies);

  const loading =
    countriesResult.loading ||
    continentsResult.loading ||
    currenciesResult.loading;
  const errors =
    countriesResult.error || continentsResult.error || currenciesResult.error;

  const debouncedValue = useDebouncedValue(country, 400);

  const filteredCountries = countriesResult.data?.countries.filter(
    (c: Country) =>
      c.name.toLocaleLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <div className="App">
      <div className="App-header">
        <Filters
          continents={continentsResult.data?.continents}
          currencies={currenciesResult.data?.countries}
        />
        {errors && <h3 style={{ color: "red" }}>Error</h3>}
        {loading && <h3>Loading...</h3>}
      </div>
      <main>
        <Routes>
          <Route path=":countryCode" element={<Country />} />
          {countriesResult.data && (
            <Route
              path="/"
              element={<Countries countries={filteredCountries} />}
            />
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
