export function traversePropsChildren(element: any, assertion: (input: (JSX.Element | string)) => void): void {
  if (element && element.props && element.props.children) {
    if (element.props.children instanceof Array)
      element.props.children.forEach((childNode: (JSX.Element | string)) => {
        traversePropsChildren(childNode, assertion);
      });
    else {
      assertion(element.props.children);
      if (element.props.children.props && element.props.children.props.children) {
        traversePropsChildren(element.props.children, assertion);
      }
    }
  }
}
