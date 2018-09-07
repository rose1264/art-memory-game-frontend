import React from 'react'
import Image from './Image'

const ImageList = props => {
  let mappedImages = props.imageList.map(image => {
    return <Image key={image.id} image={image} />
      })
      console.log("this is", mappedImages);
  return (
      <div className="deck">
        {mappedImages}
        {mappedImages} 
      </div>
        )
  }

export default ImageList
