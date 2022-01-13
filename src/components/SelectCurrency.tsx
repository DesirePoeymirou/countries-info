interface IProps {
  currencies: { __typename: string; currency: string }[];
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
            currency: { __typename: string; currency: string },
            index: number
          ) => (
            <option key={currency.currency + index} value={currency.currency}>
              {currency.currency}
            </option>
          )
        )}
      </select>
    )}
  </>
);

export default SelectCurrency;
