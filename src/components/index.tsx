import React from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent, { ThirdComponentProps } from './ThirdComponent';
import type { ComponentProps } from './Types';

const allComponents: {[index: string]: React.FunctionComponent | React.JSXElementConstructor<any>} = {
  FirstComponent,
  SecondComponent,
  ThirdComponent
};
const componentProps: {[index: string]: ComponentProps} = {
  "ThirdComponent": ThirdComponentProps
}

export {allComponents as default, componentProps};
