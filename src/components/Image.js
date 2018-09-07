import React, {Component} from 'react'

class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    return (
      <div onClick={this.props.handleClick}>
        {/* { props.openCards.includes(props.image.name) ?} */}
        <div className="card"  />
        {/* {:} */}
        {/* <img className="card" src={props.image.url}/> */}
      </div>
        )
}
}

export default Image
