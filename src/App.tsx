import { useContext } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Country from "./components/Country";
import Filters from "./components/Filters";
import { SearchContext } from "./context/SearchContext";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const App: React.FC = () => {
  const { searchValue } = useContext(SearchContext);
  const debouncedValue = useDebouncedValue(searchValue, 400);

  const GET_COUNTRIES = gql`
    {
      countries {
        code
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries.</p>;

  const filteredCountries = data.countries.filter((country: Country) =>
    country.name.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <Filters />
      </header>
      {filteredCountries.map((country: Country): any => (
        <Country key={country.code} code={country.code} name={country.name} />
      ))}
    </div>
  );
};

export default App;
