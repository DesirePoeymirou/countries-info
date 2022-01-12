import { useContext, useEffect } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import Filters from "./components/Filters";
import Country from "./components/Country";
import { GetCountries, GetContinents, GetCurrencies } from "./queries";
import { SearchContext } from "./contexts/SearchContext";

const App: React.FC = () => {
  const { continent, currency } = useContext(SearchContext);
  const countriesResult = useQuery(GetCountries({ continent, currency }));
  const continentsResult = useQuery(GetContinents);
  const currenciesResult = useQuery(GetCurrencies);

  const loading =
    countriesResult.loading ||
    continentsResult.loading ||
    currenciesResult.loading;
  const errors =
    countriesResult.error || continentsResult.error || currenciesResult.error;

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
        {countriesResult.data?.countries.length === 0 ? (
          <h3>No countries found with those parameters.</h3>
        ) : (
          countriesResult.data?.countries.map((c: Country) => (
            <Country key={c.code} code={c.code} name={c.name} />
          ))
        )}
      </main>
    </div>
  );
};

export default App;
