import React from 'react';
import type { ComponentProps } from './Types';

interface thirdComponentProps {
  title: string
};

const ThirdComponentProps: ComponentProps = {
  order: ["title", "count"],
  fields: {
    title: "string",
    count: "number"
  }
};

function ThirdComponent(props: thirdComponentProps): React.ReactElement {
  return (
    <div>My Third Component, {props.title}</div>
  );
}


export {ThirdComponent as default, ThirdComponentProps };
