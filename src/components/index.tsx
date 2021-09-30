import React from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';

const allComponents: {[index: string]: React.FunctionComponent} = {
  FirstComponent,
  SecondComponent
};

export default allComponents;
