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
          col={2}
          p={3}
        >
          <Timer />
          <Resources resources={this.props.resources} />
        </Box>
        <Box
          col={5}
          p={3}
        >
          <Processes processes={this.props.processes} />
        </Box>
        <Box
          col={5}
          p={3}
        >
          Box auto
        </Box>
      </Flex>
    )
  }
}

export default connect(
  (state) => {
    return {
      processes: state.banker.processes,
      resources: state.banker.resources
    }
  },
  (dispatch) => {
    return {
      TimerTick: () => dispatch(TimerTick()),
      BankerTick: () => dispatch(BankerTick())
    }
  }
)(Home)
