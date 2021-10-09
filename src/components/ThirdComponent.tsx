import React from 'react';

interface thirdComponentProps {
  title: string
}

function ThirdComponent(props: thirdComponentProps): React.ReactElement {
  return (
    <div>My Third Component, {props.title}</div>
  );
}


export default ThirdComponent;
