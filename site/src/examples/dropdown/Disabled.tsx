import { ReactElement } from "react";
import { DropdownNext, Option } from "@salt-ds/lab";
import { stateNames } from "./exampleData";

export const Disabled = (): ReactElement => (
  <DropdownNext
    defaultSelected={["California"]}
    defaultValue="California"
    disabled
  >
    {stateNames.map((state) => (
      <Option value={state} key={state}>
        {state}
      </Option>
    ))}
  </DropdownNext>
);
