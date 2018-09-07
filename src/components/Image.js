import React, {Component} from 'react'

class Image extends Component {
  constructor(props) {
    super(props)
  }

  // handleClick = () => {
  //   this.setState({open: !this.state.open}, () => {
  //     this.props.openImage(this.props.image, this.afterImageMatchCheck)
  //   })
  //   // debugger
  //   // if (test === false) {
  //   //   debugger
  //   //   this.setState({
  //   //     open: false
  //   //   })
  //   // }
  // }
  //
  // afterImageMatchCheck = (response, firstImageURL) => {
  //   debugger
  //   if (response === "No Match") {
  //     let allImgs = Array.from(document.querySelectorAll('img'))
  //     let first = allImgs.find(img => img.src === firstImageURL)
  //     first.src = ''
  //
  //     debugger
  //     this.setState({ open: false })
  //   }
  // }

  render() {
    return (
      <div onClick={this.props.handleClick}>

          {/*this.state.open ?*/}
          {/*<img className="card" src={this.props.image.url} alt={this.props.image.name}/>*/}
          {/*:*/}
          <div className="card" name={this.props.image.name}></div>

      </div>
    )
}
}

export default Image
