import React from 'react'

const Resources = (props) => {
  const {available, allocated} = props.resources
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
            <td>{available}</td>
            <td>{allocated}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Resources
