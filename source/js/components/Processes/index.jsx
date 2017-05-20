import React from 'react'
import { connect } from 'react-redux'
import Table from './Table'

const Processes = (props) => {
  return (
    <div>
      <h5>Processes</h5>
      <h3>Current processes</h3>
      <Table processes={props.current} />

      <h3>Resolved processes</h3>
      <Table processes={props.resolved} />
    </div>
  )
}

export default connect(
  (state) => {
    return {
      current: state.banker.processes.current,
      resolved: state.banker.processes.resolved
    }
  }
)(Processes)
