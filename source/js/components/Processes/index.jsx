import React from 'react'
import { Flex, Box } from 'reflexbox'
import Table from './Table'

const Processes = (props) => {
  const {current, resolved} = props.processes
  return (
    <Flex
      wrap
    >
      <Box
        col={12}
      >
        <h5>Processes</h5>
      </Box>
      <Box
        col={6}
      >
        <h3>Current processes</h3>
        <Table processes={current} />
      </Box>
      <Box
        col={6}
      >
        <h3>Resolved processes</h3>
        <Table processes={resolved} />
      </Box>
    </Flex>
  )
}

export default Processes
