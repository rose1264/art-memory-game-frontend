import React, { Component } from 'react';
import './App.css';
import ImageList from './components/ImageList'
const URL = "http://localhost:3000/api/v1/images"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      openCards: []
    }
  }

  handleClick = (event) => {
    this.setState({openCards: [...this.state.openCards]})

  }

  componentDidMount() {
    fetch(URL)
    .then(resp => resp.json())
    .then(resp => this.setState({ imageList: resp}))
  }

  render() {
    // console.log(this.state.imageList);
    return (
      <div className="App">
        <ImageList imageList={this.state.imageList} openCards={this.state.openCards} handleClick={this.handleClick}/>
      </div>
    )
  }
}

export default App;
