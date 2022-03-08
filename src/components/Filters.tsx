import { useContext } from "react";
import Search from "./Search";
import SelectContinent from "./SelectContinent";
import SelectCurrency from "./SelectCurrency";
import { SearchContext } from "../contexts/SearchContext";
import styles from '../styles/Filters.module.css'

interface IProps {
  continents: Continent[];
  currencies: Currency[];
}

const Filters: React.FC<IProps> = ({ continents, currencies }) => {
  const { continent, setContinent, currency, setCurrency } =
    useContext(SearchContext);

  return (
    <div className={styles.filters}>
      <Search />
      <SelectContinent
        continents={continents}
        selectedContinent={continent}
        handleContinentSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setContinent(e.target.value)
        }
      />
      <SelectCurrency
        currencies={currencies}
        selectedCurrency={currency}
        handleCurrencySelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrency(e.target.value)
        }
      />
    </div>
  );
};

export default Filters;
