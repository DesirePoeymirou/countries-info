import { useContext } from "react";
import { SelectContext } from "../context/SelectContext";

interface IProps {
  continents: Continent[];
}

const Continents: React.FC<IProps> = ({ continents }) => {
  const { selectValue, handleSelect } = useContext(SelectContext);

  return (
    <select value={selectValue} onChange={handleSelect}>
      <option disabled defaultValue="">
        Select Continent
      </option>
      <option value="All">All</option>
      {continents.map((continent) => (
        <option key={continent.code} value={continent.name}>
          {continent.name}
        </option>
      ))}
    </select>
  );
};

export default Continents;
