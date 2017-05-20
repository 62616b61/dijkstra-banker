import React from 'react'

const Table = (props) => {
  const tableBody = props.processes.map((proc, i) => {
    return (
      <tr key={i}>
        <td>{proc.max}</td>
        <td>{proc.alloc}</td>
        <td>{proc.rem}</td>
      </tr>
    )
  })
  return (
    <table>
      <tbody>
        <tr>
          <th>Max</th>
          <th>Alloc</th>
          <th>Rem</th>
        </tr>
        {props.processes.length
          ? tableBody
          : <tr><td>-</td><td>-</td><td>-</td></tr>
        }
      </tbody>
    </table>
  )
}

export default Table
