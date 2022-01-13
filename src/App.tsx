import { useContext } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import Filters from "./components/Filters";
import Country from "./components/Country";
import { GetCountries, GetContinents, GetCurrencies } from "./queries";
import { SearchContext } from "./contexts/SearchContext";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

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
        {!!countriesResult.data &&
          (filteredCountries.length === 0 ? (
            <h3>No countries found with those parameters.</h3>
          ) : (
            filteredCountries.map((c: Country) => (
              <Country key={c.code} code={c.code} name={c.name} />
            ))
          ))}
      </main>
    </div>
  );
};

export default App;
