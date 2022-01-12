import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

const Search: React.FC = () => {
  const { country, setCountry } = useContext(SearchContext);

  return (
    <>
      <input
        value={country}
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCountry(e.target.value)
        }
      ></input>
    </>
  );
};

export default Search;
