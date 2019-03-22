// Extensions to existing types goes here:
interface NodeRequire {
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void;
  context: (path: string, unknown: boolean, regex: RegExp) => any;
}

// Manual typings for node_modules without any d.ts files goes here.

declare module "classnames/bind" {
  type ClassValue = string | number | ClassDictionary | ClassArray;

  interface ClassDictionary {
    [id: string]: boolean;
  }

  interface ClassArray extends Array<ClassValue> {}

  interface ClassNamesFn {
    (...classes: ClassValue[]): string;
  }

  var classNames: {
    bind: (styles: any) => ClassNamesFn;
  };

  export default classNames;
}
