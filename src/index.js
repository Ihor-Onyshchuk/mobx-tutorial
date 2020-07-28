import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

import * as serviceWorker from './serviceWorker';
import { observable, computed } from 'mobx';

const nickName = new class UserNickName {
  @observable firstName = "Ihor";
  @observable age = 23;

  @computed get nickName() {
    console.log('generate nickName');
    return `${this.firstName}${this.age}`
  }
}

nickName.increment = function () {
  this.age++
}

nickName.decrement = function () {
  this.age--
}

@observer class Counter extends Component {

  handleIncrement = () => this.props.store.increment();
  handleDecrement = () => this.props.store.decrement();


  render() {
    return (
      <div className="App">
        <DevTools />
        <h2>{this.props.store.nickName}</h2>
        <h2>{this.props.store.age}</h2>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));

serviceWorker.unregister();
