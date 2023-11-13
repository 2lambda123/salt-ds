import { ReactElement } from "react";
import { ComboBoxNext, Option } from "@salt-ds/lab";
import { shortColorData } from "./exampleData";

export const Default = (): ReactElement => {
  return (
    <ComboBoxNext style={{ width: "266px" }}>
      {shortColorData.map((color) => (
        <Option value={color} key={color}>
          {color}
        </Option>
      ))}
    </ComboBoxNext>
  );
};
