import React from 'react'

const Table = (props) => {
  const tableBody = props.processes.map((proc) => {
    return (
      <tr key={proc.id}>
        <td>{proc.id}</td>
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
          <th>#</th>
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
