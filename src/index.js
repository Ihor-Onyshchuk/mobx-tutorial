import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

import * as serviceWorker from './serviceWorker';
import { observable, configure, action, decorate, runInAction } from 'mobx';

configure({ enforceActions: "observed" });

class Store {

  constructor() {
    this.user = null;
  }

  getUser() {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(json => json.results
        ? runInAction(() => this.user = json.results[0])
        : null
        // ? this.setUser(json.results)
        // : null
      );
  }

  setUser(results) {
    this.user = results[0];
  }
}

decorate(Store, {
  user: observable,
  getUser: action.bound,
  setUser: action
})

const appStore = new Store();

@observer class App extends Component {
  render() {
    const { user, getUser } = this.props.store;
    return (
      <div>
        <DevTools />
        <button onClick={getUser}>Get User</button>
        <h2>{user ? user.login.username : 'default name'}</h2>
      </div>
    );
  }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));

serviceWorker.unregister();