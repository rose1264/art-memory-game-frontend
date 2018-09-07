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

  // openImage = (image, callback) => {
  //   this.setState({openImages: [...this.state.openImages, image]}, () => {
  //     if(this.state.openImages.length === 2) {
  //       if(this.state.openImages[0].name !== this.state.openImages[1].name) {
  //         //change image's state
  //         let imageMatch = "No Match"
  //         let firstImageURL = this.state.openImages[0].url
  //         callback(imageMatch, firstImageURL)
  //       }
  //       this.setState({openImages: []})
  //     }
  //   })
  //
  // }

  handleClick = e => {
    // this.state.imageList.map((image)=>{
    //   if (image.name === e.target.getAttribute('name')){
    //     this.setState({
    //       imageList: [
    //         ...this.state.imageList,
    //         {
    //           ...image,
    //           open: true
    //         }
    //       ]
    //     })
    //   }
    // })
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
