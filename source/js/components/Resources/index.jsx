import React from 'react'
import { connect } from 'react-redux'

const Resources = (props) => {
  return (
    <div>
      <h5>Resources</h5>
      <table>
        <tbody>
          <tr>
            <th>Available</th>
            <th>Allocated</th>
          </tr>
          <tr>
            <td>{props.available}</td>
            <td>{props.allocated}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default connect(
  (state) => {
    return {
      available: state.banker.resources.available,
      allocated: state.banker.resources.allocated
    }
  }
)(Resources)
