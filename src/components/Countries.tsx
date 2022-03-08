import { Link } from "react-router-dom";

type IProps = {
  countries: Country[];
  setSelectedCountry: (country: string) => void;
};

const Countries: React.FC<IProps> = ({ countries, setSelectedCountry }) => {
  return (
    <>
      {countries.length === 0 ? (
        <h3>No countries found with those parameters.</h3>
      ) : (
        countries.map((c: Country) => (
          <Link key={c.code} to={c.code}>
            <button onClick={() => setSelectedCountry(c.name)}>{c.name}</button>
          </Link>
        ))
      )}
    </>
  );
};

export default Countries;
