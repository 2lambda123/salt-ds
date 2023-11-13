import { ChangeEvent, ReactElement, Suspense, useState } from "react";
import { ComboBoxNext, Option } from "@salt-ds/lab";
import { largestCities } from "./exampleData";
import { LazyCountrySymbol } from "@salt-ds/countries";

const customMatchPattern = (
  input: { name: string; countryCode: string },
  filterValue: string
) => {
  return (
    input.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    filterValue === input.countryCode
  );
};

export const CustomRenderer = (): ReactElement => {
  const [filter, setFilter] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
  };

  return (
    <Suspense fallback={null}>
      <ComboBoxNext
        style={{ width: "266px" }}
        onChange={handleChange}
        value={filter}
      >
        {largestCities
          .filter((value) => customMatchPattern(value, filter))
          .map((value) => (
            <Option value={value.countryCode} key={value.countryCode}>
              <LazyCountrySymbol code={value.countryCode} />
              {value.name}
            </Option>
          ))}
      </ComboBoxNext>
    </Suspense>
  );
};
