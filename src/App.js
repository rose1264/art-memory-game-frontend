import React, { Component } from 'react';
import './App.css';
import ImageList from './components/ImageList'
const URL = "http://localhost:3000/api/v1/images"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      openArray: []
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

  comparePair = (openArray) => {
    console.log(openArray)
    if (openArray[0].name.slice(0,5) !== openArray[1].name.slice(0,5)){
      let newImageList = this.state.imageList.map(image => {
        if (image.name.slice(0,5) === openArray[0].name.slice(0,5)
        ||image.name.slice(0,5) === openArray[1].name.slice(0,5)) {
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

  // callback function of handleClick, first check the number
  checkPair = (newImageList) => {
    let imageOpenCount = 0
    newImageList.forEach(image => {
      if (image.open) {
        imageOpenCount++
      }
    })

    if (imageOpenCount%2 === 0) {
      let openArray = this.state.openArray
      this.comparePair(openArray)
    }

  }

  handleClick = e => {
    //add to openArray
    let addedImage={}

    //toggle image open attribute
    let newImageList = this.state.imageList.map(image => {
      if (image.name === e.target.getAttribute('name')) {
        addedImage = image
        return {
          ...image,
          open: true
        }
      } else {
        return image
      }
    })

    this.setState({
      imageList: newImageList,
      openArray: [addedImage, ...this.state.openArray]
    }, ()=>{this.checkPair(this.state.imageList)})

  }

  render() {
    console.log(this.state.openArray);
    return (
      <div className="App">
        <ImageList imageList={this.state.imageList} handleClick={this.handleClick}/>
      </div>
    )
  }
}

export default App;
