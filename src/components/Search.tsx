import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Search: React.FC = () => {
  const { searchValue, handleChange } = useContext(SearchContext);

  return (
    <div>
      <input
        value={searchValue}
        placeholder="Search"
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Search;
