import React from 'react'

const Image = props => {
  return (
    <div>
      <h1>{props.image.name}</h1>
      <img src={props.image.url} style={{width: 150, height: 150}}/>
    </div>
      )
}

export default Image
