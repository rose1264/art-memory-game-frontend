import React, { Component } from 'react';
import './App.css';
import ImageList from './components/ImageList'
const URL = "http://localhost:3000/api/v1/images"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      openImages: []
    }
  }

  componentDidMount() {
    fetch(URL)
    .then(resp => resp.json())
    .then(json => {
      let images=json.map(image => {
        let newImage = {
          id: image.id,
          name: image.name,
          url: image.url,
          open: false
        }
        return newImage
      })
      this.setState({
        imageList: images
      })
    })
  }

  handleClick = e => {
    let newImageList = this.state.imageList.map(image => {
      if (image.name === e.target.getAttribute('name')) {
        return {
          ...image,
          open: true
        }
      } else {
        return image
      }
    })

    this.setState({
      imageList: newImageList
    })
  }

  render() {
    console.log(this.state.imageList);
    return (
      <div className="App">
        <ImageList imageList={this.state.imageList} handleClick={this.handleClick}/>
      </div>
    )
  }
}

export default App;
