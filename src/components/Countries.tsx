import { Link } from "react-router-dom";

type IProps = {
  countries: Country[];
};

const Countries: React.FC<IProps> = ({ countries }) => {
  return (<>
    {countries.length === 0 ? (
      <h3>No countries found with those parameters.</h3>
    ) : (
      countries.map((c: Country) => (
        <Link key={c.code} to={c.code}>{c.name}</Link>
      ))
    )}
  </>)
};

export default Countries;
