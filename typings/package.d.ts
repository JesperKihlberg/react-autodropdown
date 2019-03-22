import * as React from 'react';
import { IAutoDropdownDispatchProps, IAutoDropdownExternalProps } from 'Components/AutoDropdown/AutoDropdown';

export interface AutoDropdownProps extends React.Props<AutoDropdown>, IAutoDropdownExternalProps, IAutoDropdownDispatchProps {
}

declare class AutoDropdown extends React.Component<AutoDropdownProps, any> {
}

declare module 'react-autodropdown' {
}

export default AutoDropdown;