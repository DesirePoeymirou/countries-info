import { useQuery } from "@apollo/client";
import { GetCountry } from "../queries";
import { useParams } from "react-router-dom";
import styles from "../styles/Country.module.css";

const Country: React.FC = () => {
  const { countryCode } = useParams();
  const { loading, error, data } = useQuery(GetCountry(countryCode!));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading country.</p>;
  console.log(data.country);
  return (
    <div className={styles.country}>
      <div className={styles.title}>
        <div>Name :</div>
        <div>Continent :</div>
        <div>Capital :</div>
        <div>Currencies :</div>
        <div>Languages :</div>
      </div>
      <div className={styles.data}>
        <div>{data.country.name}</div>
        <div>{data.country.continent.name}</div>
        <div>{data.country.capital}</div>
        <div>{data.country.currency}</div>
        <div>
          {data.country.languages.map(
            (lang: { __typename: string; name: string }) => (
              <span key={lang.name}>{`${lang.name} `}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
