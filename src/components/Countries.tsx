import { Link } from "react-router-dom";
import styles from "../styles/Countries.module.css";

type IProps = {
  countries: Country[];
  setSelectedCountry: (country: string) => void;
};

const Countries: React.FC<IProps> = ({ countries, setSelectedCountry }) => {
  return (
    <div className={styles.list}>
      {countries.length === 0 ? (
        <h3>No countries found with those parameters.</h3>
      ) : (
        countries.map((c: Country) => (
          <Link key={c.code} to={c.code}>
            <button
              className={styles.country}
              onClick={() => setSelectedCountry(c.name)}
            >
              {c.name}
            </button>
          </Link>
        ))
      )}
    </div>
  );
};

export default Countries;
