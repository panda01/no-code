import React from 'react';
import './App.css';
import allComponents from './components';

interface componentParts {
  name: string,
  props: Object
}
interface appState {
  pageComponents: Array<componentParts>
}

class App extends React.Component {
  currSelectedComponent: string = ""
  componentNames: string[] = []
  state: appState = {
    pageComponents: []
  }
  constructor(props: object) {
    super(props);
    // Possibly load components from broowser memory
    for(let name in allComponents) {
      this.componentNames.push(name);
    }
  }
  handleSelectChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    this.currSelectedComponent = evt.target.value;
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
    const name: string = this.currSelectedComponent;
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
  render() {
    // FIXME why do I need a div around any module I create?
    return (
      <div>
        { this.state.pageComponents.map(component => (<div className="module_wrapper">{React.createElement(allComponents[component.name], component.props, {})}</div>) )}
        <div>
          <select onChange={this.handleSelectChange.bind(this)}>
            <option>None</option>
            {this.componentNames.map((name) => <option>{name}</option>)}
          </select>
          <br />
          <input type="button" value="Add a Component" onClick={this.addSelectedComponent.bind(this)} />
          <input type="button" value="Make a Page" onClick={this.postPageComponents.bind(this)} />
        </div>
      </div>
    );
  }
}


export default App;
