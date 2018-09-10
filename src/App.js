import React, { Component } from 'react';
import './App.css';
import ImageList from './components/ImageList'
const URL = "http://localhost:3000/api/v1/images"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: []
      // openImages: []
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

  checkPair = (newImageList) => {
    let imageOpenCount = 0
    let openArray = []
    newImageList.forEach(image => {
      if (image.open === true) {
        imageOpenCount++
        openArray.unshift(image)
      }
    })
    // debugger
    if ((imageOpenCount%2 === 0) && (openArray[0].name.slice(0,10) !== openArray[1].name.slice(0,10))) {
      let newImageList = this.state.imageList.map(image => {
        if (image.name.slice(0,10) === openArray[0].name.slice(0,10)
        ||image.name.slice(0,10) === openArray[1].name.slice(0,10)) {
          return {
            ...image,
            open: false
          }
        } else {
          return image
        }
      })
      setTimeout(()=>{
        this.setState({
        imageList: newImageList
      })}, 1000)
    }

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
    }, ()=>{this.checkPair(this.state.imageList)})

  }

  render() {
    console.log(this.state.imageList[0]);
    return (
      <div className="App">
        <ImageList imageList={this.state.imageList} handleClick={this.handleClick}/>
      </div>
    )
  }
}

export default App;
