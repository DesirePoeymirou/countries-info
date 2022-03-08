interface IProps {
  currencies: Currency[];
  selectedCurrency: string;
  handleCurrencySelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCurrency: React.FC<IProps> = ({
  currencies,
  selectedCurrency,
  handleCurrencySelect,
}) => (
  <>
    {currencies && (
      <select value={selectedCurrency} onChange={handleCurrencySelect}>
        <option disabled defaultValue="">
          Select a currency
        </option>
        <option value="All">All</option>
        {currencies.map(
          (
            currency: Currency,
            index: number
          ) => (
            <option key={index} value={currency.name}>
              {currency.name}
            </option>
          )
        )}
      </select>
    )}
  </>
);

export default SelectCurrency;
