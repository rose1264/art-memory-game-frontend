import React from 'react'
import Image from './Image'

const ImageList = props => {


  let mappedImages = props.imageList.map((image, idx) => {
    return <Image key={idx} image={image} handleClick={props.handleClick}/>
  })


  return (
      <div className="deck">
        {mappedImages}
      </div>
        )
  }

export default ImageList
