import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

import * as serviceWorker from './serviceWorker';
import { observable } from 'mobx';

const counterState = observable({
  count: 0
})

counterState.increment = function () {
  this.count++
}

counterState.decrement = function () {
  this.count--
}

@observer class Counter extends Component {

  handleIncrement = () => this.props.store.increment();
  handleDecrement = () => this.props.store.decrement();


  render() {
    console.log('store', this.props.store);
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.count}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={counterState} />, document.getElementById('root'));

serviceWorker.unregister();
