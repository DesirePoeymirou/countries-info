import { useQuery } from "@apollo/client";
import { GetCountry } from "../queries";
import { useParams } from "react-router-dom";

const Country: React.FC = () => {
  const { countryCode } = useParams();
  const { loading, error, data } = useQuery(GetCountry(countryCode!));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading country.</p>;

  return (
    <>
      <div>Name: {data.country.name}</div>
      <div>Continent: {data.country.continent.name}</div>
      <div>Capital: {data.country.capital}</div>
      <div>Currencies: {data.country.currency}</div>
      <div>Languages: </div>
      {data.country.languages.map(
        (lang: { __typename: string; name: string }) => (
          <div key={lang.name}>{lang.name}</div>
        )
      )}
    </>
  );
};

export default Country;
