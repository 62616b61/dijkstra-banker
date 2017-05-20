import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import {Tick as BankerTick} from 'ducks/banker'
import {Tick as TimerTick} from 'ducks/timer'

import Processes from 'components/Processes'
import Resources from 'components/Resources'
import Timer from 'components/Timer'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  componentDidMount () {
    let timer = setInterval(() => {
      this.props.TimerTick()
      this.props.BankerTick()
    }, 1000)
    this.setState({timer})
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

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
          <Timer />
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

export default connect(
  () => ({}),
  (dispatch) => {
    return {
      TimerTick: () => dispatch(TimerTick()),
      BankerTick: () => dispatch(BankerTick())
    }
  }
)(Home)
