import { useState, useContext } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Country from "./components/Country";
import Filters from "./components/Filters";
import { SearchContext } from "./context/SearchContext";

const App: React.FC = () => {
  const { searchValue } = useContext(SearchContext);

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
    country.name.toLowerCase().includes(searchValue.toLowerCase())
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
