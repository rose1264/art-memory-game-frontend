import React from 'react'

const Record = props => {
  console.log(props)
  return (
    <tr>
      <td className="ui center aligned"><p>{props.record.player.name}</p></td>
      <td className="ui center aligned"><p>{props.record.points} seconds</p></td>
    </tr>
  )
}

export default Record
