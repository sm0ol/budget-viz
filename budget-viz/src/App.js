import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactionTitle: '',
      transactionAmount: 0,
      transactions: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const transactionsRef = firebase.database().ref('transactions');
    transactionsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for(let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          amount: items[item].amount
        });
      }

      this.setState({
        transactions: newState
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const transactionsRef = firebase.database().ref('transactions');
    const transaction = {
      title: this.state.transactionTitle,
      amount: this.state.transactionAmount
    }

    transactionsRef.push(transaction);
    this.setState({
      transactionTitle: '',
      transactionAmount: 0
    })
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/transactions/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>BudgetViz
              </h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="transactionTitle" placeholder="Transaction Title" onChange={this.handleChange} value={this.state.transactionTitle} />
                <input type="number" name="transactionAmount" placeholder="Transaction Amount" onChange={this.handleChange} value={this.state.transactionAmount} />
                <button>Add Transaction</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.transactions.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>Amount: {item.amount}</p>
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
