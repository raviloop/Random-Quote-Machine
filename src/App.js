import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    quotes: [],
    quote: '',
    author: ''
  }

  getQuote() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
      headers: {
        'Accept': 'application/json'
      }

    }).then(response => response.json())
      .then(data => {
        console.log(data.quotes)
        this.setState({
          quotes: data.quotes
        })
        this.getQuoteHandler();
      })
  }

  componentDidMount() {
    this.getQuote();
    this.refs.tweet_tag.setAttribute("target", "_blank")
  }

  getQuoteHandler = () => {
    const index = Math.floor(Math.random() * Math.floor(this.state.quotes.length));
    this.setState({
      quotes: this.state.quotes,
      quote: this.state.quotes[index].quote,
      author: this.state.quotes[index].author
    }, function () {
      this.refs.tweet_tag.setAttribute("href", "https://twitter.com/intent/tweet?text=" + this.state.quote)
    })
  }


  render() {
    return (
      <div className="App">
        <h1 className="App-title">RANDOM QUOTE MACHINE</h1>
        <hr style={{ width: '80%' }} />
        <div id="quote-box">
          <div className="quote-author">
            <p id="text"> {this.state.quote}  </p>
            <p id="author"> - {this.state.author} </p>
          </div>
          <div className="butttons" style={{marginBottom:"30px"}}>
            <button id="new-quote" onClick={this.getQuoteHandler}>New Quote</button>
            <a ref="tweet_tag" id="tweet-quote" >Tweet </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
