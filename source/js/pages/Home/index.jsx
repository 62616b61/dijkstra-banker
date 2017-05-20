import React from 'react'
import { Flex, Box } from 'reflexbox'

import Processes from 'components/Processes'
import Resources from 'components/Resources'

class Home extends React.Component {
  render () {
    return (
      <Flex justify='center'>
        <Box
          auto
          p={3}
        >
          <Resources />
          <Processes />
        </Box>
        <Box
          auto
          p={3}
        >

        </Box>
        <Box
          auto
          p={3}
        >
          Box auto
        </Box>
      </Flex>
    )
  }
}

export default Home
