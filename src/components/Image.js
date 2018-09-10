import React from 'react'

const Image = props => {
    return (
      <div onClick={props.handleClick}>
          {props.image.open ?
            <img className="card" alt ={props.image.name} name={props.image.name} src={props.image.url} />
            :
            <div className="card" name={props.image.name}></div>
          }
      </div>
    )
}

export default Image
