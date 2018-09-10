import React, {Component} from 'react'

class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div onClick={this.props.handleClick}>
          {this.props.image.open ?
            <img className="card" name={this.props.image.name} src={this.props.image.url} />
            :
            <div className="card" name={this.props.image.name}></div>
          }
      </div>
    )
}
}

export default Image
