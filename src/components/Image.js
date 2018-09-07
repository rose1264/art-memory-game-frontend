import React from 'react'

const Image = props => {
  return (
    <div className="card">
      <img src={props.image.url} style={{width: 150, height: 150}}/>
    </div>
      )
}

export default Image
