import React, { KeyboardEvent, FocusEvent, ChangeEvent } from "react";
import classnames from "classnames";

const styles = require("./AutoDropdown.scss");

export interface IInputValueChangeEventTarget extends EventTarget {
  value: string;
}

export interface IInputValueChangeEvent<T> extends React.FormEvent<T> {
  target: IInputValueChangeEventTarget;
}
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
  styles: { inputStyle: string; dropdownContainerStyle: string; dropdownItemStyle: string };
}

interface IAutoDropdownState {
  menuVisible: boolean;
  input: string;
  selectedId: string;
}
interface IAutoDropdownProps extends IAutoDropdownExternalProps, IAutoDropdownDispatchProps {}

export class AutoDropdown extends React.Component<IAutoDropdownProps, IAutoDropdownState> {
  constructor(props: IAutoDropdownProps) {
    super(props);
    this.state = { menuVisible: false, input: "", selectedId: null };
  }
  inputClick = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };
  blur = () => {
    this.setState({ menuVisible: false });
    this.selectElement();
    this.props.onBlur && this.props.onBlur(this.props.value as any);
  };
  onElementClick = (id: string) => {
    this.props.onChange && this.props.onChange(id as any);
    this.setState({ selectedId: id });
  };
  onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
    this.props.onInputValueChange && this.props.onInputValueChange(e);
    this.props.onChange && this.props.onChange("" as any);
    this.setState({ selectedId: null });
  };
  onKeyDown = (keyEvent: KeyboardEvent<any>) => {
    const key = keyEvent.key;

    if (key === "ArrowDown" || key === "ArrowUp") {
      keyEvent.preventDefault();

      const ids = this.props.elements && this.props.elements.map(x => x.id);
      const highlightedId = this.state.selectedId;
      const currentIndex = ids && ids.findIndex((x: string) => x === highlightedId);

      let nextIndex = 0;
      if (key === "ArrowDown") {
        nextIndex = currentIndex + 1;
        if (nextIndex > ids.length - 1) {
          this.props.onChange && this.props.onChange(null);
          this.setState({ selectedId: null });
        } else {
          this.setState({ selectedId: ids[nextIndex] });
          this.props.onChange && this.props.onChange(ids[nextIndex] as any);
        }
      } else {
        nextIndex = currentIndex - 1;
        if (currentIndex === 0) {
          this.props.onChange && this.props.onChange(null);
          this.setState({ selectedId: null });
        } else if (currentIndex === -1) {
          this.props.onChange && this.props.onChange(ids[ids.length - 1] as any);
          this.setState({ selectedId: ids[ids.length - 1] });
        } else {
          this.props.onChange && this.props.onChange(ids[nextIndex] as any);
          this.setState({ selectedId: ids[nextIndex] });
        }
      }
    } else if (key === "Escape" || key === "Esc") {
      this.setState({ menuVisible: !this.state.menuVisible });
      this.props.onElementSelected && this.props.onElementSelected(null);
      this.selectElement();
    } else if (key === "Enter") {
      keyEvent.preventDefault();
      this.selectElement();
      this.setState({ menuVisible: false });
    } else {
      this.setState({ menuVisible: true });
    }
  };
  selectElement = () => {
    const ids = this.props.elements && this.props.elements.map(x => x.id);
    const highlightedId = this.state.selectedId;
    const currentIndex = ids && ids.find((x: string) => x === highlightedId);
    this.props.onElementSelected && this.props.onElementSelected(currentIndex);
    this.props.onChange && this.props.onChange(currentIndex as any);
    this.setState({ selectedId: currentIndex });
  };
  highlightMatches(searchString: string, title: string) {
    const trimmedSearch = searchString ? searchString.trim() : "";

    let indexKey = 0;
    let elementDisplayName = [<span key={indexKey++}>{title}</span>];
    if (trimmedSearch !== "") {
      const escapedSearch =
        "\\b" +
        trimmedSearch
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          .replace(/ +(?= )/g, "")
          .replace(/ /g, "|\\b");

      const searchString = `(${escapedSearch})`;
      const regex = new RegExp(searchString, "i");

      // Match in title
      //
      const titleMatches: string[] = [];

      if (regex.test(title)) {
        const titleSplitByRegex = title.split(regex).filter(x => x.length > 0);

        elementDisplayName = [];
        titleSplitByRegex.forEach(s => {
          if (regex.test(s)) {
            elementDisplayName.push(<strong key={indexKey++}>{s}</strong>);
            titleMatches.push(s);
          } else {
            elementDisplayName.push(<span key={indexKey++}>{s}</span>);
          }
        });
      }
    }

    return elementDisplayName;
  }
  render() {
    const selectedElement = this.props.value && this.props.elements && this.props.elements.find(x => x.id === this.props.value);
    const selectedElementText = selectedElement && selectedElement.name;
    const displayedValue = this.state.menuVisible ? this.state.input : selectedElement ? selectedElementText : this.state.input;

    const textInputProps = {
      ...this.props,
      className: classnames(styles.input, this.props.dropdown && styles.dropdown),
      value: displayedValue,
      onChange: this.onInputValueChange,
      onFocus: this.props.onFocus,
      onClick: this.inputClick,
      onKeyDown: this.onKeyDown,
      readOnly: this.props.dropdown
    };
    return (
      <div onBlur={this.blur} className={styles.container}>
        <div className={styles.inputContainer}>
          <input type="text" name="name" {...textInputProps} />
          <div className={styles.addon}>{this.state.menuVisible ? "˄" : "˅"}</div>
        </div>
        {this.state.menuVisible && (
          <div className={styles.listContainer}>
            {this.props.elements &&
              this.props.elements.map(x => (
                <div
                  key={x.id}
                  className={classnames(styles.listElement, this.state.selectedId === x.id && styles.selected)}
                  onMouseEnter={() => this.onElementClick(x.id)}
                  onMouseLeave={() => this.onElementClick(null)}
                >
                  {this.highlightMatches(this.state.input, x.name)}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}
