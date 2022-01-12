interface IProps {
  continents: Continent[];
  selectedContinent: string | undefined;
  handleContinentSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectContinent: React.FC<IProps> = ({
  continents,
  selectedContinent,
  handleContinentSelect,
}) => {
  return (
    <>
      {continents && (
        <select value={selectedContinent} onChange={handleContinentSelect}>
          <option disabled defaultValue="">
            Select a continent
          </option>
          <option value="All">All</option>
          {continents.map((continent: Continent) => (
            <option key={continent.code} value={continent.code}>
              {continent.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default SelectContinent;
