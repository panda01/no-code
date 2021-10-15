import React from 'react';
import './App.css';
import Form from './Form';
import allComponents, { componentProps } from './components';
import dataStore from './dataStore';

interface componentParts {
  name: string,
  props: Object
}
interface appState {
  pageComponents: Array<componentParts>,
  currSelectedComponent: string
}
// TODO temporary data store until we hook it up to the backend
const dataBank = dataStore();
dataBank("this", {
  title: "King",
  nested: {
    prop1: 5
  }
});

class App extends React.Component {
  componentNames: string[] = []
  state: appState = {
    pageComponents: [],
    currSelectedComponent: ""
  }
  constructor(props: object) {
    super(props);
    // Possibly load components from broowser memory
    for(let name in allComponents) {
      this.componentNames.push(name);
    }
  }
  handleSelectChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    if(typeof evt.target.value === "string") {
      this.setState({
        currSelectedComponent: evt.target.value
      });
    }
  }
  postPageComponents() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        allComponents: this.state.pageComponents
      })
    };
    console.log(requestOptions.body);

    fetch('http://localhost:3000/make-page', requestOptions)
      .then(function(response) { return response.json(); })
      .then(function(data) {
        console.log(data);
      });
  }
  addSelectedComponent(evt: React.MouseEvent<HTMLInputElement>) {
    const name = this.state.currSelectedComponent;
    const funcToExecute: Function | undefined = allComponents[name];
    const funcExists: boolean = !!funcToExecute;
    if(!funcExists) {
      return;
    }
    this.state.pageComponents.push({
      name,
      props: {}
    });
    this.setState({
      pageComponents: this.state.pageComponents
    });
  }
  addComponent(componentOptions: {[index: string]: any}) {
    console.log(componentOptions);
  }
  render() {
    const hasProps = this.state.currSelectedComponent in componentProps;
    let form = null;
    if(hasProps) {
      form = <Form
        fieldOptions={componentProps[this.state.currSelectedComponent]}
        data={dataBank('this')}
        completeFn={this.addComponent.bind(this)}/>
    }
    // FIXME why do I need a div around any module I create?
    return (
      <div>
        { this.state.pageComponents.map(component => (
          <div className="module_wrapper">
            {React.createElement(allComponents[component.name], component.props, {})}
          </div>
        )) }
        <div>
          <select onChange={this.handleSelectChange.bind(this)}>
            <option>None</option>
            {this.componentNames.map((name) => <option>{name}</option>)}
          </select>
          {form}
          <br />
          <input type="button" value="Add a Component" onClick={this.addSelectedComponent.bind(this)} />
          <input type="button" value="Make a Page" onClick={this.postPageComponents.bind(this)} />
        </div>
      </div>
    );
  }
}


export default App;
