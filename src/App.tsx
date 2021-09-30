import React from 'react';
import './App.css';
import allComponents from './components';

interface appState {
  pageComponents: Array<React.ReactElement>
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
  addSelectedComponent(evt: React.MouseEvent<HTMLInputElement>) {
    const name: string = this.currSelectedComponent;
    const funcToExecute: Function | undefined = allComponents[name];
    const funcExists: boolean = !!funcToExecute;
    if(!funcExists) {
      return;
    }
    this.state.pageComponents.push(React.createElement(allComponents[name], {}, {}));
    this.setState({
      pageComponents: this.state.pageComponents
    });
  }
  render() {
    // FIXME why do I need a div around any module I create?
    return (
      <div>
        { this.state.pageComponents.map(el => (<div className="module_wrapper">{el}</div>) )}
        <div>
          <select onChange={this.handleSelectChange.bind(this)}>
            <option>None</option>
            {this.componentNames.map((name) => <option>{name}</option>)}
          </select>
          <br />
          <input type="button" value="Add a Component" onClick={this.addSelectedComponent.bind(this)} />
        </div>
      </div>
    );
  }
}


export default App;
