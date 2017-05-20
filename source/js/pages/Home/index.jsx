import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import {Tick as BankerTick} from 'ducks/banker'
import {Tick as TimerTick} from 'ducks/timer'

import Processes from 'components/Processes'
import Resources from 'components/Resources'
import Timer from 'components/Timer'
import Log from 'components/Log'

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
      <Flex justify='center' wrap>
        <Flex col={8}>
          <Box
            col={2}
            p={3}
          >
            <Timer />
            <Resources resources={this.props.resources} />
          </Box>
          <Box
            col={7}
            p={3}
          >
            <Processes processes={this.props.processes} />
          </Box>
          <Box
            col={3}
            p={3}
          >
            <Log log={this.props.log} />
          </Box>
        </Flex>
      </Flex>
    )
  }
}

export default connect(
  (state) => {
    return {
      processes: state.banker.processes,
      resources: state.banker.resources,
      log: state.logger.log
    }
  },
  (dispatch) => {
    return {
      TimerTick: () => dispatch(TimerTick()),
      BankerTick: () => dispatch(BankerTick())
    }
  }
)(Home)
