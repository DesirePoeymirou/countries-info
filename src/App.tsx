import { useContext } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Country from "./components/Country";
import Filters from "./components/Filters";
import { SearchContext } from "./context/SearchContext";
import { SelectContext } from "./context/SelectContext";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const GetCountriesQuery = gql`
  query getCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;

const GetContinentsQuery = gql`
  query getContinents {
    continents {
      code
      name
    }
  }
`;

const App: React.FC = () => {
  const { searchValue } = useContext(SearchContext);
  const { selectValue } = useContext(SelectContext);

  const debouncedValue = useDebouncedValue(searchValue, 400);

  const countriesResult = useQuery(GetCountriesQuery);
  const continentsResult = useQuery(GetContinentsQuery);
  const errors = countriesResult.error || continentsResult.error;
  const loading = countriesResult.loading || continentsResult.loading;

  if (loading) return <p>Loading...</p>;

  const { countries } = countriesResult.data;
  const { continents } = continentsResult.data;

  const countriesFilteredByContinent =
    selectValue === "All" || selectValue === ""
      ? countries
      : countries.filter(
          (country: Country) => country.continent.name === selectValue
        );

  const countriesFilteredBySearch = countriesFilteredByContinent.filter(
    (country: Country) =>
      country.name.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <div className="App">
      {errors && <h3 style={{ color: "red" }}>{errors}</h3>}
      <header className="App-header">
        <Filters continents={continents} />
      </header>
      <main>
        {countriesFilteredBySearch.map((country: Country): any => (
          <Country key={country.code} code={country.code} name={country.name} />
        ))}
      </main>
    </div>
  );
};

export default App;
