import React from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';

const allComponents: {[index: string]: React.FunctionComponent | React.JSXElementConstructor<any>} = {
  FirstComponent,
  SecondComponent,
  ThirdComponent
};

export default allComponents;
