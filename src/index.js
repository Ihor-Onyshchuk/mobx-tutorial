import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

import * as serviceWorker from './serviceWorker';
import { observable, computed, decorate, action } from 'mobx';
import './index.css';

class Store {
  devsList = [
    { name: "Jack", sp: 12 },
    { name: "Ben", sp: 10 },
    { name: "Leo", sp: 8 },
  ];

  filter: '';

  get totalSum() {
    return this.devsList.reduce((sum, { sp }) => sum += sp, 0);
  };

  get topPerformer() {
    const maxSp = Math.max(...this.devsList.map(({ sp }) => sp))
    return this.devsList.find(({ sp, name }) => (
      sp === maxSp ? name : null
    ));
  };

  get filteredDevelopers() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.devsList.filter(({ name }) => (
      !this.filter || matchesFilter.test(name)
    ));
  }

  clearList() {
    this.devsList = [];
  };

  addDeveloper(dev) {
    this.devsList.push(dev);
  };

  updateFilter(value) {
    this.filter = value;
  }
}

decorate(Store, {
  devsList: observable,
  filter: observable,
  totalSum: computed,
  topPerformer: computed,
  filteredDevelopers: computed,
  clearList: action,
  addDeveloper: action,
  updateFilter: action,
})

const appStore = new Store();

const Row = ({ name, sp }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{sp}</td>
    </tr>
  )
}

@observer class Table extends Component {
  render() {
    const { totalSum, topPerformer, filteredDevelopers } = this.props.store;

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {filteredDevelopers.map((dev, i) => (
            <Row key={i} {...dev} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{totalSum}</td>
          </tr>
          <tr>
            <td>Top Performer:</td>
            <td>
              {topPerformer ? topPerformer.name : ''}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

@observer class Controls extends Component {
  store = this.props.store;

  addDeveloper = () => {
    const name = prompt("The name:");
    const sp = parseInt(prompt("The story points:", 10));
    this.store.addDeveloper({ name, sp });
  }

  filterDevelopers = ({ target: { value } }) => {
    this.store.updateFilter(value);
  }

  clearList = () => this.store.clearList();

  render() {
    return (
      <div className="controls">
        <button onClick={this.clearList}>Clear Table</button>
        <button onClick={this.addDeveloper}>Add record</button>
        <input
          value={this.store.filter}
          placeholder="filter text..."
          onChange={this.filterDevelopers} />
      </div>
    );
  }
}

class App extends PureComponent {
  render() {
    return (
      <div>
        <DevTools />
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    )
  }
}


ReactDOM.render(<App store={Store} />, document.getElementById('root'));

serviceWorker.unregister();
