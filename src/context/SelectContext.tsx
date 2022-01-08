import React, { useState, createContext } from "react";

const SelectContext = createContext<SelectContextType>({
  selectValue: "",
  handleSelect: () => {},
});

const SelectContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [selectValue, setSelectValue] = useState<string>("");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  return (
    <SelectContext.Provider value={{ selectValue, handleSelect }}>
      {children}
    </SelectContext.Provider>
  );
};

export { SelectContextProvider, SelectContext };
