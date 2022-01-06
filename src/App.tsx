import { useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Country from "./Country";

type Country = {
  code: string;
  name: string;
};

const App: React.FC = () => {
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

  return (
    <div className="App">
      <header className="App-header">
        {data.countries.map((country: Country): any => (
          <Country key={country.code} code={country.code} name={country.name} />
        ))}
      </header>
      ``
    </div>
  );
};

export default App;
