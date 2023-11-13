import { ReactElement } from "react";
import { DropdownNext, Option } from "@salt-ds/lab";
import { stateNames } from "./exampleData";
import { StackLayout } from "@salt-ds/core";

export const Variants = (): ReactElement => (
  <StackLayout>
    <DropdownNext>
      {stateNames.map((state) => (
        <Option value={state} key={state}>
          {state}
        </Option>
      ))}
    </DropdownNext>
    <DropdownNext variant="secondary">
      {stateNames.map((state) => (
        <Option value={state} key={state}>
          {state}
        </Option>
      ))}
    </DropdownNext>
  </StackLayout>
);
