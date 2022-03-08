import React, { useState, useContext } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import Filters from "./components/Filters";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { GetCountries, GetContinents, GetCurrencies } from "./queries";
import { SearchContext } from "./contexts/SearchContext";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const { country, continent, currency, setCountry } =
    useContext(SearchContext);
  const countriesResult = useQuery(GetCountries({ continent, currency }));
  const continentsResult = useQuery(GetContinents);
  const currenciesResult = useQuery(GetCurrencies);
  const [selectedCountry, setSelectedCountry] = useState("");

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

  const currenciesObj: { [k: string]: string } = {};
  currenciesResult.data?.countries.forEach((c: Country) => {
    if (c.currency) {
      const curr = c.currency.split(",");
      curr.forEach((cu) => {
        currenciesObj[cu] = cu;
      });
    }
  });

  const currencies: Currency[] = [];

  Object.entries(currenciesObj).forEach(([k, v]) =>
    currencies.push({ name: v })
  );

  const handleClick = () => {
    setCountry("");
    setSelectedCountry("");
  };

  return (
    <div className="App">
      <div className="App-header">
        {selectedCountry === "" ? (
          <Filters
            continents={continentsResult.data?.continents}
            currencies={currencies}
          />
        ) : (
          <Link to={"/"}>
            <button onClick={handleClick}>Back</button>
          </Link>
        )}

        {errors && <h3 style={{ color: "red" }}>Error</h3>}
        {loading && <h3>Loading...</h3>}
      </div>
      <main>
        <Routes>
          {countriesResult.data && (
            <Route
              path="/"
              element={
                <Countries
                  countries={filteredCountries}
                  setSelectedCountry={setSelectedCountry}
                />
              }
            />
          )}
          <Route path="/:countryCode" element={<Country />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
