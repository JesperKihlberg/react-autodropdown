import React, { KeyboardEvent, FocusEvent, ChangeEvent } from "react";

interface IAutoDropdownDispatchProps {
  onChange?: (e: ChangeEvent<EventTarget>) => void;
  onBlur?: (focusEvent: FocusEvent<any>) => void;
  onFocus?: (focusEvent: FocusEvent<any>) => void;
  onInputValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onElementSelected?: (id: string) => void;
}

interface IAutoDropdownExternalProps {
  value?: string;
  dropdown?: boolean;
  elements: { name: string; id: string }[];
  addon?: string | JSX.Element;
  elementClassNames?: { input?: string; addon?: string; itemContainer?: string; item?: string; selectedItem?: string };
}
export interface AutoDropdownProps extends React.Props<AutoDropdown>, IAutoDropdownExternalProps, IAutoDropdownDispatchProps {}

declare class AutoDropdown extends React.Component<AutoDropdownProps, any> {}

declare module "react-autodropdown" {}

export default AutoDropdown;
