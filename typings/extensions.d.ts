/// <reference path="modules/nightwatch/index.d.ts" />

// Extensions to existing types goes here:
interface NodeRequire {
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void;
  context: (path: string, unknown: boolean, regex: RegExp) => any;
}

// jest extensions
declare var fit: jest.It;

declare module "~nightwatch/nightwatch" {
  export interface NightWatchBrowser {
    options: {
      desiredCapabilities: {
        browserName: string;
        globals?: any;
      };
    };
    clickWorkaround: (selector: string, callback?: () => void) => NightWatchBrowser;
  }

  export interface Assertion {
    urlMatch: (regex: RegExp, message?: string) => NightWatchClient;
    isNumber: (selector: string, message?: string) => NightWatchClient;
    noConsoleLogs: () => NightWatchClient;
    hasTestLogEntries: (entryName?: string, expectedEntries?: any[]) => NightWatchClient;
  }
  export interface NightWatchClient {
    section: {
      [id: string]: NightWatchClient;
      wizard: NightWatchClient;
    };
    clickWorkaround: (selector: string, callback?: () => void) => NightWatchClient;
    resetTestLogEntries: (callback?: () => void) => NightWatchClient;
    apiGet: (url: string, callback?: (resp: Response) => void) => NightWatchClient;
    apiPost: (...args: any[]) => NightWatchClient;
    apiDelete: (...args: any[]) => NightWatchClient;
  }
}
declare module "~nightwatch/page-objects" {
  import { NightWatchClient } from "nightwatch";

  type IPageNavigator = () => {
    url: string;
    navigate: (url?: string) => NightWatchClient;
  };

  export interface PageObjects {
    [id: string]: IPageNavigator;
    customer: IPageNavigator;
    landing: IPageNavigator;
  }
}

declare module "~nightwatch/configuration" {
  import { NightWatchClient } from "nightwatch";

  interface IPageObject {
    url?: string | (() => string);
    elements?: ElementCollection;
    sections?: SectionCollection;
    commands?: {
      [id: string]: () => NightWatchClient;
    };
  }

  type ElementType = IElement | string;
  interface IElement {
    selector: string;
    locateStrategy?: "css" | "xpath";
  }

  type SectionType = ISection | string;
  interface ISection {
    selector: string;
    elements?: ElementCollection;
    sections?: SectionCollection;
  }

  type SectionCollection = ISectionDictionary | [ISectionDictionary];
  interface ISectionDictionary {
    [id: string]: ISection;
  }

  type ElementCollection = IElementDictionary | [IElementDictionary];
  interface IElementDictionary {
    [id: string]: ElementType;
  }
}

declare namespace jest {
  interface It {
    (name: string, fn: jest.EmptyFunction | ((client: {}) => void)): void;
  }
  function useFakeTimers(): void;
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
