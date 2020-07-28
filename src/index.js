import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

import * as serviceWorker from './serviceWorker';
import { observable, computed, extendObservable } from 'mobx';

const nickName = observable({
  firstName: 'Ihor',
  age: 23,

  get nickName() {
    console.log('generate nickName');
    return `${this.firstName}${this.age}`
  },

  increment() {
    this.age++
  },

  decrement() {
    this.age--
  }
});

const todos = observable([
  { text: 'Learn React' },
  { text: 'Learn Mobx' }
]);

@observer class Counter extends Component {

  handleIncrement = () => this.props.store.increment();
  handleDecrement = () => this.props.store.decrement();


  render() {
    const { nickName, age } = this.props.store;
    return (
      <div className="App">
        <DevTools />
        {/* <h2>{nickName}</h2>
        <h2>{age}</h2>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button> */}

        <ul>
          {todos.map(({ text }) => <li key={text}>{text}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={todos} />, document.getElementById('root'));

serviceWorker.unregister();
