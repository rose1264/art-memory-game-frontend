import React from 'react'
import Record from './Record'

const Leaderboard = props => {
  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">
                Player Name
              </h3>
            </th>
            <th>
              <h3 className="ui center aligned header">
                Record (in seconds)
              </h3>
            </th>
          </tr>

          {props.leaderBoard.map(record=>{
            return <Record record={record} key={record.id}/>
          })}

        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
