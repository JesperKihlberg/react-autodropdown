export function isStringOrJSX(object: any): object is (string | JSX.Element) {
  return isString(object) || isJSXElement(object);
}

export function isString(object: any): object is string {
  return typeof object === "string";
}

export function isJSXElement(object: any): object is JSX.Element {
  return typeof object === "object" && "props" in object && "type" in object;
}
