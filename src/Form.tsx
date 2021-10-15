import React from 'react';
import type { ComponentProps } from './components/Types';

interface FormState {
  fieldValues: {[index: string]: string}
}

interface FormProps {
  fieldOptions: ComponentProps,
  data:{[index: string]: any},
  completeFn: Function
}

function getValFromString(obj: {[index: string]: any}, key: string) {
  if(!key) {
    return null;
  }
  const keys = key.split('.');
  let currObj: any = obj;
  for(let idx = 0; idx < keys.length; idx++) {
    currObj = currObj[keys[idx]];
  }
  return currObj;
}

// takes a list names and types and gives user an interface to fill with data
// props.fields;
class Form extends React.Component {
  props: FormProps
  state: FormState
  constructor(props: FormProps) {
    super(props);
    this.props = props;
    this.state = {
      fieldValues: {}
    };
  }
  handleFieldInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = evt.target.name;
    const val = evt.target.value;
    const newFieldValues = {
      ...this.state.fieldValues,
    };
    newFieldValues[fieldName] = val;
    this.setState({
      fieldValues: newFieldValues
    });
  }
  handleFormSubmit(evt: React.FormEvent) {
    console.log(evt);
    this.props.completeFn(this.state.fieldValues);
    evt.preventDefault();
    return false;
  }
  render() {
    const opts = this.props.fieldOptions;
    const formInputs = opts.order.map((fieldName) => {
      let objectVal = "Not Found";
      const valFromStr = getValFromString(this.props.data, this.state.fieldValues[fieldName]);
      if(valFromStr) {
        const valType = typeof valFromStr;
        const shouldStringify = !(valType === 'string' || valType === 'number');
        if(shouldStringify) {
          objectVal = JSON.stringify(valFromStr);
        } else {
          objectVal = valFromStr;
        }
      }
      return (
        <div>
          <label htmlFor={fieldName}>{fieldName}</label>
          <input
            type="text"
            name={fieldName}
            onChange={this.handleFieldInputChange.bind(this)}
            value={this.state.fieldValues[fieldName]} />
            {objectVal}
        </div>
      );
    });
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        {formInputs}
        {JSON.stringify(this.props.data)}
        <div>
          <input type="submit" value="Add Component" />
        </div>
      </form>
    );
  }
}


export default Form;
