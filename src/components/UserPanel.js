import React from 'react'

const UserPanel = props => {

  return (
    <div>
      {props.playerLogin ?
        <p>Welcome, {props.player}! Try to beat our newest record: {props.bestScore}</p>
      :
        <form onSubmit={props.handleSubmit}>
          <p>Player: <input onChange={props.handleChange} type="text" placeholder="Ready, Player One!"/></p>
        </form>
      }
      <br/>
    </div>
  )
}

export default UserPanel
