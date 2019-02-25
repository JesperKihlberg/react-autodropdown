import "react-dom/test-utils"
import React from "react";
declare module "react-dom/test-utils" {
  function findRenderedComponentWithType<T extends React.Component<{}, React.ComponentState>, C extends React.ComponentClass<{}>>(
      root: React.Component<any, any>,
      type: React.ClassType<any, T, C>): T;
  function scryRenderedComponentsWithType<T extends React.Component<{}, React.ComponentState>, C extends React.ComponentClass<{}>>(
    root: React.Component<any, any>,
    type: React.ClassType<any, T, C>): T[];
}